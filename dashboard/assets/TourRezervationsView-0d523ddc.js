import{g as m,h as b,i as v,o as _,c as T,j as e,k as d,l as a,a as u,p as g,q as h,z as r}from"./index-89e6f598.js";import{a as l,b as S}from"./column.esm-0661068e.js";const M={class:"table-header"},z={class:"p-input-icon-left"},C=u("i",{class:"pi pi-search"},null,-1),A={__name:"TourRezervationsView",setup(N){const s=m({global:{value:null,matchMode:r.CONTAINS},first_name:{value:null,matchMode:r.STARTS_WITH},last_name:{value:null,matchMode:r.STARTS_WITH},email:{value:null,matchMode:r.CONTAINS},phone:{value:null,matchMode:r.STARTS_WITH},people:{value:null,matchMode:r.EQUALS}}),c=m([]),p=window.location.origin;b(()=>{n()});const n=()=>{v.get(`${p}/tourRezervations`).then(i=>{c.value=i.data})},f=i=>{v.delete(`${p}/tourRezervations/${i.id}`).then(()=>{n()})};return(i,t)=>(_(),T("div",null,[e(a(S),{filters:s.value,"onUpdate:filters":t[2]||(t[2]=o=>s.value=o),value:c.value,paginator:"",rows:6,filterDisplay:"row",removableSort:""},{header:d(()=>[u("div",M,[u("span",z,[C,e(a(g),{modelValue:s.value.global.value,"onUpdate:modelValue":t[0]||(t[0]=o=>s.value.global.value=o),placeholder:"Cautare globala"},null,8,["modelValue"])]),e(a(h),{icon:"pi pi-refresh",class:"p-button-warning",onClick:t[1]||(t[1]=o=>n())})])]),default:d(()=>[e(a(l),{field:"first_name",sortable:"",header:"Prenume"}),e(a(l),{field:"last_name",sortable:"",header:"Nume"}),e(a(l),{field:"email",sortable:"",header:"Email"}),e(a(l),{field:"phone",sortable:"",header:"Telefon"}),e(a(l),{field:"adults",sortable:"",header:"Adulti"}),e(a(l),{field:"children",sortable:"",header:"Copii"}),e(a(l),{field:"price",sortable:"",header:"Pret"}),e(a(l),{field:"tour_name",sortable:"",header:"Nume circuit"}),e(a(l),null,{body:d(o=>[e(a(h),{icon:"pi pi-trash",class:"p-button-rounded p-button-danger",onClick:R=>f(o.data)},null,8,["onClick"])]),_:1})]),_:1},8,["filters","value"])]))}};export{A as default};