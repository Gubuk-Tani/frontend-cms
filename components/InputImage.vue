<template>
  <!-- Image -->
  <div>
    <!-- Image Preview -->
    <div
      class="flex justify-center w-full input-field bg-gray-50 gap-4 p-5"
      v-if="value && !change_image"
    >
      <img
        :src="preview_image ? preview_image : imgUrl + value"
        alt=""
        class="w-[100px] rounded-[6px] object-cover aspect-square self-center"
      />
      <div class="self-center">
        <button
          type="button"
          class="btn btn-secondary"
          @click="
            change_image = true
            preview_image = false
          "
        >
          Change Image
        </button>
      </div>
    </div>

    <!-- Drop Image -->
    <div
      class="flex items-center justify-center w-full"
      v-if="(change_image || value == '' || value == null) && !preview_image"
    >
      <label
        for="dropzone-file"
        class="flex flex-col items-center justify-center w-full h-36 border-[1.45px] border-grey-60 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
      >
        <div class="flex flex-col items-center justify-center pt-5 pb-6">
          <svg
            aria-hidden="true"
            class="w-10 h-10 mb-3 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
            ></path>
          </svg>
          <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
            <span class="font-semibold">Click to upload</span> or drag and drop
          </p>
          <p class="text-xs text-gray-500 dark:text-gray-400">PNG or JPG</p>
        </div>
        <input
          id="dropzone-file"
          type="file"
          class="hidden"
          v-on:change="updateImage"
        />
      </label>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: null,
  },
  data() {
    return {
      // Image
      imgUrl: process.env.imgUrl,

      change_image: false,
      preview_image: null,
    }
  },
  methods: {
    // Update Image
    updateImage(event) {
      this.value = event.target.files[0]

      // Emit Value
      this.$emit('input', this.value)

      // Preview image
      let reader = new FileReader()
      reader.onload = (event) => {
        this.preview_image = event.target.result
      }

      reader.readAsDataURL(event.target.files[0])

      this.preview_image = true
      this.change_image = false
    },
  },
}
</script>
