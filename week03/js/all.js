
// 練習時常犯的錯 --> 忘記加到 this
const app = new Vue({
  el: "#app",
  data: {
    products: [
      {
        id: "0",
        title: "【印度】北印黃金三角 ８ 天",
        category: "Asia",
        content: "泰姬瑪哈陵、地下宮殿",
        description: "小費另計",
        imageUrl:
          "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1351&q=80",
        enabled: true,
        origin_price: 46999,
        price: 38900,
        unit: "人",
        options: {
          stars: 5,
        },
      },
      {
        id: "1",
        title: "【越南】散落於海上的珍珠 5 日遊",
        category: "Asia",
        content: "奇山怪嶼尤勝普吉攀牙灣",
        description: "團費已包含小費",
        imageUrl:
          "https://images.unsplash.com/photo-1504214208698-ea1916a2195a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
        enabled: false,
        origin_price: 29999,
        price: 22200,
        unit: "人",
        stars: 1,
        options: {
          stars: 4,
        },
      },
    ],
    // 如果已確定子結構，就先宣告，畫面渲染時，如果雙向綁定宣告兩層物件 第二層未定義會報錯
    // https://github.com/vuejs/vue/issues/5932#issuecomment-334040085

    // 如果物件結構未宣告，要如何判斷有沒有這個 key? 
    // 同學建議可用 v-if 判斷：https://codepen.io/chloelo/pen/yLevmoR?editors=1010
    tempData: {
      options: {},
    }
  },

  methods: {
    modelPopup (status, item) {
      switch (status) {
        case "add":
          this.tempData = {
            options: {},
          };
          $('#productModal').modal('show');
          break;
        case "edit":
          // 物件是傳參考，要把資料做拷貝，不要動到原本的
          this.tempData = JSON.parse(JSON.stringify(item));
          $('#productModal').modal('show');
          break;
        case "del":
          this.tempData = JSON.parse(JSON.stringify(item));
          $('#delProductModal').modal('show');
          break;
        default:
          break;
      }
    },
    updateProducts () {
      // 如果有產品 id 存在，表示進入編輯的畫面
      if (this.tempData.id) {
        let i = '';
        this.products.forEach((item, idx) => {
          if (item.id === this.tempData.id) {
            i = idx;
          }
        });
        // 要強制雙向綁定就用$set，不要直接使用 array[idx] = xxx..的方式賦值，不會直接雙向更新 data和畫面
        this.$set(this.products, i, this.tempData);

      } else { // 新增
        const id = new Date().getTime();
        this.tempData.id = id;
        this.products.push(this.tempData);
      }
      this.tempData = {
        options: {},
      };
      $('#productModal').modal('hide');

    },
    deleteProduct (id) {
      let i = '';
      this.products.forEach((item, idx) => {
        if (item.id === id) {
          i = idx;
        }
      });
      this.products.splice(i, 1);
      this.tempData = {
        options: {},
      };
      $('#delProductModal').modal('hide');
    }
  },
});
