new Vue({
  el: '#app',
  data: {
    user: {
      email: '',
      password: '',
    }
  },
  methods: {
    login () {
      const api = `https://course-ec-api.hexschool.io/api/auth/login`
      axios.post(api, this.user)
        .then(res => {
          console.log(res);
          // 透過 api 取得 token 和 expired
          const token = res.data.token;
          const expired = res.data.expired;
          // 將 token 和 expired 存到 cookie
          document.cookie = `hexToken=${token}; expires=${new Date(expired * 1000)}; path=/`;
          window.location = 'products.html'
        }).catch(err => {
          if (err.response.status === 422) {
            return alert('資料有誤，請重新填寫喔！');
          }
        })
    }
  },
})