(window.webpackJsonp=window.webpackJsonp||[]).push([[18],{393:function(e,t,n){"use strict";n.r(t);n(26),n(29),n(30),n(27),n(362),n(181),n(31),n(28),n(32),n(33),n(34),n(35),n(36);var a=n(0),r=n.n(a),o=n(367),c=n(682),i=n(467),u=n(426),l=n(664),s=n(680),p=n(681),f=n(108),m=n(61),g=n(109),b=n(1),y=n(10);function h(e){return(h="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function d(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}function v(e,t){return!t||"object"!==h(t)&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function E(e){return(E=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function O(e,t){return(O=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function j(){return(j=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e}).apply(this,arguments)}var w=function(e){return r.a.createElement(f.b,j({exact:!0},e,{activeClassName:"active"}))},k=function(e){function t(){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),v(this,E(t).apply(this,arguments))}var n,a,f;return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&O(e,t)}(t,r.a.Component),n=t,(a=[{key:"onDropdownClick",value:function(e,t){switch(t.value){case 1:break;case 2:this.props.history.push("/settings");break;case 3:this.props.logout()}}},{key:"renderRightMenu",value:function(){var e=this,t=this.props.auth.isAuth,n=null,a=r.a.createElement(c.a.Item,{as:w,to:"/submit"},r.a.createElement(i.a,{trigger:r.a.createElement(u.a,{name:"signup"}),content:Object(o.t)("create a post")}));if(t){var f=r.a.createElement("span",null,r.a.createElement(l.a,{avatar:!0,src:"/public/static/Hiddout.png"})," ",this.props.auth.user),m=[{key:"userId",text:r.a.createElement("span",{style:{color:"gray"}},Object(o.t)("signed in as")," ",r.a.createElement("strong",{style:{color:"green"}},this.props.auth.user)),value:0},{key:"user",text:"Account",icon:"user",value:1},{key:"settings",text:"Settings",icon:"settings",value:2},{key:"sign-out",text:"Sign Out",icon:"sign out",value:3}];n=r.a.createElement(r.a.Fragment,null,r.a.createElement(c.a.Item,null,r.a.createElement(s.a,{onChange:this.onDropdownClick.bind(this),trigger:f,options:m,icon:null})),a)}else n=r.a.createElement(r.a.Fragment,null,r.a.createElement(c.a.Item,null,r.a.createElement(p.a,{content:Object(o.t)("loginBtn"),primary:!0,onClick:function(){return e.props.openLoginModal()}})),r.a.createElement(c.a.Item,null,r.a.createElement(p.a,{content:Object(o.t)("signupBtn"),positive:!0,onClick:function(){return e.props.openSignUpModal()}})),a);return n}},{key:"render",value:function(){return r.a.createElement(c.a,{fixed:"top"},r.a.createElement(c.a.Item,null,r.a.createElement(l.a,{src:"/public/static/Hiddout.png",avatar:!0})),r.a.createElement(c.a.Item,{name:Object(o.t)("homeMenu"),as:w,to:"/"}),r.a.createElement(c.a.Item,{name:Object(o.t)("messagesMenu"),as:w,to:"/message"}),r.a.createElement(c.a.Item,{name:Object(o.t)("friendsMenu"),as:w,to:"/friend"}),r.a.createElement(c.a.Menu,{position:"right"},this.renderRightMenu()))}}])&&d(n.prototype,a),f&&d(n,f),t}();t.default=Object(m.g)(Object(y.c)(function(e){return{i18n:e.i18n,auth:e.auth}},function(e){return{logout:function(){e(Object(g.d)())},openLoginModal:function(){e(Object(g.e)())},openSignUpModal:function(){e(Object(g.f)())},changeLanguage:function(t){var n;e((n=t,{type:b.a,payload:{language:n}}))}}})(k))}}]);