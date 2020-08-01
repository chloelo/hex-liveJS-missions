<template>
  <div class="login">
    <div class="formLogin-wrap">
      <h2>請先登入</h2>
      <form @submit.prevent="login">
        <div class="form-group">
          <label for="inputEmail">Email address</label>
          <input
            type="email"
            class="form-control"
            id="inputEmail"
            aria-describedby="emailHelp"
            v-model="user.email"
            required
          />
        </div>
        <div class="form-group">
          <label for="inputPassword">Password</label>
          <input
            type="password"
            class="form-control"
            id="inputPassword"
            v-model="user.password"
            required
          />
        </div>
        <button type="submit" class="btn btn-login">登入</button>
      </form>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      user: {
        email: '',
        password: ''
      }
    };
  },
  methods: {
    login () {
      const api = `${process.env.VUE_APP_APIPATH}/auth/login`;

      this.$http
        .post(api, this.user)
        .then(res => {
          // 透過 api 取得 token 和 expired
          const token = res.data.token;
          const expired = res.data.expired;
          // 將 token 和 expired 存到 cookie
          document.cookie = `hexToken=${token}; expires=${new Date(
            expired * 1000
          )}; path=/`;
          this.$router.push('/admin/products');
        })
        .catch(err => {
          if (err.response.status === 422) {
            return alert('資料有誤，請重新填寫喔！');
          }
        });
    }
  }
};
</script>
