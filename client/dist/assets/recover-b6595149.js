import{u as p,r as a,s as u,d as g,a as n,b as e,j as t,f as x}from"./index-6d5aa60a.js";import{I as f}from"./IconMail-af66765b.js";const F=()=>{const c=p(),[s,o]=a.useState(""),[h,r]=a.useState(""),[b,i]=a.useState("");a.useEffect(()=>{c(u("Recover Password"))}),g(),n(l=>l.themeConfig.rtlClass);const m=n(l=>l.themeConfig);return a.useState(m.locale),e("div",{children:e("div",{className:"relative flex min-h-screen items-center justify-center bg-[url(/assets/images/auth/map.png)] bg-cover bg-center bg-no-repeat px-6 py-10 dark:bg-[#060818] sm:px-16",children:t("div",{className:"relative flex w-full max-w-[1502px] flex-col justify-between overflow-hidden rounded-md bg-white/60 backdrop-blur-lg dark:bg-black/50 lg:min-h-[758px] lg:flex-row lg:gap-10 xl:gap-0",children:[e("div",{className:"relative hidden w-full items-center justify-center bg-[linear-gradient(225deg,#0A2A7F_0%,#FFB200_100%)] p-5 lg:inline-flex lg:max-w-[835px] xl:-ms-28 ltr:xl:skew-x-[14deg] rtl:xl:skew-x-[-14deg]",children:e("div",{className:"absolute inset-y-0 w-8 from-primary/10 via-transparent to-transparent ltr:-right-10 ltr:bg-gradient-to-r rtl:-left-10 rtl:bg-gradient-to-l xl:w-16 ltr:xl:-right-20 rtl:xl:-left-20"})}),t("div",{className:"relative flex w-full flex-col items-center justify-center gap-6 px-4 pb-16 pt-6 sm:px-6 lg:max-w-[667px]",children:[e("div",{className:"flex w-full max-w-[440px] items-center gap-2 lg:absolute lg:end-6 lg:top-6 lg:max-w-full"}),t("div",{className:"w-full max-w-[440px] lg:mt-16",children:[e("div",{className:"mb-7",children:e("h1",{className:"text-3xl font-extrabold uppercase !leading-snug md:text-4xl",style:{color:"#0B2F9F"},children:"Password reset"})}),t("form",{className:"space-y-5",onSubmit:async l=>{l.preventDefault();try{const d=await x.post("http://9993-41-173-36-105.ngrok-free.app/api/forgot_password",{email:s});i("Email sent successfully!"),r("Email not found.")}catch{r("An error occurred. Please try again."),i("")}},children:[t("div",{children:[e("label",{htmlFor:"Email",children:"Email"}),t("div",{className:"relative text-white-dark",children:[e("input",{id:"Email",type:"email",placeholder:"Enter Email",className:"form-input pl-10 placeholder:text-white-dark",value:s,onChange:l=>o(l.target.value)}),e("span",{className:"absolute left-4 top-1/2 -translate-y-1/2",children:e(f,{fill:!0})})]})]}),e("button",{type:"submit",className:"btn !mt-6 w-full border-0 uppercase shadow-[0_10px_20px_-10px_rgba(11,47,159,0.44)]",style:{backgroundColor:"#0B2F9F",color:"#FFFFFF"},children:"RECOVER"})]})]})]})]})})})};export{F as default};
