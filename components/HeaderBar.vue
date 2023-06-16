<template>
  <!-- Header -->
  <header
    class="bg-white px-[24px] max-sm:px-[16px] top-0 fixed w-full z-[900] flex flex-row justify-between h-[60px] print:hidden"
  >
    <!-- Logo Details-->
    <div class="flex items-center justify-between" v-if="details">
      <a href="#" class="flex justify-center items-center gap-3 px-[2.5px]">
        <img
          :src="
            $store.state.settings.app_logo
              ? imgUrl + $store.state.settings.app_logo
              : '../assets/images/gubuk-tani-logo.png'
          "
          alt=""
          class="h-[40px]"
        />
        <p class="text-xl font-montserrat font-bold text-dark line-clamp-1">
          {{
            $store.state.settings.app_name
              ? $store.state.settings.app_name.toUpperCase()
              : $store.state.settings.app_name
          }}
        </p>
      </a>
    </div>

    <!-- Logo Dashboard -->
    <div class="flex items-center justify-between md:invisible" v-else>
      <a href="#" class="flex justify-center items-center gap-2 px-[2.5px]">
        <img
          :src="
            $store.state.settings.app_logo
              ? imgUrl + $store.state.settings.app_logo
              : '../assets/images/gubuk-tani-logo.png'
          "
          alt=""
          class="h-[40px]"
        />
        <p
          class="text-xl font-montserrat font-bold text-dark md:hidden line-clamp-1"
        >
          {{
            $store.state.settings.app_name
              ? $store.state.settings.app_name.toUpperCase()
              : $store.state.settings.app_name
          }}
        </p>
      </a>
    </div>

    <!-- User -->
    <nav class="flex items-center justify-between" aria-label="Global">
      <div class="flex flex-1 justify-end">
        <a
          href="#"
          class="flex items-center gap-x-1 text-sm leading-6 text-grey-60"
          @click="show_options = true"
        >
          <img
            :src="
              this.$auth.user.avatar
                ? imgUrl + this.$auth.user.avatar
                : '../assets/images/user.png'
            "
            alt=""
            class="w-10 h-10 rounded-full mr-1"
          />
          {{ this.$auth.user.name }}
          <svg
            class="h-5 w-5 flex-none text-grey-40"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fill-rule="evenodd"
              d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
              clip-rule="evenodd"
            />
          </svg>
        </a>

        <!-- Options Modal -->
        <div
          class="fixed inset-0 w-full h-full z-[999]"
          v-if="show_options"
          @click="show_options = false"
        >
          <div
            class="absolute top-[60px] right-[24px] bg-white flex flex-col gap-4 rounded-lg p-4 shadow-lg"
          >
            <!-- Logout -->
            <button
              type="button"
              class="btn btn-danger min-w-[160px]"
              @click="userLogout"
            >
              Log Out
            </button>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  props: {
    details: false,
  },
  data() {
    return {
      imgUrl: process.env.imgUrl,
      show_options: false,
    }
  },
  async fetch() {
    // Get Settings
    // await this.$store.dispatch('getSettings')
  },
  methods: {
    async userLogout() {
      try {
        let response = await this.$auth.logout()
        console.log(response)

        this.show_options = false

        this.$router.push({ name: 'login' })
      } catch (err) {
        console.log(err)
      }
    },
  },
}
</script>
