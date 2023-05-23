<template>
  <!-- Image -->
  <div>
    <!-- Image Preview -->
    <div
      class="flex flex-col justify-center w-full input-field bg-gray-50 gap-4 p-5"
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
          class="btn btn-secondary p-3 self-center flex flex-row gap-1.5 items-center max-sm:p-[10px]"
          @click="
            change_image = true
            preview_image = false
          "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="w-5 h-5 fill-white"
          >
            <path
              d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32l8.4-8.4z"
            />
            <path
              d="M5.25 5.25a3 3 0 00-3 3v10.5a3 3 0 003 3h10.5a3 3 0 003-3V13.5a.75.75 0 00-1.5 0v5.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5V8.25a1.5 1.5 0 011.5-1.5h5.25a.75.75 0 000-1.5H5.25z"
            />
          </svg>
          <p class="text-sm">Change</p>
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
        <div class="flex flex-col items-center justify-center pt-5 pb-6 px-5">
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
          <p class="mb-2 text-sm text-gray-500 text-center dark:text-gray-400">
            <span class="font-semibold">Click to upload</span>
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
