<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <section>
      <div class="container product_list">
        <div class="row">
          <div class="col-12">
            <nav class="sec_menu d-flex justify-content-around">
              <a href="#" class="all active">全部</a>
              <a href="#" class="asia">亞洲</a>
              <a href="#" class="africa">非洲</a>
              <a href="#" class="america">美洲</a>
              <a href="#" class="oceania">大洋洲</a>
            </nav>
          </div>
        </div>
        <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 mt-4 lists">
          <div class="col mb-4" v-for="product of products" :key="product.id">
            <div class="card">
              <div class="img_wrap">
                <img
                  :src="product.imageUrl[0]"
                  class="card-img-top"
                  alt="..."
                />
                <span class="badge badge-pill badge-warning">
                  {{ product.category }}
                </span>
              </div>
              <div class="card-body">
                <h5 class="card-title">{{ product.title }}</h5>
                <p>{{ product.content }}</p>
                <p
                  class="prices d-flex justify-content-between align-items-center"
                >
                  <span class="price_origin"
                    >{{ product.origin_price | money }}/人</span
                  >
                  <span class="price_discount"
                    >{{ product.price | money }}/人</span
                  >
                </p>
                <div class="btns d-flex justify-content-between mt-3">
                  <button
                    type="button"
                    class="btn btn-outline-secondary"
                    @click="getProduct(product.id)"
                    :disabled="product.id === status.loadingItem"
                  >
                    查看更多
                    <span
                      class="spinner-border spinner-border-sm"
                      role="status"
                      aria-hidden="true"
                      v-if="product.id === status.loadingItem"
                    ></span>
                  </button>
                  <button
                    type="button"
                    class="btn btn-info"
                    @click="addToCart(product.id)"
                  >
                    <span>
                      <font-awesome-icon icon="shopping-cart" />
                    </span>
                    加到購物車
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isLoading: false,
      products: [],
      status: {
        loadingItem: ''
      }
    };
  },
  created() {
    this.isLoading = true;
    this.$http
      .get(
        `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/ec/products`
      )
      .then(res => {
        this.isLoading = false;
        this.products = res.data.data;
      })
      .catch(err => {
        this.isLoading = false;
        console.log(err);
      });
  },
  methods: {
    getProduct(id) {
      this.$router.push(`/product/${id}`);
    },
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
          this.$emit('togetcart');
        })
        .catch(err => {
          this.isLoading = false;

          // response 為 axios 回傳的固有寫法
          alert(err.response.data.errors[0]);
          // console.log(err.response);
        });
    }
    // getCart () {
    //   this.isLoading = true;
    //   const api = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/ec/shopping`;
    //   this.$http
    //     .get(api)
    //     .then(res => {
    //       this.isLoading = false;
    //       this.carts = res.data.data;
    //       this.tempProduct = {
    //         imageUrl: [],
    //         quantity: 1
    //       };
    //       this.totalPrice = 0;
    //       this.totalQuantity = 0;
    //       // 計算總金額
    //       this.carts.forEach(item => {
    //         this.totalPrice += item.product.price * item.quantity;
    //         this.totalQuantity += item.quantity;
    //       });
    //     })
    //     .catch(err => {
    //       this.isLoading = false;
    //       console.log(err);
    //     });
    // }
  }
};
</script>
