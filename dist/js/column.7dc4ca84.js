(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["column"],{2765:function(t,e,a){"use strict";var n=a("9d94"),l=a("8088"),s={insert:function(t){return n["a"].post(l["a"].column,t)},all:function(){return n["a"].get(l["a"].column)},single:function(t){return n["a"].get(l["a"].columnItem(t))},update:function(t,e){return n["a"].put(l["a"].columnItem(t),e)},columnSelected:function(t){return n["a"].get(l["a"].columnSelected(t))},columnUnSelected:function(t,e){return n["a"].get(l["a"].columnUnSelected(t),e)},columnSelect:function(t){return n["a"].post(l["a"].columnSelect,t)},unColumnSelect:function(t){return n["a"].put(l["a"].columnSelect,t)}};e["a"]=s},"3ac7":function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"container"},[a("el-button",{staticClass:"insert-btn",attrs:{type:"primary",icon:"el-icon-circle-plus-outline"},on:{click:function(e){return t.handleInsert()}}},[t._v("添加 ")]),a("el-row",{attrs:{gutter:20}},t._l(t.columnData,(function(e){return a("el-col",{key:e.id,attrs:{span:6}},[a("el-card",{staticClass:"el-card",attrs:{"body-style":{padding:"0px"}}},[a("el-image",{staticClass:"image",attrs:{src:e.image_url,fit:"cover"}}),a("div",{staticStyle:{padding:"14px"}},[a("span",[t._v(t._s(e.title))]),a("div",{staticClass:"bottom"},[a("p",{staticClass:"desc"},[t._v(t._s(e.desc))]),a("el-button",{attrs:{type:"text",size:"small"},on:{click:function(a){return t.handleSee(e.id)}}},[t._v("查看")])],1)])],1)],1)})),1)],1)},l=[],s=a("2765"),r={data:function(){return{columnData:[]}},created:function(){var t=this;s["a"].all().then((function(e){t.columnData=e.data}))},methods:{handleSee:function(t){this.$router.push({name:"columnSingle",params:{id:t}})},handleInsert:function(){this.$router.push({name:"columnCreate"})}}},i=r,o=(a("cc5f"),a("2877")),c=Object(o["a"])(i,n,l,!1,null,"4beaf116",null);e["default"]=c.exports},"5b6a":function(t,e,a){"use strict";var n=a("a2d1"),l=a.n(n);l.a},"5bbc":function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("el-tabs",{staticClass:"container",model:{value:t.tableName,callback:function(e){t.tableName=e},expression:"tableName"}},[a("el-tab-pane",{attrs:{label:"合辑编辑",name:"first"}},[a("el-collapse",{model:{value:t.activeName,callback:function(e){t.activeName=e},expression:"activeName"}},[a("el-collapse-item",{attrs:{title:"合辑名称",name:"1"}},[a("div",{staticClass:"column-text"},[t._v(" "+t._s(t.columnData.title)+" "),a("el-button",{staticStyle:{float:"right","padding-right":"20px"},attrs:{type:"text"},on:{click:function(e){return t.handleEditName(t.columnData.id)}}},[t._v("编辑")])],1)]),a("el-collapse-item",{attrs:{title:"合辑描述",name:"2"}},[a("div",{staticClass:"column-text"},[t._v(" "+t._s(t.columnData.desc)+" "),a("el-button",{staticStyle:{float:"right","padding-right":"20px"},attrs:{type:"text"},on:{click:function(e){return t.handleEditDesc(t.columnData.id)}}},[t._v("编辑")])],1)]),a("el-collapse-item",{attrs:{title:"合辑图片",name:"3"}},[t.columnData.image_url?a("el-image",{staticClass:"image",attrs:{src:t.columnData.image_url,fit:"cover"}}):t._e(),a("el-upload",{staticClass:"avatar-uploader",staticStyle:{"margin-right":"10px"},attrs:{action:"","show-file-list":!1,"http-request":t.handleEditImage,"before-upload":t.beforeAvatarUpload}},[t._v(" 编辑 ")])],1)],1)],1),a("el-tab-pane",{attrs:{label:"合辑管理",name:"second"}},[a("el-table",{ref:"multipleTable",staticStyle:{width:"100%"},attrs:{data:t.selectionData,"tooltip-effect":"dark"},on:{"selection-change":t.handleSelectionChange}},[a("el-table-column",{attrs:{label:"选择"}},[a("el-button",{attrs:{slot:"header",size:"small"},on:{click:t.handleDelete},slot:"header"},[t._v("移除")]),a("el-table-column",{attrs:{type:"selection",width:"80"}})],1),a("el-table-column",{attrs:{label:"展示话题"}},[a("el-table-column",{attrs:{label:"标题"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",{staticClass:"topic-title"},[t._v(t._s(e.row.title))])]}}])}),a("el-table-column",{attrs:{label:"分类"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("div",{staticClass:"name-wrapper",attrs:{slot:"reference"},slot:"reference"},[a("el-tag",[t._v(t._s(e.row.name))])],1)]}}])}),a("el-table-column",{attrs:{prop:"pv",label:"PV"}}),a("el-table-column",{attrs:{prop:"follow",label:"关注"}}),a("el-table-column",{attrs:{prop:"answer_num",label:"回答"}})],1)],1),a("el-table",{ref:"multipleTable",staticStyle:{width:"100%","margin-top":"20px"},attrs:{data:t.tableData,"tooltip-effect":"dark"},on:{"selection-change":t.handleDataChange}},[a("el-table-column",{attrs:{label:"选择"}},[a("el-button",{attrs:{slot:"header",size:"small"},on:{click:t.handleInsert},slot:"header"},[t._v("添加")]),a("el-table-column",{attrs:{type:"selection",width:"80"}})],1),a("el-table-column",{attrs:{label:"所有话题"}},[a("el-table-column",{attrs:{label:"标题"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",{staticClass:"topic-title"},[t._v(t._s(e.row.title))])]}}])}),a("el-table-column",{attrs:{label:"分类"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("div",{staticClass:"name-wrapper",attrs:{slot:"reference"},slot:"reference"},[a("el-tag",[t._v(t._s(e.row.name))])],1)]}}])}),a("el-table-column",{attrs:{prop:"pv",label:"PV"}}),a("el-table-column",{attrs:{prop:"follow",label:"关注"}}),a("el-table-column",{attrs:{prop:"answer_num",label:"回答"}})],1)],1),a("el-pagination",{staticClass:"pagination",attrs:{layout:"prev, pager, next","page-size":t.pagination.pageSize,"pager-count":7,"current-page":t.pagination.nowPage,total:t.pagination.total},on:{"update:currentPage":function(e){return t.$set(t.pagination,"nowPage",e)},"update:current-page":function(e){return t.$set(t.pagination,"nowPage",e)},"current-change":t.onload}})],1)],1)},l=[],s=(a("d81d"),a("2765")),r=a("d85d"),i={data:function(){return{activeName:["1","2","3"],tableName:"first",columnData:{},selectionData:[],tableData:[],pagination:{pageSize:10,total:0,nowPage:1},insertParams:[],deleteParams:[]}},created:function(){var t=this,e=this.$route.params.id;s["a"].single(e).then((function(e){t.columnData=e.data})),this.onload()},methods:{onload:function(){var t=this,e=this.$route.params.id,a={pageSize:this.pagination.pageSize,nowPage:this.pagination.nowPage};s["a"].columnSelected(e).then((function(e){t.selectionData=e.data})),s["a"].columnUnSelected(e,a).then((function(e){t.tableData=e.data,t.pagination.total=e.total}))},handleEditName:function(t){var e=this,a=this.$createElement;this.$msgbox({title:"修改名称",message:a("p",null,[a("span",null,"输入合辑名称： ")]),showCancelButton:!0,confirmButtonText:"确定",cancelButtonText:"取消",showInput:!0}).then((function(a){if(a.value){var n=a.value;s["a"].update(t,{title:n}).then((function(t){200===t.code?e.columnData.title=a.value:console.log(t.message)}))}else e.$message.error("值不能为空")})).catch((function(){e.$message({type:"info",message:"已取消修改"})}))},handleEditDesc:function(t){var e=this,a=this.$createElement;this.$msgbox({title:"修改描述",message:a("p",null,[a("span",null,"输入合辑描述： ")]),showCancelButton:!0,confirmButtonText:"确定",cancelButtonText:"取消",showInput:!0}).then((function(a){if(a.value){var n=a.value;s["a"].update(t,{desc:n}).then((function(t){200===t.code?e.columnData.desc=a.value:console.log(t.message)}))}else e.$message.error("值不能为空")})).catch((function(){e.$message({type:"info",message:"已取消修改"})}))},handleEditImage:function(t){var e=this;r["a"].upload(t.file).then((function(t){var a=t,n=e.$route.params.id;s["a"].update(n,{image_url:a}).then((function(t){200===t.code?e.columnData.image_url=a:console.log(t.message)}))}))},beforeAvatarUpload:function(t){var e=t.size/1024/1024<2;return e||this.$message.error("上传图片大小不能超过 2MB!"),e},handleSelectionChange:function(t){var e=t.map((function(t){return t.topic_id}));this.deleteParams=e},handleDataChange:function(t){var e=t.map((function(t){return t.topic_id}));this.insertParams=e},handleInsert:function(){var t=this;if(this.insertParams.length){var e=this.$route.params.id,a=this.insertParams.map((function(t){return{column_id:e,topic_id:t}}));s["a"].columnSelect({params:a}).then((function(e){200!==e.code&&t.$message.error(e.message),t.onload()}))}else this.$message.error("没有选择话题喔~")},handleDelete:function(){var t=this;if(this.deleteParams.length){var e=this.$route.params.id,a=this.deleteParams.map((function(t){return[t,e]}));s["a"].unColumnSelect({params:a}).then((function(e){200!==e.code&&t.$message.error(e.message),t.onload()}))}else this.$message.error("没有选择话题喔~")}}},o=i,c=(a("5b6a"),a("2877")),u=Object(c["a"])(o,n,l,!1,null,"ca4bd672",null);e["default"]=u.exports},"6c0e":function(t,e,a){},"8bdb":function(t,e,a){"use strict";var n=a("6c0e"),l=a.n(n);l.a},9262:function(t,e,a){},a070:function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"container"},[a("h3",{staticClass:"title"},[t._v("增加一个合辑")]),a("el-form",{ref:"Form",staticClass:"el-form",attrs:{model:t.formData,rules:t.rules,"label-position":"left","label-width":"100px"}},[a("el-form-item",{staticClass:"warpper",staticStyle:{width:"500px"},attrs:{label:"名称：",prop:"title"}},[a("el-input",{attrs:{placeholder:"请输入名称"},model:{value:t.formData.title,callback:function(e){t.$set(t.formData,"title",e)},expression:"formData.title"}})],1),a("el-form-item",{staticClass:"warpper",staticStyle:{width:"500px"},attrs:{label:"描述：",prop:"desc"}},[a("el-input",{attrs:{placeholder:"请输入描述"},model:{value:t.formData.desc,callback:function(e){t.$set(t.formData,"desc",e)},expression:"formData.desc"}})],1),a("div",{staticClass:"image-title"},[t._v("展示图：")]),a("el-upload",{staticClass:"avatar-uploader",attrs:{action:"","show-file-list":!1,"http-request":t.handleAvatar,"before-upload":t.beforeAvatarUpload}},[t.imageUrl?a("img",{staticClass:"avatar",attrs:{src:t.imageUrl}}):a("i",{staticClass:"el-icon-plus avatar-uploader-icon"})]),a("el-form-item",{staticClass:"warpper"},[a("el-button",{attrs:{type:"primary"},on:{click:t.handleCreate}},[t._v("添加")]),a("el-button",{attrs:{type:"info"},on:{click:t.handlereturn}},[t._v("返回")])],1)],1)],1)},l=[],s=a("d85d"),r=a("2765"),i={data:function(){return{imageUrl:"",formData:{title:"",desc:""},rules:{title:[{required:!0,message:"请输入名称",trigger:"blur"}],desc:[{required:!0,message:"请输入描述",trigger:"blur"}]}}},methods:{handleCreate:function(){var t=this;this.$refs.Form.validate((function(e){var a=t.imageUrl;if(e&&a){var n={title:t.formData.title,desc:t.formData.desc,imageUrl:t.imageUrl};r["a"].insert(n).then((function(e){200===e.code&&(t.$message({message:e.message,type:"success"}),t.$router.push({name:"column"}))}))}else t.$message({message:"缺少必要参数",type:"warning"})}))},handleAvatar:function(t){var e=this;s["a"].upload(t.file).then((function(t){e.imageUrl=t}))},beforeAvatarUpload:function(t){var e=t.size/1024/1024<2;return e||this.$message.error("上传图片大小不能超过 2MB!"),e},handlereturn:function(){this.$router.push({name:"column"})}}},o=i,c=(a("8bdb"),a("2877")),u=Object(c["a"])(o,n,l,!1,null,"5e32dedb",null);e["default"]=u.exports},a2d1:function(t,e,a){},cc5f:function(t,e,a){"use strict";var n=a("9262"),l=a.n(n);l.a},d85d:function(t,e,a){"use strict";a("0d03"),a("b0c0"),a("d3b7");var n=a("9d94"),l=a("8088"),s={qiniu:function(){return n["a"].get(l["a"].qiniuToken)},upload:function(t){var e=this;return new Promise((function(a){e.qiniu().then((function(e){var s="yunchly/"+Date.now()+"_"+t.name,r=e.token,i=e.domain,o=new FormData;o.append("file",t),o.append("key",s),o.append("token",r),n["a"].post(l["a"].qiniu_API,o,{headers:{"Content-Type":"multiple/form-data"}}).then((function(t){var e=i+t.key;a(e)}))}))}))}};e["a"]=s}}]);
//# sourceMappingURL=column.7dc4ca84.js.map