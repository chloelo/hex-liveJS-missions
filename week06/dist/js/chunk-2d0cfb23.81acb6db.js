(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0cfb23"],{"658f":function(t,a,i){"use strict";i.r(a);var n=function(){var t=this,a=t.$createElement,i=t._self._c||a;return i("div",{staticClass:"container"},[i("loading",{attrs:{active:t.isLoading},on:{"update:active":function(a){t.isLoading=a}}}),i("h2",{staticClass:"mb-5"},[t._v(t._s(t.product.title))]),i("div",{staticClass:"img-wrap mb-3"},[i("img",{staticClass:"img-fluid",attrs:{src:t.product.imageUrl[0],alt:""}})]),i("p",[t._v(t._s(t.product.content))]),i("p",[t._v(t._s(t.product.description))]),i("div",{staticClass:"d-flex justify-content-between align-items-baseline"},[i("div",[i("del",[t._v("原價 "+t._s(t._f("money")(t.product.origin_price)))])]),i("div",{staticClass:"text-info"},[t._v(" 現在只要 "),i("span",{staticClass:"h4"},[t._v(t._s(t._f("money")(t.product.price)))])])]),i("select",{directives:[{name:"model",rawName:"v-model",value:t.product.quantity,expression:"product.quantity"}],staticClass:"form-control mt-3",attrs:{name:""},on:{change:function(a){var i=Array.prototype.filter.call(a.target.options,(function(t){return t.selected})).map((function(t){var a="_value"in t?t._value:t.value;return a}));t.$set(t.product,"quantity",a.target.multiple?i:i[0])}}},[i("option",{attrs:{value:"0",disabled:"",selected:""}},[t._v("請選擇人數")]),t._l(10,(function(a){return i("option",{key:a,domProps:{value:a}},[t._v("選擇 "+t._s(a)+" 位")])}))],2),i("div",{staticClass:"d-flex justify-content-between align-items-center mt-3"},[t.product.quantity?i("div",{staticClass:"text-muted text-nowrap mr-3"},[t._v(" 小計 "),i("strong",[t._v(t._s(t._f("money")(t.product.quantity*t.product.price||0)))]),t._v(" 元 ")]):t._e(),i("button",{staticClass:"btn btn-info",attrs:{type:"button"},on:{click:function(a){return t.addToCart(t.product.id,t.product.quantity)}}},[t.product.id===t.status.loadingItem?i("span",{staticClass:"spinner-border spinner-border-sm",attrs:{role:"status","aria-hidden":"true"}}):i("span",[i("font-awesome-icon",{attrs:{icon:"shopping-cart"}})],1),t._v(" 加到購物車 ")])])],1)},e=[],o=(i("99af"),{data:function(){return{isLoading:!1,product:{imageUrl:[],quantity:1},status:{loadingItem:""}}},methods:{addToCart:function(t){var a=this,i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1;this.isLoading=!0;var n="".concat("https://course-ec-api.hexschool.io/api","/").concat("27645507-6c88-4d1b-816f-1587210ac2be","/ec/shopping"),e={product:t,quantity:i};this.$http.post(n,e).then((function(){a.isLoading=!1,a.$emit("togetcart")})).catch((function(t){a.isLoading=!1,alert(t.response.data.errors[0]),console.log(t.response)}))}},created:function(){var t=this;this.isLoading=!0,console.log(this.$route.params.id);var a=this.$route.params.id;this.$http.get("".concat("https://course-ec-api.hexschool.io/api","/").concat("27645507-6c88-4d1b-816f-1587210ac2be","/ec/product/").concat(a)).then((function(a){t.isLoading=!1,t.product=a.data.data,t.$set(t.product,"quantity",1)})).catch((function(a){t.isLoading=!1,console.log(a)}))}}),s=o,c=i("2877"),r=Object(c["a"])(s,n,e,!1,null,null,null);a["default"]=r.exports}}]);
//# sourceMappingURL=chunk-2d0cfb23.81acb6db.js.map