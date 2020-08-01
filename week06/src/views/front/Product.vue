<template>
  <div class="container">
    <loading :active.sync="isLoading"></loading>
    <h2 class="mb-5">{{ product.title }}</h2>
    <div class="img-wrap mb-3">
      <img :src="product.imageUrl[0]" class="img-fluid" alt />
    </div>

    <p>{{ product.content }}</p>
    <p>{{ product.description }}</p>
    <div class="d-flex justify-content-between align-items-baseline">
      <div>
        <del>原價 {{ product.origin_price | money }}</del>
      </div>
      <div class="text-info">
        現在只要
        <span class="h4">{{ product.price | money }}</span>
      </div>
    </div>
    <select v-model="product.quantity" name class="form-control mt-3">
      <option value="0" disabled selected>請選擇人數</option>
      <option v-for="quantity in 10" :key="quantity" :value="quantity"
        >選擇 {{ quantity }} 位</option
      >
    </select>
    <div class="d-flex justify-content-between align-items-center mt-3">
      <div v-if="product.quantity" class="text-muted text-nowrap mr-3">
        小計
        <strong>{{ product.quantity * product.price || 0 | money }}</strong> 元
      </div>
      <button
        type="button"
        class="btn btn-info"
        @click="addToCart(product.id, product.quantity)"
      >
        <span
          v-if="product.id === status.loadingItem"
          class="spinner-border spinner-border-sm"
          role="status"
          aria-hidden="true"
        ></span>
        <span v-else>
          <font-awesome-icon icon="shopping-cart" />
        </span>
        加到購物車
      </button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isLoading: false,
      product: {
        imageUrl: [],
        quantity: 1
      },
      status: {
        loadingItem: ''
      }
    };
  },
  methods: {
    addToCart(id, quantity = 1) {
      this.isLoading = true;
      const api = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/ec/shopping`;
      const newCart = {
        product: id,
        quantity
      };
      this.$http
        .post(api, newCart)
        .then(() => {
          this.isLoading = false;
          // this.getCart();
          this.$emit('togetcart');
        })
        .catch(err => {
          this.isLoading = false;
          alert(err.response.data.errors[0]);
          // response 為 axios 回傳的固有寫法
          // alert(err.response.data.errors[0]);
          console.log(err.response);
        });
    }
  },
  created() {
    this.isLoading = true;
    // 屬性 $route
    // 方法 $router
    // 取得網址上帶進來的 id
    console.log(this.$route.params.id);

    // ↓ es6 的寫法，Airbnb 的模式下必須寫 es6 才不會報錯
    const { id } = this.$route.params;
    this.$http
      .get(
        `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/ec/product/${id}`
      )
      .then(res => {
        this.isLoading = false;
        this.product = res.data.data;
        this.$set(this.product, 'quantity', 1);
      })
      .catch(err => {
        this.isLoading = false;
        console.log(err);
      });
  }
};
</script>
