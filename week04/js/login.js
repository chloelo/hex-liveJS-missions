
const apiPath = 'https://course-ec-api.hexschool.io/api/';
const app = new Vue({
  el: '#app',
  data () {
    return {
      user: {
        email: '',
        password: '',
      },
    }
  },
  methods: {
    login () {
      const api = `${apiPath}auth/login`;
      axios.post(api, this.user)
        .then(res => {
          console.log(res);
          const token = res.data.token;
          const expired = res.data.expired;
          // 取出token，再用 cookie 把 token 存起來
          document.cookie = `myToken=${token}; expires=${new Date(expired * 1000)}; path=/`;
          location.href = "products.html";
        }
        ).catch(err => {
          if (err.response.status === 422) {
            return alert('資料有誤，請重新填寫喔！');
          }
        })
    },

  },

})