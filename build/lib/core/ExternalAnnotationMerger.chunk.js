/** Notice * This file contains works from many authors under various (but compatible) licenses. Please see core.txt for more information. **/
(function(){(window.wpCoreControlsBundle=window.wpCoreControlsBundle||[]).push([[7],{364:function(ha,ca,h){h.r(ca);var ba=h(3),aa=h(388),fa=h(389),da;(function(h){h[h.EXTERNAL_XFDF_NOT_REQUESTED=0]="EXTERNAL_XFDF_NOT_REQUESTED";h[h.EXTERNAL_XFDF_NOT_AVAILABLE=1]="EXTERNAL_XFDF_NOT_AVAILABLE";h[h.EXTERNAL_XFDF_AVAILABLE=2]="EXTERNAL_XFDF_AVAILABLE"})(da||(da={}));ha=function(){function h(h){this.N=h;this.state=da.EXTERNAL_XFDF_NOT_REQUESTED}h.prototype.D3=function(){var h=this;return function(f,e,x){return Object(ba.b)(h,
void 0,void 0,function(){var h,w,n,y,z,aa,ca,fa=this,ha;return Object(ba.d)(this,function(r){switch(r.label){case 0:if(this.state!==da.EXTERNAL_XFDF_NOT_REQUESTED)return[3,2];h=this.N.getDocument().oq();return[4,this.i2(h)];case 1:w=r.la(),n=this.JZ(w),this.gE=null!==(ha=null===n||void 0===n?void 0:n.parse())&&void 0!==ha?ha:null,this.state=null===this.gE?da.EXTERNAL_XFDF_NOT_AVAILABLE:da.EXTERNAL_XFDF_AVAILABLE,r.label=2;case 2:if(this.state===da.EXTERNAL_XFDF_NOT_AVAILABLE)return x(f),[2];y=new DOMParser;
z=y.parseFromString(f,"text/xml");e.forEach(function(e){fa.merge(z,fa.gE,e)});aa=new XMLSerializer;ca=aa.serializeToString(z);x(ca);return[2]}})})}};h.prototype.GH=function(h){this.i2=h};h.prototype.ce=function(){this.gE=void 0;this.state=da.EXTERNAL_XFDF_NOT_REQUESTED};h.prototype.JZ=function(h){return h?Array.isArray(h)?new aa.a(h):"string"!==typeof h?null:(new DOMParser).parseFromString(h,"text/xml").querySelector("xfdf > add")?new aa.a(h):new fa.a(h):null};h.prototype.merge=function(h,f,e){var x=
this;0===e&&(this.N5(h,f.sn),this.P5(h,f.PD));var r=f.aa[e];r&&(this.Q5(h,r.zl),this.S5(h,r.iU,f.At),this.R5(h,r.page,e),this.O5(h,r.SM));r=this.N.gc();if(e===r-1){var w=f.At;Object.keys(w).forEach(function(e){w[e].mF||x.dQ(h,e,w[e])})}};h.prototype.N5=function(h,f){null!==f&&(h=this.Ms(h),this.Io(h,"calculation-order",f))};h.prototype.P5=function(h,f){null!==f&&(h=this.Ms(h),this.Io(h,"document-actions",f))};h.prototype.Q5=function(h,f){var e=this,x=this.Ls(h.querySelector("xfdf"),"annots");Object.keys(f).forEach(function(h){e.Io(x,
'[name="'+h+'"]',f[h])})};h.prototype.S5=function(h,f,e){var x=this;if(0!==f.length){var r=this.Ms(h);f.forEach(function(f){var n=f.getAttribute("field"),w=e[n];w&&(x.dQ(h,n,w),x.Io(r,"null",f))})}};h.prototype.dQ=function(h,f,e){var x=this.Ms(h);null!==e.Dy&&this.Io(x,'ffield [name="'+f+'"]',e.Dy);h=this.Ls(h.querySelector("xfdf"),"fields");f=f.split(".");this.SG(h,f,0,e.value);e.mF=!0};h.prototype.R5=function(h,f,e){null!==f&&(h=this.Ms(h),h=this.Ls(h,"pages"),this.Io(h,'[number="'+(e+1)+'"]',f))};
h.prototype.O5=function(h,f){Object.keys(f).forEach(function(e){(e=h.querySelector('annots [name="'+e+'"]'))&&e.parentElement.removeChild(e)})};h.prototype.SG=function(h,f,e,x){if(e===f.length)f=document.createElementNS("","value"),f.textContent=x,this.Io(h,"value",f);else{var r=f[e];this.Ls(h,'[name="'+r+'"]',"field").setAttribute("name",r);h=h.querySelectorAll('[name="'+r+'"]');1===h.length?this.SG(h[0],f,e+1,x):(r=this.i1(h),this.SG(e===f.length-1?r:this.Zaa(h,r),f,e+1,x))}};h.prototype.i1=function(h){for(var f=
null,e=0;e<h.length;e++){var x=h[e];if(0===x.childElementCount||1===x.childElementCount&&"value"===x.children[0].tagName){f=x;break}}return f};h.prototype.Zaa=function(h,f){for(var e=0;e<h.length;e++)if(h[e]!==f)return h[e];return null};h.prototype.Io=function(h,f,e){f=h.querySelector(f);null!==f&&h.removeChild(f);h.appendChild(e)};h.prototype.Ms=function(h){var f=h.querySelector("pdf-info");if(null!==f)return f;f=this.Ls(h.querySelector("xfdf"),"pdf-info");f.setAttribute("xmlns","http://www.pdftron.com/pdfinfo");
f.setAttribute("version","2");f.setAttribute("import-version","3");return f};h.prototype.Ls=function(h,f,e){var x=h.querySelector(f);if(null!==x)return x;x=document.createElementNS("",e||f);h.appendChild(x);return x};return h}();ca["default"]=ha},374:function(ha,ca){ha=function(){function h(){}h.prototype.lx=function(h){var aa={sn:null,PD:null,At:{},aa:{}};h=(new DOMParser).parseFromString(h,"text/xml");aa.sn=h.querySelector("pdf-info calculation-order");aa.PD=h.querySelector("pdf-info document-actions");
aa.At=this.I6(h);aa.aa=this.U6(h);return aa};h.prototype.I6=function(h){var aa=h.querySelector("fields");h=h.querySelectorAll("pdf-info > ffield");if(null===aa&&null===h)return{};var ba={};this.NX(ba,aa);this.LX(ba,h);return ba};h.prototype.NX=function(h,aa){if(null!==aa&&aa.children){for(var ba=[],ca=0;ca<aa.children.length;ca++){var z=aa.children[ca];ba.push({name:z.getAttribute("name"),element:z})}for(;0!==ba.length;)for(aa=ba.shift(),ca=0;ca<aa.element.children.length;ca++)z=aa.element.children[ca],
"value"===z.tagName?h[aa.name]={value:z.textContent,Dy:null,mF:!1}:z.children&&ba.push({name:aa.name+"."+z.getAttribute("name"),element:z})}};h.prototype.LX=function(h,aa){aa.forEach(function(aa){var ba=aa.getAttribute("name");h[ba]?h[ba].Dy=aa:h[ba]={value:null,Dy:aa,mF:!1}})};h.prototype.U6=function(h){var aa=this,ba={};h.querySelectorAll("pdf-info widget").forEach(function(h){var z=parseInt(h.getAttribute("page"),10)-1;aa.wz(ba,z);ba[z].iU.push(h)});h.querySelectorAll("pdf-info page").forEach(function(h){var z=
parseInt(h.getAttribute("number"),10)-1;aa.wz(ba,z);ba[z].page=h});this.iO(h).forEach(function(h){var z=parseInt(h.getAttribute("page"),10),y=h.getAttribute("name");aa.wz(ba,z);ba[z].zl[y]=h});this.TN(h).forEach(function(h){var z=parseInt(h.getAttribute("page"),10);h=h.textContent;aa.wz(ba,z);ba[z].SM[h]=!0});return ba};h.prototype.wz=function(h,aa){h[aa]||(h[aa]={zl:{},SM:{},iU:[],page:null})};return h}();ca.a=ha},388:function(ha,ca,h){var ba=h(3),aa=h(0);h.n(aa);ha=function(h){function ca(z){var y=
h.call(this)||this;y.Y0=Array.isArray(z)?z:[z];return y}Object(ba.c)(ca,h);ca.prototype.parse=function(){var h=this,y={sn:null,PD:null,At:{},aa:{}};this.Y0.forEach(function(f){y=Object(aa.merge)(y,h.lx(f))});return y};ca.prototype.iO=function(h){var y=[];h.querySelectorAll("add > *").forEach(function(f){y.push(f)});h.querySelectorAll("modify > *").forEach(function(f){y.push(f)});return y};ca.prototype.TN=function(h){return h.querySelectorAll("delete > *")};return ca}(h(374).a);ca.a=ha},389:function(ha,
ca,h){var ba=h(3);ha=function(h){function aa(aa){var z=h.call(this)||this;z.Z0=aa;return z}Object(ba.c)(aa,h);aa.prototype.parse=function(){return this.lx(this.Z0)};aa.prototype.iO=function(h){return h.querySelectorAll("annots > *")};aa.prototype.TN=function(){return[]};return aa}(h(374).a);ca.a=ha}}]);}).call(this || window)