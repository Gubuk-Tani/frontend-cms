<template>
  <!-- Main -->
  <main
    class="ml-[220px] max-lg:ml-[88px] max-md:ml-0 max-w-[100%] flex justify-center my-[60px] p-[24px] ease-in-out duration-200 max-md:flex-col max-md:mb-[88px]"
  >
    <!-- Content -->
    <section
      class="flex flex-row justify-between gap-6 flex-grow max-md:max-w-none"
    >
      <div class="flex flex-col gap-8 w-full">
        <!-- Headline -->
        <div class="flex justify-between">
          <h1 class="text-[24px] font-bold text-dark self-center py-1">
            User List
          </h1>
          <button
            class="btn btn-primary p-3 self-center flex flex-row gap-1.5 items-center max-sm:p-[10px]"
            @click="showForm(null)"
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
            <p class="max-sm:hidden text-sm">Add User</p>
          </button>
        </div>

        <!-- User List -->
        <div class="flex flex-col gap-4 w-full">
          <!-- Show Content -->
          <div class="relative overflow-x-auto h-[500px]">
            <table class="w-full text-sm text-left text-gray-500">
              <thead
                class="text-xs text-gray-700 uppercase bg-gray-100 sticky inset-0"
              >
                <tr>
                  <th scope="col" class="px-6 py-3">Id</th>
                  <th scope="col" class="px-6 py-3">Name</th>
                  <th scope="col" class="px-6 py-3">Email</th>
                  <th scope="col" class="px-6 py-3">City</th>
                  <th scope="col" class="px-6 py-3">Action</th>
                </tr>
              </thead>
              <tbody class="overflow-y-auto">
                <tr
                  class="bg-white border-b hover:bg-gray-50"
                  v-for="(item, index) in listUsers"
                  :key="item.id"
                >
                  <td class="w-4 px-6 py-4">{{ item.id }}</td>
                  <th
                    scope="row"
                    class="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap"
                  >
                    <img
                      class="w-10 h-10 rounded-full"
                      :src="
                        item.avatar
                          ? process.env.imgUrl + item.avatar
                          : 'assets/images/user.png'
                      "
                      :alt="item.username + 'image'"
                    />
                    <div class="pl-3">
                      <div class="text-base font-semibold">{{ item.name }}</div>
                      <div class="font-normal text-gray-500">
                        {{ item.username }}
                      </div>
                    </div>
                  </th>
                  <td class="px-6 py-4">{{ item.email }}</td>
                  <td class="px-6 py-4">
                    {{ item.city ? item.city : '-' }}
                  </td>
                  <td class="px-6 py-4">
                    <!-- Modal toggle -->
                    <a
                      href="#"
                      type="button"
                      data-modal-target="editUserModal"
                      data-modal-show="editUserModal"
                      class="font-medium text-green-600"
                      >Edit user</a
                    >
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
              <span class="font-semibold text-gray-900">{{
                users.from + ' - ' + users.to
              }}</span>
              of
              <span class="font-semibold text-gray-900">{{
                users.total
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
                  class="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
                  v-if="!page.active && page.label == '&laquo; Previous'"
                  @click="previousPage()"
                >
                  &laquo;
                  <span class="max-sm:hidden"> Previous</span>
                </div>

                <!-- Next -->
                <div
                  class="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
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
  middleware: 'auth',
  layout: 'LayoutDashboard',
  data() {
    return {
      users: [],

      // Pagagination
      page: 1,
    }
  },
  async fetch() {
    const resUsers = await this.$axios.get('/api/users', {
      params: {
        limit: 20,
        page: this.page,
      },
    })

    this.users = resUsers.data.result
    this.page = this.users.current_page
  },
  computed: {
    // Get user list
    listUsers() {
      return this.users.data
    },

    // Get page list
    listPages() {
      return this.users.links
    },

    // Selected user
    selectedUser(user_id) {
      this.selected.push(user_id)
    },
  },
  methods: {
    // Change Page
    changePage(page) {
      this.page = page
      this.$fetch()
    },

    // Previous Page
    previousPage() {
      if (this.page != 1) {
        this.page = this.page - 1
        this.$fetch()
      }
    },

    // Next Page
    nextPage() {
      if (this.page != this.users.last_page) {
        this.page = this.page + 1
        this.$fetch()
      }
    },
  },
}
</script>
