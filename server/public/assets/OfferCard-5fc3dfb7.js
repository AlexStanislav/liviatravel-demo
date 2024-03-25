import{B as S,p as T,o as s,c as o,v as n,w as u,x as r,b as t,a as w,r as k,g as N,i as $,C as p,d as i,t as a,e as R,f as v,X as z,s as g,Y as C}from"./index-dc675252.js";import{s as I}from"./rating.esm-24f4a87e.js";var L={root:"p-card p-component",header:"p-card-header",body:"p-card-body",caption:"p-card-caption",title:"p-card-title",subtitle:"p-card-subtitle",content:"p-card-content",footer:"p-card-footer"},P=S.extend({name:"card",classes:L}),j={name:"BaseCard",extends:T,style:P},O={name:"Card",extends:j};function q(e,c,h,l,d,b){return s(),o("div",n({class:e.cx("root")},e.ptm("root")),[e.$slots.header?(s(),o("div",n({key:0,class:e.cx("header")},e.ptm("header")),[u(e.$slots,"header")],16)):r("",!0),t("div",n({class:e.cx("body")},e.ptm("body")),[e.$slots.title||e.$slots.subtitle?(s(),o("div",n({key:0,class:e.cx("caption")},e.ptm("caption")),[e.$slots.title?(s(),o("div",n({key:0,class:e.cx("title")},e.ptm("title")),[u(e.$slots,"title")],16)):r("",!0),e.$slots.subtitle?(s(),o("div",n({key:1,class:e.cx("subtitle")},e.ptm("subtitle")),[u(e.$slots,"subtitle")],16)):r("",!0)],16)):r("",!0),t("div",n({class:e.cx("content")},e.ptm("content")),[u(e.$slots,"content")],16),e.$slots.footer?(s(),o("div",n({key:1,class:e.cx("footer")},e.ptm("footer")),[u(e.$slots,"footer")],16)):r("",!0)],16)],16)}O.render=q;const A=["src"],D={key:0},E={key:1},F={class:"offer-price"},M={class:"offer-price-container"},U=t("div",{class:"price-text"},"Incepand de la",-1),X={class:"price-value"},Y=t("span",{class:"currency"},"€",-1),G=t("div",{class:"price-text"},"per pers.",-1),H={class:"price-specification"},J={key:0},K={key:1},Z={__name:"OfferCard",props:{offer:{type:Object,required:!0,default:()=>({})}},setup(e){const c=w(),h=e,l=k(!1);let d=k(0);function b(m){c.setOffer(m),c.setOfferType("offer"),C.push({name:"offer"})}function V(m){c.setTour(m),c.setOfferType("tour"),C.push({name:"offer"})}function B(){d.value=parseInt(h.offer.rating,10)}return N(()=>{B(),l.value=h.offer.arrival!==void 0}),(m,f)=>(s(),$(v(O),null,{header:p(()=>[t("img",{src:e.offer.img,alt:""},null,8,A)]),title:p(()=>[i(a(e.offer.title),1)]),subtitle:p(()=>[t("div",null,a(e.offer.country)+" "+a(e.offer.location),1),R(v(I),{modelValue:v(d),"onUpdate:modelValue":f[0]||(f[0]=y=>z(d)?d.value=y:d=y),stars:5,readonly:"",cancel:!1},null,8,["modelValue"])]),content:p(()=>[l.value?r("",!0):(s(),o("p",D,a(e.offer.description),1)),l.value?(s(),o("p",E,[t("ul",null,[t("li",null,[i("Plecare - "),t("span",null,a(e.offer.departure),1)]),t("li",null,[i("Intoarcere - "),t("span",null,a(e.offer.arrival),1)]),t("li",null,[i("Locuri disponibile: "),t("span",null,a(e.offer.available),1)])])])):r("",!0)]),footer:p(()=>[l.value?r("",!0):(s(),$(v(g),{key:0,label:"Vezi Oferta",onClick:f[1]||(f[1]=y=>b(e.offer))})),l.value?(s(),$(v(g),{key:1,label:"Vezi Oferta",onClick:f[2]||(f[2]=y=>V(e.offer))})):r("",!0),t("div",F,[t("div",M,[U,t("div",X,[i(a(parseFloat(e.offer.price).toLocaleString("ro-RO"))+" ",1),Y]),G]),t("div",H,[i(a(e.offer.duration)+" ",1),l.value?r("",!0):(s(),o("span",J,"nopti")),i(),l.value?(s(),o("span",K,"zile")):r("",!0)])])]),_:1}))}};export{Z as _};