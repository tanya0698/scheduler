import{u as f,r as c,s as g,a as x,j as t,b as e,L as u,g as y}from"./index-6d5aa60a.js";import{A as i}from"./index-480fe89e.js";import{I as k}from"./IconArrowWaveLeftUp-8eca1f14.js";import{I as v,a as w,d as N,c as n,b as s}from"./IconRouter-8f78ac47.js";import{I as B}from"./IconBox-f4b6c814.js";const F=()=>{const p=f();c.useEffect(()=>{p(g("FAQ"))}),c.useState();const b=x(m=>m.themeConfig.theme==="dark"||m.themeConfig.isDarkMode),[o,l]=c.useState("general"),[r,d]=c.useState(1),[a,h]=c.useState(1);return t("div",{children:[t("div",{className:"relative rounded-t-md bg-primary-light bg-[url('/assets/images/knowledge/pattern.png')] bg-contain bg-left-top bg-no-repeat px-5 py-10 dark:bg-black md:px-10",children:[e("div",{className:"absolute -bottom-1 -end-6 hidden text-[#DBE7FF] rtl:rotate-y-180 dark:text-[#1B2E4B] lg:block xl:end-0",children:e("img",{src:b?"/assets/images/faq/faq-dark.svg":"/assets/images/faq/faq-light.svg",alt:"faqs",className:"w-56 object-cover xl:w-80"})}),t("div",{className:"relative",children:[t("div",{className:"flex flex-col items-center justify-center sm:-ms-32 sm:flex-row xl:-ms-60",children:[t("div",{className:"mb-2 flex gap-1 text-end text-base leading-5 sm:flex-col xl:text-xl",children:[e("span",{children:"It's free "}),e("span",{children:"For everyone"})]}),e("div",{className:"me-4 ms-2 hidden sm:block text-[#0E1726] dark:text-white rtl:rotate-y-180",children:e(k,{className:"w-16 xl:w-28"})}),e("div",{className:"mb-2 text-center text-2xl font-bold dark:text-white md:text-5xl",children:"FAQs"})]}),e("p",{className:"mb-9 text-center text-base font-semibold",children:"Search instant answers & questions asked by popular users"}),e("form",{action:"",method:"",className:"mb-6",children:t("div",{className:"relative mx-auto max-w-[580px]",children:[e("input",{type:"text",placeholder:"Ask a question",className:"form-input py-3 ltr:pr-[100px] rtl:pl-[100px]"}),e("button",{type:"button",className:"btn btn-primary absolute top-1 shadow-none ltr:right-1 rtl:left-1",children:"Search"})]})}),t("div",{className:"flex flex-wrap items-center justify-center gap-2 font-semibold text-[#2196F3] sm:gap-5",children:[e("div",{className:"whitespace-nowrap font-medium text-black dark:text-white",children:"Popular topics :"}),t("div",{className:"flex items-center justify-center gap-2 sm:gap-5",children:[e(u,{to:"#",className:"duration-300 hover:underline",children:"Sales"}),e(u,{to:"#",className:"duration-300 hover:underline",children:"Charts"}),e(u,{to:"#",className:"duration-300 hover:underline",children:"Finance"}),e(u,{to:"#",className:"duration-300 hover:underline",children:"Trending"})]})]})]})]}),e("div",{className:"mb-12 flex items-center rounded-b-md bg-[#DBE7FF] dark:bg-[#141F31]",children:t("ul",{className:"mx-auto flex items-center gap-5 overflow-auto whitespace-nowrap px-3 py-4.5 xl:gap-8",children:[t("li",{className:`group flex min-w-[120px] cursor-pointer flex-col items-center justify-center gap-4 rounded-md px-8 py-2.5 text-center text-[#506690] duration-300 hover:bg-white hover:text-primary dark:hover:bg-[#1B2E4B]
                    ${o==="general"?"bg-white text-primary dark:bg-[#1B2E4B]":""}`,onClick:()=>l("general"),children:[e(v,{fill:!0}),e("h5",{className:"font-bold text-black dark:text-white",children:"General"})]}),t("li",{className:`group flex min-w-[120px] cursor-pointer flex-col items-center justify-center gap-4 rounded-md px-8 py-2.5 text-center text-[#506690] duration-300 hover:bg-white hover:text-primary dark:hover:bg-[#1B2E4B]
                    ${o==="quick-support"?"bg-white text-primary dark:bg-[#1B2E4B]":""}`,onClick:()=>l("quick-support"),children:[e(y,{fill:!0,className:"w-8 h-8"}),e("h5",{className:"font-bold text-black dark:text-white",children:"Quick Support"})]}),t("li",{className:`group flex min-w-[120px] cursor-pointer flex-col items-center justify-center gap-4 rounded-md px-8 py-2.5 text-center text-[#506690] duration-300 hover:bg-white hover:text-primary dark:hover:bg-[#1B2E4B]
                    ${o==="free-updates"?"bg-white text-primary dark:bg-[#1B2E4B]":""}`,onClick:()=>l("free-updates"),children:[e(B,{fill:!0}),e("h5",{className:"font-bold text-black dark:text-white",children:"Free Updates"})]}),t("li",{className:`group flex min-w-[120px] cursor-pointer flex-col items-center justify-center gap-4 rounded-md px-8 py-2.5 text-center text-[#506690] duration-300 hover:bg-white hover:text-primary dark:hover:bg-[#1B2E4B]
                    ${o==="pricing"?"bg-white text-primary dark:bg-[#1B2E4B]":""}`,onClick:()=>l("pricing"),children:[e(w,{fill:!0}),e("h5",{className:"font-bold text-black dark:text-white",children:"Pricing"})]}),t("li",{className:`group flex min-w-[120px] cursor-pointer flex-col items-center justify-center gap-4 rounded-md px-8 py-2.5 text-center text-[#506690] duration-300 hover:bg-white hover:text-primary dark:hover:bg-[#1B2E4B]
                    ${o==="hosting"?"bg-white text-primary dark:bg-[#1B2E4B]":""}`,onClick:()=>l("hosting"),children:[e(N,{fill:!0}),e("h5",{className:"font-bold text-black dark:text-white",children:"Hosting"})]})]})}),t("h3",{className:"mb-8 text-center text-xl font-semibold md:text-2xl",children:["Frequently asked ",e("span",{className:"text-primary",children:"questions"})]}),t("div",{className:"mb-10 grid grid-cols-1 gap-10 md:grid-cols-2",children:[t("div",{className:"rounded-md bg-white dark:bg-black",children:[e("div",{className:"border-b border-white-light p-6 text-[22px] font-bold dark:border-dark dark:text-white",children:"General topics?"}),t("div",{className:"divide-y divide-white-light px-6 py-4.5 dark:divide-dark",children:[t("div",{children:[t("div",{className:`flex cursor-pointer items-center justify-between gap-10 px-2.5 py-2 text-base font-semibold hover:bg-primary-light hover:text-primary dark:text-white dark:hover:bg-[#1B2E4B] dark:hover:text-primary
                            ${r===1?"bg-primary-light dark:bg-[#1B2E4B] !text-primary":""}`,onClick:()=>d(r===1?null:1),children:[e("span",{children:"How to install VRISTO Admin"}),r!==1?e("span",{className:"shrink-0",children:e(n,{duotone:!1})}):e("span",{className:"shrink-0",children:e(s,{fill:!0})})]}),e(i,{duration:300,height:r===1?"auto":0,children:e("div",{className:"px-1 py-3 font-semibold text-white-dark",children:e("p",{children:"Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS."})})})]}),t("div",{children:[t("div",{className:`flex cursor-pointer items-center justify-between gap-10 px-2.5 py-2 text-base font-semibold hover:bg-primary-light hover:text-primary dark:text-white dark:hover:bg-[#1B2E4B] dark:hover:text-primary
                            ${r===2?"bg-primary-light dark:bg-[#1B2E4B] !text-primary":""}`,onClick:()=>d(r===2?null:2),children:[e("span",{children:" Where can I subscribe to your newsletter?"}),r!==2?e("span",{className:"shrink-0",children:e(n,{duotone:!1})}):e("span",{className:"shrink-0",children:e(s,{fill:!0})})]}),e(i,{duration:300,height:r===2?"auto":0,children:e("div",{className:"px-1 py-3 font-semibold text-white-dark",children:e("p",{children:"Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS."})})})]}),t("div",{children:[t("div",{className:`flex cursor-pointer items-center justify-between gap-10 px-2.5 py-2 text-base font-semibold hover:bg-primary-light hover:text-primary dark:text-white dark:hover:bg-[#1B2E4B] dark:hover:text-primary
                            ${r===3?"bg-primary-light dark:bg-[#1B2E4B] !text-primary":""}`,onClick:()=>d(r===3?null:3),children:[e("span",{children:"How to install VRISTO Admin"}),r!==3?e("span",{className:"shrink-0",children:e(n,{duotone:!1})}):e("span",{className:"shrink-0",children:e(s,{fill:!0})})]}),e(i,{duration:300,height:r===3?"auto":0,children:e("div",{className:"px-1 py-3 font-semibold text-white-dark",children:e("p",{children:"Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS."})})})]}),t("div",{children:[t("div",{className:`flex cursor-pointer items-center justify-between gap-10 px-2.5 py-2 text-base font-semibold hover:bg-primary-light hover:text-primary dark:text-white dark:hover:bg-[#1B2E4B] dark:hover:text-primary
                            ${r===5?"bg-primary-light dark:bg-[#1B2E4B] !text-primary":""}`,onClick:()=>d(r===5?null:5),children:[e("span",{children:"How to install VRISTO Admin"}),r!==5?e("span",{className:"shrink-0",children:e(n,{duotone:!1})}):e("span",{className:"shrink-0",children:e(s,{fill:!0})})]}),e(i,{duration:300,height:r===5?"auto":0,children:e("div",{className:"px-1 py-3 font-semibold text-white-dark",children:e("p",{children:"Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS."})})})]})]})]}),t("div",{className:"rounded-md bg-white dark:bg-black",children:[e("div",{className:"border-b border-white-light p-6 text-[22px] font-bold dark:border-dark dark:text-white",children:"Quick support & Free update"}),t("div",{className:"divide-y divide-white-light px-6 py-4.5 dark:divide-dark",children:[t("div",{children:[t("div",{className:`flex cursor-pointer items-center justify-between gap-10 px-2.5 py-2 text-base font-semibold hover:bg-primary-light hover:text-primary dark:text-white dark:hover:bg-[#1B2E4B] dark:hover:text-primary
                            ${a===1?"bg-primary-light dark:bg-[#1B2E4B] !text-primary":""}`,onClick:()=>h(a===1?null:1),children:[e("span",{children:"How to use Browser Sync"}),a!==1?e("span",{className:"shrink-0",children:e(n,{duotone:!1})}):e("span",{className:"shrink-0",children:e(s,{fill:!0})})]}),e(i,{duration:300,height:a===1?"auto":0,children:e("div",{className:"px-1 py-3 font-semibold text-white-dark",children:e("p",{children:"Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS."})})})]}),t("div",{children:[t("div",{className:`flex cursor-pointer items-center justify-between gap-10 px-2.5 py-2 text-base font-semibold hover:bg-primary-light hover:text-primary dark:text-white dark:hover:bg-[#1B2E4B] dark:hover:text-primary
                            ${a===2?"bg-primary-light dark:bg-[#1B2E4B] !text-primary":""}`,onClick:()=>h(a===2?null:2),children:[e("span",{children:" Sidebar not rendering CSS"}),a!==2?e("span",{className:"shrink-0",children:e(n,{duotone:!1})}):e("span",{className:"shrink-0",children:e(s,{fill:!0})})]}),e(i,{duration:300,height:a===2?"auto":0,children:e("div",{className:"px-1 py-3 font-semibold text-white-dark",children:e("p",{children:"Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS."})})})]}),t("div",{children:[t("div",{className:`flex cursor-pointer items-center justify-between gap-10 px-2.5 py-2 text-base font-semibold hover:bg-primary-light hover:text-primary dark:text-white dark:hover:bg-[#1B2E4B] dark:hover:text-primary
                            ${a===3?"bg-primary-light dark:bg-[#1B2E4B] !text-primary":""}`,onClick:()=>h(a===3?null:3),children:[e("span",{children:"Connect with us Personally"}),a!==3?e("span",{className:"shrink-0",children:e(n,{duotone:!1})}):e("span",{className:"shrink-0",children:e(s,{fill:!0})})]}),e(i,{duration:300,height:a===3?"auto":0,children:e("div",{className:"px-1 py-3 font-semibold text-white-dark",children:e("p",{children:"Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS."})})})]}),t("div",{children:[t("div",{className:`flex cursor-pointer items-center justify-between gap-10 px-2.5 py-2 text-base font-semibold hover:bg-primary-light hover:text-primary dark:text-white dark:hover:bg-[#1B2E4B] dark:hover:text-primary
                            ${a===5?"bg-primary-light dark:bg-[#1B2E4B] !text-primary":""}`,onClick:()=>h(a===5?null:5),children:[e("span",{children:"Compilation Issue"}),a!==5?e("span",{className:"shrink-0",children:e(n,{duotone:!1})}):e("span",{className:"shrink-0",children:e(s,{fill:!0})})]}),e(i,{duration:300,height:a===5?"auto":0,children:e("div",{className:"px-1 py-3 font-semibold text-white-dark",children:e("p",{children:"Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS."})})})]})]})]})]}),t("div",{className:"panel mt-10 text-center md:mt-20",children:[e("h3",{className:"mb-2 text-xl font-bold dark:text-white md:text-2xl",children:"Still need help?"}),e("div",{className:"text-lg font-medium text-white-dark",children:"Our specialists are always happy to help. Contact us during standard business hours or email us24/7 and we'll get back to you."}),t("div",{className:"mt-8 flex flex-col sm:flex-row items-center justify-center gap-6",children:[e("button",{type:"button",className:"btn btn-primary",children:"Contact Us"}),e("button",{type:"button",className:"btn btn-primary",children:"Visit our community"})]})]})]})};export{F as default};
