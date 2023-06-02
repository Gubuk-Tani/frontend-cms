<template>
  <!-- Form Container -->
  <div class="w-full" @click.stop>
    <!-- Form Content -->
    <form
      class="w-full form-container p-[24px] h-full"
      @submit.prevent="changeEndpoint"
    >
      <div class="flex justify-center mb-1">
        <h1 class="font-bold text-dark">Change Endpoint</h1>
      </div>

      <!-- Name -->
      <div class="form-group">
        <label for="" class="input-label required">Endpoint URL</label>

        <input
          type="text"
          class="input-field"
          placeholder="Label Name"
          v-model="endpoint"
        />
      </div>

      <!-- Button -->
      <div class="flex flex-row gap-4 justify-between mt-[14px]">
        <div class="flex flex-row gap-4 self-start">
          <button type="submit" class="btn btn-primary">Save Changes</button>
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
      endpoint: null,

      // Validation
      validation: [],
    }
  },
  async fetch() {
    await this.$store.dispatch('getSettings')
    this.endpoint = this.$store.state.settings.ml_endpoint
  },
  methods: {
    // Create or Update Label
    async changeEndpoint() {
      let data = new FormData()

      data.append('key', 'ml_endpoint')
      data.append('value', this.endpoint)

      try {
        let response = []

        if (!this.$store.state.settings.ml_endpoint) {
          // Create
          response = await this.$axios.post('/api/setting', data)
        } else {
          // Update
          data.append('_method', 'PUT')
          response = await this.$axios.post('/api/setting/update', data)
        }

        this.label_id = null
        this.$emit('close-form')
        this.$fetch()
      } catch (error) {
        this.validation = error.response.data
      }
    },
  },
}
</script>
