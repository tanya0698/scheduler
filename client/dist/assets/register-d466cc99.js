import{u as R,r as l,s as j,b as _,a as x,c as e,j as a,I as B,L as D,d as f,S as L}from"./index-d244c3fa.js";import{I as s}from"./IconMail-659db9ff.js";import{I as v}from"./IconLockDots-71efaaf2.js";const H=()=>{const b=R(),[i,w]=l.useState(""),[o,N]=l.useState(""),[n,k]=l.useState(""),[d,y]=l.useState(""),[c,F]=l.useState([]),[h,S]=l.useState(""),[p,C]=l.useState(""),[m,P]=l.useState(""),[T,u]=l.useState("");l.useState(!1),l.useEffect(()=>{b(j("Register"))});const E=_();x(t=>t.themeConfig.rtlClass);const A=x(t=>t.themeConfig);l.useState(A.locale);const I=async()=>{try{const t=await f.get("https://server-side-5zbf.onrender.com/api/roles");console.log("API Response:",t.data),t.data.success===!0&&(F(t.data.data),console.log("Fetched roles:",t.data.data))}catch(t){console.error("Error fetching roles",t)}};l.useEffect(()=>{I()},[]);const g=(t="",r="success")=>{L.mixin({toast:!0,position:"top",showConfirmButton:!1,timer:3e3,customClass:{container:"toast"}}).fire({icon:r,title:t,padding:"10px 20px"})};return e("div",{children:e("div",{className:"relative flex min-h-screen items-center justify-center bg-[url(/assets/images/auth/map.png)] bg-cover bg-center bg-no-repeat px-6 py-10 dark:bg-[#060818] sm:px-16",children:a("div",{className:"relative flex w-full max-w-[1502px] flex-col justify-between overflow-hidden rounded-md bg-white/60 backdrop-blur-lg dark:bg-black/50 lg:min-h-[758px] lg:flex-row lg:gap-10 xl:gap-0",children:[e("div",{className:"relative hidden w-full items-center justify-center bg-[linear-gradient(225deg,#0A2A7F_0%,#FFB200_100%)] p-5 lg:inline-flex lg:max-w-[835px] xl:-ms-28 ltr:xl:skew-x-[14deg] rtl:xl:skew-x-[-14deg]",children:e("div",{className:"absolute inset-y-0 w-8 from-primary/10 via-transparent to-transparent ltr:-right-10 ltr:bg-gradient-to-r rtl:-left-10 rtl:bg-gradient-to-l xl:w-16 ltr:xl:-right-20 rtl:xl:-left-20"})}),a("div",{className:"relative flex w-full flex-col items-center justify-center gap-6 px-4 pb-16 pt-6 sm:px-6 lg:max-w-[667px]",children:[e("div",{className:"flex w-full max-w-[440px] items-center gap-2 lg:absolute lg:end-6 lg:top-6 lg:max-w-full"}),a("div",{className:"w-full max-w-[440px] lg:mt-16",children:[a("div",{className:"mb-10",children:[e("h1",{className:"text-3xl font-extrabold uppercase !leading-snug md:text-4xl",style:{color:"#0B2F9F"},children:"Sign Up"}),e("p",{className:"text-base font-bold leading-normal text-white-dark",children:"Enter your email and password to register"})]}),a("form",{className:"space-y-5 dark:text-white",onSubmit:async t=>{t.preventDefault();try{const r=await f.post("https://server-side-5zbf.onrender.com/api/register",{fullname:i,email:o,phone:d,address:n,roleId:h,password:p,cpassword:m});r.data.success?(g("Account has been created successfully."),E("/auth/cover-login")):(g("Failed to create your account. Please try again!."),u(r.data.error||"An error occurred"))}catch{u("An error occurred. Please try again later.")}},children:[a("div",{children:[e("label",{htmlFor:"Name",children:"Full Name"}),a("div",{className:"relative text-white-dark",children:[e("input",{id:"Name",type:"text",placeholder:"Enter Name",className:"form-input ps-10 placeholder:text-white-dark",value:i,onChange:t=>w(t.target.value)}),e("span",{className:"absolute start-4 top-1/2 -translate-y-1/2",children:e(B,{fill:!0})})]})]}),a("div",{children:[e("label",{htmlFor:"Email",children:"Email"}),a("div",{className:"relative text-white-dark",children:[e("input",{id:"Email",type:"email",placeholder:"Enter Email",className:"form-input ps-10 placeholder:text-white-dark",value:o,onChange:t=>N(t.target.value)}),e("span",{className:"absolute start-4 top-1/2 -translate-y-1/2",children:e(s,{fill:!0})})]})]}),a("div",{children:[e("label",{htmlFor:"Address",children:"Address"}),a("div",{className:"relative text-white-dark",children:[e("input",{id:"Address",type:"address",placeholder:"Enter Address",className:"form-input ps-10 placeholder:text-white-dark",value:n,onChange:t=>k(t.target.value)}),e("span",{className:"absolute start-4 top-1/2 -translate-y-1/2",children:e(s,{fill:!0})})]})]}),a("div",{children:[e("label",{htmlFor:"Phone",children:"Phone"}),a("div",{className:"relative text-white-dark",children:[e("input",{id:"Phone",type:"phone",placeholder:"Enter Phone Number",className:"form-input ps-10 placeholder:text-white-dark",value:d,onChange:t=>y(t.target.value)}),e("span",{className:"absolute start-4 top-1/2 -translate-y-1/2",children:e(s,{fill:!0})})]})]}),a("div",{children:[e("label",{htmlFor:"Role",children:"Select Role"}),a("div",{className:"relative text-white-dark",children:[a("select",{id:"Role",className:"form-input ps-10 placeholder:text-white-dark",value:h,onChange:t=>S(Number(t.target.value)),children:[e("option",{value:"",disabled:!0,children:"Select Role"}),c.length>0?c.map(t=>e("option",{value:t.roleId,children:t.roleName},t.roleId)):e("option",{value:"",disabled:!0,children:"No roles available"})]}),e("span",{className:"absolute start-4 top-1/2 -translate-y-1/2",children:e(s,{fill:!0})})]})]}),a("div",{children:[e("label",{htmlFor:"Password",children:"Password"}),a("div",{className:"relative text-white-dark",children:[e("input",{id:"Password",type:"password",placeholder:"Enter Password",className:"form-input ps-10 placeholder:text-white-dark",value:p,onChange:t=>C(t.target.value)}),e("span",{className:"absolute start-4 top-1/2 -translate-y-1/2",children:e(v,{fill:!0})})]})]}),a("div",{children:[e("label",{htmlFor:"Password",children:"Confirm Password"}),a("div",{className:"relative text-white-dark",children:[e("input",{id:"Password",type:"password",placeholder:"Confirm Password",className:"form-input ps-10 placeholder:text-white-dark",value:m,onChange:t=>P(t.target.value)}),e("span",{className:"absolute start-4 top-1/2 -translate-y-1/2",children:e(v,{fill:!0})})]})]}),e("div",{children:a("label",{className:"flex cursor-pointer items-center",children:[e("input",{type:"checkbox",className:"form-checkbox bg-white dark:bg-black"}),e("span",{className:"text-white-dark",children:"Agree To Terms and Conditions"})]})}),e("button",{type:"submit",className:"btn !mt-6 w-full border-0 uppercase shadow-[0_10px_20px_-10px_rgba(11,47,159,0.44)]",style:{backgroundColor:"#0B2F9F",color:"#FFFFFF"},children:"Sign Up"})]}),a("div",{className:"relative my-7 text-center md:mb-9",children:[e("span",{className:"absolute inset-x-0 top-1/2 h-px w-full -translate-y-1/2 bg-white-light dark:bg-white-dark"}),e("span",{className:"relative bg-white px-2 font-bold uppercase text-white-dark dark:bg-dark dark:text-white-light",children:"or"})]}),a("div",{className:"text-center dark:text-white",children:["Already have an account ? ",e(D,{to:"/auth/cover-login",className:"uppercase text-primary underline transition hover:text-black dark:hover:text-white",style:{color:"#FFB200"},children:"SIGN IN"})]})]})]})]})})})};export{H as default};
