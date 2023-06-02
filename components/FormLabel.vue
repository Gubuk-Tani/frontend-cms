<template>
  <!-- Form Container -->
  <div class="w-full" @click.stop>
    <!-- Form Content -->
    <form
      class="w-full form-container p-[24px] h-full"
      @submit.prevent="createOrUpdateLabel"
    >
      <div class="flex justify-center mb-1">
        <h1 class="font-bold text-dark">
          {{ label_id ? 'Edit' : 'Add' }} Label
        </h1>
      </div>

      <!-- Name -->
      <div class="form-group">
        <label for="" class="input-label required">Label Name</label>

        <input
          type="text"
          class="input-field"
          placeholder="Label Name"
          v-model="label.name"
        />

        <!-- Validation -->
        <p class="text-red-500 text-xs italic" v-if="validation.errors?.name">
          {{ validation.errors?.name[0] }}
        </p>
      </div>

      <!-- Button -->
      <div class="flex flex-row gap-4 justify-between mt-[14px]">
        <div class="flex flex-row gap-4 self-start">
          <button type="submit" class="btn btn-primary">
            {{ label_id ? 'Save Changes' : 'Add Label' }}
          </button>
          <button
            type="button"
            class="btn btn-secondary self-start"
            @click="
              label_id = null
              $emit('close-form')
            "
          >
            Cancel
          </button>
        </div>
        <button
          class="btn self-end btn-danger"
          type="button"
          @click="deleteLabel"
          v-if="label_id"
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
    label_id: null,
  },
  data() {
    return {
      label: {
        name: null,
      },

      // Plant
      plant_id: null,

      // Validation
      validation: [],
    }
  },
  async fetch() {
    this.plant_id = this.$route.params.id

    if (this.label_id) {
      // For Update
      const resLabel = await this.$axios.get(
        `/api/plant/${this.plant_id}/label/${this.label_id}`
      )

      this.label.name = resLabel.data.result.label.name
    } else {
      // For Add
      this.label.name = null
    }
  },
  watch: {
    // Re-Fetch Data
    label_id() {
      this.$fetch()
    },
  },
  methods: {
    // Create or Update Label
    async createOrUpdateLabel() {
      let data = new FormData()

      for (const [key, value] of Object.entries(this.label)) {
        if (value) {
          data.append(key, value)
        }
      }

      try {
        let response = []

        if (this.label_id) {
          // Update
          response = await this.$axios.put(
            `/api/plant/${this.plant_id}/label/${this.label_id}`,
            this.label
          )
        } else {
          // Add
          response = await this.$axios.post(
            `/api/plant/${this.plant_id}/label`,
            data
          )
        }

        this.label_id = null
        this.$emit('close-form')
        this.refreshData()
      } catch (error) {
        this.validation = error.response.data
      }
    },

    // Delete Label
    async deleteLabel() {
      await this.$axios.delete(
        `/api/plant/${this.plant_id}/label/${this.label_id}`
      )

      this.label_id = null
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
