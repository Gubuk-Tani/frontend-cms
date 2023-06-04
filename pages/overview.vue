<template>
  <!-- Main -->
  <main class="main-dashboard">
    <!-- Content -->
    <section
      class="flex flex-row justify-between gap-6 flex-grow max-md:max-w-none"
    >
      <div class="flex flex-col gap-8 max-sm:gap-6 w-full">
        <!-- Overview Headline -->
        <div class="flex justify-between items-center gap-4">
          <h1 class="font-bold text-2xl text-dark self-center py-1">
            Overview
          </h1>

          <!-- Range -->
          <select
            class="input-field"
            v-model="range"
            @input="showByRange($event.target.value)"
          >
            <option value="">All</option>
            <option value="1">Today</option>
            <option value="7">Last 1 Week</option>
            <option value="30">Last 1 Month</option>
            <option value="365">Last 1 Year</option>
          </select>
        </div>

        <!-- Summary -->
        <div class="flex flex-col gap-4">
          <!-- Cards -->
          <div
            class="flex flex-wrap flex-grow justify-between gap-4 flex-initial"
          >
            <!-- Product -->
            <NuxtLink :to="{ name: 'users' }" class="w-[300px] flex-grow">
              <CardOverview
                headline="Users Created"
                :value="overview.count_users"
                type="users"
              />
            </NuxtLink>

            <!-- Articles -->
            <NuxtLink :to="{ name: 'articles' }" class="w-[300px] flex-grow">
              <CardOverview
                headline="Articles Created"
                :value="overview.count_articles"
                type="articles"
              />
            </NuxtLink>

            <!-- Diseases -->
            <NuxtLink :to="{ name: 'diseases' }" class="w-[300px] flex-grow">
              <CardOverview
                headline="Diseases Created"
                :value="overview.count_diseases"
                type="diseases"
              />
            </NuxtLink>

            <!-- Detection Models -->
            <NuxtLink :to="{ name: 'detections' }" class="w-[300px] flex-grow">
              <CardOverview
                headline="Detection Models Created"
                :value="overview.count_plants"
                type="detection_models"
              />
            </NuxtLink>

            <!-- Detections -->
            <div class="w-[300px] flex-grow">
              <CardOverview
                headline="Detections Created"
                :value="overview.count_detections"
                type="detections"
              />
            </div>
          </div>
        </div>

        <!-- Todays Detections Headline -->
        <div class="flex justify-between items-center gap-4">
          <h1 class="font-bold text-2xl text-dark self-center py-1">
            Today's Detections
          </h1>
        </div>

        <!-- Detection List -->
        <div class="flex flex-col gap-4 w-full">
          <!-- Show Content -->
          <div class="relative overflow-x-auto h-[500px]">
            <table class="w-full text-sm text-left text-gray-500">
              <thead
                class="text-xs text-gray-700 uppercase bg-gray-100 sticky inset-0"
              >
                <tr>
                  <th scope="col" class="px-6 py-3">Detection</th>
                  <th scope="col" class="px-6 py-3">Result</th>
                  <th scope="col" class="px-6 py-3">Disease</th>
                </tr>
              </thead>
              <tbody class="overflow-y-auto">
                <tr
                  class="bg-white border-b hover:bg-gray-50"
                  v-for="(item, index) in listDetection"
                  :key="item.detection.id"
                >
                  <!-- Image -->
                  <th scope="row" class="px-6 py-4 text-gray-900">
                    <div class="flex gap-4 items-center">
                      <!-- Image -->
                      <img
                        :src="
                          item.detection.image
                            ? imgUrl + item.detection.image
                            : ''
                        "
                        alt=""
                        class="aspect-video max-sm:w-[80px] h-[80px] object-cover rounded-md"
                        v-if="item.detection.image"
                      />

                      <div class="flex flex-col gap-1.5">
                        <!-- Plant Name -->
                        <div class="text-base font-semibold">
                          {{ item.detection.plant.name }}
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
                              {{ item.detection.created_at.split(' ')[0] }}
                            </div>
                            <div>
                              {{ item.detection.created_at.split(' ')[1] }}
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
                          <div>{{ item.detection.user.username }}</div>
                        </div>
                      </div>
                    </div>
                  </th>

                  <!-- Result -->
                  <td class="px-6 py-4">
                    <div class="flex flex-col gap-1">
                      <div
                        :class="
                          item.detection.result == 'error'
                            ? 'text-red-600'
                            : 'text-green-600'
                        "
                      >
                        {{ item.detection.result }}
                      </div>
                      <div class="">{{ item.detection.confidence }}</div>
                    </div>
                  </td>

                  <!-- Linked Disease -->
                  <td class="px-6 py-4">
                    <!-- Linked Disease -->
                    <div class="flex flex-col gap-1" v-if="item.disease">
                      <div
                        class="flex gap-2 p-2 items-center border border-gray-200 rounded-md hover:border-gray-300"
                      >
                        <!-- Images -->
                        <img
                          :src="
                            item.disease.image
                              ? imgUrl + item.disease.image
                              : ''
                          "
                          alt=""
                          class="w-[40px] h-[40px] object-cover rounded-sm max-sm:hidden"
                          v-if="item.disease.image"
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
                          {{ item.disease.name }}
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Pagination -->
          <nav
            class="flex items-center justify-between pt-4"
            aria-label="Table navigation"
          >
            <span class="text-sm font-normal text-gray-500"
              >Showing
              <span class="font-semibold text-gray-900"
                >{{ detections.from ? detections.from : 0 }} -
                {{ detections.to ? detections.to : 0 }}</span
              >
              of
              <span class="font-semibold text-gray-900">{{
                detections.total
              }}</span></span
            >
            <ul class="inline-flex items-center -space-x-px">
              <li class="cursor-pointer" v-for="page in listPages">
                <!-- Inactive -->
                <div
                  class="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
                  v-if="
                    !page.active &&
                    page.label != '&laquo; Previous' &&
                    page.label != 'Next &raquo;'
                  "
                  @click="changePage(page.label)"
                >
                  {{ page.label }}
                </div>

                <!-- Active -->
                <div
                  aria-current="page"
                  class="z-10 px-3 py-2 leading-tight text-white border border-primary-1 bg-primary-1 hover:bg-primary-2 hover:text-white"
                  v-if="page.active"
                >
                  {{ page.label }}
                </div>

                <!-- Previous -->
                <div
                  class="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 rounded-l-md"
                  v-if="!page.active && page.label == '&laquo; Previous'"
                  @click="previousPage()"
                >
                  &laquo;
                  <span class="max-sm:hidden"> Previous</span>
                </div>

                <!-- Next -->
                <div
                  class="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 rounded-r-md"
                  v-if="!page.active && page.label == 'Next &raquo;'"
                  @click="nextPage()"
                >
                  <span class="max-sm:hidden">Next </span>
                  &raquo;
                </div>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
export default {
  middleware: 'admin',
  layout: 'LayoutDashboard',
  data() {
    return {
      imgUrl: process.env.imgUrl,
      overview: [],
      detections: [],

      detectionWithDisease: [],

      // Options
      range: '',

      query: {
        range: 'today',
        limit: 10,
        page: 1,
      },
    }
  },
  async fetch() {
    // Get Overview
    const resOverview = await this.$axios.get('/api/overview', {
      params: {
        range: this.range,
      },
    })

    this.overview = resOverview.data.result

    this.detectionWithDisease = []

    // Get Detections
    const resDetections = await this.$axios.get('/api/detection', {
      params: this.query,
    })

    this.detections = resDetections.data.result

    this.query.page = resDetections.data.result.current_page

    // Linked Disease
    for (let i = 0; i < this.detections.data.length; i++) {
      const resLinkedDisease = await this.$axios.get('/api/disease', {
        params: {
          tag: this.detections.data[i].result,
        },
      })

      const item = {
        detection: this.detections.data[i],
        disease: resLinkedDisease.data.result.disease,
      }

      this.detectionWithDisease.push(item)
    }
  },
  computed: {
    // Get detection list
    listDetection() {
      return this.detectionWithDisease
    },

    // Get page list
    listPages() {
      return this.detections.links
    },
  },
  methods: {
    // Show by Range
    showByRange(range) {
      this.range = range

      this.$fetch()
    },

    // Change Page
    changePage(page) {
      this.query.page = page
      this.$fetch()
    },

    // Previous Page
    previousPage() {
      if (this.query.page != 1) {
        this.query.page = this.query.page - 1
        this.$fetch()
      }
    },

    // Next Page
    nextPage() {
      if (this.query.page != this.detections.last_page) {
        this.query.page = this.query.page + 1
        this.$fetch()
      }
    },
  },
}
</script>
