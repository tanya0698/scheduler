import{u as x,r as s,s as S,a as N,c as t,j as r,F as c,d as F}from"./index-56732386.js";/* empty css              */const k=()=>{const o=x();s.useEffect(()=>{o(S("Tables"))}),N(e=>e.themeConfig.rtlClass);const[D,a]=s.useState([]),[d,h]=s.useState([]),[u,g]=s.useState(""),[l,p]=s.useState(!1),i=e=>{const n=new Date(e),b=n.getFullYear(),f=String(n.getMonth()+1).padStart(2,"0"),v=String(n.getDate()).padStart(2,"0"),y=String(n.getHours()).padStart(2,"0"),w=String(n.getMinutes()).padStart(2,"0");return r(c,{children:[b,"-",f,"-",v,Array(4).fill(t(c,{children:" "}))," ",r("b",{children:[y,":",w]})]})},m=async()=>{try{const e=await F.get("https://server-side-5zbf.onrender.com/api/current");if(console.log("Current Appointment Details:",e.data),e.data.success===!0){const n=e.data.data;a(n),h(n),console.log("Fetched current appointments:",n)}else console.error("Failed to fetch current appointments:",e.data.message)}catch(e){console.error("Error fetching current appointments",e),a([])}};return s.useEffect(()=>{m();const e=setInterval(()=>{g(new Date().toLocaleString())},1e3);return()=>clearInterval(e)},[]),t("div",{style:{position:"fixed",top:0,left:0,width:"100vw",height:"100vh",overflow:"auto",backgroundColor:"#fff",zIndex:999},children:t("div",{className:"grid grid-cols-12 gap-6 h-full",children:t("div",{className:"col-span-12 h-full",children:r("div",{className:"panel h-full",children:[r("div",{className:"flex items-center justify-between mb-5",children:[t("h5",{className:"font-semibold text-lg dark:text-white-light",children:"Appointments Display"}),t("button",{type:"button",onClick:()=>{l?document.exitFullscreen():document.documentElement.requestFullscreen(),p(!l)},className:"font-semibold hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-600",children:t("span",{className:"flex items-center",children:u})})]}),t("div",{className:"table-responsive mb-5",children:r("table",{children:[t("thead",{children:r("tr",{children:[t("th",{children:"Number"}),t("th",{children:"Name"}),t("th",{children:"Location"}),t("th",{children:"From"}),t("th",{children:"To"}),t("th",{children:"Type"}),t("th",{children:"Status"})]})}),t("tbody",{children:d.map(e=>r("tr",{children:[" ",t("td",{children:e.appointmentId}),t("td",{children:t("div",{className:"whitespace-nowrap",children:e.appointmentName})}),t("td",{children:e.appointmentLocation}),t("td",{children:i(e.appointmentFrom)}),t("td",{children:i(e.appointmentTo)}),t("td",{children:t("span",{className:`badge whitespace-nowrap ${e.event==="Personal"?"badge badge-outline-primary":e.event==="Work"?"badge badge-outline-warning":e.event==="Travel"?"badge badge-outline-success":e.event==="Important"?"badge badge-outline-danger":"badge badge-outline-warning"}`,children:e.event})}),t("td",{children:t("span",{className:`badge whitespace-nowrap ${e.status==="Completed"?"badge badge-outline-primary":e.status==="Pending"?"badge badge-outline-success":e.status==="Rescheduled"||e.status==="In Progress"?"badge badge-outline-secondary":e.status==="Cancelled"?"badge badge-outline-danger":"badge badge-outline-primary"}`,children:e.status})})]},e.appointmentId))})]})})]})})})})};export{k as default};
