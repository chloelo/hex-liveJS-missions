(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0cf4c3"],{"62b3":function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("loading",{attrs:{active:t.isLoading},on:{"update:active":function(e){t.isLoading=e}}}),a("section",{staticClass:"cart_zone"},[a("div",{staticClass:"container my-5"},[a("div",{staticClass:"row"},[a("div",{staticClass:"col-lg-7"},[a("div",{staticClass:"form-cart-list"},[a("h3",{staticClass:"text-info"},[t._v("購物車清單")]),a("table",{staticClass:"table table-responsive-sm table-cart"},[t._m(0),a("tbody",[t._l(t.carts,(function(e){return a("tr",{key:e.product.id},[a("td",[a("button",{staticClass:"btn btn-outline-danger btn-del",attrs:{type:"button"},on:{click:function(a){return t.removeCart(e.product.id)}}},[a("span",[a("font-awesome-icon",{attrs:{icon:"trash-alt"}})],1)])]),a("td",[t._v(t._s(e.product.title))]),a("td",[t._v(t._s(t._f("money")(e.product.price)))]),a("td",[a("div",{staticClass:"input-group"},[a("div",{staticClass:"input-group-prepend"},[a("button",{staticClass:"btn btn-outline-info",attrs:{disabled:1===e.quantity,type:"button"},on:{click:function(a){return t.updateQuantity(e.product.id,e.quantity-1)}}},[t._v(" - ")])]),a("input",{directives:[{name:"model",rawName:"v-model",value:e.quantity,expression:"item.quantity"}],staticClass:"form-control",attrs:{type:"number",min:"1","aria-describedby":"basic-addon1"},domProps:{value:e.quantity},on:{change:function(a){return t.updateQuantity(e.product.id,e.quantity)},input:function(a){a.target.composing||t.$set(e,"quantity",a.target.value)}}}),a("div",{staticClass:"input-group-append"},[a("button",{staticClass:"btn btn-outline-info",attrs:{type:"button"},on:{click:function(a){return t.updateQuantity(e.product.id,e.quantity+1)}}},[t._v(" + ")])])])]),a("td",[t._v(t._s(t._f("money")(e.product.price*e.quantity)))])])})),0===t.carts.length?a("tr",[a("td",{staticClass:"text-center",attrs:{colspan:"5"}},[t._v(" 您尚未選擇任何商品喔！ ")])]):t._e()],2),a("tfoot",[a("tr",[a("td",{staticClass:"text-left",attrs:{colspan:"3"}},[a("button",{staticClass:"btn btn-outline-danger btn-del",attrs:{type:"button"},on:{click:t.removeAll}},[a("span",[a("font-awesome-icon",{attrs:{icon:"trash-alt"}})],1),t._v(" 全部清空 ")])]),a("td",{staticClass:"text-right",attrs:{colspan:"2"}},[t._v(" 總計："+t._s(t._f("money")(t.totalPrice))+" ")])])])])])]),a("div",{staticClass:"col-lg-5"},[a("div",{staticClass:"order-info"},[a("h3",{staticClass:"text-info"},[t._v("填寫訂單資訊")]),a("validation-observer",{scopedSlots:t._u([{key:"default",fn:function(e){var s=e.invalid;return[a("form",{on:{submit:function(e){return e.preventDefault(),t.createOrder(e)}}},[a("div",{staticClass:"form-row"},[a("div",{staticClass:"col form-group"},[a("validation-provider",{attrs:{rules:"required"},scopedSlots:t._u([{key:"default",fn:function(e){var s=e.errors,r=e.classes;return[a("label",{attrs:{for:"username"}},[t._v("收件人姓名")]),a("input",{directives:[{name:"model",rawName:"v-model",value:t.order.name,expression:"order.name"}],staticClass:"form-control",class:r,attrs:{type:"text",name:"username",id:"username",placeholder:"收件人姓名"},domProps:{value:t.order.name},on:{input:function(e){e.target.composing||t.$set(t.order,"name",e.target.value)}}}),a("span",{staticClass:"invalid-feedback"},[t._v(t._s(s[0]))])]}}],null,!0)})],1)]),a("div",{staticClass:"form-row"},[a("div",{staticClass:"col form-group"},[a("validation-provider",{attrs:{rules:"required|email"},scopedSlots:t._u([{key:"default",fn:function(e){var s=e.errors,r=e.classes;return[a("label",{attrs:{for:"email"}},[t._v("Email")]),a("input",{directives:[{name:"model",rawName:"v-model",value:t.order.email,expression:"order.email"}],staticClass:"form-control",class:r,attrs:{type:"email",id:"email",placeholder:"Email"},domProps:{value:t.order.email},on:{input:function(e){e.target.composing||t.$set(t.order,"email",e.target.value)}}}),a("span",{staticClass:"invalid-feedback"},[t._v(t._s(s[0]))])]}}],null,!0)})],1)]),a("div",{staticClass:"form-row"},[a("div",{staticClass:"col form-group"},[a("validation-provider",{attrs:{rules:"required|numeric|min:8"},scopedSlots:t._u([{key:"default",fn:function(e){var s=e.errors,r=e.classes;return[a("label",{attrs:{for:"tel"}},[t._v("電話")]),a("input",{directives:[{name:"model",rawName:"v-model",value:t.order.tel,expression:"order.tel"}],staticClass:"form-control",class:r,attrs:{type:"tel",id:"tel",placeholder:"電話"},domProps:{value:t.order.tel},on:{input:function(e){e.target.composing||t.$set(t.order,"tel",e.target.value)}}}),a("span",{staticClass:"invalid-feedback"},[t._v(t._s(s[0]))])]}}],null,!0)})],1)]),a("div",{staticClass:"form-row"},[a("div",{staticClass:"col form-group"},[a("validation-provider",{attrs:{rules:"required"},scopedSlots:t._u([{key:"default",fn:function(e){var s=e.errors,r=e.classes;return[a("label",{attrs:{for:"address"}},[t._v("地址")]),a("input",{directives:[{name:"model",rawName:"v-model",value:t.order.address,expression:"order.address"}],staticClass:"form-control",class:r,attrs:{type:"text",id:"address",placeholder:"地址"},domProps:{value:t.order.address},on:{input:function(e){e.target.composing||t.$set(t.order,"address",e.target.value)}}}),a("span",{staticClass:"invalid-feedback"},[t._v(t._s(s[0]))])]}}],null,!0)})],1)]),a("div",{staticClass:"form-row"},[a("div",{staticClass:"col form-group"},[a("label",{attrs:{for:"waytopay"}},[t._v("購買方式")]),a("select",{directives:[{name:"model",rawName:"v-model",value:t.order.payment,expression:"order.payment"}],staticClass:"form-control",attrs:{name:"購買方式",id:"waytopay",required:""},on:{change:function(e){var a=Array.prototype.filter.call(e.target.options,(function(t){return t.selected})).map((function(t){var e="_value"in t?t._value:t.value;return e}));t.$set(t.order,"payment",e.target.multiple?a:a[0])}}},[a("option",{attrs:{value:"",disabled:""}},[t._v("請選擇付款方式")]),a("option",{attrs:{value:"WebATM"}},[t._v("WebATM")]),a("option",{attrs:{value:"ATM"}},[t._v("ATM")]),a("option",{attrs:{value:"CVS"}},[t._v("CVS")]),a("option",{attrs:{value:"Barcode"}},[t._v("Barcode")]),a("option",{attrs:{value:"Credit"}},[t._v("Credit")]),a("option",{attrs:{value:"ApplePay"}},[t._v("ApplePay")]),a("option",{attrs:{value:"GooglePay"}},[t._v("GooglePay")])])])]),a("div",{staticClass:"form-row"},[a("div",{staticClass:"col form-group"},[a("label",{attrs:{for:"message"}},[t._v("留言")]),a("textarea",{directives:[{name:"model",rawName:"v-model",value:t.order.message,expression:"order.message"}],staticClass:"form-control",attrs:{id:"message",cols:"30",rows:"3"},domProps:{value:t.order.message},on:{input:function(e){e.target.composing||t.$set(t.order,"message",e.target.value)}}})])]),a("div",{staticClass:"form-row"},[a("div",{staticClass:"col form-group text-right"},[a("button",{staticClass:"btn btn-info",attrs:{type:"submit",disabled:s}},[t._v(" 送出表單 ")])])])])]}}])})],1)])])])])],1)},r=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("thead",[a("tr",[a("th",{attrs:{scope:"col",width:"60px"}},[t._v("移除")]),a("th",{attrs:{scope:"col"}},[t._v("品名")]),a("th",{attrs:{scope:"col"}},[t._v("單價")]),a("th",{attrs:{scope:"col",width:"150px"}},[t._v("數量")]),a("th",{attrs:{scope:"col"}},[t._v("小計")])])])}],o=(a("99af"),{props:["carts","totalQuantity","totalPrice"],data:function(){return{isLoading:!1,order:{name:"",email:"",tel:"",address:"",payment:"",message:""}}},methods:{updateQuantity:function(t,e){var a=this;if(!(e<1)){var s="".concat("https://course-ec-api.hexschool.io/api","/").concat("27645507-6c88-4d1b-816f-1587210ac2be","/ec/shopping"),r={product:t,quantity:e};this.$http.patch(s,r).then((function(){a.$emit("togetcart")})).catch((function(t){console.log(t)}))}},removeCart:function(t){var e=this,a="".concat("https://course-ec-api.hexschool.io/api","/").concat("27645507-6c88-4d1b-816f-1587210ac2be","/ec/shopping/").concat(t);this.$http.delete(a).then((function(){e.$emit("togetcart")})).catch((function(t){console.log(t)}))},removeAll:function(){this.$emit("removeallcart")},createOrder:function(){var t=this;this.isLoading=!0;var e="".concat("https://course-ec-api.hexschool.io/api","/").concat("27645507-6c88-4d1b-816f-1587210ac2be","/ec/orders");this.$http.post(e,this.order).then((function(){t.isLoading=!1,t.order={name:"",email:"",tel:"",address:"",payment:"",message:""},t.$emit("togetcart"),alert("您已完成訂單，我們會盡快與您聯繫，謝謝。"),t.$router.push("/products")})).catch((function(e){t.isLoading=!1,console.log(e)}))}},created:function(){this.$emit("togetcart")}}),i=o,n=a("2877"),l=Object(n["a"])(i,s,r,!1,null,null,null);e["default"]=l.exports}}]);
//# sourceMappingURL=chunk-2d0cf4c3.36ca10da.js.map