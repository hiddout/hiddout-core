(window.webpackJsonp=window.webpackJsonp||[]).push([[5,17,18,19,22],{333:function(t,e,n){var o=n(351),r=n(336),a=n(341),i=r(function(t,e){return a(t)?o(t,e):[]});t.exports=i},336:function(t,e,n){var o=n(158),r=n(348),a=n(343);t.exports=function(t,e){return a(r(t,e,o),t+"")}},339:function(t,e){t.exports=function(t,e,n){switch(n.length){case 0:return t.call(e);case 1:return t.call(e,n[0]);case 2:return t.call(e,n[0],n[1]);case 3:return t.call(e,n[0],n[1],n[2])}return t.apply(e,n)}},340:function(t,e,n){var o=n(352);t.exports=function(t,e){return!(null==t||!t.length)&&o(t,e,0)>-1}},341:function(t,e,n){var o=n(55),r=n(40);t.exports=function(t){return r(t)&&o(t)}},342:function(t,e,n){var o=n(346),r=n(353);t.exports=function(t,e,n,a){var i=!n;n||(n={});for(var u=-1,c=e.length;++u<c;){var l=e[u],s=a?a(n[l],t[l],l,n,t):void 0;void 0===s&&(s=t[l]),i?r(n,l,s):o(n,l,s)}return n}},343:function(t,e,n){var o=n(355),r=n(350)(o);t.exports=r},344:function(t,e){t.exports=function(t,e,n){for(var o=-1,r=null==t?0:t.length;++o<r;)if(n(e,t[o]))return!0;return!1}},348:function(t,e,n){var o=n(339),r=Math.max;t.exports=function(t,e,n){return e=r(void 0===e?t.length-1:e,0),function(){for(var a=arguments,i=-1,u=r(a.length-e,0),c=Array(u);++i<u;)c[i]=a[e+i];i=-1;for(var l=Array(e+1);++i<e;)l[i]=a[i];return l[e]=n(c),o(t,this,l)}}},349:function(t,e,n){var o=n(37),r=function(){try{var t=o(Object,"defineProperty");return t({},"",{}),t}catch(t){}}();t.exports=r},350:function(t,e){var n=800,o=16,r=Date.now;t.exports=function(t){var e=0,a=0;return function(){var i=r(),u=o-(i-a);if(a=i,u>0){if(++e>=n)return arguments[0]}else e=0;return t.apply(void 0,arguments)}}},351:function(t,e,n){var o=n(162),r=n(340),a=n(344),i=n(160),u=n(161),c=n(163),l=200;t.exports=function(t,e,n,s){var p=-1,f=r,h=!0,g=t.length,d=[],v=e.length;if(!g)return d;n&&(e=i(e,u(n))),s?(f=a,h=!1):e.length>=l&&(f=c,h=!1,e=new o(e));t:for(;++p<g;){var m=t[p],b=null==n?m:n(m);if(m=s||0!==m?m:0,h&&b==b){for(var y=v;y--;)if(e[y]===b)continue t;d.push(m)}else f(e,b,s)||d.push(m)}return d}},352:function(t,e,n){var o=n(169),r=n(357),a=n(358);t.exports=function(t,e,n){return e==e?a(t,e,n):o(t,r,n)}},355:function(t,e,n){var o=n(356),r=n(349),a=n(158),i=r?function(t,e){return r(t,"toString",{configurable:!0,enumerable:!1,value:o(e),writable:!0})}:a;t.exports=i},356:function(t,e){t.exports=function(t){return function(){return t}}},357:function(t,e){t.exports=function(t){return t!=t}},358:function(t,e){t.exports=function(t,e,n){for(var o=n-1,r=t.length;++o<r;)if(t[o]===e)return o;return-1}},359:function(t,e,n){"use strict";n(23),n(29),n(30),n(173),n(171),n(24),n(338),n(31),n(25),n(32),n(33),n(34),n(35),n(36);var o=n(665),r=n(682),a=n(337),i=n(0),u=n.n(i);function c(t){return(c="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function l(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}function s(t,e){return!e||"object"!==c(e)&&"function"!=typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}function p(t){return(p=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function f(t,e){return(f=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}var h=function(t){function e(t){var n;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e),n=s(this,p(e).call(this,t));var o=[{key:"allPost",text:Object(a.t)("allPost"),value:"home",image:{avatar:!0,src:"/public/static/images/avatar/board/home.jpg"}},{key:"lifeBoard",text:Object(a.t)("lifeBoard"),value:"life",image:{avatar:!0,src:"/public/static/images/avatar/board/life.jpg"}},{key:"gameBoard",text:Object(a.t)("gameBoard"),value:"game",image:{avatar:!0,src:"/public/static/images/avatar/board/game.jpg"}},{key:"workBoard",text:Object(a.t)("workBoard"),value:"work",image:{avatar:!0,src:"/public/static/images/avatar/board/work.jpg"}},{key:"spamBoard",text:Object(a.t)("spamBoard"),value:"spam",image:{avatar:!0,src:"/public/static/images/avatar/board/spam.jpg"}}],r=o,i=n.props.exclude;return i&&(r=o.filter(function(t){return i.indexOf(t.value)<0})),n.state={options:r,value:r[0].value},n}var n,i,c;return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&f(t,e)}(e,u.a.Component),n=e,(i=[{key:"onDropdownClick",value:function(t,e){var n=this,o=e.value;this.setState({value:o},function(){return n.props.onSelectChange(o)})}},{key:"render",value:function(){return u.a.createElement("span",null,u.a.createElement(o.a,{src:"/public/static/images/avatar/board/".concat(this.props.value?this.props.value:this.state.value,".jpg"),avatar:!0}),u.a.createElement(r.a,{inline:!0,options:this.state.options,value:this.props.value?this.props.value:this.state.value,onChange:this.onDropdownClick.bind(this)}))}}])&&l(n.prototype,i),c&&l(n,c),e}();e.a=h},362:function(t,e,n){var o=n(346),r=n(342),a=n(363),i=n(55),u=n(164),c=n(56),l=Object.prototype.hasOwnProperty,s=a(function(t,e){if(u(e)||i(e))r(e,c(e),t);else for(var n in e)l.call(e,n)&&o(t,n,e[n])});t.exports=s},363:function(t,e,n){var o=n(336),r=n(167);t.exports=function(t){return o(function(e,n){var o=-1,a=n.length,i=a>1?n[a-1]:void 0,u=a>2?n[2]:void 0;for(i=t.length>3&&"function"==typeof i?(a--,i):void 0,u&&r(n[0],n[1],u)&&(i=a<3?void 0:i,a=1),e=Object(e);++o<a;){var c=n[o];c&&t(e,c,o,i)}return e})}},364:function(t,e,n){var o=n(353),r=n(175),a=n(78);t.exports=function(t,e){var n={};return e=a(e,3),r(t,function(t,r,a){o(n,r,e(t,r,a))}),n}},369:function(t,e,n){"use strict";n.r(e);n(23),n(29),n(30),n(24),n(338),n(172),n(31),n(25),n(32),n(33),n(34),n(35),n(36);var o=n(0),r=n.n(o),a=n(337),i=n(684),u=n(396),c=n(429),l=n(665),s=n(682),p=n(685),f=n(102),h=n(58),g=n(103),d=n(1),v=n(10),m=n(359);function b(t){return(b="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function y(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}function O(t,e){return!e||"object"!==b(e)&&"function"!=typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}function w(t){return(w=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function j(t,e){return(j=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function x(){return(x=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(t[o]=n[o])}return t}).apply(this,arguments)}var E=function(t){return r.a.createElement(f.b,x({exact:!0},t,{activeClassName:"active"}))},P=function(t){function e(){return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e),O(this,w(e).apply(this,arguments))}var n,o,f;return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&j(t,e)}(e,r.a.Component),n=e,(o=[{key:"onDropdownClick",value:function(t,e){switch(e.value){case 1:break;case 2:this.props.history.push("/settings");break;case 3:this.props.logout()}}},{key:"renderRightMenu",value:function(){var t=this,e=this.props.auth.isAuth,n=null,o=r.a.createElement(i.a.Item,{as:E,to:"/submit"},r.a.createElement(u.a,{trigger:r.a.createElement(c.a,{name:"signup"}),content:Object(a.t)("create a post")}));if(e){var f=r.a.createElement("span",null,r.a.createElement(l.a,{avatar:!0,src:"/public/static/Hiddout.png"})," ",this.props.auth.user),h=[{key:"userId",text:r.a.createElement("span",{style:{color:"gray"}},Object(a.t)("signed in as")," ",r.a.createElement("strong",{style:{color:"green"}},this.props.auth.user)),value:0},{key:"user",text:"Account",icon:"user",value:1},{key:"settings",text:"Settings",icon:"settings",value:2},{key:"sign-out",text:"Sign Out",icon:"sign out",value:3}];n=r.a.createElement(r.a.Fragment,null,r.a.createElement(i.a.Item,null,r.a.createElement(s.a,{onChange:this.onDropdownClick.bind(this),trigger:f,options:h,icon:null})),o)}else n=r.a.createElement(r.a.Fragment,null,r.a.createElement(i.a.Item,null,r.a.createElement(p.a,{content:Object(a.t)("loginBtn"),primary:!0,onClick:function(){return t.props.openLoginModal()}})),r.a.createElement(i.a.Item,null,r.a.createElement(p.a,{content:Object(a.t)("signupBtn"),positive:!0,onClick:function(){return t.props.openSignUpModal()}})),o);return n}},{key:"render",value:function(){var t=this,e=this.props.auth.isAuth;return r.a.createElement(i.a,{fixed:"top"},!e&&r.a.createElement(i.a.Item,null,r.a.createElement(l.a,{src:"/public/static/Hiddout.png",avatar:!0})),!e&&r.a.createElement(i.a.Item,{name:Object(a.t)("homeMenu"),as:E,to:"/"}),e&&r.a.createElement(i.a.Item,null,r.a.createElement(m.a,{onSelectChange:function(e){"home"===e?t.props.history.push("/"):t.props.history.push("/b/".concat(e))},value:this.props.boardValue})),r.a.createElement(i.a.Item,{name:Object(a.t)("messagesMenu"),as:E,to:"/message"}),r.a.createElement(i.a.Item,{name:Object(a.t)("friendsMenu"),as:E,to:"/friend"}),r.a.createElement(i.a.Menu,{position:"right"},this.renderRightMenu()))}}])&&y(n.prototype,o),f&&y(n,f),e}();e.default=Object(h.g)(Object(v.c)(function(t){return{i18n:t.i18n,auth:t.auth}},function(t){return{logout:function(){t(Object(g.d)())},openLoginModal:function(){t(Object(g.e)())},openSignUpModal:function(){t(Object(g.f)())},changeLanguage:function(e){var n;t((n=e,{type:d.a,payload:{language:n}}))}}})(P))},396:function(t,e,n){"use strict";var o=n(335),r=n.n(o),a=n(100),i=n.n(a),u=n(326),c=n.n(u),l=n(327),s=n.n(l),p=n(329),f=n.n(p),h=n(328),g=n.n(h),d=n(331),v=n.n(d),m=n(330),b=n.n(m),y=n(332),O=n.n(y),w=n(372),j=n.n(w),x=n(371),E=n.n(x),P=n(362),k=n.n(P),C=n(334),S=n.n(C),M=n(17),I=n.n(M),T=n(364),_=n.n(T),R=n(375),B=n.n(R),N=n(360),D=n.n(N),U=n(333),L=n.n(U),z=n(101),A=n.n(z),V=(n(2),n(0)),H=n.n(V),F=n(208),W=n(210),G=n(107),J=n(22),K=n(144),X=n(145),Y=n(99),q=n(687),Q=n(686),Z=n(206);function $(t){var e=t.children,n=t.className,o=t.content,r=A()("content",n),a=Object(K.a)($,t),u=Object(X.a)($,t);return H.a.createElement(u,i()({},a,{className:r}),Y.a.isNil(e)?o:e)}function tt(t){var e=t.children,n=t.className,o=t.content,r=A()("header",n),a=Object(K.a)(tt,t),u=Object(X.a)(tt,t);return H.a.createElement(u,i()({},a,{className:r}),Y.a.isNil(e)?o:e)}$.handledProps=["as","children","className","content"],$.propTypes={},$.create=Object(Z.e)($,function(t){return{children:t}}),tt.handledProps=["as","children","className","content"],tt.propTypes={},tt.create=Object(Z.e)(tt,function(t){return{children:t}}),n.d(e,"a",function(){return nt});var et=["top left","top right","bottom right","bottom left","right center","left center","top center","bottom center"],nt=function(t){function e(){var t,n;c()(this,e);for(var o=arguments.length,r=new Array(o),a=0;a<o;a++)r[a]=arguments[a];return n=f()(this,(t=g()(e)).call.apply(t,[this].concat(r))),O()(b()(b()(n)),"state",{}),O()(b()(b()(n)),"computePopupStyle",function(t){var e={position:"absolute"},o=n.getContext();if(!Object(F.a)())return e;var r=n.props,a=r.horizontalOffset,i=r.verticalOffset,u=window,c=u.pageYOffset,l=u.pageXOffset,s=document.documentElement,p=s.clientWidth,f=s.clientHeight,h=n.coords||o.getBoundingClientRect();if(D()(t,"right"))e.right=Math.round(p-(h.right+l)),e.left="auto";else if(D()(t,"left"))e.left=Math.round(h.left+l),e.right="auto";else{var g=(h.width-n.popupCoords.width)/2;e.left=Math.round(h.left+g+l),e.right="auto"}if(D()(t,"top"))e.bottom=Math.round(f-(h.top+c)),e.top="auto";else if(D()(t,"bottom"))e.top=Math.round(h.bottom+c),e.bottom="auto";else{var d=(h.height+n.popupCoords.height)/2;e.top=Math.round(h.bottom+c-d),e.bottom="auto";var v=n.popupCoords.width+8;D()(t,"right")?e.right-=v:e.left-=v}return a&&(B()(e.right)?e.right-=a:e.left-=a),i&&(B()(e.top)?e.top+=i:e.bottom+=i),e}),O()(b()(b()(n)),"isStyleInViewport",function(t){var e=window,o=e.pageYOffset,r=e.pageXOffset,a=document.documentElement,i=a.clientWidth,u=a.clientHeight,c={top:t.top,left:t.left,width:n.popupCoords.width,height:n.popupCoords.height};return B()(t.right)&&(c.left=i-t.right-c.width),B()(t.bottom)&&(c.top=u-t.bottom-c.height),!(c.top<o)&&(!(c.top+c.height>o+u)&&(!(c.left<r)&&!(c.left+c.width>r+i)))}),O()(b()(b()(n)),"setPopupStyle",function(){var t=n.getContext();if((n.coords||t)&&n.popupCoords){var e=n.props.position,o=n.computePopupStyle(e);if(n.props.keepInViewPort)for(var r=L()(et,e).concat([e]),a=0;!n.isStyleInViewport(o)&&a<r.length;a+=1)o=n.computePopupStyle(r[a]),e=r[a];o=_()(o,function(t){return B()(t)?"".concat(t,"px"):t}),n.setState({style:o,position:e})}}),O()(b()(b()(n)),"getPortalProps",function(){var t={},e=n.props,o=e.on,r=e.hoverable,a=I()(o)?o:[o];return r&&(t.closeOnPortalMouseLeave=!0,t.mouseLeaveDelay=300),D()(a,"click")&&(t.openOnTriggerClick=!0,t.closeOnTriggerClick=!0,t.closeOnDocumentClick=!0),D()(a,"focus")&&(t.openOnTriggerFocus=!0,t.closeOnTriggerBlur=!0),D()(a,"hover")&&(t.openOnTriggerMouseEnter=!0,t.closeOnTriggerMouseLeave=!0,t.mouseLeaveDelay=70,t.mouseEnterDelay=50),t}),O()(b()(b()(n)),"hideOnScroll",function(t){n.setState({closed:!0}),W.a.unsub("scroll",n.hideOnScroll,{target:window}),n.timeoutId=setTimeout(function(){n.setState({closed:!1})},50),n.handleClose(t)}),O()(b()(b()(n)),"handleClose",function(t){S()(n.props,"onClose",t,n.props)}),O()(b()(b()(n)),"handleOpen",function(t){n.coords=n.getContext().getBoundingClientRect(),S()(n.props,"onOpen",t,n.props)}),O()(b()(b()(n)),"handlePortalMount",function(t){n.props.hideOnScroll&&W.a.sub("scroll",n.hideOnScroll,{target:window}),n.setPopupStyle(),S()(n.props,"onMount",t,n.props)}),O()(b()(b()(n)),"handlePortalUnmount",function(t){n.props.hideOnScroll&&W.a.unsub("scroll",n.hideOnScroll,{target:window}),S()(n.props,"onUnmount",t,n.props)}),O()(b()(b()(n)),"handlePopupRef",function(t){n.popupCoords=t?t.getBoundingClientRect():null,n.setPopupStyle()}),O()(b()(b()(n)),"handleTriggerRef",function(t){n.triggerRef=t,n.setPopupStyle()}),O()(b()(b()(n)),"getContext",function(){var t=n.props.context;return(Object(G.b)(t)?t.current:t)||n.triggerRef}),n}return v()(e,t),s()(e,[{key:"componentDidUpdate",value:function(t){var e=this.props,n=e.horizontalOffset,o=e.verticalOffset;n===t.horizontalOffset&&o===t.verticalOffset||this.setPopupStyle()}},{key:"componentWillUnmount",value:function(){clearTimeout(this.timeoutId)}},{key:"render",value:function(){var t=this.props,n=t.basic,o=t.children,a=t.className,u=t.content,c=t.flowing,l=t.header,s=t.inverted,p=t.size,f=t.trigger,h=t.wide,g=t.disabled,d=this.state,v=d.position,m=d.closed,b=k()({},this.state.style,this.props.style),y=A()("ui",v,p,Object(J.b)(h,"wide"),Object(J.a)(n,"basic"),Object(J.a)(c,"flowing"),Object(J.a)(s,"inverted"),"popup transition visible",a);if(m||g)return f;var O=Object(K.a)(e,this.props),w=q.a.handledProps,x=E()(O,function(t,e,n){return D()(w,n)||(t[n]=e),t},{}),P=j()(O,w),C=Object(X.a)(e,this.props),S=H.a.createElement(Q.a,{innerRef:this.handlePopupRef},H.a.createElement(C,i()({},x,{className:y,style:b}),o,Y.a.isNil(o)&&tt.create(l,{autoGenerateKey:!1}),Y.a.isNil(o)&&$.create(u,{autoGenerateKey:!1}))),M=r()({},this.getPortalProps(),P);return H.a.createElement(q.a,i()({},M,{onClose:this.handleClose,onMount:this.handlePortalMount,onOpen:this.handleOpen,onUnmount:this.handlePortalUnmount,trigger:f,triggerRef:this.handleTriggerRef}),S)}}]),e}(V.Component);O()(nt,"defaultProps",{position:"top left",on:"hover",keepInViewPort:!0,disabled:!1}),O()(nt,"Content",$),O()(nt,"Header",tt),O()(nt,"handledProps",["as","basic","children","className","content","context","disabled","flowing","header","hideOnScroll","horizontalOffset","hoverable","inverted","keepInViewPort","on","onClose","onMount","onOpen","onUnmount","position","size","style","trigger","verticalOffset","wide"]),nt.propTypes={}}}]);