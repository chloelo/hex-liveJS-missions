<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <header>
      <nav id="front-nav" class="navbar navbar-expand-lg navbar-light bg-light">
        <a class="navbar-brand">
          <img src="@/assets/images/logo.png" />
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item">
              <router-link class="nav-link" to="/">
                首頁
                <span class="sr-only">(current)</span>
              </router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/about">關於我們</router-link>
              <!-- <a class="nav-link" href="#">關於我們</a> -->
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/products">產品列表</router-link>
            </li>

            <li class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle nav-link-cart"
                href="#"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <span class="icon-cart-wrap">
                  <font-awesome-icon icon="shopping-cart" />
                  <span class="cart-num">{{ totalQuantity }}</span>
                </span>
              </a>
              <div
                class="cart-popup dropdown-menu dropdown-menu-right"
                aria-labelledby="navbarDropdownMenuLink"
              >
                <div class="table-responsive dropdown-cart-list">
                  <table class="table table-sm table-striped">
                    <caption>已選擇商品</caption>
                    <thead>
                      <tr>
                        <th scope="col">品名</th>
                        <th scope="col">數量</th>
                        <th scope="col">單價</th>
                      </tr>
                    </thead>
                    <tbody v-if="carts.length">
                      <tr v-for="item in carts" :key="item.product.id">
                        <td>{{ item.product.title }}</td>
                        <td>{{ item.quantity }}</td>
                        <td>{{ item.product.price | money }}</td>
                      </tr>
                    </tbody>
                    <tfoot>
                      <tr>
                        <td colspan="3" class="text-right">總計：{{ totalPrice | money }}</td>
                      </tr>
                    </tfoot>
                  </table>
                  <router-link class="bg-info text-white text-center" to="/cart">前往結帳</router-link>
                </div>
              </div>
            </li>
          </ul>
          <ul class="navbar-nav ml-auto">
            <li class="nav-item">
              <router-link class="nav-link" to="/admin/products">後臺管理</router-link>
              <!-- <a class="nav-link" href="#">後臺管理</a> -->
            </li>
          </ul>
        </div>
      </nav>
    </header>

    <div class="py-5 wrapper">
      <router-view
        @togetcart="getCart"
        @removeallcart="removeAllCart"
        :carts="carts"
        :total-price="totalPrice"
        :total-quantity="totalQuantity"
      />
    </div>
    <footer class="out-footer">圖片、介紹皆取自網路，僅供練習之用</footer>
    <!-- <HelloWorld msg="Welcome to Your Vue.js App" /> -->
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue';

export default {
  name: 'Home',
  data () {
    return {
      isLoading: false,
      carts: [],
      totalPrice: 0,
      totalQuantity: 0
    };
  },
  methods: {
    getCart () {
      this.isLoading = true;
      const api = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/ec/shopping`;
      this.$http
        .get(api)
        .then(res => {
          this.isLoading = false;
          this.carts = res.data.data;

          this.totalPrice = 0;
          this.totalQuantity = 0;
          // 計算總金額
          this.carts.forEach(item => {
            this.totalPrice += item.product.price * item.quantity;
            this.totalQuantity += item.quantity;
          });
        })
        .catch(err => {
          this.isLoading = false;
          console.log(err);
        });
    },
    removeAllCart () {
      const api = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/ec/shopping/all/product`;
      this.$http
        .delete(api)
        .then(() => {
          this.carts = [];
          this.getCart();
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted () {
    this.getCart();
  }
};
</script>
