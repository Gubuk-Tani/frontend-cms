<template>
  <!-- Main -->
  <main class="main-dashboard">
    <!-- Content -->
    <section
      class="flex flex-row justify-between gap-6 flex-grow max-md:max-w-none"
    >
      <div class="flex flex-col gap-8 max-sm:gap-6 w-full">
        <!-- Back -->
        <div class="flex-grow-0">
          <button
            type="button"
            class="flex gap-2 items-center group"
            @click="$router.back()"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-5 h-5 stroke-gray-500 group-hover:stroke-gray-900"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
              />
            </svg>
            <div class="text-gray-500 group-hover:text-gray-900">Back</div>
          </button>
        </div>

        <!-- Banner -->
        <div
          class="flex items-center bg-white rounded-md overflow-clip group max-sm:flex-col max-sm:items-start"
        >
          <img
            :src="plant.image ? imgUrl + plant.image : ''"
            alt=""
            class="w-[400px] h-[200px] max-sm:w-full object-cover"
            v-if="plant.image"
          />
          <div class="flex flex-col gap-2 p-8 max-sm:pt-6">
            <div class="flex gap-2 items-center">
              <h1 class="font-semibold text-3xl text-dark">{{ plant.name }}</h1>
              <button type="button" @click="showModal('formPlant', null)">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  class="w-5 h-5 fill-gray-300 hover:fill-gray-400"
                >
                  <path
                    d="M5.433 13.917l1.262-3.155A4 4 0 017.58 9.42l6.92-6.918a2.121 2.121 0 013 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 01-.65-.65z"
                  />
                  <path
                    d="M3.5 5.75c0-.69.56-1.25 1.25-1.25H10A.75.75 0 0010 3H4.75A2.75 2.75 0 002 5.75v9.5A2.75 2.75 0 004.75 18h9.5A2.75 2.75 0 0017 15.25V10a.75.75 0 00-1.5 0v5.25c0 .69-.56 1.25-1.25 1.25h-9.5c-.69 0-1.25-.56-1.25-1.25v-9.5z"
                  />
                </svg>
              </button>
            </div>
            <div class="text-gray-400">{{ plant.status }}</div>
          </div>
        </div>

        <!-- Label Headline -->
        <div class="flex justify-between">
          <h1 class="font-bold text-2xl text-dark self-center py-1">
            Label List
          </h1>
          <button
            type="button"
            class="btn btn-primary p-3 self-center flex flex-row gap-1.5 items-center max-sm:p-[10px]"
            @click="showModal('formLabel', null)"
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
            <p class="text-sm">Add Label</p>
          </button>
        </div>

        <!-- Label List -->
        <div class="flex flex-col gap-4 w-full">
          <!-- Show Content -->
          <div class="relative overflow-x-auto">
            <table class="w-full text-sm text-left text-gray-500">
              <thead
                class="text-xs text-gray-700 uppercase bg-gray-100 sticky inset-0"
              >
                <tr>
                  <th scope="col" class="px-6 py-3">Name</th>
                  <th scope="col" class="px-6 py-3">Linked Disease</th>
                  <th scope="col" class="px-6 py-3"></th>
                </tr>
              </thead>
              <tbody class="overflow-y-auto">
                <tr
                  class="bg-white border-b hover:bg-gray-50"
                  v-for="(item, index) in listLabel"
                  :key="item.label.id"
                >
                  <th
                    scope="row"
                    class="px-6 py-4 text-gray-900 whitespace-nowrap"
                  >
                    <div class="text-base font-semibold">
                      {{ item.label.name }}
                    </div>
                  </th>
                  <!-- Linked Disease -->
                  <td class="px-6 py-4">
                    <!-- Linked Disease -->
                    <div class="flex flex-col gap-1" v-if="item.linked_disease">
                      <div
                        class="flex gap-2 p-2 items-center border border-gray-200 rounded-md hover:border-gray-300"
                      >
                        <!-- Images -->
                        <img
                          :src="
                            item.linked_disease.image
                              ? imgUrl + item.linked_disease.image
                              : ''
                          "
                          alt=""
                          class="w-[40px] h-[40px] object-cover rounded-sm"
                          v-if="item.linked_disease.image"
                        />

                        <div
                          class="w-[40px] h-[40px] flex justify-center items-center bg-gray-200 rounded-sm"
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

                        <!-- Title -->
                        <div
                          class="text-md text-gray-900 font-medium line-clamp-2 w-full"
                        >
                          {{ item.linked_disease.name }}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-4 w-4">
                    <!-- Modal toggle -->
                    <div
                      class="font-semibold text-primary-1 cursor-pointer"
                      @click="showModal('formLabel', item.label.id)"
                    >
                      Edit
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Try It! Headline -->
        <div class="flex justify-between">
          <h1 class="font-bold text-2xl text-dark self-center py-1">Try It!</h1>
        </div>

        <!-- Detection -->
        <div class="flex flex-col gap-4 w-full" v-if="!detectionResult">
          <InputImage v-model="image" />
          <button
            type="button"
            class="btn btn-primary p-3 self-center flex flex-row gap-1.5 items-center max-sm:p-[10px]"
            @click="detect"
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
                d="M7.5 3.75H6A2.25 2.25 0 003.75 6v1.5M16.5 3.75H18A2.25 2.25 0 0120.25 6v1.5m0 9V18A2.25 2.25 0 0118 20.25h-1.5m-9 0H6A2.25 2.25 0 013.75 18v-1.5M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <p class="text-sm">Detect Now!</p>
          </button>
        </div>

        <!-- Detection Result -->
        <div class="flex flex-col gap-4 w-full card p-0" v-else>
          <div
            class="flex gap-4 items-center justify-between card p-0 bg-white pb-6"
          >
            <!-- Success -->
            <table
              class="w-full text-sm text-left text-gray-500"
              v-if="detectionMeta.status == 'success'"
            >
              <tbody class="overflow-y-auto">
                <!-- Detection -->
                <tr class="bg-white border-b">
                  <!-- Image -->
                  <th scope="row" class="px-6 py-4 text-gray-900">
                    <div class="flex gap-4 items-center">
                      <!-- Image -->
                      <img
                        :src="
                          detectionResult.detection.image
                            ? imgUrl + detectionResult.detection.image
                            : ''
                        "
                        alt=""
                        class="aspect-video max-sm:w-[80px] h-[80px] object-cover rounded-md"
                        v-if="detectionResult.detection.image"
                      />

                      <div class="flex flex-col gap-1.5">
                        <!-- Plant Name -->
                        <div class="text-base font-semibold">
                          {{ detectionResult.detection.plant.name }}
                        </div>

                        <!-- Created At -->
                        <div class="flex gap-1.5 items-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            class="w-5 h-5 fill-gray-400 max-sm:hidden"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-13a.75.75 0 00-1.5 0v5c0 .414.336.75.75.75h4a.75.75 0 000-1.5h-3.25V5z"
                              clip-rule="evenodd"
                            />
                          </svg>

                          <div
                            class="font-normal text-gray-500 flex flex-wrap gap-x-1.5"
                          >
                            <div class="whitespace-nowrap">
                              {{
                                detectionResult.detection.created_at.split(
                                  ' '
                                )[0]
                              }}
                            </div>
                            <div>
                              {{
                                detectionResult.detection.created_at.split(
                                  ' '
                                )[1]
                              }}
                            </div>
                          </div>
                        </div>

                        <!-- Username -->
                        <div
                          class="font-normal text-gray-500 flex gap-1.5 items-center"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            class="w-5 h-5 fill-gray-400 max-sm:hidden"
                          >
                            <path
                              d="M10 8a3 3 0 100-6 3 3 0 000 6zM3.465 14.493a1.23 1.23 0 00.41 1.412A9.957 9.957 0 0010 18c2.31 0 4.438-.784 6.131-2.1.43-.333.604-.903.408-1.41a7.002 7.002 0 00-13.074.003z"
                            />
                          </svg>
                          <div>
                            {{ detectionResult.detection.user.username }}
                          </div>
                        </div>
                      </div>
                    </div>
                  </th>

                  <!-- Result -->
                  <td class="px-6 py-4">
                    <div class="flex flex-col gap-1">
                      <div
                        :class="
                          detectionResult.detection.result == 'error'
                            ? 'text-red-600'
                            : 'text-green-600'
                        "
                      >
                        {{ detectionResult.detection.result }}
                      </div>
                      <div class="">
                        {{ detectionResult.detection.confidence }}
                      </div>
                    </div>
                  </td>

                  <!-- Linked Disease -->
                  <td class="px-6 py-4">
                    <!-- Linked Disease -->
                    <div
                      class="flex flex-col gap-1"
                      v-if="detectionResult.disease"
                    >
                      <div
                        class="flex gap-2 p-2 items-center border border-gray-200 rounded-md hover:border-gray-300"
                      >
                        <!-- Images -->
                        <img
                          :src="
                            detectionResult.disease.image
                              ? imgUrl + detectionResult.disease.image
                              : ''
                          "
                          alt=""
                          class="w-[40px] h-[40px] object-cover rounded-sm max-sm:hidden"
                          v-if="detectionResult.disease.image"
                        />

                        <div
                          class="w-[40px] h-[40px] flex justify-center items-center bg-gray-200 rounded-sm"
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

                        <!-- Title -->
                        <div
                          class="text-md text-gray-900 font-medium line-clamp-2 w-full"
                        >
                          {{ detectionResult.disease.name }}
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>

            <!-- Error -->
            <div
              class="bg-white border-b w-full px-6 py-6 flex gap-4 items-center justify-center"
              v-else
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="w-12 h-12 fill-yellow-400"
              >
                <path
                  fill-rule="evenodd"
                  d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
                  clip-rule="evenodd"
                />
              </svg>

              <div class="flex flex-col gap-1.5 text-red-600 font-semibold">
                {{ detectionMeta.message }}
              </div>
            </div>

            <!-- Try Again -->
            <button
              type="button"
              class="btn btn-secondary p-3 self-center flex flex-row gap-1.5 items-center max-sm:p-[10px]"
              @click="
                detectionResult = null
                image = null
              "
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
                  d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                />
              </svg>
              <p class="text-sm">Try Again</p>
            </button>
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
        class="w-[450px] max-md:w-[90%] card p-4 bg-white overflow-y-auto shadow-lg max-h-[90%]"
        @click.stop
      >
        <FormPlant
          class=""
          :plant_id="plant_id"
          @close-form="closeModal"
          v-if="modalType == 'formPlant'"
        />

        <FormLabel
          class=""
          :label_id="label_id"
          @close-form="closeModal"
          v-if="modalType == 'formLabel'"
        />
      </div>
    </div>
  </main>
</template>

<script>
export default {
  layout: 'LayoutDashboard',
  middleware: 'admin',
  data() {
    return {
      imgUrl: process.env.imgUrl,
      plant: [],
      labels: [],

      labelsWithLinkedDisease: [],

      // Plant
      plant_id: null,

      // Detection
      image: null,
      detectionMeta: null,
      detectionResult: null,

      modal: false,
      modalType: null,

      // Edit Label
      label_id: null,
    }
  },
  async fetch() {
    this.detectionMeta = null
    this.detectionResult = null

    this.labelsWithLinkedDisease = []

    this.plant_id = this.$route.params.id

    const resPlant = await this.$axios.get(`/api/plant/${this.plant_id}`)
    this.plant = resPlant.data.result.plant

    const resLabels = await this.$axios.get(`/api/plant/${this.plant_id}/label`)
    this.labels = resLabels.data.result.labels

    this.modalType = null

    // Linked Disease
    for (let i = 0; i < this.labels.length; i++) {
      const resLinkedDisease = await this.$axios.get('/api/disease', {
        params: {
          tag: this.labels[i].name,
        },
      })

      const item = {
        label: this.labels[i],
        linked_disease: resLinkedDisease.data.result.disease,
      }

      this.labelsWithLinkedDisease.push(item)
    }
  },
  computed: {
    listLabel() {
      return this.labelsWithLinkedDisease
    },
  },
  methods: {
    // Open Modal
    showModal(modalType, id) {
      this.modal = true
      this.modalType = modalType
      this.label_id = id
    },

    // Close Modal
    closeModal() {
      this.modal = false
      this.modalType = null
      this.label_id = null
    },

    // Detect
    async detect() {
      let detectionData = new FormData()

      detectionData.append('plant_id', this.plant_id)
      detectionData.append('image', this.image)

      try {
        const resDetect = await this.$axios.post(
          '/api/detection',
          detectionData
        )

        this.detectionMeta = resDetect.data.meta
        this.detectionResult = resDetect.data.result
      } catch (error) {
        this.detectionMeta = error.response.data.meta
        this.detectionResult = 'error'
      }
    },
  },
}
</script>
