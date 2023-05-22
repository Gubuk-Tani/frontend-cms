<template>
  <!-- Main -->
  <main class="flex justify-center items-center p-[24px] bg-dark dark">
    <!-- Content -->
    <section
      class="max-sm:pt-[40px] max-sm:pb-[60px] max-w-[450px] flex flex-col items-center flex-grow h-full justify-center"
    >
      <!-- Logo -->
      <div class="flex items-center justify-between">
        <a href="#" class="flex gap-1 justify-center items-center">
          <!-- Logo -->
          <img
            :src="imgUrl + $store.state.settings.app_logo"
            alt=""
            class="h-[80px] max-sm:h-[60px]"
            v-if="$store.state.settings.app_logo"
          />

          <!-- App Name -->
          <p
            class="text-2xl max-sm:text-xl font-montserrat font-bold text-white tracking-wide"
          >
            {{
              $store.state.settings.app_name
                ? $store.state.settings.app_name.toUpperCase()
                : $store.state.settings.app_name
            }}
          </p>
        </a>
      </div>

      <!-- Register Form -->
      <form
        class="w-full card form-container mt-[20px]"
        @submit.prevent="userRegister"
      >
        <h1 class="font-bold text-dark text-center">Register</h1>
        <p class="mt-1 leading-7 text-center mb-2 text-grey-80">
          Register to create new account
        </p>

        <!-- Full Name -->
        <div class="form-group">
          <label for="" class="input-label required">Full Name</label>
          <input
            type="text"
            class="input-field"
            placeholder="Full Name"
            v-model="register.name"
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
            v-model="register.username"
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
          <label for="" class="input-label required">Email Address</label>
          <input
            type="email"
            class="input-field"
            placeholder="Email"
            v-model="register.email"
          />

          <!-- Validation -->
          <p
            class="text-red-500 text-xs italic"
            v-if="validation.errors?.email"
          >
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
            v-model="register.password"
          />

          <!-- Validation -->
          <p
            class="text-red-500 text-xs italic"
            v-if="validation.errors?.password"
          >
            {{ validation.errors?.password[0] }}
          </p>
        </div>

        <!-- Confirm Password -->
        <div class="form-group">
          <label for="" class="input-label required">Confirm Password</label>
          <input
            type="password"
            class="input-field"
            placeholder="Confirm Password"
            v-model="confirm_password"
          />

          <!-- Validation -->
          <p
            class="text-red-500 text-xs italic"
            v-if="confirm_password != register.password"
          >
            The confirm password field is not match.
          </p>
        </div>

        <!-- Terms and Conditions -->
        <div class="flex flex-row gap-2">
          <input
            type="checkbox"
            class="hover:text-primary-hover ease-in-out duration-200 focus:text-primary-hover"
          />
          <p class="input-label">I agree with the terms and conditions.</p>
        </div>

        <!-- Loading Button -->
        <button
          type="button"
          class="w-full btn btn-disable mt-[14px]"
          disabled
          v-if="isLoading"
        >
          Loading...
        </button>

        <!-- Button -->
        <button type="submit" class="w-full btn btn-primary mt-[14px]" v-else>
          Register
        </button>

        <!-- More -->
        <div class="mt-4 flex flex-row gap-1 justify-center">
          <p class="input-label">Already have an account?</p>
          <NuxtLink
            :to="{ name: 'login' }"
            href=""
            class="text-primary-1 font-semibold hover:text-primary-hover ease-in-out duration-200"
            >Log In</NuxtLink
          >
        </div>
      </form>
    </section>
  </main>
</template>

<script>
export default {
  auth: 'guest',
  data() {
    return {
      imgUrl: process.env.imgUrl,
      register: {
        name: '',
        username: '',
        email: '',
        password: '',
      },
      confirm_password: '',

      // Validation
      validation: [],

      // Loading Button
      isLoading: false,
    }
  },
  async fetch() {
    // Get Settings
    await this.$store.dispatch('getSettings')
  },
  methods: {
    async userRegister() {
      this.isLoading = true

      if (this.confirm_password == this.register.password) {
        try {
          // Send Registration Data to Server
          let response = await this.$axios.post(
            '/api/auth/register',
            this.register
          )

          // If Successful, Login User
          try {
            let login = await this.$auth.loginWith('local', {
              data: {
                email: this.register.email,
                password: this.register.password,
              },
            })

            console.log(login)
            this.$router.push('/')
          } catch (err) {
            console.log(err)
          }
        } catch (error) {
          console.log(error)
          this.validation = error.response.data
        }

        this.isLoading = false
      }
    },
  },
}
</script>
