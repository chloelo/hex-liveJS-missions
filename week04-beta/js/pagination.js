Vue.component('pagination', {
  template: `
  <nav aria-label="Page navigation exampl">
    <ul class="pagination mx-auto">
      <li class="page-item" :class="{disabled:outerPages.current_page ===1 }">
        <a class="page-link" href="#" aria-label="Previous"
          @click.prevent="pageProducts(outerPages.current_page - 1)">
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      <li class="page-item" :class="{active:outerPages.current_page === idx+1}"
        v-for=" (item,idx) of outerPages.total_pages" :key="idx+1">
        <a class="page-link" href="#" @click.prevent="pageProducts(idx +1)">{{idx +1}}</a>
      </li>
      <li class="page-item" :class="{disabled:outerPages.current_page === outerPages.total_pages}">
        <a class="page-link" href="#" aria-label="Next"
          @click.prevent="pageProducts(outerPages.current_page + 1)">
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>
  `,
  props: [
    'outerPages',
  ],
  data () {
    return {

    }
  },
  methods: {
    pageProducts (item) {
      this.$emit('emit-page', item);
    }
  },
})