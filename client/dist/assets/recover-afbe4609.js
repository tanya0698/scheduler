import{u,r as l,s as g,b as x,a as o,c as e,j as s,d as f,S as h}from"./index-d244c3fa.js";import{I as b}from"./IconMail-659db9ff.js";const C=()=>{const n=u(),[r,c]=l.useState(""),[w,m]=l.useState(""),[v,d]=l.useState("");l.useEffect(()=>{n(g("Recover Password"))}),x(),o(t=>t.themeConfig.rtlClass);const p=o(t=>t.themeConfig);l.useState(p.locale);const i=(t="",a="success")=>{h.mixin({toast:!0,position:"top",showConfirmButton:!1,timer:3e3,customClass:{container:"toast"}}).fire({icon:a,title:t,padding:"10px 20px"})};return e("div",{children:e("div",{className:"relative flex min-h-screen items-center justify-center bg-[url(/assets/images/auth/map.png)] bg-cover bg-center bg-no-repeat px-6 py-10 dark:bg-[#060818] sm:px-16",children:s("div",{className:"relative flex w-full max-w-[1502px] flex-col justify-between overflow-hidden rounded-md bg-white/60 backdrop-blur-lg dark:bg-black/50 lg:min-h-[758px] lg:flex-row lg:gap-10 xl:gap-0",children:[e("div",{className:"relative hidden w-full items-center justify-center bg-[linear-gradient(225deg,#0A2A7F_0%,#FFB200_100%)] p-5 lg:inline-flex lg:max-w-[835px] xl:-ms-28 ltr:xl:skew-x-[14deg] rtl:xl:skew-x-[-14deg]",children:e("div",{className:"absolute inset-y-0 w-8 from-primary/10 via-transparent to-transparent ltr:-right-10 ltr:bg-gradient-to-r rtl:-left-10 rtl:bg-gradient-to-l xl:w-16 ltr:xl:-right-20 rtl:xl:-left-20"})}),s("div",{className:"relative flex w-full flex-col items-center justify-center gap-6 px-4 pb-16 pt-6 sm:px-6 lg:max-w-[667px]",children:[e("div",{className:"flex w-full max-w-[440px] items-center gap-2 lg:absolute lg:end-6 lg:top-6 lg:max-w-full"}),s("div",{className:"w-full max-w-[440px] lg:mt-16",children:[e("div",{className:"mb-7",children:e("h1",{className:"text-3xl font-extrabold uppercase !leading-snug md:text-4xl",style:{color:"#0B2F9F"},children:"Password reset"})}),s("form",{className:"space-y-5",onSubmit:async t=>{t.preventDefault();try{const a=await f.post("https://server-side-5zbf.onrender.com/api/forgot_password",{email:r});i("Email sent successfully!"),m("Email not found.")}catch{i("An error occurred. Please try again."),d("")}},children:[s("div",{children:[e("label",{htmlFor:"Email",children:"Email"}),s("div",{className:"relative text-white-dark",children:[e("input",{id:"Email",type:"email",placeholder:"Enter Email",className:"form-input pl-10 placeholder:text-white-dark",value:r,onChange:t=>c(t.target.value)}),e("span",{className:"absolute left-4 top-1/2 -translate-y-1/2",children:e(b,{fill:!0})})]})]}),e("button",{type:"submit",className:"btn !mt-6 w-full border-0 uppercase shadow-[0_10px_20px_-10px_rgba(11,47,159,0.44)]",style:{backgroundColor:"#0B2F9F",color:"#FFFFFF"},children:"RECOVER"})]})]})]})]})})})};export{C as default};
