(this.webpackJsonp=this.webpackJsonp||[]).push([[7],{749:function(e,t,n){"use strict";n.r(t),n.d(t,"default",(function(){return w}));var r=n(6),a=n.n(r),u=n(9),s=n.n(u),o=n(0),c=n.n(o),l=n(2),i=n(57),f=n(7),d=n(726),p=n(70),x=n(727),b=n(139),S=n(21),h=!1,E=function(){var e,t;return s.a.async((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,s.a.awrap(d.default.request(d.default.PERMISSIONS.ACCESS_FINE_LOCATION));case 2:return e=n.sent,t=e===d.default.RESULTS.GRANTED,console.log("Location permission granted: ",t),n.abrupt("return",t);case 6:case"end":return n.stop()}}),null,null,null,Promise)},O=function(){var e,t;return s.a.async((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,s.a.awrap(d.default.request(d.default.PERMISSIONS.BLUETOOTH_CONNECT));case 2:return e=n.sent,t=e===d.default.RESULTS.GRANTED,console.log("Bluetooth permission granted: ",t),n.abrupt("return",t);case 6:case"end":return n.stop()}}),null,null,null,Promise)},T=function(){var e,t;return s.a.async((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,s.a.awrap(d.default.request(d.default.PERMISSIONS.BLUETOOTH_SCAN));case 2:return e=n.sent,t=e===d.default.RESULTS.GRANTED,console.log("Bluetooth permission granted: ",t),n.abrupt("return",t);case 6:case"end":return n.stop()}}),null,null,null,Promise)};function w(){var e=c.a.useState(),t=a()(e,2),n=t[0],r=t[1];return Object(o.useEffect)((function(){s.a.async((function(e){for(;;)switch(e.prev=e.next){case 0:if(console.log("Bluetooth init"),h){e.next=35;break}if("android"!==f.default.OS){e.next=32;break}if(console.log("Bluetooth android request permission"),e.prev=4,e.t0=f.default.Version>=23,!e.t0){e.next=10;break}return e.next=9,s.a.awrap(E());case 9:e.t0=!e.sent;case 10:if(!e.t0){e.next=12;break}return e.abrupt("return");case 12:if(e.t1=f.default.Version>=31,!e.t1){e.next=17;break}return e.next=16,s.a.awrap(O());case 16:e.t1=!e.sent;case 17:if(!e.t1){e.next=19;break}return e.abrupt("return");case 19:if(e.t2=f.default.Version>=31,!e.t2){e.next=24;break}return e.next=23,s.a.awrap(T());case 23:e.t2=!e.sent;case 24:if(!e.t2){e.next=26;break}return e.abrupt("return");case 26:e.next=32;break;case 28:return e.prev=28,e.t3=e.catch(4),console.log("request permission error:",e.t3),e.abrupt("return");case 32:console.log("Bluetooth SDK init"),Object(b.getHardwareSDKInstance)().then((function(e){r(e),e.on("UI_EVENT",(function(e){console.log("example received UI_EVENT: ",e)}))})),h=!0;case 35:case"end":return e.stop()}}),null,null,[[4,28]],Promise)}),[]),Object(S.jsx)(p.default,{children:Object(S.jsxs)(l.default,{children:[Object(S.jsx)(i.default,{children:"This is Bluetooth example page, will run on iOS / Android device. "}),n&&Object(S.jsx)(x.CallMethods,{SDK:n,type:"Bluetooth"})]})})}}}]);
//# sourceMappingURL=7.d884d0de.chunk.js.map