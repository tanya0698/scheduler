import{u as Y,r as s,s as Z,j as i,b as o,L as q,f as J,F as P}from"./index-6d5aa60a.js";import{s as K,N as Q,l as W}from"./index-8d7f0831.js";import{I as ee}from"./IconFile-49be1331.js";import{I as te}from"./IconPrinter-95a051c3.js";import{I as ae}from"./IconTrashLines-35196ac8.js";import{I as oe}from"./IconPencil-ad07314c.js";import{T as D}from"./tippy-react.esm-80869c7b.js";import"./floating-ui.dom.browser.min-e93d2b51.js";import"./_baseIsEqual-0362420f.js";import"./_defineProperty-f579614e.js";const fe=()=>{const j=Y();s.useEffect(()=>{j(Z("All Appointments"))});const[y,N]=s.useState(1),T=[10,20,30,50,100],[h,B]=s.useState(T[0]),[c,x]=s.useState([]),[O,I]=s.useState([]),[p,R]=s.useState(""),[v,k]=s.useState({columnAccessor:"id",direction:"asc"}),F=e=>{const t=new Date(e),n=t.getFullYear(),f=String(t.getMonth()+1).padStart(2,"0"),d=String(t.getDate()).padStart(2,"0"),C=String(t.getHours()).padStart(2,"0"),b=String(t.getMinutes()).padStart(2,"0");return i(P,{children:[n,"-",f,"-",d,Array(4).fill(o(P,{children:" "}))," ",i("b",{children:[C,":",b]})]})},z=async()=>{try{const e=await J.get("http://9993-41-173-36-105.ngrok-free.app/api/appointments");if(console.log("API Response:",e.data),e.data.success===!0){let t=e.data.data;t=t.map(n=>({...n,appointmentFrom:F(n.appointmentFrom),appointmentTo:F(n.appointmentTo)})),x(t),I(t.slice(0,h)),console.log("Fetched appointments:",t)}else console.error("Failed to fetch appointments:",e.data.message)}catch(e){console.error("Error fetching appointments",e),x([])}};s.useEffect(()=>{z()},[]);const H=["Number","Name","Location","From","To","Type","Status"];s.useEffect(()=>{N(1)},[h]),s.useEffect(()=>{if(Array.isArray(c)){const e=(y-1)*h,t=e+h;I(c.slice(e,t))}else console.error("initialRecords is not an array:",c)},[y,h,c]),s.useEffect(()=>{x(()=>c.filter(e=>e.appointmentId.toString().includes(p.toLowerCase())||e.appointmentName.toLowerCase().includes(p.toLowerCase())||e.appointmentLocation.toLowerCase().includes(p.toLowerCase())||e.appointmentFrom.toLowerCase().includes(p.toLowerCase())||e.appointmentTo.toLowerCase().includes(p.toLowerCase())||e.event.toLowerCase().includes(p.toLowerCase())||e.status.toLowerCase().includes(p.toLowerCase())))},[p]),s.useEffect(()=>{const e=K(c,v.columnAccessor);x(v.direction==="desc"?e.reverse():e),N(1)},[v]);const U=()=>{W.downloadExcel({fileName:"appointments.xlsx",sheet:"Appointments",tablePayload:{header:["Number","Name","Location","From","To","Type","Status"],body:c.map(e=>[e.appointmentId,e.appointmentName,e.appointmentLocation,e.appointmentFrom,e.appointmentTo,e.event,e.status])}})},_=e=>{let t=H,n=c,f="table",d;if(d=window.navigator,e==="csv"){let l=";",u=`
`,a=t.map(m=>w(m)).join(l);if(a+=u,n.map(m=>{t.map((g,E)=>{E>0&&(a+=l);let A=m[g]?m[g]:"";a+=A}),a+=u}),a==null)return;if(!a.match(/^data:text\/csv/i)&&!d.msSaveOrOpenBlob){var C="data:application/csv;charset=utf-8,"+encodeURIComponent(a),b=document.createElement("a");b.setAttribute("href",C),b.setAttribute("download",f+".csv"),b.click()}else{var G=new Blob([a]);d.msSaveOrOpenBlob&&d.msSaveBlob(G,f+".csv")}}else if(e==="print"){var r="<p>"+f+"</p>";r+='<table style="width: 100%; " cellpadding="0" cellcpacing="0"><thead><tr style="color: #515365; background: #eff5ff; -webkit-print-color-adjust: exact; print-color-adjust: exact; "> ',t.map(l=>{r+="<th>"+w(l)+"</th>"}),r+="</tr></thead>",r+="<tbody>",n.map(l=>{r+="<tr>",t.map(u=>{let a=l[u]?l[u]:"";r+="<td>"+a+"</td>"}),r+="</tr>"}),r+="<style>body {font-family:Arial; color:#495057;}p{text-align:center;font-size:18px;font-weight:bold;margin:15px;}table{ border-collapse: collapse; border-spacing: 0; }th,td{font-size:12px;text-align:left;padding: 4px;}th{padding:8px 4px;}tr:nth-child(2n-1){background:#f7f7f7; }</style>",r+="</tbody></table>";var S=window.open("","","left=0,top=0,width=1000,height=600,toolbar=0,scrollbars=0,status=0");S.document.write("<title>Print</title>"+r),S.document.close(),S.focus(),S.print()}else if(e==="txt"){let l=",",u=`
`,a=t.map(m=>w(m)).join(l);if(a+=u,n.map(m=>{t.map((g,E)=>{E>0&&(a+=l);let A=m[g]?m[g]:"";a+=A}),a+=u}),a==null)return;if(!a.match(/^data:text\/txt/i)&&!d.msSaveOrOpenBlob){var V="data:application/txt;charset=utf-8,"+encodeURIComponent(a),L=document.createElement("a");L.setAttribute("href",V),L.setAttribute("download",f+".txt"),L.click()}else{var X=new Blob([a]);d.msSaveOrOpenBlob&&d.msSaveBlob(X,f+".txt")}}},w=e=>e.replace("_"," ").replace("-"," ").toLowerCase().split(" ").map(t=>t.charAt(0).toUpperCase()+t.substring(1)).join(" "),$=e=>{console.log("Editing:",e)},M=e=>{console.log("Deleting:",e)};return i("div",{children:[i("ul",{className:"flex space-x-2 rtl:space-x-reverse",children:[o("li",{children:o(q,{to:"#",className:"text-primary hover:underline",children:"Board"})}),o("li",{className:"before:content-['/'] ltr:before:mr-2 rtl:before:ml-2",children:o("span",{children:"Appointments"})})]}),i("div",{className:"panel mt-6",children:[i("div",{className:"flex md:items-center justify-between md:flex-row flex-col mb-4.5 gap-5",children:[i("div",{className:"flex items-center flex-wrap",children:[i("button",{type:"button",className:"btn btn-primary btn-sm m-1",onClick:U,children:[o(ee,{className:"w-5 h-5 ltr:mr-2 rtl:ml-2"}),"EXCEL"]}),i("button",{type:"button",onClick:()=>_("print"),className:"btn btn-primary btn-sm m-1",children:[o(te,{className:"ltr:mr-2 rtl:ml-2"}),"PRINT"]})]}),o("input",{type:"text",className:"form-input w-auto",placeholder:"Search...",value:p,onChange:e=>R(e.target.value)})]}),o("div",{className:"datatables",children:o(Q,{highlightOnHover:!0,className:"whitespace-nowrap table-hover",records:O,columns:[{accessor:"appointmentId",title:"Number",sortable:!0},{accessor:"appointmentName",title:"Name",sortable:!0},{accessor:"appointmentLocation",title:"Location",sortable:!0},{accessor:"appointmentFrom",title:"From",sortable:!0},{accessor:"appointmentTo",title:"To",sortable:!0},{accessor:"event",title:"Type",sortable:!0},{accessor:"status",title:"Status",sortable:!0},{accessor:"actions",title:"Actions",sortable:!1,render:e=>o("div",{children:i("ul",{className:"flex items-center justify-center gap-2",children:[o("li",{children:o(D,{content:"Edit",children:o("button",{type:"button",onClick:()=>$(e),children:o(oe,{className:"text-success"})})})}),o("li",{children:o(D,{content:"Delete",children:o("button",{type:"button",onClick:()=>M(e),children:o(ae,{className:"text-danger"})})})})]})})}],totalRecords:c.length,recordsPerPage:h,page:y,onPageChange:e=>N(e),recordsPerPageOptions:T,onRecordsPerPageChange:B,sortStatus:v,onSortStatusChange:k,minHeight:200,paginationText:({from:e,to:t,totalRecords:n})=>`Showing ${e} to ${t} of ${n} entries`})})]})]})};export{fe as default};
