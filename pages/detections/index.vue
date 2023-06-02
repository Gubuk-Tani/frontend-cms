<template>
  <!-- Main -->
  <main class="main-dashboard">
    <!-- Content -->
    <section
      class="flex flex-row justify-between gap-6 flex-grow max-md:max-w-none"
    >
      <div class="flex flex-col gap-8 max-sm:gap-6 w-full">
        <!-- Headline -->
        <div class="flex justify-between">
          <h1 class="font-bold text-2xl text-dark self-center py-1">
            Plant List
          </h1>

          <!-- Change Endpoint -->
          <div class="flex items-center gap-4">
            <button
              type="button"
              class="btn btn-secondary p-3 self-center flex flex-row gap-1.5 items-center max-sm:p-[10px]"
              @click="showModal('formEndpoint', null)"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                class="w-5 h-5"
              >
                <path
                  fill-rule="evenodd"
                  d="M7.84 1.804A1 1 0 018.82 1h2.36a1 1 0 01.98.804l.331 1.652a6.993 6.993 0 011.929 1.115l1.598-.54a1 1 0 011.186.447l1.18 2.044a1 1 0 01-.205 1.251l-1.267 1.113a7.047 7.047 0 010 2.228l1.267 1.113a1 1 0 01.206 1.25l-1.18 2.045a1 1 0 01-1.187.447l-1.598-.54a6.993 6.993 0 01-1.929 1.115l-.33 1.652a1 1 0 01-.98.804H8.82a1 1 0 01-.98-.804l-.331-1.652a6.993 6.993 0 01-1.929-1.115l-1.598.54a1 1 0 01-1.186-.447l-1.18-2.044a1 1 0 01.205-1.251l1.267-1.114a7.05 7.05 0 010-2.227L1.821 7.773a1 1 0 01-.206-1.25l1.18-2.045a1 1 0 011.187-.447l1.598.54A6.993 6.993 0 017.51 3.456l.33-1.652zM10 13a3 3 0 100-6 3 3 0 000 6z"
                  clip-rule="evenodd"
                />
              </svg>

              <p class="text-sm">Change Endpoint</p>
            </button>

            <!-- Add Plant -->
            <button
              type="button"
              class="btn btn-primary p-3 self-center flex flex-row gap-1.5 items-center max-sm:p-[10px]"
              @click="showModal('formPlant', null)"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
                class="w-5 h-5"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
              <p class="text-sm">Add Plant</p>
            </button>
          </div>
        </div>

        <!-- Plant List -->
        <div class="flex flex-col gap-4 w-full">
          <!-- Show Content -->
          <div
            class="overflow-x-auto flex flex-wrap max-sm:flex-col gap-5 justify-start pb-4"
          >
            <div
              class="bg-white rounded-md overflow-clip p-0 w-[200px] max-sm:w-full cursor-pointer shadow-sm hover:shadow-lg"
              v-for="item in plants"
              @click="detailPlant(item.id)"
            >
              <div>
                <!-- Images -->
                <img
                  :src="item.image ? imgUrl + item.image : ''"
                  alt=""
                  class="w-full h-[150px] object-cover"
                  v-if="item.image"
                />

                <div
                  class="w-full h-[150px] flex justify-center items-center bg-gray-200"
                  v-else
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    class="w-14 h-14 fill-gray-400"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </div>
              </div>

              <div class="flex flex-col gap-1 p-4">
                <!-- Title -->
                <div class="text-lg text-gray-900 font-semibold">
                  {{ item.name }}
                </div>

                <!-- Status -->
                <div class="text-sm text-gray-400 line-clamp-2">
                  {{ item.status }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Modal -->
    <div
      class="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-[999]"
      v-if="modal"
      @click="closeModal"
    >
      <div
        class="w-[600px] max-md:w-[90%] card p-4 bg-white overflow-y-auto shadow-lg max-h-[90%]"
        @click.stop
      >
        <FormPlant
          class=""
          :plant_id="plant_id"
          @close-form="closeModal"
          v-if="modalType == 'formPlant'"
        />
        <FormEndpoint
          class=""
          :plant_id="plant_id"
          @close-form="closeModal"
          v-if="modalType == 'formEndpoint'"
        />
      </div>
    </div>
  </main>
</template>

<script>
export default {
  layout: 'LayoutDashboard',
  middleware: 'auth',
  data() {
    return {
      imgUrl: process.env.imgUrl,
      plants: [],

      // Options
      query: {
        status: null,
      },

      modal: false,
      modalType: null,

      // Edit User
      plant_id: null,
    }
  },
  async fetch() {
    const resPlants = await this.$axios.get('/api/plant', {
      params: this.query,
    })
    this.plants = resPlants.data.result.plants
  },
  methods: {
    // Open Modal
    showModal(modalType, id) {
      this.modal = true
      this.modalType = modalType
      this.plant_id = id
    },

    // Close Modal
    closeModal() {
      this.modal = false
      this.modalType = null
      this.plant_id = null
    },

    // Detail Plant
    detailPlant(id) {
      this.$router.push({
        name: 'detections-id',
        params: {
          id: id,
        },
      })
    },
  },
}
</script>
