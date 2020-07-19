
export default {
  template: `
  <nav aria-label="Page navigation example">
    <ul class="pagination ml-auto">
      <li class="page-item" :class="{disabled: pages.current_page === 1}">
        <a class="page-link" href="#" aria-label="Previous" @click.prevent="pageUpdate(pages.current_page - 1)">
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      <li :class="{active: page === pages.current_page }" class="page-item" v-for="page in pages.total_pages" :key="page.current_page">
        <a class="page-link" href="#"  @click.prevent="pageUpdate(page)">{{page}}</a>
      </li>
      <li class="page-item" :class="{disabled: pages.current_page === pages.total_pages}">
        <a class="page-link" href="#" aria-label="Next" @click.prevent="pageUpdate(pages.current_page + 1)">
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>
  `,
  data () {
    return {

    }
  },
  props: ['pages'],
  methods: {
    pageUpdate (page) {
      this.$emit('emitpage', page);
    }
  },
}