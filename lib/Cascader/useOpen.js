var __read=this&&this.__read||function(r,t){var e="function"==typeof Symbol&&r[Symbol.iterator];if(!e)return r;var a,o,n=e.call(r),i=[];try{for(;(void 0===t||0<t--)&&!(a=n.next()).done;)i.push(a.value)}catch(r){o={error:r}}finally{try{a&&!a.done&&(e=n.return)&&e.call(n)}finally{if(o)throw o.error}}return i},__spreadArray=this&&this.__spreadArray||function(r,t,e){if(e||2===arguments.length)for(var a,o=0,n=t.length;o<n;o++)!a&&o in t||((a=a||Array.prototype.slice.call(t,0,o))[o]=t[o]);return r.concat(a||Array.prototype.slice.call(t))};import React from"react";import{RESERVED_KEY}from"../utils/getTreeDataFormatted";export default function(){var r=__read(React.useState([RESERVED_KEY]),2),a=r[0],o=r[1];return{openKeys:a,openChildren:function(r,t){var e=__spreadArray([],__read(a),!1);e[t]=r,o(e)}}}