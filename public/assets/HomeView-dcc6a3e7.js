import{u as g,r as h,o as u,c as f,a as e,n as V,t as c,b as l,d as i,s as _,e as $,F as y,f as O,g as k,_ as w,h as x,i as v,w as C,j as z}from"./index-f349b643.js";import{_ as S}from"./OfferCard-b3fe240d.js";import{s as L}from"./rating.esm-4bc98133.js";import{_ as U}from"./Title-58a5dee9.js";import{s as H}from"./dropdown.esm-a763a3fe.js";import"./virtualscroller.esm-61d5d0a7.js";const R={class:"home-offers"},A={id:"special-offer",class:"special-offer-container"},F=e("h4",{class:"ribbon"},"Oferta Zilei!",-1),T={class:"special-offer-info"},B=e("div",{class:"bg"},null,-1),D={class:"special-offer-details"},I={class:"offer-details"},N={class:"special-offer-price"},P=e("span",{class:"currency"},"€",-1),j={class:"price-specification"},E={id:"offers",class:"offers-container"},Z={__name:"HomeOffers",setup(b){const n=g(),o=h({}),d=h([]);setTimeout(()=>{o.value=n.offers[0],o.value.rating=parseFloat(o.value.rating,10),d.value=n.offers.slice(0,6)},300);function m(p){n.setRezervationVisible(!0),n.setOffer(p)}return(p,r)=>(u(),f("div",R,[e("div",A,[e("div",{class:"special-offer",style:V({backgroundImage:`url(${o.value.img})`})},[F,e("div",T,[B,e("div",D,[e("h1",null,c(o.value.title),1),e("h2",null,c(o.value.country),1),e("h5",null,c(o.value.location),1),l(i(L),{modelValue:o.value.rating,"onUpdate:modelValue":r[0]||(r[0]=a=>o.value.rating=a),stars:5,readonly:"",cancel:!1},null,8,["modelValue"]),e("p",null,c(o.value.description),1)]),e("div",I,[l(i(_),{label:"Rezervă",onClick:r[1]||(r[1]=a=>m(o.value))}),e("div",N,[e("div",null,[$(c(parseFloat(o.value.price).toLocaleString("ro-RO"))+" ",1),P]),e("div",j,c(o.value.duration)+" nopti",1)])])])],4)]),l(U,{text:"Oferte Populare"}),e("div",E,[(u(!0),f(y,null,O(d.value,a=>(u(),k(S,{key:a.id,offer:a},null,8,["offer"]))),128))])]))}};const q={class:"home-container"},G=e("div",{class:"home-filter"},null,-1),J=["src"],K={class:"home-card"},M=e("h2",null,"Noua ta aventura incepe aici!",-1),Q={class:"call-to-action-container"},W={class:"cta-box"},X=e("h3",null,"Oferta zilei!",-1),Y=e("p",null," Lorem ipsum dolor sit amet consectetur, adipisicing elit. Impedit eveniet nihil aperiam, velit illo cupiditate dolorum minima fugiat optio! ",-1),ee={class:"cta-box"},oe=e("h3",null,"Oferte populare!",-1),se=e("p",null," Lorem ipsum dolor sit amet consectetur, adipisicing elit. Impedit eveniet nihil aperiam, velit illo cupiditate dolorum minima fugiat optio! ",-1),te={class:"home-search-container"},le={class:"home-search-bg"},ae=e("i",{class:"pi pi-map-marker"},null,-1),ie={class:"p-input-icon-left p-float-label"},ne=e("i",{class:"pi pi-home"},null,-1),re=e("label",{for:"rooms"},"Camere",-1),ce={class:"p-input-icon-left p-float-label"},ue=e("i",{class:"pi pi-user"},null,-1),de=e("label",{for:"rooms"},"Adulti",-1),pe={class:"p-input-icon-left p-float-label"},_e=e("i",{class:"pi pi-users"},null,-1),fe=e("label",{for:"rooms"},"Copii",-1),me={__name:"HomeTop",setup(b){const n=g(),o=h({location:"",date:"",rooms:"",adults:"",children:""});function d(){let a=new Set;for(const t of n.offers)a.add(t.country);return[...a].map(t=>({label:t,value:t}))}let m=`${new URL("/assets/frank-mckenna-OD9EOzfSOh0-unsplash-51ec5306.jpg",self.location).href}`;function p(){n.setSearchParams(o.value),z.push({name:"offers"})}function r(a){window.location.href=a}return(a,s)=>(u(),f("div",q,[G,e("img",{src:i(m),class:"home-image"},null,8,J),e("div",K,[l(w,{bg:"var(--color-3)",plane:"#fff"},null,8,["bg"]),M,e("div",Q,[e("div",W,[X,Y,l(i(_),{label:"Vizioneaza oferta",onClick:s[0]||(s[0]=t=>r("#special-offer"))})]),e("div",ee,[oe,se,l(i(_),{label:"Rasfoieste ofertele",onClick:s[1]||(s[1]=t=>r("#offers"))})])])]),e("div",te,[e("div",le,[ae,l(i(H),{modelValue:o.value.location,"onUpdate:modelValue":s[2]||(s[2]=t=>o.value.location=t),options:d(),optionLabel:"label",optionValue:"value",placeholder:"Locatie",showClear:""},null,8,["modelValue","options"]),l(i(x),{modelValue:o.value.date,"onUpdate:modelValue":s[3]||(s[3]=t=>o.value.date=t),dateFormat:"dd/mm/yy",showIcon:"",placeholder:"Data plecare",showClear:""},null,8,["modelValue"]),e("span",ie,[ne,l(i(v),{modelValue:o.value.rooms,"onUpdate:modelValue":s[4]||(s[4]=t=>o.value.rooms=t),type:"number"},null,8,["modelValue"]),re]),e("span",ce,[ue,l(i(v),{modelValue:o.value.adults,"onUpdate:modelValue":s[5]||(s[5]=t=>o.value.adults=t),type:"number"},null,8,["modelValue"]),de]),e("span",pe,[_e,l(i(v),{modelValue:o.value.children,"onUpdate:modelValue":s[6]||(s[6]=t=>o.value.children=t),type:"number"},null,8,["modelValue"]),fe]),l(i(_),{class:"home-search-button",type:"button",onClick:s[7]||(s[7]=t=>p())},{default:C(()=>[$("Cauta")]),_:1})])])]))}};const ve={class:"home"},Oe={__name:"HomeView",setup(b){return(n,o)=>(u(),f("div",ve,[l(me),l(Z)]))}};export{Oe as default};
