(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["User"],{"3b34":function(t,e,a){"use strict";var n=a("9d94"),r=a("8088"),s={delete:function(t){return n["a"].delete(r["a"].answerItem(t))},insert:function(t){return n["a"].post(r["a"].answer,t)},update:function(t,e){return n["a"].put(r["a"].answerItem(t),e)},single:function(t){return n["a"].get(r["a"].answerItem(t))},today:function(){return n["a"].get(r["a"].answerToday)},answerSingle:function(t){return n["a"].get(r["a"].answerSingle(t))}};e["a"]=s},"431f":function(t,e,a){"use strict";var n=a("b767"),r=a.n(n);r.a},"4a4e":function(t,e,a){"use strict";var n=a("9d94"),r=a("8088"),s={list:function(t){return n["a"].get(r["a"].user,t)},insert:function(t){return n["a"].post(r["a"].user,t)},single:function(t){return n["a"].get(r["a"].userItem(t))},update:function(t,e){return n["a"].put(r["a"].userItem(t),e)},info:function(t){return n["a"].get(r["a"].userInfo,t)},more:function(t){return n["a"].get(r["a"].userSingle(t))}};e["a"]=s},"51af":function(t,e,a){"use strict";var n=a("9b62"),r=a.n(n);r.a},5899:function(t,e){t.exports="\t\n\v\f\r                　\u2028\u2029\ufeff"},"58a8":function(t,e,a){var n=a("1d80"),r=a("5899"),s="["+r+"]",l=RegExp("^"+s+s+"*"),i=RegExp(s+s+"*$"),o=function(t){return function(e){var a=String(n(e));return 1&t&&(a=a.replace(l,"")),2&t&&(a=a.replace(i,"")),a}};t.exports={start:o(1),end:o(2),trim:o(3)}},"9b62":function(t,e,a){},a434:function(t,e,a){"use strict";var n=a("23e7"),r=a("23cb"),s=a("a691"),l=a("50c4"),i=a("7b0b"),o=a("65f0"),c=a("8418"),u=a("1dde"),f=Math.max,p=Math.min,d=9007199254740991,b="Maximum allowed length exceeded";n({target:"Array",proto:!0,forced:!u("splice")},{splice:function(t,e){var a,n,u,g,h,m,w=i(this),v=l(w.length),x=r(t,v),_=arguments.length;if(0===_?a=n=0:1===_?(a=0,n=v-x):(a=_-2,n=p(f(s(e),0),v-x)),v+a-n>d)throw TypeError(b);for(u=o(w,n),g=0;g<n;g++)h=x+g,h in w&&c(u,g,w[h]);if(u.length=n,a<n){for(g=x;g<v-n;g++)h=g+n,m=g+a,h in w?w[m]=w[h]:delete w[m];for(g=v;g>v-n+a;g--)delete w[g-1]}else if(a>n)for(g=v-n;g>x;g--)h=g+n-1,m=g+a-1,h in w?w[m]=w[h]:delete w[m];for(g=0;g<a;g++)w[g+x]=arguments[g+2];return w.length=v-n+a,u}})},a547:function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("el-tabs",{staticClass:"container",model:{value:t.activeName,callback:function(e){t.activeName=e},expression:"activeName"}},[a("el-tab-pane",{attrs:{label:"用户管理",name:"user"}},[a("el-table",{staticStyle:{width:"100%"},attrs:{data:t.tableData}},[a("el-table-column",{attrs:{prop:"nick_name",label:"昵称"}}),a("el-table-column",{attrs:{prop:"sex",label:"性别"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-tag",{attrs:{type:"男"===e.row.sex?"primary":"warning","disable-transitions":""}},[t._v(t._s(e.row.sex))])]}}])}),a("el-table-column",{attrs:{prop:"state",label:"状态"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-tag",{attrs:{effect:"dark",type:"无"===e.row.state?"primary":"warning","disable-transitions":""}},[t._v(t._s(e.row.state))])]}}])}),a("el-table-column",{attrs:{fixed:"right",label:"操作",width:"100"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{attrs:{type:"text",size:"small"},on:{click:function(a){return t.handleClick(e.row)}}},[t._v("查看")])]}}])})],1),a("el-pagination",{staticClass:"pagination",attrs:{layout:"prev, pager, next","page-size":t.pagination.pageSize,"pager-count":7,"current-page":t.pagination.nowPage,total:t.pagination.total},on:{"update:currentPage":function(e){return t.$set(t.pagination,"nowPage",e)},"update:current-page":function(e){return t.$set(t.pagination,"nowPage",e)},"current-change":t.onLoad}})],1)],1)},r=[],s=(a("4160"),a("a9e3"),a("159b"),a("4a4e")),l={data:function(){return{activeName:"user",pagination:{pageSize:10,total:0,nowPage:1},tableData:[]}},created:function(){this.onLoad()},methods:{onLoad:function(){var t=this,e={pageSize:this.pagination.pageSize,nowPage:this.pagination.nowPage};s["a"].info(e).then((function(e){e.data.forEach((function(t){switch(Number(t.sex)){case 1:t.sex="男";break;case 2:t.sex="女";break;default:t.sex="未设置"}switch(Number(t.state)){case 0:t.state="无";break;case 1:t.state="备孕";break;case 2:t.state="已孕";break;case 3:t.state="已育";break}})),t.tableData=e.data,t.pagination.total=e.total}))},handleClick:function(t){var e=t.id;this.$router.push({name:"userSingle",params:{id:e}})}}},i=l,o=(a("431f"),a("2877")),c=Object(o["a"])(i,n,r,!1,null,null,null);e["default"]=c.exports},a9e3:function(t,e,a){"use strict";var n=a("83ab"),r=a("da84"),s=a("94ca"),l=a("6eeb"),i=a("5135"),o=a("c6b6"),c=a("7156"),u=a("c04e"),f=a("d039"),p=a("7c73"),d=a("241c").f,b=a("06cf").f,g=a("9bf2").f,h=a("58a8").trim,m="Number",w=r[m],v=w.prototype,x=o(p(v))==m,_=function(t){var e,a,n,r,s,l,i,o,c=u(t,!1);if("string"==typeof c&&c.length>2)if(c=h(c),e=c.charCodeAt(0),43===e||45===e){if(a=c.charCodeAt(2),88===a||120===a)return NaN}else if(48===e){switch(c.charCodeAt(1)){case 66:case 98:n=2,r=49;break;case 79:case 111:n=8,r=55;break;default:return+c}for(s=c.slice(2),l=s.length,i=0;i<l;i++)if(o=s.charCodeAt(i),o<48||o>r)return NaN;return parseInt(s,n)}return+c};if(s(m,!w(" 0o1")||!w("0b1")||w("+0x1"))){for(var k,I=function(t){var e=arguments.length<1?0:t,a=this;return a instanceof I&&(x?f((function(){v.valueOf.call(a)})):o(a)!=m)?c(new w(_(e)),a,I):_(e)},y=n?d(w):"MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger".split(","),N=0;y.length>N;N++)i(w,k=y[N])&&!i(I,k)&&g(I,k,b(w,k));I.prototype=v,v.constructor=I,l(r,m,I)}},b767:function(t,e,a){},cca0:function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"container"},[a("el-row",{attrs:{gutter:30}},[a("el-col",{attrs:{span:6}},[a("el-card",{staticClass:"box-card"},[a("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[t.userInfo.avatar?a("el-image",{staticStyle:{width:"60px",height:"60px"},attrs:{src:t.userInfo.avatar,fit:"fit"}}):t._e()],1),a("div",{staticClass:"text item"},[t._v("昵称："+t._s(t.userInfo.nick_name))]),a("div",{staticClass:"text item"},[t._v("性别："+t._s(t.userInfo.sex))]),a("div",{staticClass:"text item"},[t._v("状态："+t._s(t.userInfo.state))])])],1),a("el-col",{attrs:{span:18}},[a("span",{staticClass:"tips"},[t._v("tips:点击文字可查看内容")]),a("el-table",{staticClass:"answer",attrs:{data:t.answerData,"max-height":"400",height:"400"}},[a("el-table-column",{attrs:{label:"发布的回答"}},[a("el-table-column",{attrs:{label:"话题标题"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",{staticClass:"topic-title",on:{click:function(a){return t.handleText(e.row.title)}}},[t._v(t._s(e.row.title))])]}}])}),a("el-table-column",{attrs:{label:"回答内容"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",{staticClass:"topic-title",on:{click:function(a){return t.handleText(e.row.text)}}},[t._v(t._s(e.row.text))])]}}])}),a("el-table-column",{attrs:{prop:"praise",label:"点赞"}}),a("el-table-column",{attrs:{prop:"collect",label:"收藏"}}),a("el-table-column",{attrs:{prop:"create_time",label:"创建日期"}}),a("el-table-column",{attrs:{label:"操作"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{attrs:{size:"mini",type:"text"},on:{click:function(a){return t.handleDelete(e.$index,e.row)}}},[t._v("删除")])]}}])})],1)],1)],1)],1),a("el-row",{attrs:{gutter:30}},[a("el-col",{attrs:{span:12}},[a("el-table",{staticClass:"answer",attrs:{data:t.collectData,"max-height":"400",height:"400"}},[a("el-table-column",{attrs:{label:"收藏的回答"}},[a("el-table-column",{attrs:{label:"话题标题"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",{staticClass:"topic-title",on:{click:function(a){return t.handleText(e.row.title)}}},[t._v(t._s(e.row.title))])]}}])}),a("el-table-column",{attrs:{label:"回答内容"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",{staticClass:"topic-title",on:{click:function(a){return t.handleText(e.row.text)}}},[t._v(t._s(e.row.text))])]}}])}),a("el-table-column",{attrs:{prop:"praise",label:"点赞"}}),a("el-table-column",{attrs:{prop:"collect",label:"收藏"}}),a("el-table-column",{attrs:{prop:"create_time",label:"创建日期"}})],1)],1)],1),a("el-col",{attrs:{span:12}},[a("el-table",{staticClass:"answer",attrs:{data:t.topicData,"max-height":"400",height:"400"}},[a("el-table-column",{attrs:{label:"关注的话题"}},[a("el-table-column",{attrs:{label:"话题标题"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",{staticClass:"topic-title",on:{click:function(a){return t.handleText(e.row.title)}}},[t._v(t._s(e.row.title))])]}}])}),a("el-table-column",{attrs:{label:"话题内容"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",{staticClass:"topic-title",on:{click:function(a){return t.handleText(e.row.text)}}},[t._v(t._s(e.row.text))])]}}])}),a("el-table-column",{attrs:{prop:"category_name",label:"话题分类"}}),a("el-table-column",{attrs:{prop:"follow",label:"关注"}}),a("el-table-column",{attrs:{prop:"pv",label:"pv"}})],1)],1)],1)],1),a("el-dialog",{attrs:{title:"内容",visible:t.dialogVisible,width:"30%"},on:{"update:visible":function(e){t.dialogVisible=e}}},[a("span",[t._v(t._s(t.dialog))]),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(e){t.dialogVisible=!1}}},[t._v("关闭")])],1)])],1)},r=[],s=(a("4160"),a("a434"),a("a9e3"),a("ac1f"),a("5319"),a("159b"),a("4a4e")),l=a("3b34"),i={data:function(){return{userInfo:{},answerData:[],collectData:[],topicData:[],dialog:"",dialogVisible:!1}},created:function(){var t=this,e=this.$route.params.id;s["a"].more(e).then((function(e){e.data.answer.forEach((function(t){t.text=t.text.replace(/<\/?.+?>/g,"")})),e.data.collect.forEach((function(t){t.text=t.text.replace(/<\/?.+?>/g,"")})),t.answerData=e.data.answer,t.collectData=e.data.collect,t.topicData=e.data.topic})),s["a"].single(e).then((function(e){switch(Number(e.data.sex)){case 1:e.data.sex="男";break;case 2:e.data.sex="女";break}switch(Number(e.data.state)){case 0:e.data.state="无";break;case 1:e.data.state="备孕";break;case 2:e.data.state="已孕";break;case 3:e.data.state="已育";break}t.userInfo=e.data}))},methods:{handleText:function(t){this.dialog=t,this.dialogVisible=!0},handleDelete:function(t,e){var a=this;this.$confirm("此操作将永久删除该回答, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){var n=e.id;l["a"].delete(n).then((function(e){a.$message({message:e.message}),200===e.code&&a.answerData.splice(t,1)}))})).catch((function(){a.$message({type:"info",message:"已取消删除"})}))}}},o=i,c=(a("51af"),a("2877")),u=Object(c["a"])(o,n,r,!1,null,null,null);e["default"]=u.exports}}]);
//# sourceMappingURL=User.a8fa7660.js.map