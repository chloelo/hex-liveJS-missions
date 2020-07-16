
const apiPath = 'https://course-ec-api.hexschool.io/api/';
const app = new Vue({
  el: '#app',
  data () {
    return {
      user: {
        token: '',
        uuid: '27645507-6c88-4d1b-816f-1587210ac2be'
      },

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
        imageUrl: [],
      },
      imgUploading: false,
      isNew: false,
    }
  },
  methods: {
    // 登出，清除 cookie 裡的 token
    signout () {
      // 清除 Token
      document.cookie = `myToken=; expires=; path=/`;
      location.href = "login.html";
    },
    // 取得產品列表
    getProducts () {
      // API
      const api = `${apiPath}${this.user.uuid}/admin/ec/products`
      // 將 Token 加入到 Headers 內
      axios.defaults.headers.common['Authorization'] = `Bearer ${this.user.token}`;
      axios.get(api)
        .then(res => {
          this.products = res.data.data;
          this.pagination = res.data.meta.pagination;

        }).catch(err => {
          console.log(err);
        })
    },

    openModal (status, product) {
      switch (status) {
        case 'add':
          this.isNew = true;
          this.tempProduct = {
            imageUrl: [],
          };
          $('#productModal').modal('show');
          break;
        case 'edit':
          this.isNew = false;
          this.getProduct(product.id);
          break;
        case 'del':
          this.tempProduct = JSON.parse(JSON.stringify(product));
          $('#delProductModal').modal('show');
          break;
        default:
          break;
      }

    },
    // 點擊編輯按鈕 -> 透過 AJAX 取得選取的的產品
    getProduct (id) {
      const api = `${apiPath}${this.user.uuid}/admin/ec/product/${id}`;
      axios.defaults.headers.common['Authorization'] = `Bearer ${this.user.token}`;
      axios.get(api)
        .then(res => {
          this.tempProduct = res.data.data;
          // 確保資料已回來再把視窗打開
          $('#productModal').modal('show');
        }).catch(err => {
          console.log(err);
        })

    },
    updateProduct () {
      // 新增商品的 api
      let api = `${apiPath}${this.user.uuid}/admin/ec/product`;
      let httpBy = 'post';
      if (!this.isNew) { // 如果不是新增商品
        api = `${apiPath}${this.user.uuid}/admin/ec/product/${this.tempProduct.id}`;
        httpBy = 'patch'
      }
      axios[httpBy](api, this.tempProduct)
        .then(() => {
          this.tempProduct = {
            imageUrl: [],
          };
          $('#productModal').modal('hide');
          this.getProducts();
        }).catch(err => {
          console.log(err);
        })
    },
    uploadFile () {
      this.imgUploading = true;
      const uploadedfile = document.querySelector('#customFile').files[0];
      const formData = new FormData();
      formData.append('file', uploadedfile);
      const api = `${apiPath}${this.user.uuid}/admin/storage`;
      axios.defaults.headers.common['Authorization'] = `Bearer ${this.user.token}`;
      axios.post(api, formData, {
        // 聲明是 formData 的格式，寫法也是固定的
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      }).then(res => {

        // 如果圖片傳送成功，就把照片新增到圖片的陣列中
        if (res.status === 200) {
          // 傳送成功之後 icon就不顯示
          this.imgUploading = false;
          this.tempProduct.imageUrl.push(res.data.data.path);
        }
      }).catch(err => {
        this.imgUploading = true;
        console.log(err);
      })
    },
    deleteProduct (id) {
      const api = `${apiPath}${this.user.uuid}/admin/ec/product/${id}`;
      axios.defaults.headers.common['Authorization'] = `Bearer ${this.user.token}`;
      axios.delete(api)
        .then(() => {
          $('#delProductModal').modal('hide');
          this.tempProduct = {
            imageUrl: [],
          };
          this.getProducts();
        }).catch(err => {
          console.log(err);
        })
    }
  },
  mounted () {
    // 如果沒有token 表示沒有登入，轉跳回登入頁
    this.user.token = document.cookie.replace(/(?:(?:^|.*;\s*)myToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    if (!this.user.token) {
      location.href = "login.html";
    }

    this.getProducts();


  },
})