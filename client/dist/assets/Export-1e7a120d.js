import{u as fe,r as o,s as ve,b as ye,j as r,c as t,L as be,d as m,F as H}from"./index-aa989564.js";import{s as Ne,N as Se}from"./sortBy-8e7e234b.js";import{I as xe}from"./IconTrashLines-aa17271c.js";import{I as Ae}from"./IconPencil-1888a20a.js";import{I as we}from"./IconPlus-247055cb.js";import{I as Y}from"./IconX-abbf615b.js";import{T as _}from"./tippy-react.esm-d8b467c9.js";import{S as Ce}from"./sweetalert2.all-ea925d0e.js";import{Y as N,y as S}from"./transition-90811016.js";import"./floating-ui.dom.browser.min-e93d2b51.js";import"./_baseIsEqual-15410797.js";import"./_defineProperty-25888ee7.js";import"./keyboard-5696ecf8.js";const Oe=()=>{const B=fe();o.useEffect(()=>{B(ve("All Appointments"))});const[E,D]=o.useState(1),j=[10,20,30,50,100],[u,U]=o.useState(j[0]),[d,w]=o.useState([]),[G,z]=o.useState([]),[l,X]=o.useState(""),[C,Z]=o.useState({columnAccessor:"id",direction:"asc"}),[I,J]=o.useState(""),[k,K]=o.useState(""),[h,Q]=o.useState([]),[F,V]=o.useState(""),[g,W]=o.useState([]),[L,ee]=o.useState(""),[T,te]=o.useState(""),[P,ae]=o.useState(""),[$,ne]=o.useState(""),[Fe,R]=o.useState("");o.useState(!1);const oe=ye(),[q,x]=o.useState(!1);o.useState([]);const[n,c]=o.useState(null),[M,A]=o.useState(!1),O=e=>{const a=new Date(e),s=a.getFullYear(),i=String(a.getMonth()+1).padStart(2,"0"),y=String(a.getDate()).padStart(2,"0"),b=String(a.getHours()).padStart(2,"0"),p=String(a.getMinutes()).padStart(2,"0");return r(H,{children:[s,"-",i,"-",y,Array(4).fill(t(H,{children:" "}))," ",r("b",{children:[b,":",p]})]})},f=e=>{const a=new Date(e),s=a.getFullYear(),i=String(a.getMonth()+1).padStart(2,"0"),y=String(a.getDate()).padStart(2,"0"),b=String(a.getHours()).padStart(2,"0"),p=String(a.getMinutes()).padStart(2,"0"),he=String(a.getSeconds()).padStart(2,"0"),ge=String(a.getMilliseconds()).padStart(3,"0");return`${s}-${i}-${y} ${b}:${p}:${he}.${ge}`},re=async()=>{try{const e=await m.get("https://server-side-5zbf.onrender.com/api/appointments");if(console.log("API Response:",e.data),e.data.success===!0){let a=e.data.data;a=a.map(s=>({...s,appointmentFrom:O(s.appointmentFrom),appointmentTo:O(s.appointmentTo)})),w(a),z(a.slice(0,u)),console.log("Fetched appointments:",a)}else console.error("Failed to fetch appointments:",e.data.message)}catch(e){console.error("Error fetching appointments",e),w([])}};o.useEffect(()=>{re()},[]);const se=async()=>{try{const e=await m.get("https://server-side-5zbf.onrender.com/api/events");console.log("API Response:",e.data),e.data.success===!0&&(Q(e.data.data),console.log("Fetched types:",e.data.data))}catch(e){console.error("Error fetching types",e)}};o.useEffect(()=>{se()},[]);const ie=async()=>{try{const e=await m.get("https://server-side-5zbf.onrender.com/api/status");console.log("API Response:",e.data),e.data.success===!0&&(W(e.data.data),console.log("Fetched status:",e.data.data))}catch(e){console.error("Error fetching status",e)}};o.useEffect(()=>{ie()},[]),o.useEffect(()=>{D(1)},[u]),o.useEffect(()=>{if(Array.isArray(d)){const e=(E-1)*u,a=e+u;z(d.slice(e,a))}else console.error("initialRecords is not an array:",d)},[E,u,d]),o.useEffect(()=>{w(()=>d.filter(e=>e.appointmentId.toString().includes(l.toLowerCase())||e.appointmentName.toLowerCase().includes(l.toLowerCase())||e.appointmentLocation.toLowerCase().includes(l.toLowerCase())||e.appointmentFrom.toLowerCase().includes(l.toLowerCase())||e.appointmentTo.toLowerCase().includes(l.toLowerCase())||e.event.toLowerCase().includes(l.toLowerCase())||e.status.toLowerCase().includes(l.toLowerCase())))},[l]),o.useEffect(()=>{const e=Ne(d,C.columnAccessor);w(C.direction==="desc"?e.reverse():e),D(1)},[C]);const v=(e="",a="success")=>{Ce.mixin({toast:!0,position:"top",showConfirmButton:!1,timer:3e3,customClass:{container:"toast"}}).fire({icon:a,title:e,padding:"10px 20px"})},le=async e=>{e.preventDefault();try{const a=f(P),s=f($);console.log({appointmentName:I,appointmentDescription:T,appointmentLocation:k,appointmentFrom:P,appointmentTo:$,eventId:F,statusId:L});const i=await m.post("https://server-side-5zbf.onrender.com/api/create_appointment",{appointmentName:I,appointmentLocation:k,appointmentFrom:a,appointmentTo:s,appointmentDescription:T,eventId:F,statusId:L});console.log(i.data),i.data.success?(v("Appointment has been created successfully."),x(!1),oe("/apps/calendar")):(v("Failed to update appointment:",i.data.message),R(i.data.error||"An error occurred"))}catch(a){console.error(a),R("An error occurred. Please try again later.")}},ce=async e=>{e.preventDefault(),console.log("Updating appointment with ID:",n.id),console.log("Selected Event Data:",n);const a={appointmentName:n.title,appointmentDescription:n.description,appointmentLocation:n.location,appointmentFrom:f(n.start),appointmentTo:f(n.end),eventId:n.type,statusId:n.className};try{const s=await m.put(`https://server-side-5zbf.onrender.com/api/update_appointment/${n.id}`,a);s.data.success?(console.log("Appointment updated successfully:",s.data.message),v("Appointment has been updated successfully."),A(!1),window.location.reload()):(v("Failed to update appointment:",s.data.message),console.error("Failed to update appointment:",s.data.message))}catch(s){console.error("Error updating appointment:",s)}},de=async e=>{try{const a=await m.get(`https://server-side-5zbf.onrender.com/api/appointments/${e}`);if(console.log("Appointment Details:",a.data),a.data.success){const s=a.data.data;console.log("Appointment Event:",s.event),console.log("Appointment Status:",s.status),console.log("Events Array:",h),console.log("Status Array:",g);const i=h.find(p=>p.eventName===s.event),y=g.find(p=>p.statusName===s.status),b={id:s.appointmentId,title:s.appointmentName,start:f(s.appointmentFrom),end:f(s.appointmentTo),className:y?y.statusId:null,description:s.appointmentDescription,type:i?i.eventId:null,location:s.appointmentLocation};c(b),console.log("Fetched appointment to be updated:",b)}else console.error("Failed to fetch appointment details:",a.data.message)}catch(a){console.error("Error fetching appointment details:",a)}},pe=async e=>{await de(e),A(!0)},me=async e=>{try{const a=await m.delete(`https://server-side-5zbf.onrender.com/api/appointments/${e}`);console.log("Delete Response:",a.data),a.data.success?(v("Appointment has been deleted successfully."),console.log("Appointment deleted successfully:",a.data.message),window.location.reload()):(v("Failed to delete appointment. Please try again!"),console.error("Failed to delete appointment:",a.data.message))}catch(a){console.error("Error deleting appointment:",a)}},ue=async e=>{window.confirm("Are you sure you want to delete this appointment?")&&await me(e)};return r("div",{children:[r("ul",{className:"flex space-x-2 rtl:space-x-reverse",children:[t("li",{children:t(be,{to:"#",className:"text-primary hover:underline",children:"Board"})}),t("li",{className:"before:content-['/'] ltr:before:mr-2 rtl:before:ml-2",children:t("span",{children:"Appointments"})})]}),r("div",{className:"panel mt-6",children:[r("div",{className:"flex md:items-center justify-between md:flex-row flex-col mb-4.5 gap-5",children:[t("div",{className:"flex items-center flex-wrap",children:r("button",{type:"button",className:"btn btn-primary",onClick:()=>x(!0),children:[t(we,{className:"ltr:mr-2 rtl:ml-2"}),"Create Appointment"]})}),t("input",{type:"text",className:"form-input w-auto",placeholder:"Search...",value:l,onChange:e=>X(e.target.value)})]}),t("div",{className:"datatables",children:t(Se,{highlightOnHover:!0,className:"whitespace-nowrap table-hover",records:G,columns:[{accessor:"appointmentId",title:"Number",sortable:!0},{accessor:"appointmentName",title:"Name",sortable:!0},{accessor:"appointmentLocation",title:"Location",sortable:!0},{accessor:"appointmentFrom",title:"From",sortable:!0},{accessor:"appointmentTo",title:"To",sortable:!0},{accessor:"event",title:"Type",sortable:!0},{accessor:"status",title:"Status",sortable:!0},{accessor:"actions",title:"Actions",sortable:!1,render:e=>t("div",{children:r("ul",{className:"flex items-center justify-center gap-2",children:[t("li",{children:t(_,{content:"Edit",children:t("button",{type:"button",onClick:()=>pe(e.appointmentId),children:t(Ae,{className:"text-success"})})})}),t("li",{children:t(_,{content:"Delete",children:t("button",{type:"button",onClick:()=>ue(e.appointmentId),children:t(xe,{className:"text-danger"})})})})]})})}],totalRecords:d.length,recordsPerPage:u,page:E,onPageChange:e=>D(e),recordsPerPageOptions:j,onRecordsPerPageChange:U,sortStatus:C,onSortStatusChange:Z,minHeight:200,paginationText:({from:e,to:a,totalRecords:s})=>`Showing ${e} to ${a} of ${s} entries`})})]}),t(N,{appear:!0,show:q,as:o.Fragment,children:r(S,{as:"div",onClose:()=>x(!1),open:q,className:"relative z-[51]",children:[t(N.Child,{as:o.Fragment,enter:"duration-300 ease-out","enter-from":"opacity-0","enter-to":"opacity-100",leave:"duration-200 ease-in","leave-from":"opacity-100","leave-to":"opacity-0",children:t(S.Overlay,{className:"fixed inset-0 bg-[black]/60"})}),t("div",{className:"fixed inset-0 overflow-y-auto",children:t("div",{className:"flex min-h-full items-center justify-center px-4 py-8",children:t(N.Child,{as:o.Fragment,enter:"duration-300 ease-out","enter-from":"opacity-0 scale-95","enter-to":"opacity-100 scale-100",leave:"duration-200 ease-in","leave-from":"opacity-100 scale-100","leave-to":"opacity-0 scale-95",children:r(S.Panel,{className:"panel border-0 p-0 rounded-lg overflow-hidden w-full max-w-lg text-black dark:text-white-dark",children:[t("button",{type:"button",className:"absolute top-4 ltr:right-4 rtl:left-4 text-gray-400 hover:text-gray-800 dark:hover:text-gray-600 outline-none",onClick:()=>x(!1),children:t(Y,{})}),t("div",{className:"text-lg font-medium bg-[#fbfbfb] dark:bg-[#121c2c] ltr:pl-5 rtl:pr-5 py-3 ltr:pr-[50px] rtl:pl-[50px]",children:"Add Appointment"}),t("div",{className:"p-5",children:r("form",{className:"space-y-5",onSubmit:le,children:[r("div",{children:[t("label",{htmlFor:"title",children:"Appointment Name :"}),t("input",{id:"title",type:"text",name:"title",className:"form-input",placeholder:"Enter Appointment Name",required:!0,value:I,onChange:e=>J(e.target.value)}),t("div",{className:"text-danger mt-2",id:"titleErr"})]}),r("div",{children:[t("label",{htmlFor:"location",children:"Appointment Location :"}),t("input",{id:"location",type:"text",name:"location",className:"form-input",placeholder:"Enter Appointment Location",required:!0,value:k,onChange:e=>K(e.target.value)}),t("div",{className:"text-danger mt-2",id:"locationErr"})]}),r("div",{children:[t("label",{htmlFor:"dateStart",children:"From :"}),t("input",{id:"start",type:"datetime-local",name:"start",className:"form-input",placeholder:"Appointment Start Date",required:!0,value:P,onChange:e=>ae(e.target.value)}),t("div",{className:"text-danger mt-2",id:"startDateErr"})]}),r("div",{children:[t("label",{htmlFor:"dateEnd",children:"To :"}),t("input",{id:"end",type:"datetime-local",name:"end",className:"form-input",placeholder:"Appointment End Date",required:!0,value:$,onChange:e=>ne(e.target.value)}),t("div",{className:"text-danger mt-2",id:"endDateErr"})]}),r("div",{children:[t("label",{htmlFor:"description",children:"Appointment Description :"}),t("textarea",{id:"description",name:"description",className:"form-textarea min-h-[130px]",placeholder:"Enter Appointment Description",value:T,onChange:e=>te(e.target.value)})]}),r("div",{children:[t("label",{children:"Select Appointment Type:"}),t("div",{className:"mt-3",children:h.length>0?h.map(e=>r("label",{className:`inline-flex cursor-pointer ltr:mr-3 rtl:ml-3 ${e.eventId===F?"bg-primary-500 text-info":"bg-success-200"}`,children:[t("input",{type:"radio",className:"form-radio",name:"eventType",value:e.eventId,checked:F===e.eventId,onChange:a=>V(Number(a.target.value))}),t("span",{className:"ltr:pl-2 rtl:pr-2",children:e.eventName})]},e.eventId)):t("span",{children:"No types available"})})]}),r("div",{children:[t("label",{htmlFor:"Status",children:"Select Appointment Status"}),t("div",{className:"relative text-white-dark",children:r("select",{id:"Status",className:"form-input ps-10 placeholder:text-white-dark",value:L,onChange:e=>ee(Number(e.target.value)),children:[t("option",{value:"",disabled:!0,children:"Select Status"}),g.length>0?g.map(e=>t("option",{value:e.statusId,children:e.statusName},e.statusId)):t("option",{value:"",disabled:!0,children:"No status available"})]})})]}),r("div",{className:"flex justify-end items-center !mt-8",children:[t("button",{type:"button",className:"btn btn-outline-danger",onClick:()=>x(!1),children:"Cancel"}),t("button",{type:"submit",className:"btn btn-primary ltr:ml-4 rtl:mr-4",children:"Create Appointment"})]})]})})]})})})})]})}),t(N,{appear:!0,show:M,as:o.Fragment,children:r(S,{as:"div",onClose:()=>A(!1),open:M,className:"relative z-[51]",children:[t(N.Child,{as:o.Fragment,enter:"duration-300 ease-out","enter-from":"opacity-0","enter-to":"opacity-100",leave:"duration-200 ease-in","leave-from":"opacity-100","leave-to":"opacity-0",children:t(S.Overlay,{className:"fixed inset-0 bg-[black]/60"})}),t("div",{className:"fixed inset-0 overflow-y-auto",children:t("div",{className:"flex min-h-full items-center justify-center px-4 py-8",children:t(N.Child,{as:o.Fragment,enter:"duration-300 ease-out","enter-from":"opacity-0 scale-95","enter-to":"opacity-100 scale-100",leave:"duration-200 ease-in","leave-from":"opacity-100 scale-100","leave-to":"opacity-0 scale-95",children:r(S.Panel,{className:"panel border-0 p-0 rounded-lg overflow-hidden w-full max-w-lg text-black dark:text-white-dark",children:[t("button",{type:"button",className:"absolute top-4 ltr:right-4 rtl:left-4 text-gray-400 hover:text-gray-800 dark:hover:text-gray-600 outline-none",onClick:()=>A(!1),children:t(Y,{})}),t("div",{className:"text-lg font-medium bg-[#fbfbfb] dark:bg-[#121c2c] ltr:pl-5 rtl:pr-5 py-3 ltr:pr-[50px] rtl:pl-[50px]",children:"Edit Appointment"}),t("div",{className:"p-5",children:r("form",{className:"space-y-5",onSubmit:ce,children:[r("div",{children:[t("label",{htmlFor:"title",children:"Appointment Name :"}),t("input",{id:"title",type:"text",name:"title",className:"form-input",placeholder:"Enter Appointment Name",required:!0,value:(n==null?void 0:n.title)||"",onChange:e=>c({...n,title:e.target.value})}),t("div",{className:"text-danger mt-2",id:"titleErr"})]}),r("div",{children:[t("label",{htmlFor:"location",children:"Appointment Location :"}),t("input",{id:"location",type:"text",name:"location",className:"form-input",placeholder:"Enter Appointment Location",required:!0,value:(n==null?void 0:n.location)||"",onChange:e=>c({...n,location:e.target.value})}),t("div",{className:"text-danger mt-2",id:"locationErr"})]}),r("div",{children:[t("label",{htmlFor:"dateStart",children:"From :"}),t("input",{id:"start",type:"datetime-local",name:"start",className:"form-input",placeholder:"Appointment Start Date",required:!0,value:(n==null?void 0:n.start)||"",onChange:e=>c({...n,start:e.target.value})}),t("div",{className:"text-danger mt-2",id:"startDateErr"})]}),r("div",{children:[t("label",{htmlFor:"dateEnd",children:"To :"}),t("input",{id:"end",type:"datetime-local",name:"end",className:"form-input",placeholder:"Appointment End Date",required:!0,value:(n==null?void 0:n.end)||"",onChange:e=>c({...n,end:e.target.value})}),t("div",{className:"text-danger mt-2",id:"endDateErr"})]}),r("div",{children:[t("label",{htmlFor:"description",children:"Appointment Description :"}),t("textarea",{id:"description",name:"description",className:"form-textarea min-h-[130px]",placeholder:"Enter Appointment Description",value:(n==null?void 0:n.description)||"",onChange:e=>c({...n,description:e.target.value})})]}),r("div",{children:[t("label",{htmlFor:"Event",children:"Select Appointment Type"}),t("div",{className:"relative text-white-dark",children:r("select",{id:"Event",className:"form-input ps-10 placeholder:text-white-dark",value:(n==null?void 0:n.type)||"",onChange:e=>c({...n,type:Number(e.target.value)}),children:[t("option",{value:"",disabled:!0,children:"Select Type"}),h.length>0?h.map(e=>t("option",{value:e.eventId,children:e.eventName},e.eventId)):t("option",{value:"",disabled:!0,children:"No types available"})]})})]}),r("div",{children:[t("label",{htmlFor:"Status",children:"Select Appointment Status"}),t("div",{className:"relative text-white-dark",children:r("select",{id:"Status",className:"form-input ps-10 placeholder:text-white-dark",value:(n==null?void 0:n.className)||"",onChange:e=>c({...n,className:Number(e.target.value)}),children:[t("option",{value:"",disabled:!0,children:"Select Status"}),g.length>0?g.map(e=>t("option",{value:e.statusId,children:e.statusName},e.statusId)):t("option",{value:"",disabled:!0,children:"No status available"})]})})]}),r("div",{className:"flex justify-end items-center !mt-8",children:[t("button",{type:"button",className:"btn btn-outline-danger",onClick:()=>A(!1),children:"Cancel"}),t("button",{type:"submit",className:"btn btn-primary ltr:ml-4 rtl:mr-4",children:"Update Appointment"})]})]})})]})})})})]})})]})};export{Oe as default};
