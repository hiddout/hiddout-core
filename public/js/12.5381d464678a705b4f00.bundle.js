(window.webpackJsonp=window.webpackJsonp||[]).push([[12,4,18],{356:function(e,t,n){var o=n(357),r=n(363);e.exports=function(e,t,n,a){var i=!n;n||(n={});for(var c=-1,l=t.length;++c<l;){var s=t[c],u=a?a(n[s],e[s],s,n,e):void 0;void 0===u&&(u=e[s]),i?r(n,s,u):o(n,s,u)}return n}},376:function(e,t,n){var o=n(357),r=n(356),a=n(377),i=n(44),c=n(169),l=n(59),s=Object.prototype.hasOwnProperty,u=a(function(e,t){if(c(t)||i(t))r(t,l(t),e);else for(var n in t)s.call(t,n)&&o(e,n,t[n])});e.exports=u},377:function(e,t,n){var o=n(168),r=n(173);e.exports=function(e){return o(function(t,n){var o=-1,a=n.length,i=a>1?n[a-1]:void 0,c=a>2?n[2]:void 0;for(i=e.length>3&&"function"==typeof i?(a--,i):void 0,c&&r(n[0],n[1],c)&&(i=a<3?void 0:i,a=1),t=Object(t);++o<a;){var l=n[o];l&&e(t,l,o,i)}return t})}},378:function(e,t,n){var o=n(363),r=n(177),a=n(81);e.exports=function(e,t){var n={};return t=a(t,3),r(e,function(e,r,a){o(n,r,t(e,r,a))}),n}},393:function(e,t,n){"use strict";n.r(t);n(26),n(29),n(30),n(27),n(362),n(181),n(31),n(28),n(32),n(33),n(34),n(35),n(36);var o=n(0),r=n.n(o),a=n(367),i=n(682),c=n(467),l=n(426),s=n(664),u=n(680),p=n(681),f=n(108),h=n(61),d=n(109),g=n(1),m=n(10);function b(e){return(b="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function v(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}function y(e,t){return!t||"object"!==b(t)&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function O(e){return(O=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function w(e,t){return(w=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function j(){return(j=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e}).apply(this,arguments)}var E=function(e){return r.a.createElement(f.b,j({exact:!0},e,{activeClassName:"active"}))},P=function(e){function t(){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),y(this,O(t).apply(this,arguments))}var n,o,f;return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&w(e,t)}(t,r.a.Component),n=t,(o=[{key:"onDropdownClick",value:function(e,t){switch(t.value){case 1:break;case 2:this.props.history.push("/settings");break;case 3:this.props.logout()}}},{key:"renderRightMenu",value:function(){var e=this,t=this.props.auth.isAuth,n=null,o=r.a.createElement(i.a.Item,{as:E,to:"/submit"},r.a.createElement(c.a,{trigger:r.a.createElement(l.a,{name:"signup"}),content:Object(a.t)("create a post")}));if(t){var f=r.a.createElement("span",null,r.a.createElement(s.a,{avatar:!0,src:"/public/static/Hiddout.png"})," ",this.props.auth.user),h=[{key:"userId",text:r.a.createElement("span",{style:{color:"gray"}},Object(a.t)("signed in as")," ",r.a.createElement("strong",{style:{color:"green"}},this.props.auth.user)),value:0},{key:"user",text:"Account",icon:"user",value:1},{key:"settings",text:"Settings",icon:"settings",value:2},{key:"sign-out",text:"Sign Out",icon:"sign out",value:3}];n=r.a.createElement(r.a.Fragment,null,r.a.createElement(i.a.Item,null,r.a.createElement(u.a,{onChange:this.onDropdownClick.bind(this),trigger:f,options:h,icon:null})),o)}else n=r.a.createElement(r.a.Fragment,null,r.a.createElement(i.a.Item,null,r.a.createElement(p.a,{content:Object(a.t)("loginBtn"),primary:!0,onClick:function(){return e.props.openLoginModal()}})),r.a.createElement(i.a.Item,null,r.a.createElement(p.a,{content:Object(a.t)("signupBtn"),positive:!0,onClick:function(){return e.props.openSignUpModal()}})),o);return n}},{key:"render",value:function(){return r.a.createElement(i.a,{fixed:"top"},r.a.createElement(i.a.Item,null,r.a.createElement(s.a,{src:"/public/static/Hiddout.png",avatar:!0})),r.a.createElement(i.a.Item,{name:Object(a.t)("homeMenu"),as:E,to:"/"}),r.a.createElement(i.a.Item,{name:Object(a.t)("messagesMenu"),as:E,to:"/message"}),r.a.createElement(i.a.Item,{name:Object(a.t)("friendsMenu"),as:E,to:"/friend"}),r.a.createElement(i.a.Menu,{position:"right"},this.renderRightMenu()))}}])&&v(n.prototype,o),f&&v(n,f),t}();t.default=Object(h.g)(Object(m.c)(function(e){return{i18n:e.i18n,auth:e.auth}},function(e){return{logout:function(){e(Object(d.d)())},openLoginModal:function(){e(Object(d.e)())},openSignUpModal:function(){e(Object(d.f)())},changeLanguage:function(t){var n;e((n=t,{type:g.a,payload:{language:n}}))}}})(P))},467:function(e,t,n){"use strict";var o=n(352),r=n.n(o),a=n(17),i=n.n(a),c=n(344),l=n.n(c),s=n(345),u=n.n(s),p=n(347),f=n.n(p),h=n(346),d=n.n(h),g=n(349),m=n.n(g),b=n(348),v=n.n(b),y=n(350),O=n.n(y),w=n(374),j=n.n(w),E=n(373),P=n.n(E),C=n(376),S=n.n(C),k=n(351),M=n.n(k),x=n(21),I=n.n(x),T=n(378),N=n.n(T),R=n(384),U=n.n(R),_=n(366),D=n.n(_),L=n(107),z=n.n(L),B=n(18),H=n.n(B),V=(n(2),n(0)),A=n.n(V),F=n(218),W=n(220),G=n(114),J=n(15),K=n(102),X=n(103),Y=n(16),q=n(684),Q=n(683),Z=n(216);function $(e){var t=e.children,n=e.className,o=e.content,r=H()("content",n),a=Object(K.a)($,e),c=Object(X.a)($,e);return A.a.createElement(c,i()({},a,{className:r}),Y.a.isNil(t)?o:t)}function ee(e){var t=e.children,n=e.className,o=e.content,r=H()("header",n),a=Object(K.a)(ee,e),c=Object(X.a)(ee,e);return A.a.createElement(c,i()({},a,{className:r}),Y.a.isNil(t)?o:t)}$.handledProps=["as","children","className","content"],$.propTypes={},$.create=Object(Z.e)($,function(e){return{children:e}}),ee.handledProps=["as","children","className","content"],ee.propTypes={},ee.create=Object(Z.e)(ee,function(e){return{children:e}}),n.d(t,"a",function(){return ne});var te=["top left","top right","bottom right","bottom left","right center","left center","top center","bottom center"],ne=function(e){function t(){var e,n;l()(this,t);for(var o=arguments.length,r=new Array(o),a=0;a<o;a++)r[a]=arguments[a];return n=f()(this,(e=d()(t)).call.apply(e,[this].concat(r))),O()(v()(v()(n)),"state",{}),O()(v()(v()(n)),"computePopupStyle",function(e){var t={position:"absolute"},o=n.getContext();if(!Object(F.a)())return t;var r=n.props,a=r.horizontalOffset,i=r.verticalOffset,c=window,l=c.pageYOffset,s=c.pageXOffset,u=document.documentElement,p=u.clientWidth,f=u.clientHeight,h=n.coords||o.getBoundingClientRect();if(D()(e,"right"))t.right=Math.round(p-(h.right+s)),t.left="auto";else if(D()(e,"left"))t.left=Math.round(h.left+s),t.right="auto";else{var d=(h.width-n.popupCoords.width)/2;t.left=Math.round(h.left+d+s),t.right="auto"}if(D()(e,"top"))t.bottom=Math.round(f-(h.top+l)),t.top="auto";else if(D()(e,"bottom"))t.top=Math.round(h.bottom+l),t.bottom="auto";else{var g=(h.height+n.popupCoords.height)/2;t.top=Math.round(h.bottom+l-g),t.bottom="auto";var m=n.popupCoords.width+8;D()(e,"right")?t.right-=m:t.left-=m}return a&&(U()(t.right)?t.right-=a:t.left-=a),i&&(U()(t.top)?t.top+=i:t.bottom+=i),t}),O()(v()(v()(n)),"isStyleInViewport",function(e){var t=window,o=t.pageYOffset,r=t.pageXOffset,a=document.documentElement,i=a.clientWidth,c=a.clientHeight,l={top:e.top,left:e.left,width:n.popupCoords.width,height:n.popupCoords.height};return U()(e.right)&&(l.left=i-e.right-l.width),U()(e.bottom)&&(l.top=c-e.bottom-l.height),!(l.top<o)&&(!(l.top+l.height>o+c)&&(!(l.left<r)&&!(l.left+l.width>r+i)))}),O()(v()(v()(n)),"setPopupStyle",function(){var e=n.getContext();if((n.coords||e)&&n.popupCoords){var t=n.props.position,o=n.computePopupStyle(t);if(n.props.keepInViewPort)for(var r=z()(te,t).concat([t]),a=0;!n.isStyleInViewport(o)&&a<r.length;a+=1)o=n.computePopupStyle(r[a]),t=r[a];o=N()(o,function(e){return U()(e)?"".concat(e,"px"):e}),n.setState({style:o,position:t})}}),O()(v()(v()(n)),"getPortalProps",function(){var e={},t=n.props,o=t.on,r=t.hoverable,a=I()(o)?o:[o];return r&&(e.closeOnPortalMouseLeave=!0,e.mouseLeaveDelay=300),D()(a,"click")&&(e.openOnTriggerClick=!0,e.closeOnTriggerClick=!0,e.closeOnDocumentClick=!0),D()(a,"focus")&&(e.openOnTriggerFocus=!0,e.closeOnTriggerBlur=!0),D()(a,"hover")&&(e.openOnTriggerMouseEnter=!0,e.closeOnTriggerMouseLeave=!0,e.mouseLeaveDelay=70,e.mouseEnterDelay=50),e}),O()(v()(v()(n)),"hideOnScroll",function(e){n.setState({closed:!0}),W.a.unsub("scroll",n.hideOnScroll,{target:window}),n.timeoutId=setTimeout(function(){n.setState({closed:!1})},50),n.handleClose(e)}),O()(v()(v()(n)),"handleClose",function(e){M()(n.props,"onClose",e,n.props)}),O()(v()(v()(n)),"handleOpen",function(e){n.coords=n.getContext().getBoundingClientRect(),M()(n.props,"onOpen",e,n.props)}),O()(v()(v()(n)),"handlePortalMount",function(e){n.props.hideOnScroll&&W.a.sub("scroll",n.hideOnScroll,{target:window}),n.setPopupStyle(),M()(n.props,"onMount",e,n.props)}),O()(v()(v()(n)),"handlePortalUnmount",function(e){n.props.hideOnScroll&&W.a.unsub("scroll",n.hideOnScroll,{target:window}),M()(n.props,"onUnmount",e,n.props)}),O()(v()(v()(n)),"handlePopupRef",function(e){n.popupCoords=e?e.getBoundingClientRect():null,n.setPopupStyle()}),O()(v()(v()(n)),"handleTriggerRef",function(e){n.triggerRef=e,n.setPopupStyle()}),O()(v()(v()(n)),"getContext",function(){var e=n.props.context;return(Object(G.b)(e)?e.current:e)||n.triggerRef}),n}return m()(t,e),u()(t,[{key:"componentDidUpdate",value:function(e){var t=this.props,n=t.horizontalOffset,o=t.verticalOffset;n===e.horizontalOffset&&o===e.verticalOffset||this.setPopupStyle()}},{key:"componentWillUnmount",value:function(){clearTimeout(this.timeoutId)}},{key:"render",value:function(){var e=this.props,n=e.basic,o=e.children,a=e.className,c=e.content,l=e.flowing,s=e.header,u=e.inverted,p=e.size,f=e.trigger,h=e.wide,d=e.disabled,g=this.state,m=g.position,b=g.closed,v=S()({},this.state.style,this.props.style),y=H()("ui",m,p,Object(J.b)(h,"wide"),Object(J.a)(n,"basic"),Object(J.a)(l,"flowing"),Object(J.a)(u,"inverted"),"popup transition visible",a);if(b||d)return f;var O=Object(K.a)(t,this.props),w=q.a.handledProps,E=P()(O,function(e,t,n){return D()(w,n)||(e[n]=t),e},{}),C=j()(O,w),k=Object(X.a)(t,this.props),M=A.a.createElement(Q.a,{innerRef:this.handlePopupRef},A.a.createElement(k,i()({},E,{className:y,style:v}),o,Y.a.isNil(o)&&ee.create(s,{autoGenerateKey:!1}),Y.a.isNil(o)&&$.create(c,{autoGenerateKey:!1}))),x=r()({},this.getPortalProps(),C);return A.a.createElement(q.a,i()({},x,{onClose:this.handleClose,onMount:this.handlePortalMount,onOpen:this.handleOpen,onUnmount:this.handlePortalUnmount,trigger:f,triggerRef:this.handleTriggerRef}),M)}}]),t}(V.Component);O()(ne,"defaultProps",{position:"top left",on:"hover",keepInViewPort:!0,disabled:!1}),O()(ne,"Content",$),O()(ne,"Header",ee),O()(ne,"handledProps",["as","basic","children","className","content","context","disabled","flowing","header","hideOnScroll","horizontalOffset","hoverable","inverted","keepInViewPort","on","onClose","onMount","onOpen","onUnmount","position","size","style","trigger","verticalOffset","wide"]),ne.propTypes={}}}]);