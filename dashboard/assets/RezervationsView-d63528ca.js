import{d as c,e as h,f as v,g as l,h as _}from"./axios-ddcc7f45.js";import{l as f,p as b,o as T,c as S,f as e,w as m,q as a,a as n,x as o}from"./index-e1fb0922.js";const M={class:"table-header"},N={class:"p-input-icon-left"},g=n("i",{class:"pi pi-search"},null,-1),I={__name:"RezervationsView",setup(A){const r=f({global:{value:null,matchMode:o.CONTAINS},first_name:{value:null,matchMode:o.STARTS_WITH},last_name:{value:null,matchMode:o.STARTS_WITH},email:{value:null,matchMode:o.CONTAINS},phone:{value:null,matchMode:o.STARTS_WITH},people:{value:null,matchMode:o.EQUALS},offer_duration:{value:null,matchMode:o.CONTAINS},offer_price:{value:null,matchMode:o.EQUALS},offer_name:{value:null,matchMode:o.CONTAINS}}),i=f([]),p=window.location.origin;b(()=>{d()});const d=()=>{c.get(`${p}/rezervations`).then(u=>{i.value=u.data})};return(u,t)=>(T(),S("div",null,[e(a(_),{filters:r.value,"onUpdate:filters":t[2]||(t[2]=s=>r.value=s),value:i.value,paginator:"",rows:6,filterDisplay:"row",removableSort:""},{header:m(()=>[n("div",M,[n("span",N,[g,e(a(h),{modelValue:r.value.global.value,"onUpdate:modelValue":t[0]||(t[0]=s=>r.value.global.value=s),placeholder:"Cautare globala"},null,8,["modelValue"])]),e(a(v),{icon:"pi pi-refresh",class:"p-button-warning",onClick:t[1]||(t[1]=s=>d())})])]),default:m(()=>[e(a(l),{field:"first_name",sortable:"",header:"Prenume"}),e(a(l),{field:"last_name",sortable:"",header:"Nume"}),e(a(l),{field:"email",sortable:"",header:"Email"}),e(a(l),{field:"phone",sortable:"",header:"Telefon"}),e(a(l),{field:"people",sortable:"",header:"Persoane"}),e(a(l),{field:"rooms",sortable:"",header:"Camere"}),e(a(l),{field:"offer_duration",sortable:"",header:"Durata"}),e(a(l),{field:"offer_price",sortable:"",header:"Pret Oferta"}),e(a(l),{field:"offer_name",sortable:"",header:"Nume Oferta"})]),_:1},8,["filters","value"])]))}};export{I as default};
