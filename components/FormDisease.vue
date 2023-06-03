<template>
  <!-- Form Container -->
  <div class="w-full" @click.stop>
    <!-- Form Content -->
    <form
      class="w-full form-container p-[24px] h-full"
      @submit.prevent="createOrUpdateDisease"
    >
      <div class="flex justify-center mb-1">
        <h1 class="font-bold text-dark">
          {{ disease_id ? 'Edit' : 'Add' }} Disease
        </h1>
      </div>

      <!-- Name -->
      <div class="form-group">
        <label for="" class="input-label required">Name</label>

        <input
          type="text"
          class="input-field"
          placeholder="Disease Name"
          v-model="disease.name"
        />

        <!-- Validation -->
        <p class="text-red-500 text-xs italic" v-if="validation.errors?.name">
          {{ validation.errors?.name[0] }}
        </p>
      </div>

      <!-- Description -->
      <div class="form-group">
        <label for="" class="input-label required">Description</label>

        <textarea
          class="input-field h-[300px]"
          placeholder="Type disease content here..."
          v-model="disease.description"
        >
        </textarea>

        <!-- Validation -->
        <p
          class="text-red-500 text-xs italic"
          v-if="validation.errors?.description"
        >
          {{ validation.errors?.description[0] }}
        </p>
      </div>

      <!-- Tags -->
      <div class="form-group">
        <label for="" class="input-label">Tags</label>

        <textarea
          class="input-field h-[60px]"
          placeholder="Type tags here separate with comma..."
          v-model="disease.tags"
        >
        </textarea>

        <!-- Validation -->
        <p class="text-red-500 text-xs italic" v-if="validation.errors?.tags">
          {{ validation.errors?.tags[0] }}
        </p>
      </div>

      <!-- Image -->
      <div class="form-group flex-grow">
        <label for="" class="input-label">Image</label>
        <InputImage v-model="disease.image" />
      </div>

      <!-- Button -->
      <div class="flex flex-row gap-4 justify-between mt-[14px]">
        <div class="flex flex-row gap-4 self-start">
          <button type="submit" class="btn btn-primary">
            {{ disease_id ? 'Save Changes' : 'Add Disease' }}
          </button>
          <button
            type="button"
            class="btn btn-secondary self-start"
            @click="
              disease_id = null
              $emit('close-form')
            "
          >
            Cancel
          </button>
        </div>
        <button
          class="btn self-end btn-danger"
          type="button"
          @click="deleteDisease"
          v-if="disease_id"
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
    disease_id: null,
  },
  data() {
    return {
      disease: {
        name: null,
        description: null,
        tags: null,
        image: null,
      },

      current_image: null,

      // Validation
      validation: [],
    }
  },
  async fetch() {
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
    } else {
      // For Add
      this.disease.name = null
      this.disease.content = null
      this.disease.image = null
      this.disease.tags = null

      this.current_image = null
    }
  },
  watch: {
    // Re-Fetch Data
    disease_id() {
      this.$fetch()
    },
  },
  methods: {
    // Update Disease
    async createOrUpdateDisease() {
      let data = new FormData()

      for (const [key, value] of Object.entries(this.disease)) {
        if (key == 'image' && value == this.current_image) {
          continue
        }

        if (value) {
          data.append('disease[' + key + ']', value)
        }
      }

      try {
        let response = []

        if (this.disease_id) {
          // Update
          data.append('_method', 'PUT')

          response = await this.$axios.post(
            `/api/disease/${this.disease_id}`,
            data
          )
        } else {
          // Add
          response = await this.$axios.post('/api/disease', data)
        }

        this.disease_id = null
        this.$emit('close-form')
        this.refreshData()
      } catch (error) {
        this.validation = error.response.data
      }
    },

    // Delete Disease
    async deleteDisease() {
      await this.$axios.delete(`/api/disease/${this.disease_id}`)

      this.disease_id = null
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
