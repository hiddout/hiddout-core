(window.webpackJsonp=window.webpackJsonp||[]).push([[13],{556:function(t,e,n){"use strict";n.d(e,"c",function(){return c}),n.d(e,"b",function(){return u}),n.d(e,"a",function(){return i}),n.d(e,"d",function(){return p});n(204);var o=n(15),r=n(93),a=n(46),c=function(t){return function(e){e({type:o.q});var n=t?"?board=".concat(t):"";return hiddoutViewer.request("".concat(r.a.baseURL).concat(r.a.apiV1,"posts").concat(n),{method:"GET",headers:{"Content-Type":"application/json; charset=utf-8"}}).then(function(t){return Object(a.a)(t.status,e),e({type:o.g,payload:{posts:t.posts}})}).catch(function(t){console.error(t)})}},u=function(t){return function(e){e({type:o.p}),hiddoutViewer.request("".concat(r.a.baseURL).concat(r.a.apiV1,"post/").concat(t),{method:"GET",headers:{"Content-Type":"application/json; charset=utf-8"}}).then(function(t){Object(a.a)(t.status,e),e({type:o.f,payload:{post:t.post}})}).then(function(){return e(i(t))}).catch(function(t){console.error(t)})}},i=function(t){return function(e){return e({type:o.o}),hiddoutViewer.request("".concat(r.a.baseURL).concat(r.a.apiV1,"post/").concat(t,"/comments"),{method:"GET",headers:{"Content-Type":"application/json; charset=utf-8"}}).then(function(t){return Object(a.a)(t.status,e),e({type:o.e,payload:{comments:t.comments}})}).catch(function(t){console.error(t)})}},p=function(t){return{type:o.n,payload:{level:t}}}},587:function(t,e,n){"use strict";n.r(e);n(52),n(62),n(63),n(53),n(567),n(64),n(54),n(65),n(66),n(67),n(68),n(69);var o=n(0),r=n.n(o),a=n(564),c=n(549),u=n(576),i=n(685),p=n(28),l=n(556),s=n(29),f=n(314),y=n(154);function b(t){return(b="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function d(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}function m(t,e){return!e||"object"!==b(e)&&"function"!=typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}function h(t){return(h=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function v(t,e){return(v=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}var O=function(t){function e(){return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e),m(this,h(e).apply(this,arguments))}var n,o,a;return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&v(t,e)}(e,r.a.Component),n=e,(o=[{key:"render",value:function(){var t=this.props,e=t.title,n=t.author,o=t.boardImgSrc,a=t.createdAt,c=t.postId;return r.a.createElement(i.a.Item,null,r.a.createElement(f.a,{avatar:!0,src:o}),r.a.createElement(i.a.Content,null,r.a.createElement(i.a.Header,{style:{fontSize:"1.2em"}},r.a.createElement(y.a,{to:"/p/".concat(c)},e)),r.a.createElement(i.a.Description,null,Object(s.t)("postBy"),r.a.createElement("a",null,r.a.createElement("b",null,n)),a)))}}])&&d(n.prototype,o),a&&d(n,a),e}();n(585),n(586);function w(t){return(w="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function j(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}function E(t,e){return!e||"object"!==w(e)&&"function"!=typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}function g(t){return(g=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function _(t,e){return(_=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}var S=function(t){function e(){return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e),E(this,g(e).apply(this,arguments))}var n,o,p;return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&_(t,e)}(e,r.a.Component),n=e,(o=[{key:"componentDidMount",value:function(){this.props.getPosts(this.props.boardId)}},{key:"componentDidUpdate",value:function(t){this.props.boardId!==t.boardId&&this.props.getPosts(this.props.boardId)}},{key:"render",value:function(){var t=this.props.post,e=t.posts,n=t.isLoading;return e&&e.length?r.a.createElement(r.a.Fragment,null,r.a.createElement(a.a,null,n&&r.a.createElement(c.a,{active:!0,inline:"centered"}),n&&r.a.createElement(u.a,null),r.a.createElement(i.a,null,e.map(function(t){return r.a.createElement(r.a.Fragment,{key:t._id},r.a.createElement(O,{title:t.title,author:t.userId,boardImgSrc:"/public/static/images/avatar/board/".concat(t.board,".jpg"),createdAt:(e=t.createTime,n=Date.now()-e,Math.floor(n/1e10)?Object(s.t)("longTimeAgo"):Math.floor(n/1e9)?Object(s.t)("weeksAgo"):Object(s.t)("recentAgo")),postId:hiddoutViewer.encodeId(t._id)}),r.a.createElement(u.a,null));var e,n})))):r.a.createElement(a.a,null,r.a.createElement(c.a,{active:!0,inline:"centered"}))}}])&&j(n.prototype,o),p&&j(n,p),e}();e.default=Object(p.c)(function(t){return{post:t.post}},function(t){return{getPosts:function(e){return t(Object(l.c)(e))}}})(S)}}]);