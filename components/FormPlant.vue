<template>
  <!-- Form Container -->
  <div class="w-full" @click.stop>
    <!-- Form Content -->
    <form
      class="w-full form-container p-[24px] h-full"
      @submit.prevent="createOrUpdatePlant"
    >
      <div class="flex justify-center mb-1">
        <h1 class="font-bold text-dark">
          {{ plant_id ? 'Edit' : 'Add' }} Plant
        </h1>
      </div>

      <!-- Name -->
      <div class="form-group">
        <label for="" class="input-label required">Plant Name</label>

        <input
          type="text"
          class="input-field"
          placeholder="Plant Name"
          v-model="plant.name"
        />

        <!-- Validation -->
        <p class="text-red-500 text-xs italic" v-if="validation.errors?.name">
          {{ validation.errors?.name[0] }}
        </p>
      </div>

      <!-- Image -->
      <div class="form-group flex-grow">
        <label for="" class="input-label">Image</label>
        <InputImage v-model="plant.image" />
      </div>

      <!-- Status -->
      <div class="form-group">
        <label for="" class="input-label required">Status</label>

        <select class="input-field" v-model="plant.status">
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>

        <!-- Validation -->
        <p class="text-red-500 text-xs italic" v-if="validation.errors?.status">
          {{ validation.errors?.status[0] }}
        </p>
      </div>

      <!-- Button -->
      <div class="flex flex-row gap-4 justify-between mt-[14px]">
        <div class="flex flex-row gap-4 self-start">
          <button type="submit" class="btn btn-primary">
            {{ plant_id ? 'Save Changes' : 'Add Plant' }}
          </button>
          <button
            type="button"
            class="btn btn-secondary self-start"
            @click="
              plant_id = null
              $emit('close-form')
            "
          >
            Cancel
          </button>
        </div>
        <button
          class="btn self-end btn-danger"
          type="button"
          @click="deletePlant"
          v-if="plant_id"
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
    plant_id: null,
  },
  data() {
    return {
      plant: {
        name: null,
        image: null,
        status: null,
      },

      current_image: null,

      // Validation
      validation: [],
    }
  },
  async fetch() {
    if (this.plant_id) {
      // For Update
      const resPlant = await this.$axios.get(`/api/plant/${this.plant_id}`)

      this.plant.name = resPlant.data.result.plant.name
      this.plant.image = resPlant.data.result.plant.image
      this.plant.status = resPlant.data.result.plant.status
    } else {
      // For Add
      this.plant.name = null
      this.plant.image = null
      this.plant.status = 'Active'
      this.current_images = null
    }
  },
  watch: {
    // Re-Fetch Data
    plant_id() {
      this.$fetch()
    },
  },
  methods: {
    // Create or Update Plant
    async createOrUpdatePlant() {
      let data = new FormData()

      for (const [key, value] of Object.entries(this.plant)) {
        if (key == 'image' && typeof value == 'string') {
          continue
        }

        if (value) {
          data.append(key, value)
        }
      }

      try {
        let response = []

        if (this.plant_id) {
          // Update
          data.append('_method', 'PUT')

          response = await this.$axios.post(`/api/plant/${this.plant_id}`, data)
        } else {
          // Add
          response = await this.$axios.post('/api/plant', data)
        }

        this.plant_id = null
        this.$emit('close-form')
        this.refreshData()
      } catch (error) {
        this.validation = error.response.data
      }
    },

    // Delete Plant
    async deletePlant() {
      await this.$axios.delete(`/api/plant/${this.plant_id}`)

      this.plant_id = null
      this.$emit('close-form')
      this.$router.push({ name: 'detections' })
    },

    // Refresh Data
    refreshData() {
      this.$nuxt.refresh()
    },
  },
}
</script>
