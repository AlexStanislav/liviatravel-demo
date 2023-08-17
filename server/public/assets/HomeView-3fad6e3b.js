import{u as k,a as $,o as c,c as v,b as e,t as a,d as f,e as i,f as n,s as h,r as g,n as x,F as y,g as V,h as C,_ as w,i as R,j as b,w as q,k as S}from"./index-6d752bde.js";import{_ as T}from"./OfferCard-0d131e4a.js";import{s as L}from"./rating.esm-4a9d53c7.js";import{_ as O}from"./Title-98c4a57c.js";import{s as z}from"./dropdown.esm-0e34937d.js";import"./virtualscroller.esm-eba23f9b.js";const D={class:"tour-card"},H=["src"],U={class:"tour-info"},B={class:"tour-title"},N={class:"tour-country"},j={class:"tour-location"},A={class:"tour-departure"},F={class:"tour-arrival"},I={class:"tour-duration"},P={class:"tour-price"},E=e("h3",null,"Detalii",-1),J={class:"tour-description"},M={__name:"TourCard",props:{tour:{type:Object,default:function(){return{title:"Demo Tour",country:"Romania",location:"Cluj Napoca si Transilvania Nord",departure:"06:00 Bucuresti",arrival:"22:00 Bucuresti",duration:"3",price:"750",description:"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Recusandae in atque quam nisi, soluta voluptate libero a obcaecati aspernatur quas possimus odit voluptas iste adipisci. Sunt ipsam tenetur eligendi temporibus? Lorem ipsum, dolor sit amet consectetur adipisicing elit. Recusandae in atque quam nisi, soluta voluptate libero a obcaecati aspernatur quas possimus odit voluptas iste adipisci. Sunt ipsam tenetur eligendi temporibus? Lorem ipsum, dolor sit amet consectetur adipisicing elit. Recusandae in atque quam nisi, soluta voluptate libero a obcaecati aspernatur quas possimus odit voluptas iste adipisci. Sunt ipsam tenetur eligendi temporibus? Lorem ipsum, dolor sit amet consectetur adipisicing elit. Recusandae in atque quam nisi, soluta voluptate libero a obcaecati aspernatur quas possimus odit voluptas iste adipisci. Sunt ipsam tenetur eligendi temporibus?",rating:4,available:25,img:"http://localhost:3000/images/chuttersnap-JH0wCegJsrQ-unsplash.jpg"}}}},setup(l){const r=k(),t=$();function p(d){t.setTour(d),t.setOfferType("tour"),r.push({name:"offer"})}return(d,m)=>(c(),v("section",D,[e("img",{src:l.tour.img,alt:"",class:"tour-img"},null,8,H),e("section",U,[e("div",B,a(l.tour.title),1),e("div",N,a(l.tour.country),1),e("div",j,a(l.tour.location),1),e("div",A,[f(" Plecare: "),e("span",null,a(l.tour.departure),1)]),e("div",F,[f(" Intoarcere: "),e("span",null,a(l.tour.arrival),1)]),e("div",I,[f(" Durata: "),e("span",null,a(l.tour.duration)+" zile",1)]),e("div",P,[e("span",null,a(l.tour.price)+" €",1),f(" per adult ")]),E,e("div",J,a(l.tour.description),1),i(n(h),{label:"Mai multe",onClick:m[0]||(m[0]=_=>p(l.tour))})])]))}};const Q={class:"home-offers"},Z={id:"special-offer",class:"special-offer-container"},G=e("h4",{class:"ribbon"},"Oferta Zilei!",-1),K={class:"special-offer-info"},W=e("div",{class:"bg"},null,-1),X={class:"special-offer-details"},Y={class:"offer-details"},ee={class:"special-offer-price"},te=e("span",{class:"currency"},"€",-1),oe={class:"price-specification"},se={id:"offers",class:"offers-container"},ie={id:"tours",class:"tours-container"},ae={__name:"HomeOffers",setup(l){const r=$(),t=g({}),p=g([]),d=g([]);setTimeout(()=>{t.value=r.offers[0],t.value.rating=parseFloat(t.value.rating,10),p.value=r.offers.slice(0,6),d.value=r.tours.slice(0,2)},300);function m(_){r.setRezervationVisible(!0),r.setOffer(_)}return(_,u)=>(c(),v("div",Q,[e("div",Z,[e("div",{class:"special-offer",style:x({backgroundImage:`url(${t.value.img})`})},[G,e("div",K,[W,e("div",X,[e("h1",null,a(t.value.title),1),e("h2",null,a(t.value.country),1),e("h5",null,a(t.value.location),1),i(n(L),{modelValue:t.value.rating,"onUpdate:modelValue":u[0]||(u[0]=o=>t.value.rating=o),stars:5,readonly:"",cancel:!1},null,8,["modelValue"]),e("p",null,a(t.value.description),1)]),e("div",Y,[i(n(h),{label:"Rezervă",onClick:u[1]||(u[1]=o=>m(t.value))}),e("div",ee,[e("div",null,[f(a(parseFloat(t.value.price).toLocaleString("ro-RO"))+" ",1),te]),e("div",oe,a(t.value.duration)+" nopti",1)])])])],4)]),i(O,{text:"Oferte Populare"}),e("div",se,[(c(!0),v(y,null,V(p.value,o=>(c(),C(T,{key:o.id,offer:o},null,8,["offer"]))),128))]),i(O,{text:"Circuite Recomandate"}),e("div",ie,[(c(!0),v(y,null,V(d.value,o=>(c(),C(M,{key:o.id,tour:o},null,8,["tour"]))),128))])]))}};const le={class:"home-container"},ne=e("div",{class:"home-filter"},null,-1),re=["src"],ue={class:"home-card"},ce=e("h2",null,"Noua ta aventura incepe aici!",-1),de={class:"call-to-action-container"},pe={class:"cta-box"},me=e("h3",null,"Oferta zilei!",-1),_e=e("p",null," Lorem ipsum dolor sit amet consectetur, adipisicing elit. Impedit eveniet nihil aperiam, velit illo cupiditate dolorum minima fugiat optio! ",-1),fe={class:"cta-box"},ve=e("h3",null,"Oferte populare!",-1),he=e("p",null," Lorem ipsum dolor sit amet consectetur, adipisicing elit. Impedit eveniet nihil aperiam, velit illo cupiditate dolorum minima fugiat optio! ",-1),ge={class:"home-search-container"},be={class:"home-search-bg"},$e=e("i",{class:"pi pi-map-marker"},null,-1),ye={class:"p-input-icon-left p-float-label"},Ve=e("i",{class:"pi pi-home"},null,-1),Ce=e("label",{for:"rooms"},"Camere",-1),Oe={class:"p-input-icon-left p-float-label"},ke=e("i",{class:"pi pi-user"},null,-1),xe=e("label",{for:"rooms"},"Adulti",-1),we={class:"p-input-icon-left p-float-label"},Re=e("i",{class:"pi pi-users"},null,-1),qe=e("label",{for:"rooms"},"Copii",-1),Se={__name:"HomeTop",setup(l){const r=$(),t=g({location:"",date:"",rooms:"",adults:"",children:""});function p(){let u=new Set;for(const s of r.offers)u.add(s.country);return[...u].map(s=>({label:s,value:s}))}let d=`${new URL("/assets/frank-mckenna-OD9EOzfSOh0-unsplash-51ec5306.jpg",self.location).href}`;function m(){r.setSearchParams(t.value),S.push({name:"offers"})}function _(u){window.location.href=u}return(u,o)=>(c(),v("div",le,[ne,e("img",{src:n(d),class:"home-image"},null,8,re),e("div",ue,[i(w,{bg:"var(--color-3)",plane:"#fff"},null,8,["bg"]),ce,e("div",de,[e("div",pe,[me,_e,i(n(h),{label:"Vizioneaza oferta",onClick:o[0]||(o[0]=s=>_("#special-offer"))})]),e("div",fe,[ve,he,i(n(h),{label:"Rasfoieste ofertele",onClick:o[1]||(o[1]=s=>_("#offers"))})])])]),e("div",ge,[e("div",be,[$e,i(n(z),{modelValue:t.value.location,"onUpdate:modelValue":o[2]||(o[2]=s=>t.value.location=s),options:p(),optionLabel:"label",optionValue:"value",placeholder:"Locatie",showClear:""},null,8,["modelValue","options"]),i(n(R),{modelValue:t.value.date,"onUpdate:modelValue":o[3]||(o[3]=s=>t.value.date=s),dateFormat:"dd/mm/yy",showIcon:"",placeholder:"Data plecare",showClear:""},null,8,["modelValue"]),e("span",ye,[Ve,i(n(b),{modelValue:t.value.rooms,"onUpdate:modelValue":o[4]||(o[4]=s=>t.value.rooms=s),type:"number"},null,8,["modelValue"]),Ce]),e("span",Oe,[ke,i(n(b),{modelValue:t.value.adults,"onUpdate:modelValue":o[5]||(o[5]=s=>t.value.adults=s),type:"number"},null,8,["modelValue"]),xe]),e("span",we,[Re,i(n(b),{modelValue:t.value.children,"onUpdate:modelValue":o[6]||(o[6]=s=>t.value.children=s),type:"number"},null,8,["modelValue"]),qe]),i(n(h),{class:"home-search-button",type:"button",onClick:o[7]||(o[7]=s=>m())},{default:q(()=>[f("Cauta")]),_:1})])])]))}};const Te={class:"home"},Ne={__name:"HomeView",setup(l){return(r,t)=>(c(),v("div",Te,[i(Se),i(ae)]))}};export{Ne as default};
