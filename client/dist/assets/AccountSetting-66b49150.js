import{u as f,r as n,s as g,j as r,c as e,L as x,d as c}from"./index-aa989564.js";import{I as v}from"./IconHome-cad0a6ab.js";const w=()=>{const m=f();n.useEffect(()=>{m(g("Account Setting"))});const[d,h]=n.useState("home"),[t,i]=n.useState({fullname:"",email:"",phone:"",address:""}),u=async()=>{const l=localStorage.getItem("email");if(!l){console.error("No email found in local storage.");return}try{const a=await c.get(`https://server-side-5zbf.onrender.com/api/users/${l}`);if(a.data.success){const s=a.data.data;i({fullname:s.fullname,email:s.email,address:s.address,phone:s.phone})}else console.error("Failed to fetch user data:",a.data.message)}catch(a){console.error("Error fetching user data:",a)}};n.useEffect(()=>{u()},[]);const p=l=>{h(l)},o=l=>{const{id:a,value:s}=l.target;i(b=>({...b,[a]:s}))};return r("div",{children:[r("ul",{className:"flex space-x-2 rtl:space-x-reverse",children:[e("li",{children:e(x,{to:"#",className:"text-primary hover:underline",children:"Users"})}),e("li",{className:"before:content-['/'] ltr:before:mr-2 rtl:before:ml-2",children:e("span",{children:"Account Settings"})})]}),r("div",{className:"pt-5",children:[e("div",{className:"flex items-center justify-between mb-5",children:e("h5",{className:"font-semibold text-lg dark:text-white-light",children:"Settings"})}),e("div",{children:e("ul",{className:"sm:flex font-semibold border-b border-[#ebedf2] dark:border-[#191e3a] mb-5 whitespace-nowrap overflow-y-auto",children:e("li",{className:"inline-block",children:r("button",{onClick:()=>p("home"),className:`flex gap-2 p-4 border-b border-transparent hover:border-primary hover:text-primary ${d==="home"?"!border-primary text-primary":""}`,children:[e(v,{}),"Home"]})})})}),d==="home"?e("div",{children:r("form",{className:"border border-[#ebedf2] dark:border-[#191e3a] rounded-md p-4 mb-5 bg-white dark:bg-black",onSubmit:async l=>{l.preventDefault();try{await c.post("https://server-side-5zbf.onrender.com/api/update_profile",t),alert("User  data updated successfully!")}catch(a){console.error("Error updating user data:",a),alert("Failed to update user data.")}},children:[e("h6",{className:"text-lg font-bold mb-5",children:"General Information"}),r("div",{className:"flex flex-col sm:flex-row",children:[e("div",{className:"ltr:sm:mr-4 rtl:sm:ml-4 w-full sm:w-2/12 mb-5",children:e("img",{src:"",alt:"img",className:"w-20 h-20 md:w-32 md:h-32 rounded-full object-cover mx-auto"})}),r("div",{className:"flex-1 grid grid-cols-1 sm:grid-cols-2 gap-5",children:[r("div",{children:[e("label",{htmlFor:"name",children:"Full Name"}),e("input",{id:"fullname",type:"text",placeholder:"First User",className:"form-input",value:t.fullname,onChange:o})]}),r("div",{children:[e("label",{htmlFor:"address",children:"Address"}),e("input",{id:"address",type:"text",placeholder:"Harare",className:"form-input",value:t.address,onChange:o})]}),r("div",{children:[e("label",{htmlFor:"phone",children:"Phone"}),e("input",{id:"phone",type:"text",placeholder:"+263",className:"form-input",value:t.phone,onChange:o})]}),r("div",{children:[e("label",{htmlFor:"email",children:"Email"}),e("input",{id:"email",type:"email",placeholder:"user@gmail.com",className:"form-input",value:t.email,onChange:o})]}),e("div",{className:"sm:col-span-2 mt-3",children:e("button",{type:"submit",className:"btn !mt-6 w-full border-0 uppercase shadow-[0_10px_20px_-10px_rgba(11,47,159,0.44)]",style:{backgroundColor:"#0B2F9F",color:"#FFFFFF"},children:"SAVE"})})]})]})]})}):""]})]})};export{w as default};
