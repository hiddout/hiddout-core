(window.webpackJsonp=window.webpackJsonp||[]).push([[16],{425:function(e,t,n){"use strict";var r=n(121)(1),o=n(120)("map");n(6)({target:"Array",proto:!0,forced:!o},{map:function(e){return r(this,e,arguments[1])}})},660:function(e,t,n){"use strict";n.r(t);n(26),n(29),n(30),n(165),n(27),n(425),n(31),n(28),n(32),n(33),n(34),n(82),n(35),n(36);var r=n(0),o=n.n(r),a=n(678),i=n(465),c=n(10);function u(e){return(u="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function l(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function f(e){return(f=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function s(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function p(e,t){return(p=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}var y=o.a.lazy(function(){return Promise.resolve().then(n.bind(null,382))}),b=function(e){function t(){var e,n,r,o,a,i,c;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);for(var l=arguments.length,p=new Array(l),y=0;y<l;y++)p[y]=arguments[y];return r=this,n=!(o=(e=f(t)).call.apply(e,[this].concat(p)))||"object"!==u(o)&&"function"!=typeof o?s(r):o,a=s(n),c={isReplying:!1},(i="state")in a?Object.defineProperty(a,i,{value:c,enumerable:!0,configurable:!0,writable:!0}):a[i]=c,n}var n,r,c;return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&p(e,t)}(t,o.a.Component),n=t,(r=[{key:"render",value:function(){var e=this,t=this.props.post.comments;return o.a.createElement(a.a.Group,null,o.a.createElement(i.a,{as:"h3",dividing:!0},"Comments"),!!t.length&&t.map(function(t,n){return o.a.createElement(a.a,{key:n},o.a.createElement(a.a.Content,null,o.a.createElement(a.a.Author,{as:"a"},t.userId),o.a.createElement(a.a.Metadata,null,o.a.createElement("div",null,t.createTime)),o.a.createElement(a.a.Text,null,t.content),o.a.createElement(a.a.Actions,null,o.a.createElement(a.a.Action,{onClick:function(){e.setState({isReplying:!e.state.isReplying})}},"Reply"))))}),this.state.isReplying&&o.a.createElement(y,{ButtonText:"Reply",onClick:function(){},onChange:function(){},disabled:!1}))}}])&&l(n.prototype,r),c&&l(n,c),t}();t.default=Object(c.c)(function(e){return{post:e.post}})(b)}}]);