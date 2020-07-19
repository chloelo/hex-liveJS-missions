import pagination from './pagination.js';
import { productModal, productModalDel } from './modals.js';

Vue.component('pagination', pagination);
Vue.component('product-modal', productModal);
Vue.component('product-modal-del', productModalDel);
const app = new Vue({
  el: '#app',
  data: {
    token: '',
    uuid: '27645507-6c88-4d1b-816f-1587210ac2be',
    url: 'https://course-ec-api.hexschool.io/api',
    products: [
      // {
      //   id: '',
      //   title: '',
      //   category: '',
      //   content: '',
      //   description: '',
      //   imageUrl: [],
      //   enabled: true,
      //   origin_price: 0,
      //   price: 0,
      //   unit: "",
      //   options: {
      //   },
      // },
    ],
    pagination: {},
    tempProduct: {
      // 第二層結構要先定義，才能雙向綁定
      imageUrl: [],
    },
    isNew: false,
    btnLoading: '',
  },
  methods: {
    signout () {
      // 清除 Token
      document.cookie = `hexToken=; expires=; path=/`;
      location.href = "login.html";
    },
    // 預設取得第一頁
    getProducts (page = 1) {
      const api = `${this.url}/${this.uuid}/admin/ec/products?page=${page}`;
      axios.get(api)
        .then(res => {
          this.products = res.data.data;
          this.pagination = res.data.meta.pagination;
          if (this.tempProduct.id || this.isNew) {
            $('#productModal').modal('hide');
            $('#delProductModal').modal('hide');
            this.tempProduct = {
              imageUrl: [],
            };
          }
        })
        .catch(err => {
          console.log(err);
        })
    },
    openModal (status, item) {
      switch (status) {
        case 'new':
          this.tempProduct = {
            imageUrl: [],
          };
          this.isNew = true;
          $('#productModal').modal('show');
          break;
        case 'edit':
          this.isNew = false;
          this.btnLoading = item.id;
          const api = `${this.url}/${this.uuid}/admin/ec/product/${item.id}`;
          axios.get(api)
            .then(res => {
              this.btnLoading = '';
              this.tempProduct = res.data.data
              $('#productModal').modal('show');
            }).catch(err => {
              this.btnLoading = '';
              console.log(err);
            })
          break;
        case 'del':
          this.tempProduct = JSON.parse(JSON.stringify(item));
          $('#delProductModal').modal('show');
          break;
        default:
          break;
      }
    },


  },
  created () {
    // 將 token 從 cookie 取出，存到 vue 裡
    this.token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    // 後台 api 都要驗證，宣告在created 就不用多次重覆把 token 帶入 headers  
    axios.defaults.headers.common.Authorization = `Bearer ${this.token}`;
    if (!this.token) window.location = "login.html";
    this.getProducts();
  },
});