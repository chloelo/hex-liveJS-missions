<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <section class="cart_zone">
      <div class="container my-5">
        <div class="row">
          <div class="col-lg-7">
            <div class="form-cart-list">
              <h3 class="text-info">購物車清單</h3>
              <table class="table table-responsive-sm table-cart">
                <!-- <caption class="text-info">購物車清單</caption> -->
                <thead>
                  <tr>
                    <th scope="col" width="60px">移除</th>
                    <th scope="col">品名</th>
                    <th scope="col">單價</th>
                    <th scope="col" width="150px">數量</th>
                    <th scope="col">小計</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in carts" :key="item.product.id">
                    <td>
                      <button
                        type="button"
                        class="btn btn-outline-danger btn-del"
                        @click="removeCart(item.product.id)"
                      >
                        <span>
                          <font-awesome-icon icon="trash-alt" />
                          <!-- <i class="fas fa-trash-alt"></i> -->
                        </span>
                      </button>
                    </td>
                    <td>{{ item.product.title }}</td>
                    <td>{{ item.product.price | money }}</td>
                    <td>
                      <div class="input-group">
                        <div class="input-group-prepend">
                          <button
                            :disabled="item.quantity === 1"
                            class="btn btn-outline-info"
                            type="button"
                            @click="
                              updateQuantity(item.product.id, item.quantity - 1)
                            "
                          >
                            -
                          </button>
                        </div>
                        <input
                          v-model="item.quantity"
                          type="number"
                          min="1"
                          class="form-control"
                          aria-describedby="basic-addon1"
                          @change="
                            updateQuantity(item.product.id, item.quantity)
                          "
                        />
                        <div class="input-group-append">
                          <button
                            class="btn btn-outline-info"
                            type="button"
                            @click="
                              updateQuantity(item.product.id, item.quantity + 1)
                            "
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </td>
                    <td>{{ (item.product.price * item.quantity) | money }}</td>
                  </tr>
                  <tr v-if="carts.length === 0">
                    <td colspan="5" class="text-center">
                      您尚未選擇任何商品喔！
                    </td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr>
                    <td colspan="3" class="text-left">
                      <button
                        type="button"
                        class="btn btn-outline-danger btn-del"
                        @click="removeAll"
                      >
                        <span>
                          <font-awesome-icon icon="trash-alt" />
                        </span>
                        全部清空
                      </button>
                    </td>
                    <td colspan="2" class="text-right">
                      總計：{{ totalPrice | money }}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
          <div class="col-lg-5">
            <div class="order-info">
              <h3 class="text-info">填寫訂單資訊</h3>
              <validation-observer v-slot="{ invalid }">
                <form @submit.prevent="createOrder">
                  <div class="form-row">
                    <div class="col form-group">
                      <validation-provider
                        rules="required"
                        v-slot="{ errors, classes }"
                      >
                        <label for="username">收件人姓名</label>
                        <input
                          type="text"
                          name="username"
                          class="form-control"
                          id="username"
                          placeholder="收件人姓名"
                          :class="classes"
                          v-model="order.name"
                        />
                        <span class="invalid-feedback">{{ errors[0] }}</span>
                      </validation-provider>
                    </div>
                  </div>
                  <div class="form-row">
                    <div class="col form-group">
                      <validation-provider
                        rules="required|email"
                        v-slot="{ errors, classes }"
                      >
                        <label for="email">Email</label>
                        <input
                          type="email"
                          class="form-control"
                          id="email"
                          placeholder="Email"
                          :class="classes"
                          v-model="order.email"
                        />
                        <span class="invalid-feedback">{{ errors[0] }}</span>
                      </validation-provider>
                    </div>
                  </div>
                  <div class="form-row">
                    <div class="col form-group">
                      <validation-provider
                        rules="required|numeric|min:8"
                        v-slot="{ errors, classes }"
                      >
                        <label for="tel">電話</label>
                        <input
                          type="tel"
                          class="form-control"
                          id="tel"
                          placeholder="電話"
                          :class="classes"
                          v-model="order.tel"
                        />
                        <span class="invalid-feedback">{{ errors[0] }}</span>
                      </validation-provider>
                    </div>
                  </div>
                  <div class="form-row">
                    <div class="col form-group">
                      <validation-provider
                        rules="required"
                        v-slot="{ errors, classes }"
                      >
                        <label for="address">地址</label>
                        <input
                          type="text"
                          class="form-control"
                          id="address"
                          placeholder="地址"
                          :class="classes"
                          v-model="order.address"
                        />
                        <span class="invalid-feedback">{{ errors[0] }}</span>
                      </validation-provider>
                    </div>
                  </div>
                  <div class="form-row">
                    <div class="col form-group">
                      <label for="waytopay">購買方式</label>
                      <select
                        name="購買方式"
                        id="waytopay"
                        class="form-control"
                        v-model="order.payment"
                        required
                      >
                        <option value disabled>請選擇付款方式</option>
                        <option value="WebATM">WebATM</option>
                        <option value="ATM">ATM</option>
                        <option value="CVS">CVS</option>
                        <option value="Barcode">Barcode</option>
                        <option value="Credit">Credit</option>
                        <option value="ApplePay">ApplePay</option>
                        <option value="GooglePay">GooglePay</option>
                      </select>
                    </div>
                  </div>
                  <div class="form-row">
                    <div class="col form-group">
                      <label for="message">留言</label>
                      <textarea
                        id="message"
                        class="form-control"
                        cols="30"
                        rows="3"
                        v-model="order.message"
                      ></textarea>
                    </div>
                  </div>
                  <div class="form-row">
                    <div class="col form-group text-right">
                      <button
                        type="submit"
                        class="btn btn-info"
                        :disabled="invalid"
                      >
                        送出表單
                      </button>
                    </div>
                  </div>
                </form>
              </validation-observer>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
export default {
  props: ['carts', 'totalQuantity', 'totalPrice'],
  data() {
    return {
      isLoading: false,
      // totalPrice: 0,
      // totalQuantity: 0,
      // carts: [],
      // product: {
      //   imageUrl: [],
      //   quantity: 1
      // },
      order: {
        name: '',
        email: '',
        tel: '',
        address: '',
        payment: '',
        message: ''
      }
    };
  },
  methods: {
    // getCart() {
    //   this.isLoading = true;
    //   const api = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/ec/shopping`;
    //   this.$http
    //     .get(api)
    //     .then(res => {
    //       this.isLoading = false;
    //       this.carts = res.data.data;
    //       this.product = {
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
    // },
    updateQuantity(id, quantity) {
      if (quantity < 1) return;

      const api = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/ec/shopping`;
      const editCart = {
        product: id,
        quantity
      };
      this.$http
        .patch(api, editCart)
        .then(() => {
          this.$emit('togetcart');
        })
        .catch(err => {
          console.log(err);
        });
    },
    removeCart(id) {
      const api = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/ec/shopping/${id}`;
      this.$http
        .delete(api)
        .then(() => {
          this.$emit('togetcart');
        })
        .catch(err => {
          console.log(err);
        });
    },
    removeAll() {
      this.$emit('removeallcart');
    },
    // removeAllCart() {
    //   const api = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/ec/shopping/all/product`;
    //   this.$http
    //     .delete(api)
    //     .then(() => {
    //       this.carts = {};
    //       this.$emit('togetcart');
    //     })
    //     .catch(err => {
    //       console.log(err);
    //     });
    // },
    createOrder() {
      this.isLoading = true;
      const api = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/ec/orders`;
      this.$http
        .post(api, this.order)
        .then(() => {
          this.isLoading = false;
          this.order = {
            name: '',
            email: '',
            tel: '',
            address: '',
            payment: '',
            message: ''
          };
          this.$emit('togetcart');
          alert('您已完成訂單，我們會盡快與您聯繫，謝謝。');
          // window.location = 'products.html';
          this.$router.push('/products');
        })
        .catch(err => {
          this.isLoading = false;
          console.log(err);
        });
    }
  },
  created() {
    this.$emit('togetcart');
    // this.carts = this.outcarts;
  }
};
</script>
<style lang="scss" scope></style>
