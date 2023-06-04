<template>
  <!-- Main -->
  <main class="flex justify-center items-center p-[24px] bg-dark dark">
    <!-- Content -->
    <section
      class="pt-[40px] pb-[60px] max-w-[450px] flex flex-col items-center flex-grow h-full justify-center"
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

      <!-- Login Form -->
      <form
        class="w-full card form-container mt-[20px]"
        @submit.prevent="userLogin"
      >
        <h1 class="font-bold text-dark text-center">Log In</h1>
        <p class="mt-1 leading-7 text-center mb-2 text-grey-80">
          Log in to start your session
        </p>

        <!-- User Validation -->
        <div
          class="bg-red-100 rounded-md p-6"
          v-if="validation.meta?.status == 'error'"
        >
          <p class="text-red-600 text-center">{{ validation.meta?.message }}</p>
        </div>

        <div
          class="bg-red-100 rounded-md p-6"
          v-if="$auth.user && $auth.user.role != 'admin'"
        >
          <p class="text-red-600 text-center">
            Anda bukan Admin. Hubungi Admin jika ada kesalahan.
          </p>
        </div>

        <!-- Email -->
        <div class="form-group">
          <label for="" class="input-label required">Email Address</label>
          <input
            type="email"
            class="input-field"
            placeholder="Email"
            v-model="login.email"
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
            v-model="login.password"
          />

          <!-- Validation -->
          <p
            class="text-red-500 text-xs italic"
            v-if="validation.errors?.password"
          >
            {{ validation.errors?.password[0] }}
          </p>
        </div>

        <!-- Remember Me -->
        <div class="flex flex-row gap-2">
          <input
            type="checkbox"
            class="hover:text-primary-2 ease-in-out duration-200 focus:text-primary-2"
          />
          <p class="input-label">Remember me</p>
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
          Log In
        </button>

        <!-- More -->
        <div class="mt-4 flex flex-row gap-1 justify-center">
          <p class="input-label">Forgot your password?</p>
          <a
            href=""
            class="text-primary-1 font-semibold hover:text-primary-2 ease-in-out duration-200"
            >Reset</a
          >
        </div>
        <div class="flex flex-row gap-1 justify-center">
          <p class="input-label">Don’t have an account yet?</p>
          <NuxtLink
            :to="{ name: 'register' }"
            href=""
            class="text-primary-1 font-semibold hover:text-primary-2 ease-in-out duration-200"
            >Register</NuxtLink
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
      login: {
        email: '',
        password: '',
      },

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
    async userLogin() {
      this.isLoading = true

      this.validation = []

      try {
        let response = await this.$auth.loginWith('local', { data: this.login })

        this.$router.push({ name: 'overview' })
      } catch (err) {
        this.validation = err.response.data
      }

      this.isLoading = false
    },
  },
}
</script>
