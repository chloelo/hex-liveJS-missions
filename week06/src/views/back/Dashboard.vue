<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <header>
      <nav id="back-nav" class="navbar navbar-expand-lg navbar-dark bg-info">
        <span class="navbar-brand">後臺管理</span>
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
              <router-link class="nav-link" to="/admin/products">
                產品列表
                <span class="sr-only">(current)</span>
              </router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/admin/coupons"
                >優惠券列表</router-link
              >
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/admin/orders"
                >訂單列表</router-link
              >
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/admin/storage"
                >圖片儲存列表</router-link
              >
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/">回前台</router-link>
            </li>
          </ul>
          <button type="button" class="btn btn-light ml-auto" @click="signout">
            登出
          </button>
        </div>
      </nav>
    </header>

    <router-view class="py-5" :token="token" v-if="checkSuccess" />
  </div>
</template>
<script>
export default {
  data() {
    return {
      token: '',
      checkSuccess: false,
      isLoading: false
    };
  },
  methods: {
    signout() {
      // 清除 Token
      document.cookie = `hexToken=; expires=; path=/`;
      this.$router.push('/');
    },
    checkLogin() {
      this.isLoading = true;
      this.token = document.cookie.replace(
        /(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,
        '$1'
      );

      // 後台 api 都要驗證，宣告在created 就不用多次重覆把 token 帶入 headers
      this.$http.defaults.headers.common.Authorization = `Bearer ${this.token}`;
      const api = `${process.env.VUE_APP_APIPATH}/auth/check`;
      this.$http
        .post(api, { api_token: this.token })
        .then(() => {
          this.isLoading = false;
          this.checkSuccess = true;
        })
        .catch(err => {
          this.isLoading = false;
          console.log(err.response);
          this.checkSuccess = false;
          this.$router.push('/login');
        });
    }
  },
  created() {
    this.checkLogin();
  }
};
</script>
