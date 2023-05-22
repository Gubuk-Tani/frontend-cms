<template>
  <!-- Form Container -->
  <div class="w-full" @click.stop>
    <!-- Form Content -->
    <form
      class="w-full form-container p-[24px] h-full"
      @submit.prevent="updateUser"
    >
      <div class="flex justify-center mb-1">
        <h1 class="font-bold text-dark">{{ user_id ? 'Edit' : 'Add' }} User</h1>
      </div>

      <!-- Full Name -->
      <div class="form-group">
        <label for="" class="input-label required">Full Name</label>

        <input
          type="text"
          class="input-field"
          placeholder="Full Name"
          v-model="user.name"
        />

        <!-- Validation -->
        <p class="text-red-500 text-xs italic" v-if="validation.errors?.name">
          {{ validation.errors?.name[0] }}
        </p>
      </div>

      <!-- Username -->
      <div class="form-group">
        <label for="" class="input-label required">Username</label>

        <input
          type="text"
          class="input-field"
          placeholder="Username"
          v-model="user.username"
        />

        <!-- Validation -->
        <p
          class="text-red-500 text-xs italic"
          v-if="validation.errors?.username"
        >
          {{ validation.errors?.username[0] }}
        </p>
      </div>

      <!-- Email -->
      <div class="form-group">
        <label for="" class="input-label required">Email</label>

        <input
          type="email"
          class="input-field"
          placeholder="Email"
          v-model="user.email"
        />

        <!-- Validation -->
        <p class="text-red-500 text-xs italic" v-if="validation.errors?.email">
          {{ validation.errors?.email[0] }}
        </p>
      </div>

      <!-- Password -->
      <div class="form-group">
        <label for="" class="input-label required">Password</label>

        <input
          type="password"
          class="input-field"
          placeholder="Password"
          v-model="user.password"
          @input="checkPassword($event.target.value)"
        />

        <!-- Validation -->
        <p
          class="text-red-500 text-xs italic"
          v-if="validation.errors?.password"
        >
          {{ validation.errors?.password[0] }}
        </p>
      </div>

      <!-- Password Confirmation -->
      <div class="form-group">
        <label for="" class="input-label required">Password Confirmation</label>

        <input
          type="password"
          class="input-field"
          placeholder="Password Confirmation"
          v-model="password_confirmation"
        />

        <!-- Validation -->
        <p
          class="text-red-500 text-xs italic"
          v-if="password_confirmation != user.password"
        >
          The confirm password field is not match.
        </p>
      </div>

      <!-- City -->
      <div class="form-group">
        <label for="" class="input-label">City</label>

        <input
          type="text"
          class="input-field"
          placeholder="City"
          v-model="user.city"
        />

        <!-- Validation -->
        <p class="text-red-500 text-xs italic" v-if="validation.errors?.city">
          {{ validation.errors?.city[0] }}
        </p>
      </div>

      <!-- Avatar -->
      <div class="form-group">
        <label for="" class="input-label">Image</label>
        <InputImage v-model="user.avatar" />
      </div>

      <!-- Role -->
      <div class="form-group">
        <label for="" class="input-label required">Role</label>

        <select class="input-field" v-model="user.role">
          <option value="admin">Admin</option>
          <option value="enduser">Enduser</option>
        </select>

        <!-- Validation -->
        <p class="text-red-500 text-xs italic" v-if="validation.errors?.role">
          {{ validation.errors?.role[0] }}
        </p>
      </div>

      <!-- Button -->
      <div class="flex flex-row gap-4 justify-between mt-[14px]">
        <div class="flex flex-row gap-4 self-start">
          <button type="submit" class="btn btn-primary">
            {{ user_id ? 'Save Changes' : 'Add User' }}
          </button>
          <button
            type="button"
            class="btn btn-secondary self-start"
            @click="
              user_id = null
              $emit('close-form')
            "
          >
            Cancel
          </button>
        </div>
        <button
          :class="
            user.disabled_at
              ? 'btn self-end btn-success'
              : 'btn self-end btn-danger'
          "
          type="button"
          @click="disableOrEnableUser"
          v-if="user_id"
        >
          {{ user.disabled_at ? 'Enable' : 'Disable' }}
        </button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  props: {
    user_id: null,
  },
  data() {
    return {
      user: {
        name: null,
        username: null,
        email: null,
        password: null,
        city: null,
        avatar: null,
        role: null,
        disabled_at: null,
      },

      current_avatar: null,
      password_confirmation: null,

      // Validation
      validation: [],
    }
  },
  async fetch() {
    if (this.user_id) {
      // For Update
      const resUser = await this.$axios.get(`/api/users/${this.user_id}`)

      this.user.name = resUser.data.result.user.name
      this.user.username = resUser.data.result.user.username
      this.user.email = resUser.data.result.user.email
      this.user.city = resUser.data.result.user.city
      this.user.avatar = resUser.data.result.user.avatar
      this.user.role = resUser.data.result.user.role
      this.user.disabled_at = resUser.data.result.user.disabled_at

      this.current_avatar = this.user.avatar
      this.password_confirmation = null
    } else {
      // For Add
      this.user.name = null
      this.user.username = null
      this.user.email = null
      this.user.city = null
      this.user.avatar = null
      this.user.role = null
      this.user.disabled_at = null

      this.current_avatar = null
      this.password_confirmation = null
    }
  },
  watch: {
    // Re-Fetch Data
    user_id() {
      this.$fetch()
    },
  },
  methods: {
    // Update User
    async updateUser() {
      let data = new FormData()

      for (const [key, value] of Object.entries(this.user)) {
        if (key == 'avatar' && value == this.current_avatar) {
          continue
        }

        if (value) {
          data.append(key, value)
        }
      }

      try {
        let response = []

        if (this.user_id) {
          data.append('_method', 'PUT')

          response = await this.$axios.post(`/api/users/${this.user_id}`, data)
        } else {
          response = await this.$axios.post('/api/users', data)
        }

        this.user_id = null
        this.$emit('close-form')
        this.refreshData()
      } catch (error) {
        this.validation = error.response.data
      }
    },

    // Delete User
    async disableOrEnableUser() {
      if (this.user.disabled_at) {
        await this.$axios.put(`/api/users/${this.user_id}/enable`)
      } else {
        await this.$axios.put(`/api/users/${this.user_id}/disable`)
      }

      this.user_id = null
      this.$emit('close-form')
      this.refreshData()
    },

    // Check Password
    checkPassword(value) {
      if (!value || value == '') {
        this.validation = []
        return
      }

      if (value.length < 8) {
        this.validation = {
          errors: {
            password: ['Password tidak boleh kurang dari 8 karakter'],
          },
        }

        return
      }

      this.validation = []
    },

    // Refresh Data
    refreshData() {
      this.$nuxt.refresh()
    },
  },
}
</script>
