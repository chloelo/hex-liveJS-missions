// 匯入語系檔案
import zh_TW from './zh_TW.js';


Vue.component('loading', VueLoading);
// 將 VeeValidate input 驗證工具載入 作為全域註冊
Vue.component('ValidationProvider', VeeValidate.ValidationProvider);

// 將 VeeValidate 完整表單 驗證工具載入 作為全域註冊
Vue.component('ValidationObserver', VeeValidate.ValidationObserver);

// 加入至 VeeValidate 的設定檔案
VeeValidate.localize('tw', zh_TW);

// 驗證表單 Class 設定
VeeValidate.configure({
  classes: {
    valid: 'is-valid',
    invalid: 'is-invalid',
  }
});

// 千分號
Vue.filter('money', function (num) {
  let parts = num.toString().split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return `$${parts.join('.')}`
});


new Vue({
  el: '#app',
  data: {
    url: 'https://course-ec-api.hexschool.io/api',
    uuid: '27645507-6c88-4d1b-816f-1587210ac2be',
    products: [],
    tempProduct: {
      imageUrl: [],
      quantity: 1,
    },
    isLoading: false,
    status: {
      loadingItem: '',
    },
    carts: [],
    totalPrice: 0,
    totalQuantity: 0,
    order: {
      name: '',
      email: '',
      tel: '',
      address: '',
      payment: '',
      message: ''
    },
  },
  methods: {
    getProducts (page = 1) {
      this.isLoading = true;
      const api = `${this.url}/${this.uuid}/ec/products?page=${page}`;
      axios.get(api)
        .then((res) => {
          this.isLoading = false;
          this.products = res.data.data;
        }).catch((err) => {
          // 失敗時讀取畫面也要拿掉
          this.isLoading = false;
          console.log(err);
        })
    },
    getProduct (id) {
      this.status.loadingItem = id;
      const api = `${this.url}/${this.uuid}/ec/product/${id}`;
      axios.get(api)
        .then((res) => {
          this.status.loadingItem = '';
          this.tempProduct = res.data.data;
          this.$set(this.tempProduct, 'quantity', 1)

          $(this.$refs.modalProduct).modal('show');
        }).catch((err) => {
          this.status.loadingItem = '';
          console.log(err);
        })
    },
    getCart () {
      this.isLoading = true;
      const api = `${this.url}/${this.uuid}/ec/shopping`;
      axios.get(api)
        .then((res) => {
          this.isLoading = false;
          this.carts = res.data.data;
          this.tempProduct = {
            imageUrl: [],
            quantity: 1,
          };
          this.totalPrice = 0;
          this.totalQuantity = 0;
          // 計算總金額
          this.carts.forEach(item => {
            this.totalPrice += item.product.price * item.quantity;
            this.totalQuantity += item.quantity;
          });

        }).catch((err) => {
          this.isLoading = false;
          console.log(err);
        })
    },
    updateQuantity (id, quantity) {
      if (quantity < 1) return;

      const api = `${this.url}/${this.uuid}/ec/shopping`;
      const editCart = {
        product: id,
        quantity,
      };
      axios.patch(api, editCart)
        .then(() => {
          this.getCart();
        }).catch((err) => {
          console.log(err);
        })
    },
    addToCart (id, quantity = 1) {
      this.isLoading = true;
      const api = `${this.url}/${this.uuid}/ec/shopping`;
      const newCart = {
        product: id,
        quantity
      };
      axios.post(api, newCart)
        .then(() => {
          this.isLoading = false;
          this.getCart();
          $(this.$refs.modalProduct).modal('hide');
        }).catch((err) => {
          this.isLoading = false;
          $(this.$refs.modalProduct).modal('hide');
          // response 為 axios 回傳的固有寫法
          alert(err.response.data.errors[0])
          // console.log(err.response);
        })
    },
    removeCart (id) {
      const api = `${this.url}/${this.uuid}/ec/shopping/${id}`;
      axios.delete(api)
        .then(() => {
          this.getCart();
        }).catch((err) => {
          console.log(err);
        })
    },
    removeAllCart () {
      const api = `${this.url}/${this.uuid}/ec/shopping/all/product`;
      axios.delete(api)
        .then(() => {
          this.carts = {};
          this.getCart();
        }).catch((err) => {
          console.log(err);
        })
    },
    createOrder () {
      this.isLoading = true;
      const api = `${this.url}/${this.uuid}/ec/orders`;
      axios.post(api, this.order)
        .then((res) => {
          this.isLoading = false;
          this.order = {
            name: '',
            email: '',
            tel: '',
            address: '',
            payment: '',
            message: ''
          }
          alert('您已完成訂單，我們會盡快與您聯繫，謝謝。')
        }).catch((err) => {
          this.isLoading = false;
          console.log(err);
        })
    }
  },
  mounted () {
    this.getProducts();
    this.getCart();
  },
})