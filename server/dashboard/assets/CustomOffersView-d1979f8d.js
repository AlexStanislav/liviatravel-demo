import{a as k,b as M,c as h,d as o,e as S}from"./axios-065ad484.js";import{f as v,g as T,o as A,c as x,h as t,w as _,i as a,a as e,l as s,t as i,k as n}from"./index-3238a72c.js";import{s as O}from"./dialog.esm-7fa41080.js";const w={class:"table-header"},N={class:"p-input-icon-left"},$=e("i",{class:"pi pi-search"},null,-1),V={class:"table-actions"},D={class:"offer-info"},E=e("div",{class:"list-key"},"Nume",-1),I=e("div",{class:"list-key"},"Prenume",-1),U=e("div",{class:"list-key"},"Email",-1),B=e("div",{class:"list-key"},"Telefon",-1),L=e("div",{class:"list-key"},"Buget maxim",-1),Q=e("div",{class:"list-key"},"Moneda",-1),H=e("div",{class:"list-key"},"Destinatie",-1),R=e("div",{class:"list-key"},"Adulti",-1),W=e("div",{class:"list-key"},"Copii",-1),F=e("div",{class:"list-key"},"Data plecare",-1),z=e("div",{class:"list-key"},"Data returnare",-1),P=e("div",{class:"list-key"},"Nopti",-1),j=e("div",{class:"list-key"},"Destinatie",-1),q=e("div",{class:"list-key"},"Acomodare",-1),G=e("div",{class:"list-key"},"Detalii",-1),Z={__name:"CustomOffersView",setup(J){const m=v(!1),p=v([]),l=v({}),b=window.location.origin;T(()=>{f()});const f=()=>{k.get(`${b}/customOffers`).then(r=>{p.value=r.data})},c=v({global:{value:null,matchMode:n.CONTAINS},first_name:{value:null,matchMode:n.STARTS_WITH},last_name:{value:null,matchMode:n.STARTS_WITH},email:{value:null,matchMode:n.CONTAINS},phone:{value:null,matchMode:n.STARTS_WITH},people:{value:null,matchMode:n.EQUALS},adults:{value:null,matchMode:n.EQUALS},children:{value:null,matchMode:n.EQUALS},destination:{value:null,matchMode:n.EQUALS},max_budget:{value:null,matchMode:n.EQUALS}}),y=r=>{k.delete(`${b}/customOffers/${r.id}`).then(()=>{f()})},g=r=>{m.value=!0,l.value=r};return(r,u)=>(A(),x("div",null,[t(a(S),{filters:c.value,"onUpdate:filters":u[2]||(u[2]=d=>c.value=d),value:p.value,paginator:"",rows:6,filterDisplay:"row",removableSort:""},{header:_(()=>[e("div",w,[e("span",N,[$,t(a(M),{modelValue:c.value.global.value,"onUpdate:modelValue":u[0]||(u[0]=d=>c.value.global.value=d),placeholder:"Cautare globala"},null,8,["modelValue"])]),t(a(h),{icon:"pi pi-refresh",class:"p-button-warning",onClick:u[1]||(u[1]=d=>f())})])]),default:_(()=>[t(a(o),{field:"first_name",sortable:"",header:"Prenume"}),t(a(o),{field:"last_name",sortable:"",header:"Nume"}),t(a(o),{field:"email",sortable:"",header:"Email"}),t(a(o),{field:"phone",sortable:"",header:"Telefon"}),t(a(o),{field:"adults",sortable:"",header:"Adulti"}),t(a(o),{field:"children",sortable:"",header:"Copii"}),t(a(o),{field:"destination",sortable:"",header:"Destinatie"}),t(a(o),{field:"max_budget",sortable:"",header:"Buget maxim"}),t(a(o),{field:"coin_type",sortable:"",header:"Moneda"}),t(a(o),null,{body:_(d=>[e("div",V,[t(a(h),{icon:"pi pi-trash",class:"p-button-rounded p-button-danger",onClick:C=>y(d.data)},null,8,["onClick"]),t(a(h),{icon:"pi pi-ellipsis-h",class:"p-button-rounded",onClick:C=>g(d.data)},null,8,["onClick"])])]),_:1})]),_:1},8,["filters","value"]),t(a(O),{modal:"",visible:m.value,"onUpdate:visible":u[3]||(u[3]=d=>m.value=d),header:"Info solicitare",maximizable:""},{default:_(()=>[e("ul",D,[e("li",null,[E,s(i(l.value.first_name),1)]),e("li",null,[I,s(i(l.value.last_name),1)]),e("li",null,[U,s(i(l.value.email),1)]),e("li",null,[B,s(i(l.value.phone),1)]),e("li",null,[L,s(i(l.value.max_budget),1)]),e("li",null,[Q,s(i(l.value.coin_type),1)]),e("li",null,[H,s(i(l.value.destination),1)]),e("li",null,[R,s(i(l.value.adults),1)]),e("li",null,[W,s(i(l.value.children),1)]),e("li",null,[F,s(i(l.value.departure_date),1)]),e("li",null,[z,s(i(l.value.return_date),1)]),e("li",null,[P,s(i(l.value.duration),1)]),e("li",null,[j,s(i(l.value.destination),1)]),e("li",null,[q,s(i(l.value.accomodation),1)]),e("li",null,[G,s(i(l.value.details),1)])])]),_:1},8,["visible"])]))}};export{Z as default};
