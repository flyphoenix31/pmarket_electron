import{V as N,r as s,w as g,x as _,y as C,G as v,a as e,F as S,j as r,B as E,E as D,K as F,d as w,M as j,Z as T}from"./index-3ea410b1.js";const W=()=>{let{id:d}=N();const[i,n]=s.useState(""),[c,m]=s.useState(""),[u,p]=s.useState(""),[b,h]=s.useState(""),[k,f]=s.useState(""),y=g(),x=_(),o=C(t=>t.users.disUserList);return s.useEffect(()=>{if(!v(o)){const t=o.findIndex(a=>a.id.toString()===d);if(t>=0){let a=o[t];n(a.the_email),m(a.the_password),p(a.the_client_token),h(a.the_session);let l=a.the_cookie;if(!v(l)){for(;l.includes("&quot;");)l=l.replace(/&quot;/g,'"');f(l)}}}},[o]),e(S,{children:r("div",{className:"mx-auto max-w-270",children:[e(E,{pageName:"User Email Edit"}),e("div",{className:"col-span-5 xl:col-span-3 mt-3",children:r("div",{className:"rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark",children:[e("div",{className:"border-b border-stroke py-4 px-7 dark:border-strokedark",children:e("h3",{className:"font-medium text-black dark:text-white",children:"Pmarket Email Information"})}),e("div",{className:"p-7",children:r("form",{onSubmit:t=>{t.preventDefault();const a=new FormData;a.append("id",d),a.append("the_email",i),a.append("the_password",c),a.append("the_client_token",u),a.append("the_session",b),a.append("the_cookie",k),y(T(a)),x("/member/users")},children:[r("div",{className:"mb-5.5 flex flex-col gap-5.5 sm:flex-row",children:[r("div",{className:"w-full sm:w-1/2",children:[e("label",{className:"mb-3 block text-sm font-medium text-black dark:text-white",htmlFor:"fullName",children:"Email"}),r("div",{className:"relative",children:[e("span",{className:"absolute left-4.5 top-4",children:e(D,{})}),e("input",{className:"w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary",type:"text",name:"email",id:"email",value:i,onChange:t=>{t.preventDefault(),n(t.target.value)},placeholder:"Write email address here"})]})]}),r("div",{className:"w-full sm:w-1/2",children:[e("label",{className:"mb-3 block text-sm font-medium text-black dark:text-white",htmlFor:"password",children:"Password"}),r("div",{className:"relative",children:[e("span",{className:"absolute left-4.5 top-4",children:e(F,{})}),e("input",{className:"w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary",type:"text",name:"password",id:"password",value:c,onChange:t=>{t.preventDefault(),m(t.target.value)},placeholder:"Write password here"})]})]})]}),r("div",{className:"mb-5.5",children:[e("label",{className:"mb-3 block text-sm font-medium text-black dark:text-white",htmlFor:"clienttoken",children:"Client Token"}),r("div",{className:"relative",children:[e("span",{className:"absolute left-4.5 top-4",children:e(w,{})}),e("input",{className:"w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary",type:"clienttoken",name:"clienttoken",id:"clienttoken",value:u,onChange:t=>{t.preventDefault(),p(t.target.value)},placeholder:"Write client token here",autoComplete:"false"})]})]}),r("div",{className:"mb-5.5",children:[e("label",{className:"mb-3 block text-sm font-medium text-black dark:text-white",htmlFor:"composeurl",children:"Session"}),r("div",{className:"relative",children:[e("span",{className:"absolute left-4.5 top-4",children:e(w,{})}),e("input",{className:"w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary",type:"composeurl",name:"composeurl",id:"composeurl",value:b,onChange:t=>{t.preventDefault(),h(t.target.value)},placeholder:"Write session here",autoComplete:"false"})]})]}),r("div",{className:"mb-5.5",children:[e("label",{className:"mb-3 block text-sm font-medium text-black dark:text-white",htmlFor:"cookie",children:"Cookie"}),r("div",{className:"relative",children:[e("span",{className:"absolute left-4.5 top-4",children:e(j,{})}),e("input",{className:"w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary",type:"cookie",name:"cookie",id:"cookie",value:k,onChange:t=>{t.preventDefault(),f(t.target.value)},placeholder:"Write cookie here",autoComplete:"false"})]})]}),r("div",{className:"flex justify-end gap-4.5",children:[e("button",{className:"btn-neffect justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white",onClick:t=>{t.preventDefault(),x("/member/users")},children:"Close"}),e("button",{className:"btn-peffect justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:shadow-1",type:"submit",children:"Save"})]})]})})]})})]})})};export{W as default};