<template>
  <!-- Form Container -->
  <div class="w-full" @click.stop>
    <!-- Form Content -->
    <div class="w-full form-container p-[24px] h-full">
      <div class="flex justify-center mb-1">
        <h1 class="font-bold text-dark">Select Linked Article</h1>
      </div>

      <!-- Search -->
      <div class="flex justify-between w-full">
        <div class="relative w-full">
          <div
            class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
          >
            <svg
              class="w-5 h-5 text-gray-500"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </div>
          <input
            type="text"
            id="table-search-diseases"
            class="block p-2 pl-10 text-sm text-gray-900 w-full h-full input-field"
            placeholder="Search for articles"
            v-model="query.search"
            v-on:keyup.enter="$fetch()"
          />
        </div>
      </div>

      <!-- Article List -->
      <div class="flex flex-col gap-4 w-full">
        <!-- Show Content -->
        <div
          class="overflow-x-auto flex flex-wrap max-sm:flex-col gap-5 justify-between pb-4"
        >
          <div
            class="bg-white rounded-md overflow-clip p-0 w-[200px] flex-grow max-sm:w-full cursor-pointer shadow-sm hover:shadow-lg"
            v-for="item in listArticles"
            @click="selectLinkedArticle(item.id)"
          >
            <div>
              <!-- Images -->
              <img
                :src="
                  item.article_images.length > 0
                    ? imgUrl + item.article_images[0].image
                    : ''
                "
                alt=""
                class="w-full h-[150px] object-cover"
                v-if="item.article_images[0]"
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
                {{ item.title }}
              </div>

              <!-- Content -->
              <div class="text-sm text-gray-400 line-clamp-2">
                {{ item.content }}
              </div>
            </div>
          </div>
        </div>

        <!-- Pagination -->
        <nav
          class="flex items-center justify-between pt-4"
          aria-label="Table navigation"
        >
          <span class="text-sm font-normal text-gray-500"
            >Showing
            <span class="font-semibold text-gray-900"
              >{{ articles.from ? articles.from : 0 }} -
              {{ articles.to ? articles.to : 0 }}</span
            >
            of
            <span class="font-semibold text-gray-900">{{
              articles.total
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
  </div>
</template>

<script>
export default {
  props: {
    disease_id: null,
  },
  data() {
    return {
      imgUrl: process.env.imgUrl,
      articles: [],

      // Disease
      disease: {
        name: null,
        description: null,
        tags: null,
        image: null,
        article_id: null,
      },

      // Options
      query: {
        type: '',
        search: null,
        limit: 10,
        page: 1,
      },

      current_image: null,
    }
  },
  async fetch() {
    // Get Articles
    this.query.type = 'disease'

    const query = {}

    for (const [key, value] of Object.entries(this.query)) {
      if (value) {
        query[key] = value
      }
    }

    const resArticles = await this.$axios.get('/api/article', {
      params: query,
    })

    this.articles = resArticles.data.result
    this.query.page = this.articles.current_page

    // Get Disease
    if (this.disease_id) {
      // For Update
      const resDisease = await this.$axios.get(
        `/api/disease/${this.disease_id}`
      )

      this.disease.name = resDisease.data.result.disease.name
      this.disease.description = resDisease.data.result.disease.description
      this.disease.image = resDisease.data.result.disease.image

      let tags = []

      for (const item of resDisease.data.result.disease.tags) {
        tags.push(item.tag.tag)
      }

      this.disease.tags = tags.join(', ')

      this.current_image = this.disease.image
    }
  },
  computed: {
    // Get article list
    listArticles() {
      return this.articles.data
    },

    // Get page list
    listPages() {
      return this.articles.links
    },
  },
  methods: {
    // Select Linked Article
    async selectLinkedArticle(id) {
      this.disease.article_id = id

      let data = new FormData()

      for (const [key, value] of Object.entries(this.disease)) {
        if (key == 'image') {
          continue
        }

        if (value) {
          data.append('disease[' + key + ']', value)
        }
      }

      try {
        let response = []

        // Update
        data.append('_method', 'PUT')

        response = await this.$axios.post(
          `/api/disease/${this.disease_id}`,
          data
        )

        this.disease_id = null
        this.$emit('close-form')
        this.refreshData()
      } catch (error) {
        this.validation = error.response.data
      }
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
      if (this.query.page != this.articles.last_page) {
        this.query.page = this.query.page + 1
        this.$fetch()
      }
    },

    // Refresh Data
    refreshData() {
      this.$nuxt.refresh()
    },
  },
}
</script>
