<template>
  <div class="backpage-products">
    <loading :active.sync="isLoading"></loading>
    <div class="container">
      <div class="row">
        <div class="col-12">
          <div class="d-flex justify-content-end my-3">
            <button
              type="button"
              class="btn btn-warning"
              @click="openModal('new')"
            >
              建立新的產品
            </button>
          </div>
          <div class="table-responsive">
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">分類</th>
                  <th scope="col">產品圖</th>
                  <th scope="col">產品名稱</th>
                  <th scope="col">原價</th>
                  <th scope="col">售價</th>
                  <th scope="col">是否啟用</th>
                  <th scope="col">編輯</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in products" :key="item.id">
                  <th scope="row">{{ item.category }}</th>
                  <td>
                    <img class="sm-img" :src="item.imageUrl[0]" />
                  </td>
                  <td>{{ item.title }}</td>
                  <td>{{ item.origin_price }}</td>
                  <td>{{ item.price }}</td>
                  <td>
                    <label class="switch">
                      <input type="checkbox" disabled :checked="item.enabled" />
                      <span class="slider round"></span>
                    </label>
                  </td>
                  <td>
                    <div
                      class="btn-group"
                      role="group"
                      aria-label="Basic example"
                    >
                      <button
                        type="button"
                        class="btn btn-outline-info"
                        @click="openModal('edit', item)"
                        :disabled="btnLoading === item.id"
                      >
                        編輯
                        <span
                          v-if="btnLoading === item.id"
                          class="spinner-border spinner-border-sm"
                          role="status"
                          aria-hidden="true"
                        ></span>
                      </button>
                      <button
                        type="button"
                        class="btn btn-outline-danger"
                        @click="openModal('del', item)"
                      >
                        刪除
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <ProductModal
            :is-new="isNew"
            :temp-product="tempProduct"
            @update="getProducts"
          ></ProductModal>
          <ProductModalDel
            :temp-product="tempProduct"
            @update="getProducts"
          ></ProductModalDel>
          <Pagination :pages="pagination" @emitpage="getProducts"></Pagination>
          <!-- <pagination :pages="pagination" @emitpage="getProducts"></pagination>
          <product-modal
            :uuid="uuid"
            :url="url"
            :is-new="isNew"
            :temp-product="tempProduct"
            @update="getProducts"
          ></product-modal>
          <product-modal-del
            :uuid="uuid"
            :url="url"
            :temp-product="tempProduct"
            @update="getProducts"
          ></product-modal-del> -->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
/* global $ */

import ProductModal from '@/components/ProductModal.vue';
import ProductModalDel from '@/components/ProductModalDel.vue';
import Pagination from '@/components/Pagination.vue';
export default {
  props: ['token'],
  components: {
    ProductModal,
    ProductModalDel,
    Pagination
  },
  data() {
    return {
      isLoading: false,
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
        // 第二層結構要先定義，才能雙向綁定
        imageUrl: []
      },
      isNew: false,
      btnLoading: ''
    };
  },
  methods: {
    getProducts(page = 1) {
      this.isLoading = true;
      const api = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/admin/ec/products?page=${page}`;
      this.$http
        .get(api)
        .then(res => {
          this.isLoading = false;
          this.products = res.data.data;
          this.pagination = res.data.meta.pagination;
          if (this.tempProduct.id || this.isNew) {
            $('#productModal').modal('hide');
            $('#delProductModal').modal('hide');
            this.tempProduct = {
              imageUrl: []
            };
          }
        })
        .catch(err => {
          this.isLoading = false;
          console.log(err);
        });
    },
    openModal(status, item) {
      switch (status) {
        case 'new': {
          this.tempProduct = {
            imageUrl: []
          };
          this.isNew = true;
          $('#productModal').modal('show');
          break;
        }
        case 'edit': {
          this.isNew = false;
          this.btnLoading = item.id;
          const api = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/admin/ec/product/${item.id}`;
          this.$http
            .get(api)
            .then(res => {
              this.btnLoading = '';
              this.tempProduct = res.data.data;
              $('#productModal').modal('show');
            })
            .catch(err => {
              this.btnLoading = '';
              console.log(err);
            });
          break;
        }
        case 'del': {
          this.tempProduct = JSON.parse(JSON.stringify(item));
          $('#delProductModal').modal('show');
          break;
        }
        default:
          break;
      }
    }
  },
  created() {
    this.getProducts();
  }
};
</script>
