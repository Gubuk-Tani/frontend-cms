<template>
  <!-- Form Container -->
  <div class="w-full" @click.stop>
    <!-- Form Content -->
    <form
      class="w-full form-container p-[24px] h-full"
      @submit.prevent="createOrUpdateArticle"
    >
      <div class="flex justify-center mb-1">
        <h1 class="font-bold text-dark">
          {{ article_id ? 'Edit' : 'Add' }} Article
        </h1>
      </div>

      <!-- Type -->
      <div class="form-group">
        <label for="" class="input-label required">Article Type</label>

        <select class="input-field" v-model="article.type">
          <option value="community">Community</option>
          <option value="disease">Disease</option>
          <option value="pesticide">Pesticide</option>
        </select>

        <!-- Validation -->
        <p class="text-red-500 text-xs italic" v-if="validation.errors?.type">
          {{ validation.errors?.type[0] }}
        </p>
      </div>

      <!-- Title -->
      <div class="form-group">
        <label for="" class="input-label required">Title</label>

        <input
          type="text"
          class="input-field"
          placeholder="Full Name"
          v-model="article.title"
        />

        <!-- Validation -->
        <p class="text-red-500 text-xs italic" v-if="validation.errors?.title">
          {{ validation.errors?.title[0] }}
        </p>
      </div>

      <!-- Content -->
      <div class="form-group">
        <label for="" class="input-label required">Content</label>

        <textarea
          class="input-field h-[300px]"
          placeholder="Type article content here..."
          v-model="article.content"
        >
        </textarea>

        <!-- Validation -->
        <p
          class="text-red-500 text-xs italic"
          v-if="validation.errors?.content"
        >
          {{ validation.errors?.content[0] }}
        </p>
      </div>

      <!-- Tags -->
      <div class="form-group">
        <label for="" class="input-label">Tags</label>

        <textarea
          class="input-field h-[60px]"
          placeholder="Type tags here separate with comma..."
          v-model="article.tags"
        >
        </textarea>

        <!-- Validation -->
        <p class="text-red-500 text-xs italic" v-if="validation.errors?.tags">
          {{ validation.errors?.tags[0] }}
        </p>
      </div>

      <div
        class="flex gap-6 max-sm:flex-col max-sm:gap-y-5 justify-between"
        v-if="article.images.length > 0"
      >
        <!-- Image 1 -->
        <div class="form-group flex-grow">
          <label for="" class="input-label">Image 1</label>
          <InputImage v-model="article.images[0]" />
        </div>

        <!-- Image 2 -->
        <div class="form-group flex-grow">
          <label for="" class="input-label">Image 2</label>
          <InputImage v-model="article.images[1]" />
        </div>

        <!-- Image 3 -->
        <div class="form-group flex-grow">
          <label for="" class="input-label">Image 3</label>
          <InputImage v-model="article.images[2]" />
        </div>
      </div>

      <!-- Button -->
      <div class="flex flex-row gap-4 justify-between mt-[14px]">
        <div class="flex flex-row gap-4 self-start">
          <button type="submit" class="btn btn-primary">
            {{ article_id ? 'Save Changes' : 'Add Article' }}
          </button>
          <button
            type="button"
            class="btn btn-secondary self-start"
            @click="
              article_id = null
              $emit('close-form')
            "
          >
            Cancel
          </button>
        </div>
        <button
          class="btn self-end btn-danger"
          type="button"
          @click="deleteArticle"
          v-if="article_id"
        >
          Delete
        </button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  props: {
    article_id: null,
  },
  data() {
    return {
      article: {
        type: null,
        title: null,
        content: null,
        tags: null,
        images: [],
      },

      current_images: [],

      // Validation
      validation: [],
    }
  },
  async fetch() {
    if (this.article_id) {
      // For Update
      const resArticle = await this.$axios.get(
        `/api/article/${this.article_id}`
      )

      this.article.type = resArticle.data.result.article.type
      this.article.title = resArticle.data.result.article.title
      this.article.content = resArticle.data.result.article.content

      let tags = []

      for (const item of resArticle.data.result.article.tags) {
        tags.push(item.tag.tag)
      }

      this.article.tags = tags.join(', ')

      for (const item of resArticle.data.result.article.article_images) {
        this.article.images.push(item.image)
        this.current_images.push(item)
      }

      if (this.article.images.length < 3) {
        const itemRemaining = 3 - this.article.images.length

        for (let i = 0; i < itemRemaining; i++) {
          this.article.images.push('')
        }
      }
    } else {
      // For Add
      this.article.type = 'community'
      this.article.title = null
      this.article.content = null
      this.article.tags = null

      this.article.images.push('')
      this.article.images.push('')
      this.article.images.push('')

      this.current_images = []
    }
  },
  watch: {
    // Re-Fetch Data
    article_id() {
      this.$fetch()
    },
  },
  methods: {
    // Update Article
    async createOrUpdateArticle() {
      try {
        let articleData = new FormData()

        for (const [key, value] of Object.entries(this.article)) {
          // Skip for update article
          if (this.article_id && key == 'images') {
            continue
          }

          // Image looping
          if (key == 'images') {
            for (let i = 0; i < value.length; i++) {
              if (typeof value[i] == 'string') {
                continue
              }

              // Create array
              articleData.append(key + '[' + i + ']', value[i])
            }
            continue
          }

          if (value) {
            articleData.append(key, value)
          }
        }

        // Article
        let response = []

        if (this.article_id) {
          // Update Article
          articleData.append('_method', 'PUT')

          response = await this.$axios.post(
            `/api/article/${this.article_id}`,
            articleData
          )
        } else {
          // Add Article
          response = await this.$axios.post('/api/article', articleData)
        }

        // Update Article Image
        if (this.article_id) {
          for (let i = 0; i < this.article.images.length; i++) {
            let imageData = new FormData()

            if (typeof this.article.images[i] == 'string') {
              continue
            }

            imageData.append('image', this.article.images[i])

            // Add image
            if (!this.current_images[i]) {
              await this.$axios.post(
                `/api/article/${this.article_id}/image`,
                imageData
              )
              continue
            }

            // Update Image
            imageData.append('_method', 'PUT')

            await this.$axios.post(
              `/api/article/${this.article_id}/image/${this.current_images[i].id}`,
              imageData
            )
          }
        }

        this.article_id = null
        this.$emit('close-form')
        this.refreshData()
      } catch (error) {
        this.validation = error.response.data
      }
    },

    // Delete Article
    async deleteArticle() {
      await this.$axios.delete(`/api/article/${this.article_id}`)

      this.article_id = null
      this.$emit('close-form')
      this.refreshData()
    },

    // Refresh Data
    refreshData() {
      this.$nuxt.refresh()
    },
  },
}
</script>
