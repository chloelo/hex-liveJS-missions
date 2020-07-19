export const productModal = {
  template: `
  <div id="productModal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
    aria-hidden="true">
    <div class="modal-dialog modal-xl" role="document">
      <div class="modal-content border-0">
        <div class="modal-header bg-dark text-white">
          <h5 id="exampleModalLabel" class="modal-title">
            <span>{{isNew ?'新增產品':'修改產品資訊'}}</span>
          </h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-sm-4">
              <div class="form-group" v-for="idx of 5" :key="'img'+idx">
                <label :for="'img'+idx">輸入圖片網址</label>
                <input :id="'img'+idx" type="text" class="form-control" placeholder="請輸入圖片連結"
                  v-model="tempProduct.imageUrl[idx-1]">
              </div>
              <div class="form-group">
                <label for="customFile">
                  或 上傳圖片
                  <span v-if="imgUploading"><i  class="fas fa-spinner fa-spin"></i></span>
                </label>
                <input id="customFile" type="file" class="form-control" @change="uploadFile">
              </div>
              <img class="img-fluid" :src="tempProduct.imageUrl[0]" />
            </div>
            <div class=" col-sm-8">
              <div class="form-group">
                <label for="title">標題</label>
                <input v-model="tempProduct.title" id="title" type="text" class="form-control" placeholder="請輸入標題"
                  required>
              </div>

              <div class="form-row">
                <div class="form-group col-md-6">
                  <label for="category">分類</label>
                  <input v-model="tempProduct.category" id="category" type="text" class="form-control"
                    placeholder="請輸入分類" required>
                </div>
                <div class="form-group col-md-6">
                  <label for="price">單位</label>
                  <input v-model="tempProduct.unit" id="unit" type="unit" class="form-control" placeholder="請輸入單位">
                </div>
              </div>

              <div class="form-row">
                <div class="form-group col-md-6">
                  <label for="origin_price">原價</label>
                  <input v-model="tempProduct.origin_price" id="origin_price" type="number" class="form-control"
                    placeholder="請輸入原價">
                </div>
                <div class="form-group col-md-6">
                  <label for="price">售價</label>
                  <input v-model="tempProduct.price" id="price" type="number" class="form-control"
                    placeholder="請輸入售價">
                </div>
              </div>
              <hr>

              <div class="form-group">
                <label for="description">產品說明</label>
                <textarea v-model="tempProduct.description" id="description" type="text" class="form-control"
                  placeholder="請輸入產品說明" required>
                  </textarea>
              </div>
              <div class="form-group">
                <label for="content">產品描述</label>
                <textarea v-model="tempProduct.content" id="content" type="text" class="form-control"
                  placeholder="請輸入產品描述" required>
                  </textarea>
              </div>
              <div class="form-group">
                <div class="form-check">
                  <input v-model="tempProduct.enabled" id="enabled" class="form-check-input" type="checkbox">
                  <label class="form-check-label" for="enabled">是否啟用</label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">
            取消
          </button>
          <button type="button" class="btn bg-info text-white" @click="updateProduct()">
            確認
          </button>
        </div>
      </div>
    </div>
  </div>
  `,
  props: ['isNew', 'tempProduct', 'uuid', 'url'],
  data () {
    return {
      imgUploading: false,
    }
  },
  methods: {
    updateProduct () {
      let httpWay = 'post';
      let api = `${this.url}/${this.uuid}/admin/ec/product`;
      if (!this.isNew) {
        httpWay = 'patch';
        api = `${this.url}/${this.uuid}/admin/ec/product/${this.tempProduct.id}`;
      }

      axios[httpWay](api, this.tempProduct)
        .then(() => {
          this.$emit('update')
        })
        .catch(err => {
          console.log(err);
        })
    },
    uploadFile () {
      this.imgUploading = true;
      const uploadedfile = document.querySelector('#customFile').files[0];
      const formData = new FormData();
      formData.append('file', uploadedfile);
      const api = `${this.url}/${this.uuid}/admin/storage`;
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
  },
};
export const productModalDel = {
  template: `
  <div id="delProductModal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
      aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content border-0">
        <div class="modal-header bg-danger text-white">
          <h5 id="exampleModalLabel" class="modal-title">
            <span>刪除產品</span>
          </h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          是否刪除
          <strong class="text-danger">{{tempProduct.title}}</strong> 商品 (刪除後將無法恢復)。
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">
            取消
          </button>
          <button type="button" class="btn btn-danger" @click="deleteProduct(tempProduct.id)">
            確認刪除
          </button>
        </div>
      </div>
    </div>
  </div>
  `,
  props: ['tempProduct', 'uuid', 'url'],
  data () {
    return {

    }
  },
  methods: {
    deleteProduct () {
      const api = `${this.url}/${this.uuid}/admin/ec/product/${this.tempProduct.id}`;
      axios.delete(api)
        .then(() => {

          this.$emit('update');
        })
        .catch(err => {
          console.log(err);
        })
    }
  },

};