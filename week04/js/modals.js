
export const productModal = {
  template: `
  <div id="productModal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
      aria-hidden="true">
      <div class="modal-dialog modal-xl" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-dark text-white">
            <h5 id="exampleModalLabel" class="modal-title">
              <span>{{outerIsNew ?'新增產品':'修改產品資訊'}}</span>
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
                    v-model="innerProduct.imageUrl[idx-1]">
                </div>
                <div class="form-group">
                  <label for="customFile">
                    或 上傳圖片
                    <i v-if="outerIsUpload" class="fas fa-spinner fa-spin"></i>
                  </label>
                  <input id="customFile" type="file" class="form-control" @change="innerUpload">
                </div>
                <img class="img-fluid" :src="innerProduct.imageUrl[0]" />
              </div>
              <div class=" col-sm-8">
                <div class="form-group">
                  <label for="title">標題</label>
                  <input v-model="innerProduct.title" id="title" type="text" class="form-control" placeholder="請輸入標題"
                    required>
                </div>

                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="category">分類</label>
                    <input v-model="innerProduct.category" id="category" type="text" class="form-control"
                      placeholder="請輸入分類" required>
                  </div>
                  <div class="form-group col-md-6">
                    <label for="price">單位</label>
                    <input v-model="innerProduct.unit" id="unit" type="unit" class="form-control" placeholder="請輸入單位">
                  </div>
                </div>

                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="origin_price">原價</label>
                    <input v-model="innerProduct.origin_price" id="origin_price" type="number" class="form-control"
                      placeholder="請輸入原價">
                  </div>
                  <div class="form-group col-md-6">
                    <label for="price">售價</label>
                    <input v-model="innerProduct.price" id="price" type="number" class="form-control"
                      placeholder="請輸入售價">
                  </div>
                </div>
                <hr>

                <div class="form-group">
                  <label for="description">產品說明</label>
                  <textarea v-model="innerProduct.description" id="description" type="text" class="form-control"
                    placeholder="請輸入產品說明" required>
                </textarea>
                </div>
                <div class="form-group">
                  <label for="content">產品描述</label>
                  <textarea v-model="innerProduct.content" id="content" type="text" class="form-control"
                    placeholder="請輸入產品描述" required>
                </textarea>
                </div>
                <div class="form-group">
                  <div class="form-check">
                    <input v-model="innerProduct.enabled" id="enabled" class="form-check-input" type="checkbox">
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
            <button type="button" class="btn bg-info text-white" @click="innerUpdate">
              確認
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  props: [
    'outerTemp',
    'outerIsNew',
    'outerIsUpload'
  ],
  data() {
    return {
      innerProduct: this.outerTemp
    }
  },
  methods: {
    innerUpdate() {
      this.$emit('emitUpdate', this.innerProduct)
    },
    innerUpload() {
      this.$emit('emitFile')
    }
  },
  created() {
    console.log(this.outerTemp)
  },
}
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
            <strong class="text-danger">{{outerTemp.title}}</strong> 商品 (刪除後將無法恢復)。
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">
              取消
            </button>
            <button type="button" class="btn btn-danger" @click="innerDel">
              確認刪除
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  props: [
    'outerTemp',
  ],
  data() {
    return {
      inner: this.outerTemp
    }
  },
  methods: {
    innerDel() {
      console.log('133');
      this.$emit('emitDel', this.outerTemp.id)
    }
  },
  created() {
    console.log(this.inner)
  },
} 