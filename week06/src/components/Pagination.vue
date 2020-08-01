<template>
  <nav aria-label="Page navigation example">
    <ul class="pagination mx-auto">
      <li class="page-item" :class="{ disabled: pages.current_page === 1 }">
        <a
          class="page-link"
          href="#"
          aria-label="Previous"
          @click.prevent="pageUpdate(pages.current_page - 1)"
        >
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      <li
        :class="{ active: page === pages.current_page }"
        class="page-item"
        v-for="page in pages.total_pages"
        :key="page.current_page"
      >
        <a class="page-link" href="#" @click.prevent="pageUpdate(page)">{{
          page
        }}</a>
      </li>
      <li
        class="page-item"
        :class="{ disabled: pages.current_page === pages.total_pages }"
      >
        <a
          class="page-link"
          href="#"
          aria-label="Next"
          @click.prevent="pageUpdate(pages.current_page + 1)"
        >
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>
</template>
<script>
export default {
  props: ['pages'],
  methods: {
    pageUpdate(page) {
      this.$emit('emitpage', page);
    }
  }
};
</script>
<style lang="scss" scoped>
.page-item.active .page-link {
  background-color: #17a2b8;
  border-color: #17a2b8;
}
</style>
