!function(){"use strict";var e,t,n,r,o,c,i,u,f,a,s={},d={};function l(e){var t=d[e];if(void 0!==t)return t.exports;var n=d[e]={id:e,loaded:!1,exports:{}};return s[e].call(n.exports,n,n.exports,l),n.loaded=!0,n.exports}l.m=s,l.amdO={},e="function"==typeof Symbol?Symbol("webpack then"):"__webpack_then__",t="function"==typeof Symbol?Symbol("webpack exports"):"__webpack_exports__",n=function(e){e&&(e.forEach((function(e){e.r--})),e.forEach((function(e){e.r--?e.r++:e()})))},r=function(e){!--e.r&&e()},o=function(e,t){e?e.push(t):r(t)},l.a=function(c,i,u){var f,a,s,d=u&&[],l=c.exports,b=!0,p=!1,m=function(t,n,r){p||(p=!0,n.r+=t.length,t.map((function(t,o){t[e](n,r)})),p=!1)},h=new Promise((function(e,t){s=t,a=function(){e(l),n(d),d=0}}));h[t]=l,h[e]=function(e,t){if(b)return r(e);f&&m(f,e,t),o(d,e),h.catch(t)},c.exports=h,i((function(c){if(!c)return a();var i,u;f=function(c){return c.map((function(c){if(null!==c&&"object"==typeof c){if(c[e])return c;if(c.then){var i=[];c.then((function(e){u[t]=e,n(i),i=0}));var u={};return u[e]=function(e,t){o(i,e),c.catch(t)},u}}var f={};return f[e]=function(e){r(e)},f[t]=c,f}))}(c);var s=new Promise((function(e,n){(i=function(){e(u=f.map((function(e){return e[t]})))}).r=0,m(f,i,n)}));return i.r?s:u})).then(a,s),b=!1},c=[],l.O=function(e,t,n,r){if(!t){var o=1/0;for(a=0;a<c.length;a++){t=c[a][0],n=c[a][1],r=c[a][2];for(var i=!0,u=0;u<t.length;u++)(!1&r||o>=r)&&Object.keys(l.O).every((function(e){return l.O[e](t[u])}))?t.splice(u--,1):(i=!1,r<o&&(o=r));if(i){c.splice(a--,1);var f=n();void 0!==f&&(e=f)}}return e}r=r||0;for(var a=c.length;a>0&&c[a-1][2]>r;a--)c[a]=c[a-1];c[a]=[t,n,r]},l.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return l.d(t,{a:t}),t},u=Object.getPrototypeOf?function(e){return Object.getPrototypeOf(e)}:function(e){return e.__proto__},l.t=function(e,t){if(1&t&&(e=this(e)),8&t)return e;if("object"==typeof e&&e){if(4&t&&e.__esModule)return e;if(16&t&&"function"==typeof e.then)return e}var n=Object.create(null);l.r(n);var r={};i=i||[null,u({}),u([]),u(u)];for(var o=2&t&&e;"object"==typeof o&&!~i.indexOf(o);o=u(o))Object.getOwnPropertyNames(o).forEach((function(t){r[t]=function(){return e[t]}}));return r.default=function(){return e},l.d(n,r),n},l.d=function(e,t){for(var n in t)l.o(t,n)&&!l.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},l.f={},l.e=function(e){return Promise.all(Object.keys(l.f).reduce((function(t,n){return l.f[n](e,t),t}),[]))},l.u=function(e){return({7:"component---src-pages-tvl-tsx",218:"component---src-pages-404-tsx",286:"component---src-pages-messages-tsx",327:"30cd56ec8b4292fd1d19f6bfd4b67b1689d06305",522:"component---src-pages-nf-ts-tsx",691:"component---src-pages-index-tsx",725:"6fc48e7e82322679cca6564d3b72eeb762acd990",804:"component---src-pages-tvb-tsx",928:"1e42d42b125026ccc8a8cd8757c7cd0b0e1d81c3"}[e]||e)+"-"+{7:"b9c4a0e13e0918a20828",218:"636f5cf08d6818c6a4d2",252:"e6055270bc45a8f871b9",286:"ddc834524d7d128fe193",294:"274e1d231f995a2aa7c2",327:"a33c291f2dbb1eda26eb",522:"6a68c68a992eb2198665",585:"df62bf00c5b724bc4421",591:"18a14a316de18e2d769d",637:"dbfd57c2c7dfa8ba820c",642:"ad33639b501201d3180d",691:"c06a0770dc5a7f12128f",725:"64618b58d5f5bb50dbd1",751:"de8bf98d9241720395ae",758:"295e5e8be5320ab931c7",804:"0c9230aef08c090d437a",928:"b89c773a292690ccf112"}[e]+".js"},l.miniCssF=function(e){return"styles.c0164c1a0884adc96daf.css"},l.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),l.hmd=function(e){return(e=Object.create(e)).children||(e.children=[]),Object.defineProperty(e,"exports",{enumerable:!0,set:function(){throw new Error("ES Modules may not assign module.exports or exports.*, Use ESM export syntax, instead: "+e.id)}}),e},l.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},f={},a="wormhole:",l.l=function(e,t,n,r){if(f[e])f[e].push(t);else{var o,c;if(void 0!==n)for(var i=document.getElementsByTagName("script"),u=0;u<i.length;u++){var s=i[u];if(s.getAttribute("src")==e||s.getAttribute("data-webpack")==a+n){o=s;break}}o||(c=!0,(o=document.createElement("script")).charset="utf-8",o.timeout=120,l.nc&&o.setAttribute("nonce",l.nc),o.setAttribute("data-webpack",a+n),o.src=e),f[e]=[t];var d=function(t,n){o.onerror=o.onload=null,clearTimeout(b);var r=f[e];if(delete f[e],o.parentNode&&o.parentNode.removeChild(o),r&&r.forEach((function(e){return e(n)})),t)return t(n)},b=setTimeout(d.bind(null,void 0,{type:"timeout",target:o}),12e4);o.onerror=d.bind(null,o.onerror),o.onload=d.bind(null,o.onload),c&&document.head.appendChild(o)}},l.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},l.nmd=function(e){return e.paths=[],e.children||(e.children=[]),e},l.v=function(e,t,n,r){var o=fetch(l.p+""+n+".module.wasm");return"function"==typeof WebAssembly.instantiateStreaming?WebAssembly.instantiateStreaming(o,r).then((function(t){return Object.assign(e,t.instance.exports)})):o.then((function(e){return e.arrayBuffer()})).then((function(e){return WebAssembly.instantiate(e,r)})).then((function(t){return Object.assign(e,t.instance.exports)}))},l.p="/wormhole-stats-2/",function(){var e={658:0,532:0};l.f.j=function(t,n){var r=l.o(e,t)?e[t]:void 0;if(0!==r)if(r)n.push(r[2]);else if(/^(532|658)$/.test(t))e[t]=0;else{var o=new Promise((function(n,o){r=e[t]=[n,o]}));n.push(r[2]=o);var c=l.p+l.u(t),i=new Error;l.l(c,(function(n){if(l.o(e,t)&&(0!==(r=e[t])&&(e[t]=void 0),r)){var o=n&&("load"===n.type?"missing":n.type),c=n&&n.target&&n.target.src;i.message="Loading chunk "+t+" failed.\n("+o+": "+c+")",i.name="ChunkLoadError",i.type=o,i.request=c,r[1](i)}}),"chunk-"+t,t)}},l.O.j=function(t){return 0===e[t]};var t=function(t,n){var r,o,c=n[0],i=n[1],u=n[2],f=0;if(c.some((function(t){return 0!==e[t]}))){for(r in i)l.o(i,r)&&(l.m[r]=i[r]);if(u)var a=u(l)}for(t&&t(n);f<c.length;f++)o=c[f],l.o(e,o)&&e[o]&&e[o][0](),e[c[f]]=0;return l.O(a)},n=self.webpackChunkwormhole=self.webpackChunkwormhole||[];n.forEach(t.bind(null,0)),n.push=t.bind(null,n.push.bind(n))}()}();
//# sourceMappingURL=webpack-runtime-4e3aa322a7db60ae2b6e.js.map