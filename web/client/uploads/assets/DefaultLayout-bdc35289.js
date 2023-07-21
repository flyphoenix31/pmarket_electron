import{r as l,a as e,j as t,w as N,x as M,y as k,$ as y,v as Z,t as K,a0 as X,a1 as L,u as e1,a2 as t1,a3 as r1,G as b,V as a1,a4 as E,a5 as l1,a6 as n1,a7 as w,a8 as v,a9 as u,f as o1,I as i1,Q as s1,aa as V,i as d1,E as c1,ab as m1,ac as u1,ad as h1,ae as f1,af as g1}from"./index-9831b627.js";function C1(r,i){const[s,n]=l.useState(()=>{try{const d=window.localStorage.getItem(r);return d?JSON.parse(d):i}catch{return i}});return l.useEffect(()=>{try{const d=typeof s=="function"?s(s):s;window.localStorage.setItem(r,JSON.stringify(d))}catch{}},[r,s]),[s,n]}const p1=()=>{const[r,i]=C1("color-theme","light");return l.useEffect(()=>{const s="dark",n=window.document.body.classList;r==="dark"?n.add(s):n.remove(s)},[r]),[r,i]},b1=()=>{const[r,i]=p1();return e("li",{children:t("label",{className:`relative m-0 block h-7.5 w-14 rounded-full ${r==="dark"?"bg-primary":"bg-stroke"}`,children:[e("input",{type:"checkbox",onChange:()=>{typeof i=="function"&&i(r==="light"?"dark":"light")},className:"dur absolute top-0 z-50 m-0 h-full w-full cursor-pointer opacity-0"}),t("span",{className:`absolute top-1/2 left-[3px] flex h-6 w-6 -translate-y-1/2 translate-x-0 items-center justify-center rounded-full bg-white shadow-switcher duration-75 ease-linear ${r==="dark"&&"!right-[3px] !translate-x-full"}`,children:[e("span",{className:"dark:hidden",children:t("svg",{width:"16",height:"16",viewBox:"0 0 16 16",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[e("path",{d:"M7.99992 12.6666C10.5772 12.6666 12.6666 10.5772 12.6666 7.99992C12.6666 5.42259 10.5772 3.33325 7.99992 3.33325C5.42259 3.33325 3.33325 5.42259 3.33325 7.99992C3.33325 10.5772 5.42259 12.6666 7.99992 12.6666Z",fill:"#969AA1"}),e("path",{d:"M8.00008 15.3067C7.63341 15.3067 7.33342 15.0334 7.33342 14.6667V14.6134C7.33342 14.2467 7.63341 13.9467 8.00008 13.9467C8.36675 13.9467 8.66675 14.2467 8.66675 14.6134C8.66675 14.9801 8.36675 15.3067 8.00008 15.3067ZM12.7601 13.4267C12.5867 13.4267 12.4201 13.3601 12.2867 13.2334L12.2001 13.1467C11.9401 12.8867 11.9401 12.4667 12.2001 12.2067C12.4601 11.9467 12.8801 11.9467 13.1401 12.2067L13.2267 12.2934C13.4867 12.5534 13.4867 12.9734 13.2267 13.2334C13.1001 13.3601 12.9334 13.4267 12.7601 13.4267ZM3.24008 13.4267C3.06675 13.4267 2.90008 13.3601 2.76675 13.2334C2.50675 12.9734 2.50675 12.5534 2.76675 12.2934L2.85342 12.2067C3.11342 11.9467 3.53341 11.9467 3.79341 12.2067C4.05341 12.4667 4.05341 12.8867 3.79341 13.1467L3.70675 13.2334C3.58008 13.3601 3.40675 13.4267 3.24008 13.4267ZM14.6667 8.66675H14.6134C14.2467 8.66675 13.9467 8.36675 13.9467 8.00008C13.9467 7.63341 14.2467 7.33342 14.6134 7.33342C14.9801 7.33342 15.3067 7.63341 15.3067 8.00008C15.3067 8.36675 15.0334 8.66675 14.6667 8.66675ZM1.38675 8.66675H1.33341C0.966748 8.66675 0.666748 8.36675 0.666748 8.00008C0.666748 7.63341 0.966748 7.33342 1.33341 7.33342C1.70008 7.33342 2.02675 7.63341 2.02675 8.00008C2.02675 8.36675 1.75341 8.66675 1.38675 8.66675ZM12.6734 3.99341C12.5001 3.99341 12.3334 3.92675 12.2001 3.80008C11.9401 3.54008 11.9401 3.12008 12.2001 2.86008L12.2867 2.77341C12.5467 2.51341 12.9667 2.51341 13.2267 2.77341C13.4867 3.03341 13.4867 3.45341 13.2267 3.71341L13.1401 3.80008C13.0134 3.92675 12.8467 3.99341 12.6734 3.99341ZM3.32675 3.99341C3.15341 3.99341 2.98675 3.92675 2.85342 3.80008L2.76675 3.70675C2.50675 3.44675 2.50675 3.02675 2.76675 2.76675C3.02675 2.50675 3.44675 2.50675 3.70675 2.76675L3.79341 2.85342C4.05341 3.11342 4.05341 3.53341 3.79341 3.79341C3.66675 3.92675 3.49341 3.99341 3.32675 3.99341ZM8.00008 2.02675C7.63341 2.02675 7.33342 1.75341 7.33342 1.38675V1.33341C7.33342 0.966748 7.63341 0.666748 8.00008 0.666748C8.36675 0.666748 8.66675 0.966748 8.66675 1.33341C8.66675 1.70008 8.36675 2.02675 8.00008 2.02675Z",fill:"#969AA1"})]})}),e("span",{className:"hidden dark:inline-block",children:e("svg",{width:"16",height:"16",viewBox:"0 0 16 16",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:e("path",{d:"M14.3533 10.62C14.2466 10.44 13.9466 10.16 13.1999 10.2933C12.7866 10.3667 12.3666 10.4 11.9466 10.38C10.3933 10.3133 8.98659 9.6 8.00659 8.5C7.13993 7.53333 6.60659 6.27333 6.59993 4.91333C6.59993 4.15333 6.74659 3.42 7.04659 2.72666C7.33993 2.05333 7.13326 1.7 6.98659 1.55333C6.83326 1.4 6.47326 1.18666 5.76659 1.48C3.03993 2.62666 1.35326 5.36 1.55326 8.28666C1.75326 11.04 3.68659 13.3933 6.24659 14.28C6.85993 14.4933 7.50659 14.62 8.17326 14.6467C8.27993 14.6533 8.38659 14.66 8.49326 14.66C10.7266 14.66 12.8199 13.6067 14.1399 11.8133C14.5866 11.1933 14.4666 10.8 14.3533 10.62Z",fill:"#969AA1"})})})]})]})})},x1=()=>{const[r,i]=l.useState(!1),s=N(),n=M(),d=k(c=>c.chat.notification),h=l.useRef(null),C=l.useRef(null);return l.useEffect(()=>{const c=({target:a})=>{C.current&&(!r||C.current.contains(a)||h.current.contains(a)||i(!1))};return document.addEventListener("click",c),()=>document.removeEventListener("click",c)}),l.useEffect(()=>{const c=({keyCode:a})=>{!r||a!==27||i(!1)};return document.addEventListener("keydown",c),()=>document.removeEventListener("keydown",c)},[]),e("li",{className:"relative","x-data":"{ dropdownOpen: false, notifying: true }",children:t(y,{ref:h,onClick:c=>{c.preventDefault(),s(X(!1)),n("/member/chat")},className:"relative flex h-8.5 w-8.5 items-center justify-center rounded-full border-[0.5px] border-stroke bg-gray hover:text-primary dark:border-strokedark dark:bg-meta-4 dark:text-white",to:"#",children:[d?e(Z,{}):"",e(K,{})]})})},w1=()=>{const[r,i]=l.useState(!1),s=l.useRef(null),n=l.useRef(null),d=N(),h=k(a=>a.notification.notificationList),C=k(a=>a.auth.isAuthenticated);l.useEffect(()=>{const a=({target:f})=>{n.current&&(!r||n.current.contains(f)||s.current.contains(f)||i(!1))};return document.addEventListener("click",a),()=>document.removeEventListener("click",a)}),l.useEffect(()=>{const a=({keyCode:f})=>{!r||f!==27||i(!1)};return document.addEventListener("keydown",a),()=>document.removeEventListener("keydown",a)}),l.useEffect(()=>{C&&d(L())},[C]);const m=()=>{i(!r),r===!1&&d(L())},c=a=>{d(r1(a))};return t("li",{className:"relative",children:[t(y,{ref:s,onClick:m,to:"#",className:"relative flex h-8.5 w-8.5 items-center justify-center rounded-full border-[0.5px] border-stroke bg-gray hover:text-primary dark:border-strokedark dark:bg-meta-4 dark:text-white",children:[h.length?e(Z,{}):"",e(e1,{})]}),t("div",{ref:n,onFocus:()=>i(!0),onBlur:()=>i(!1),className:`absolute -right-27 mt-2.5 flex h-90 w-75 flex-col rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark sm:right-0 sm:w-80 ${r===!0?"block":"hidden"}`,children:[e("div",{className:"px-4.5 py-3",children:e("h5",{className:"text-sm font-medium text-bodydark2",children:"Notification"})}),e("ul",{className:"flex h-auto flex-col overflow-y-auto",children:h.map((a,f)=>e("li",{children:t(y,{className:"flex flex-col gap-2.5 border-t border-stroke px-4.5 py-3 hover:bg-gray-2 dark:border-strokedark dark:hover:bg-meta-4",to:"#",onClick:H=>{H.preventDefault(),c(a.id),i(!1)},children:[t("p",{className:"text-sm",children:[e("span",{className:"text-black dark:text-white",children:a.subject})," ",a.content]}),e("p",{className:"text-xs",children:t1(new Date(a.created_at)).format("YYYY-MM-DD HH:mm:ss")})]})},f))})]})]})},v1=r=>{const[i,s]=l.useState(!1),n=l.useRef(null),d=l.useRef(null),h=M(),C=N(),m=a=>{a.preventDefault(),E.defaults.headers.common.Authorization="",window.localStorage.setItem("token",""),C(l1({})),h("/member/auth/signin")},c=a=>{a.preventDefault(),s(!1),h("/member/profile")};return l.useEffect(()=>{const a=({target:f})=>{d.current&&(!i||d.current.contains(f)||n.current.contains(f)||s(!1))};return document.addEventListener("click",a),()=>document.removeEventListener("click",a)}),l.useEffect(()=>{const a=({keyCode:f})=>{!i||f!==27||s(!1)};return document.addEventListener("keydown",a),()=>document.removeEventListener("keydown",a)}),t("div",{className:"relative",children:[t(y,{ref:n,onClick:()=>s(!i),className:"flex items-center gap-4",to:"#",children:[t("span",{className:"hidden text-right lg:block",children:[e("span",{className:"block text-sm font-medium text-black dark:text-white",children:b(r.headerInfo)?"":r.headerInfo.userInfo.name}),e("span",{className:"block text-xs",children:!b(r.headerInfo)&&!b(r.headerInfo.role)?r.headerInfo.role.name:""})]}),e("span",{className:"h-12 w-12 rounded-full",children:b(r.headerInfo)||b(r.headerInfo.userInfo)||b(r.headerInfo.userInfo.avatar)?"":e("img",{src:a1+r.headerInfo.userInfo.avatar,alt:"User",style:{borderRadius:"50%"}})}),e("svg",{className:`hidden fill-current sm:block ${i?"rotate-180":""}`,width:"12",height:"8",viewBox:"0 0 12 8",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:e("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M0.410765 0.910734C0.736202 0.585297 1.26384 0.585297 1.58928 0.910734L6.00002 5.32148L10.4108 0.910734C10.7362 0.585297 11.2638 0.585297 11.5893 0.910734C11.9147 1.23617 11.9147 1.76381 11.5893 2.08924L6.58928 7.08924C6.26384 7.41468 5.7362 7.41468 5.41077 7.08924L0.410765 2.08924C0.0853277 1.76381 0.0853277 1.23617 0.410765 0.910734Z",fill:""})})]}),t("div",{ref:d,onFocus:()=>s(!0),onBlur:()=>s(!1),className:`absolute right-0 mt-4 flex w-62.5 flex-col rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark ${i===!0?"block":"hidden"}`,children:[e("ul",{className:"flex flex-col gap-5 border-b border-stroke px-6 py-7.5 dark:border-strokedark",children:e("li",{children:t("button",{className:"flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base",onClick:c,children:[t("svg",{className:"fill-current",width:"22",height:"22",viewBox:"0 0 22 22",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[e("path",{d:"M11 9.62499C8.42188 9.62499 6.35938 7.59687 6.35938 5.12187C6.35938 2.64687 8.42188 0.618744 11 0.618744C13.5781 0.618744 15.6406 2.64687 15.6406 5.12187C15.6406 7.59687 13.5781 9.62499 11 9.62499ZM11 2.16562C9.28125 2.16562 7.90625 3.50624 7.90625 5.12187C7.90625 6.73749 9.28125 8.07812 11 8.07812C12.7188 8.07812 14.0938 6.73749 14.0938 5.12187C14.0938 3.50624 12.7188 2.16562 11 2.16562Z",fill:""}),e("path",{d:"M17.7719 21.4156H4.2281C3.5406 21.4156 2.9906 20.8656 2.9906 20.1781V17.0844C2.9906 13.7156 5.7406 10.9656 9.10935 10.9656H12.925C16.2937 10.9656 19.0437 13.7156 19.0437 17.0844V20.1781C19.0094 20.8312 18.4594 21.4156 17.7719 21.4156ZM4.53748 19.8687H17.4969V17.0844C17.4969 14.575 15.4344 12.5125 12.925 12.5125H9.07498C6.5656 12.5125 4.5031 14.575 4.5031 17.0844V19.8687H4.53748Z",fill:""})]}),"My Profile"]})})}),t("button",{className:"flex items-center gap-3.5 py-4 px-6 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base",onClick:m,children:[t("svg",{className:"fill-current",width:"22",height:"22",viewBox:"0 0 22 22",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[e("path",{d:"M15.5375 0.618744H11.6531C10.7594 0.618744 10.0031 1.37499 10.0031 2.26874V4.64062C10.0031 5.05312 10.3469 5.39687 10.7594 5.39687C11.1719 5.39687 11.55 5.05312 11.55 4.64062V2.23437C11.55 2.16562 11.5844 2.13124 11.6531 2.13124H15.5375C16.3625 2.13124 17.0156 2.78437 17.0156 3.60937V18.3562C17.0156 19.1812 16.3625 19.8344 15.5375 19.8344H11.6531C11.5844 19.8344 11.55 19.8 11.55 19.7312V17.3594C11.55 16.9469 11.2062 16.6031 10.7594 16.6031C10.3125 16.6031 10.0031 16.9469 10.0031 17.3594V19.7312C10.0031 20.625 10.7594 21.3812 11.6531 21.3812H15.5375C17.2219 21.3812 18.5625 20.0062 18.5625 18.3562V3.64374C18.5625 1.95937 17.1875 0.618744 15.5375 0.618744Z",fill:""}),e("path",{d:"M6.05001 11.7563H12.2031C12.6156 11.7563 12.9594 11.4125 12.9594 11C12.9594 10.5875 12.6156 10.2438 12.2031 10.2438H6.08439L8.21564 8.07813C8.52501 7.76875 8.52501 7.2875 8.21564 6.97812C7.90626 6.66875 7.42501 6.66875 7.11564 6.97812L3.67814 10.4844C3.36876 10.7938 3.36876 11.275 3.67814 11.5844L7.11564 15.0906C7.25314 15.2281 7.45939 15.3312 7.66564 15.3312C7.87189 15.3312 8.04376 15.2625 8.21564 15.125C8.52501 14.8156 8.52501 14.3344 8.21564 14.025L6.05001 11.7563Z",fill:""})]}),"Log Out"]})]})]})},k1=r=>e("header",{className:"sticky top-0 z-999 flex w-full bg-white drop-shadow-1 dark:bg-boxdark dark:drop-shadow-none",style:{marginLeft:1},children:t("div",{className:"flex flex-grow items-center justify-between py-4 px-4 shadow-2 md:px-6 2xl:px-11",children:[t("div",{className:"flex items-center gap-2 sm:gap-4 lg:hidden",children:[e("button",{"aria-controls":"sidebar",onClick:i=>{i.stopPropagation(),r.setSidebarOpen(!r.sidebarOpen)},className:"z-99999 block rounded-sm border border-stroke bg-white p-1.5 shadow-sm dark:border-strokedark dark:bg-boxdark lg:hidden",children:t("span",{className:"relative block h-5.5 w-5.5 cursor-pointer",children:[t("span",{className:"du-block absolute right-0 h-full w-full",children:[e("span",{className:`relative top-0 left-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-[0] duration-200 ease-in-out dark:bg-white ${!r.sidebarOpen&&"!w-full delay-300"}`}),e("span",{className:`relative top-0 left-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-150 duration-200 ease-in-out dark:bg-white ${!r.sidebarOpen&&"delay-400 !w-full"}`}),e("span",{className:`relative top-0 left-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-200 duration-200 ease-in-out dark:bg-white ${!r.sidebarOpen&&"!w-full delay-500"}`})]}),t("span",{className:"absolute right-0 h-full w-full rotate-45",children:[e("span",{className:`absolute left-2.5 top-0 block h-full w-0.5 rounded-sm bg-black delay-300 duration-200 ease-in-out dark:bg-white ${!r.sidebarOpen&&"!h-0 !delay-[0]"}`}),e("span",{className:`delay-400 absolute left-0 top-2.5 block h-0.5 w-full rounded-sm bg-black duration-200 ease-in-out dark:bg-white ${!r.sidebarOpen&&"!h-0 !delay-200"}`})]})]})}),e(y,{className:"block flex-shrink-0 lg:hidden",to:"/"})]}),e("div",{className:"hidden sm:block",children:e("form",{action:"https://formbold.com/s/unique_form_id",method:"POST",children:t("div",{className:"relative",children:[e("button",{className:"absolute top-1/2 left-0 -translate-y-1/2",children:t("svg",{className:"fill-body hover:fill-primary dark:fill-bodydark dark:hover:fill-primary",width:"20",height:"20",viewBox:"0 0 20 20",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[e("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M9.16666 3.33332C5.945 3.33332 3.33332 5.945 3.33332 9.16666C3.33332 12.3883 5.945 15 9.16666 15C12.3883 15 15 12.3883 15 9.16666C15 5.945 12.3883 3.33332 9.16666 3.33332ZM1.66666 9.16666C1.66666 5.02452 5.02452 1.66666 9.16666 1.66666C13.3088 1.66666 16.6667 5.02452 16.6667 9.16666C16.6667 13.3088 13.3088 16.6667 9.16666 16.6667C5.02452 16.6667 1.66666 13.3088 1.66666 9.16666Z",fill:""}),e("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M13.2857 13.2857C13.6112 12.9603 14.1388 12.9603 14.4642 13.2857L18.0892 16.9107C18.4147 17.2362 18.4147 17.7638 18.0892 18.0892C17.7638 18.4147 17.2362 18.4147 16.9107 18.0892L13.2857 14.4642C12.9603 14.1388 12.9603 13.6112 13.2857 13.2857Z",fill:""})]})}),e("input",{type:"text",placeholder:"Type to search...",className:"w-full bg-transparent pr-4 pl-9 focus:outline-none"})]})})}),t("div",{className:"flex items-center gap-3 2xsm:gap-7",children:[t("ul",{className:"flex items-center gap-2 2xsm:gap-4",children:[e(b1,{}),e(w1,{}),e(x1,{})]}),e(v1,{headerInfo:r.headerInfo})]})]})}),S=({children:r,activeCondition:i})=>{const[s,n]=l.useState(i);return e("li",{children:r(()=>{n(!s)},s)})},y1=({sidebarOpen:r,setSidebarOpen:i})=>{const s=n1(),{pathname:n}=s,d=l.useRef(null),h=l.useRef(null),C=window.localStorage.getItem("sidebar-expanded"),[m,c]=l.useState(C===null?!1:C==="true");M();const[a,f]=l.useState(!1),[H,I]=l.useState(!1),[_,R]=l.useState(!0),[$,B]=l.useState(!0),[A,D]=l.useState(!0),[O,F]=l.useState(!0),[j,P]=l.useState(!0),[G,T]=l.useState(!0);let x=window.localStorage.getItem("role_id"),U={role:"users_menu",roleid:x},q={role:"chat_history_menu",roleid:x},z={role:"setting_menu",roleid:x},Y={role:"emails_menu",roleid:x},J={role:"clients_menu",roleid:x},Q={role:"invoice_menu",roleid:x},W={role:"quotation_menu",roleid:x};return w({role:"jobs_menu",rolid:x}).then(o=>{T(o)}),w(J).then(o=>{D(o)}).catch(o=>{v()}),w(Q).then(o=>{F(o)}).catch(o=>{v()}),w(W).then(o=>{P(o)}).catch(o=>{v()}),w(U).then(o=>{B(o)}).catch(o=>{v()}),w(Y).then(o=>{R(o)}).catch(o=>{v()}),w(q).then(o=>{f(o)}).catch(o=>{v()}),w(z).then(o=>{I(o)}).catch(o=>{v()}),l.useEffect(()=>{const o=({target:p})=>{!h.current||!d.current||!r||h.current.contains(p)||d.current.contains(p)||i(!1)};return document.addEventListener("click",o),()=>document.removeEventListener("click",o)}),l.useEffect(()=>{const o=({keyCode:p})=>{!r||p!==27||i(!1)};return document.addEventListener("keydown",o),()=>document.removeEventListener("keydown",o)}),l.useEffect(()=>{var o,p;window.localStorage.setItem("sidebar-expanded",m.toString()),m?(o=document.querySelector("body"))==null||o.classList.add("sidebar-expanded"):(p=document.querySelector("body"))==null||p.classList.remove("sidebar-expanded")},[m]),t("aside",{ref:h,className:`absolute left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden bg-black duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${r?"translate-x-0":"-translate-x-full"}`,children:[t("div",{className:"flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5",children:[e("a",{href:"/",style:{marginLeft:"10px",marginTop:"5px"},children:t("div",{children:[e("span",{style:{fontSize:"40px",color:"rgb(60, 80, 224)",fontWeight:600,marginRight:"2px"},children:"P"}),e("span",{style:{fontSize:"40px",color:"#FFFFFF",fontWeight:600},children:"market"})]})}),e("button",{ref:d,onClick:()=>i(!r),"aria-controls":"sidebar","aria-expanded":r,className:"block lg:hidden",children:e("svg",{className:"fill-current",width:"20",height:"18",viewBox:"0 0 20 18",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:e("path",{d:"M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z",fill:""})})})]}),e("div",{className:"no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear",children:t("nav",{className:"mt-1 py-4 px-4 lg:mt-0 lg:px-6",style:{overscrollBehaviorY:"contain",overflowY:"auto"},children:[t("div",{children:[e("h3",{className:"mb-4 ml-4 text-sm font-semibold text-bodydark2",children:"DASHBOARD"}),e("ul",{className:"mb-6 flex flex-col gap-1.5",children:e("li",{children:t(u,{to:"/member/dashboard",className:`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${n.includes("/dashboard")&&"bg-graydark dark:bg-meta-4"}`,children:[t("svg",{className:"fill-current",width:"18",height:"18",viewBox:"0 0 18 18",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[e("path",{d:"M6.10322 0.956299H2.53135C1.5751 0.956299 0.787598 1.7438 0.787598 2.70005V6.27192C0.787598 7.22817 1.5751 8.01567 2.53135 8.01567H6.10322C7.05947 8.01567 7.84697 7.22817 7.84697 6.27192V2.72817C7.8751 1.7438 7.0876 0.956299 6.10322 0.956299ZM6.60947 6.30005C6.60947 6.5813 6.38447 6.8063 6.10322 6.8063H2.53135C2.2501 6.8063 2.0251 6.5813 2.0251 6.30005V2.72817C2.0251 2.44692 2.2501 2.22192 2.53135 2.22192H6.10322C6.38447 2.22192 6.60947 2.44692 6.60947 2.72817V6.30005Z",fill:""}),e("path",{d:"M15.4689 0.956299H11.8971C10.9408 0.956299 10.1533 1.7438 10.1533 2.70005V6.27192C10.1533 7.22817 10.9408 8.01567 11.8971 8.01567H15.4689C16.4252 8.01567 17.2127 7.22817 17.2127 6.27192V2.72817C17.2127 1.7438 16.4252 0.956299 15.4689 0.956299ZM15.9752 6.30005C15.9752 6.5813 15.7502 6.8063 15.4689 6.8063H11.8971C11.6158 6.8063 11.3908 6.5813 11.3908 6.30005V2.72817C11.3908 2.44692 11.6158 2.22192 11.8971 2.22192H15.4689C15.7502 2.22192 15.9752 2.44692 15.9752 2.72817V6.30005Z",fill:""}),e("path",{d:"M6.10322 9.92822H2.53135C1.5751 9.92822 0.787598 10.7157 0.787598 11.672V15.2438C0.787598 16.2001 1.5751 16.9876 2.53135 16.9876H6.10322C7.05947 16.9876 7.84697 16.2001 7.84697 15.2438V11.7001C7.8751 10.7157 7.0876 9.92822 6.10322 9.92822ZM6.60947 15.272C6.60947 15.5532 6.38447 15.7782 6.10322 15.7782H2.53135C2.2501 15.7782 2.0251 15.5532 2.0251 15.272V11.7001C2.0251 11.4188 2.2501 11.1938 2.53135 11.1938H6.10322C6.38447 11.1938 6.60947 11.4188 6.60947 11.7001V15.272Z",fill:""}),e("path",{d:"M15.4689 9.92822H11.8971C10.9408 9.92822 10.1533 10.7157 10.1533 11.672V15.2438C10.1533 16.2001 10.9408 16.9876 11.8971 16.9876H15.4689C16.4252 16.9876 17.2127 16.2001 17.2127 15.2438V11.7001C17.2127 10.7157 16.4252 9.92822 15.4689 9.92822ZM15.9752 15.272C15.9752 15.5532 15.7502 15.7782 15.4689 15.7782H11.8971C11.6158 15.7782 11.3908 15.5532 11.3908 15.272V11.7001C11.3908 11.4188 11.6158 11.1938 11.8971 11.1938H15.4689C15.7502 11.1938 15.9752 11.4188 15.9752 11.7001V15.272Z",fill:""})]}),"Dashboard"]})})})]}),t("div",{children:[e("h3",{className:"mb-4 ml-4 text-sm font-semibold text-bodydark2",children:"SUPPORT"}),t("ul",{className:"mb-6 flex flex-col gap-1.5",children:[e("li",{children:t(u,{to:"/member/chat",className:`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${n.includes("chat")&&"bg-graydark dark:bg-meta-4"}`,children:[t("svg",{className:"fill-current",width:"18",height:"19",viewBox:"0 0 18 18",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[e("path",{d:"M10.9688 1.57495H7.03135C3.43135 1.57495 0.506348 4.41558 0.506348 7.90308C0.506348 11.3906 2.75635 13.8375 8.26885 16.3125C8.40947 16.3687 8.52197 16.3968 8.6626 16.3968C8.85947 16.3968 9.02822 16.3406 9.19697 16.2281C9.47822 16.0593 9.64697 15.75 9.64697 15.4125V14.2031H10.9688C14.5688 14.2031 17.522 11.3625 17.522 7.87495C17.522 4.38745 14.5688 1.57495 10.9688 1.57495ZM10.9688 12.9937H9.3376C8.80322 12.9937 8.35322 13.4437 8.35322 13.9781V15.0187C3.6001 12.825 1.74385 10.8 1.74385 7.9312C1.74385 5.14683 4.10635 2.8687 7.03135 2.8687H10.9688C13.8657 2.8687 16.2563 5.14683 16.2563 7.9312C16.2563 10.7156 13.8657 12.9937 10.9688 12.9937Z",fill:""}),e("path",{d:"M5.42812 7.28442C5.0625 7.28442 4.78125 7.56567 4.78125 7.9313C4.78125 8.29692 5.0625 8.57817 5.42812 8.57817C5.79375 8.57817 6.075 8.29692 6.075 7.9313C6.075 7.56567 5.79375 7.28442 5.42812 7.28442Z",fill:""}),e("path",{d:"M9.00015 7.28442C8.63452 7.28442 8.35327 7.56567 8.35327 7.9313C8.35327 8.29692 8.63452 8.57817 9.00015 8.57817C9.33765 8.57817 9.64702 8.29692 9.64702 7.9313C9.64702 7.56567 9.33765 7.28442 9.00015 7.28442Z",fill:""}),e("path",{d:"M12.5719 7.28442C12.2063 7.28442 11.925 7.56567 11.925 7.9313C11.925 8.29692 12.2063 8.57817 12.5719 8.57817C12.9375 8.57817 13.2188 8.29692 13.2188 7.9313C13.2188 7.56567 12.9094 7.28442 12.5719 7.28442Z",fill:""})]}),"Chat"]})}),a?e("li",{children:t(u,{to:"/member/history",className:`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${n.includes("history")&&"bg-graydark dark:bg-meta-4"}`,children:[t("svg",{className:"fill-current",width:"18",height:"19",viewBox:"0 0 18 19",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[t("g",{clipPath:"url(#clip0_130_9801)",children:[e("path",{d:"M10.8563 0.55835C10.5188 0.55835 10.2095 0.8396 10.2095 1.20522V6.83022C10.2095 7.16773 10.4907 7.4771 10.8563 7.4771H16.8751C17.0438 7.4771 17.2126 7.39272 17.3251 7.28022C17.4376 7.1396 17.4938 6.97085 17.4938 6.8021C17.2688 3.28647 14.3438 0.55835 10.8563 0.55835ZM11.4751 6.15522V1.8521C13.8095 2.13335 15.6938 3.8771 16.1438 6.18335H11.4751V6.15522Z",fill:""}),e("path",{d:"M15.3845 8.7427H9.1126V2.69582C9.1126 2.35832 8.83135 2.07707 8.49385 2.07707C8.40947 2.07707 8.3251 2.07707 8.24072 2.07707C3.96572 2.04895 0.506348 5.53645 0.506348 9.81145C0.506348 14.0864 3.99385 17.5739 8.26885 17.5739C12.5438 17.5739 16.0313 14.0864 16.0313 9.81145C16.0313 9.6427 16.0313 9.47395 16.0032 9.33332C16.0032 8.99582 15.722 8.7427 15.3845 8.7427ZM8.26885 16.3083C4.66885 16.3083 1.77197 13.4114 1.77197 9.81145C1.77197 6.3802 4.47197 3.53957 7.8751 3.3427V9.36145C7.8751 9.69895 8.15635 10.0083 8.52197 10.0083H14.7938C14.6813 13.4958 11.7845 16.3083 8.26885 16.3083Z",fill:""})]}),e("defs",{children:e("clipPath",{id:"clip0_130_9801",children:e("rect",{width:"18",height:"18",fill:"white",transform:"translate(0 0.052124)"})})})]}),e("div",{children:"Chat History"})]})}):"",e("li",{children:t(u,{to:"/member/share",className:`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${n.includes("share")&&"bg-graydark dark:bg-meta-4"}`,children:[t("svg",{className:"fill-current",width:"18",height:"19",viewBox:"0 0 18 19",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[t("g",{clipPath:"url(#clip0_130_9807)",children:[e("path",{d:"M15.7501 0.55835H2.2501C1.29385 0.55835 0.506348 1.34585 0.506348 2.3021V7.53335C0.506348 8.4896 1.29385 9.2771 2.2501 9.2771H15.7501C16.7063 9.2771 17.4938 8.4896 17.4938 7.53335V2.3021C17.4938 1.34585 16.7063 0.55835 15.7501 0.55835ZM16.2563 7.53335C16.2563 7.8146 16.0313 8.0396 15.7501 8.0396H2.2501C1.96885 8.0396 1.74385 7.8146 1.74385 7.53335V2.3021C1.74385 2.02085 1.96885 1.79585 2.2501 1.79585H15.7501C16.0313 1.79585 16.2563 2.02085 16.2563 2.3021V7.53335Z",fill:""}),e("path",{d:"M6.13135 10.9646H2.2501C1.29385 10.9646 0.506348 11.7521 0.506348 12.7083V15.8021C0.506348 16.7583 1.29385 17.5458 2.2501 17.5458H6.13135C7.0876 17.5458 7.8751 16.7583 7.8751 15.8021V12.7083C7.90322 11.7521 7.11572 10.9646 6.13135 10.9646ZM6.6376 15.8021C6.6376 16.0833 6.4126 16.3083 6.13135 16.3083H2.2501C1.96885 16.3083 1.74385 16.0833 1.74385 15.8021V12.7083C1.74385 12.4271 1.96885 12.2021 2.2501 12.2021H6.13135C6.4126 12.2021 6.6376 12.4271 6.6376 12.7083V15.8021Z",fill:""}),e("path",{d:"M15.75 10.9646H11.8688C10.9125 10.9646 10.125 11.7521 10.125 12.7083V15.8021C10.125 16.7583 10.9125 17.5458 11.8688 17.5458H15.75C16.7063 17.5458 17.4938 16.7583 17.4938 15.8021V12.7083C17.4938 11.7521 16.7063 10.9646 15.75 10.9646ZM16.2562 15.8021C16.2562 16.0833 16.0312 16.3083 15.75 16.3083H11.8688C11.5875 16.3083 11.3625 16.0833 11.3625 15.8021V12.7083C11.3625 12.4271 11.5875 12.2021 11.8688 12.2021H15.75C16.0312 12.2021 16.2562 12.4271 16.2562 12.7083V15.8021Z",fill:""})]}),e("defs",{children:e("clipPath",{id:"clip0_130_9807",children:e("rect",{width:"18",height:"18",fill:"white",transform:"translate(0 0.052124)"})})})]}),"Shared"]})})]})]}),t("div",{children:[e("h3",{className:"mb-4 ml-4 text-sm font-semibold text-bodydark2",children:"MANAGEMENT"}),t("ul",{className:"mb-6 flex flex-col gap-1.5",children:[$?e("li",{children:t(u,{to:"/member/users",className:`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${n.includes("users")&&"bg-graydark dark:bg-meta-4"}`,children:[t("svg",{className:"fill-current",width:"18",height:"19",viewBox:"0 0 18 19",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[e("path",{d:"M9.0002 7.79065C11.0814 7.79065 12.7689 6.1594 12.7689 4.1344C12.7689 2.1094 11.0814 0.478149 9.0002 0.478149C6.91895 0.478149 5.23145 2.1094 5.23145 4.1344C5.23145 6.1594 6.91895 7.79065 9.0002 7.79065ZM9.0002 1.7719C10.3783 1.7719 11.5033 2.84065 11.5033 4.16252C11.5033 5.4844 10.3783 6.55315 9.0002 6.55315C7.62207 6.55315 6.49707 5.4844 6.49707 4.16252C6.49707 2.84065 7.62207 1.7719 9.0002 1.7719Z",fill:""}),e("path",{d:"M10.8283 9.05627H7.17207C4.16269 9.05627 1.71582 11.5313 1.71582 14.5406V16.875C1.71582 17.2125 1.99707 17.5219 2.3627 17.5219C2.72832 17.5219 3.00957 17.2407 3.00957 16.875V14.5406C3.00957 12.2344 4.89394 10.3219 7.22832 10.3219H10.8564C13.1627 10.3219 15.0752 12.2063 15.0752 14.5406V16.875C15.0752 17.2125 15.3564 17.5219 15.7221 17.5219C16.0877 17.5219 16.3689 17.2407 16.3689 16.875V14.5406C16.2846 11.5313 13.8377 9.05627 10.8283 9.05627Z",fill:""})]}),"Users"]})}):"",A?e("li",{children:t(u,{to:"/member/clients",className:`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${n.includes("clients")&&"bg-graydark dark:bg-meta-4"}`,children:[e(o1,{}),"Clients"]})}):"",G?e("li",{children:t(u,{to:"/member/jobs",className:`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${n.includes("jobs")&&"bg-graydark dark:bg-meta-4"}`,children:[e("svg",{className:"fill-current",width:"18",height:"19",viewBox:"0 0 36 36",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:e("path",{xmlns:"http://www.w3.org/2000/svg",className:"clr-i-outline clr-i-outline-path-1",d:"M33,6.69h0c-.18-3.41-9.47-4.33-15-4.33S3,3.29,3,6.78V29.37c0,3.49,9.43,4.43,15,4.43s15-.93,15-4.43V6.78s0,0,0,0S33,6.7,33,6.69Zm-2,7.56c-.33.86-5.06,2.45-13,2.45A37.45,37.45,0,0,1,7,15.34v2.08A43.32,43.32,0,0,0,18,18.7c4,0,9.93-.48,13-2v5.17c-.33.86-5.06,2.45-13,2.45A37.45,37.45,0,0,1,7,22.92V25a43.32,43.32,0,0,0,11,1.28c4,0,9.93-.48,13-2v5.1c-.35.86-5.08,2.45-13,2.45S5.3,30.2,5,29.37V6.82C5.3,6,10,4.36,18,4.36c7.77,0,12.46,1.53,13,2.37-.52.87-5.21,2.39-13,2.39A37.6,37.6,0,0,1,7,7.76V9.85a43.53,43.53,0,0,0,11,1.27c4,0,9.93-.48,13-2Z"})}),"Jobs"]})}):"",O?e("li",{children:t(u,{to:"/member/invoice",className:`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${n.includes("invoice")&&"bg-graydark dark:bg-meta-4"}`,children:[e(i1,{}),"Invoice"]})}):"",j?e("li",{children:t(u,{to:"/member/quotation",className:`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${n.includes("quotation")&&"bg-graydark dark:bg-meta-4"}`,children:[e(s1,{}),"Quotation"]})}):""]})]}),H?t("div",{children:[e("h3",{className:"mb-4 ml-4 text-sm font-semibold text-bodydark2",children:"SETTING"}),e("ul",{className:"mb-6 flex flex-col gap-1.5",children:e(S,{activeCondition:n==="/forms"||n.includes("forms"),children:(o,p)=>t(V.Fragment,{children:[t(u,{to:"#",className:`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${(n==="/forms"||n.includes("forms"))&&"bg-graydark dark:bg-meta-4"}`,onClick:g=>{g.preventDefault(),m?o():c(!0)},children:[e(d1,{}),"Settings",e("svg",{className:`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${p&&"rotate-180"}`,width:"20",height:"20",viewBox:"0 0 20 20",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:e("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z",fill:""})})]}),e("div",{className:`translate transform overflow-hidden ${!p&&"hidden"}`,children:t("ul",{className:"mt-4 mb-5.5 flex flex-col gap-2.5 pl-6",children:[e("li",{children:e(u,{to:"/member/setting/company",className:({isActive:g})=>"group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white "+(g&&"!text-white"),children:"Company"})}),e("li",{children:e(u,{to:"/member/setting/roles",className:({isActive:g})=>"group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white "+(g&&"!text-white"),children:"Roles"})}),e("li",{children:e(u,{to:"/member/setting/permission",className:({isActive:g})=>"group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white "+(g&&"!text-white"),children:"Permission"})})]})})]})})})]}):"",_?t("div",{children:[e("h3",{className:"mb-4 ml-4 text-sm font-semibold text-bodydark2",children:"COMMUNICATION"}),e("ul",{className:"mb-6 flex flex-col gap-1.5",children:e(S,{activeCondition:n==="/forms"||n.includes("forms"),children:(o,p)=>t(V.Fragment,{children:[t(u,{to:"#",className:`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${(n==="/forms"||n.includes("forms"))&&"bg-graydark dark:bg-meta-4"}`,onClick:g=>{g.preventDefault(),m?o():c(!0)},children:[e(c1,{}),"Emails",e("svg",{className:`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${p&&"rotate-180"}`,width:"20",height:"20",viewBox:"0 0 20 20",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:e("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z",fill:""})})]}),e("div",{className:`translate transform overflow-hidden ${!p&&"hidden"}`,children:t("ul",{className:"mt-4 mb-5.5 flex flex-col gap-2.5 pl-6",children:[e("li",{children:e(u,{to:"/member/email/all",className:({isActive:g})=>"group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white "+(g&&"!text-white"),children:"All"})}),e("li",{children:e(u,{to:"/member/email/send",className:({isActive:g})=>"group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white "+(g&&"!text-white"),children:"Send Box"})}),e("li",{children:e(u,{to:"/member/email/receive",className:({isActive:g})=>"group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white "+(g&&"!text-white"),children:"Receive Box"})})]})})]})})})]}):""]})})]})},H1=()=>{const[r,i]=l.useState(!1),[s,n]=l.useState({role:"",userInfo:{}}),d=M(),h=N(),C=k(a=>a.auth.isAuthenticated),m=k(a=>a.auth.userInfo),c=k(a=>a.users.roleList);return l.useEffect(()=>{E.defaults.headers.common.Authorization=window.localStorage.getItem("token"),h(m1()),h(u1()),h(h1())},[]),l.useEffect(()=>{!b(m)&&!b(m.id)&&f1.emit("userInfo",{id:m.id,email:m.email,name:m.name})},[m]),l.useEffect(()=>{if(!b(c)&&!b(m)){let a=c.findIndex(f=>{if(f.id==m.role_id)return f});window.localStorage.setItem("role_id",c[a].id),window.localStorage.setItem("role_name",c[a].name),n({role:c[a],userInfo:m})}},[c]),l.useEffect(()=>{!C&&b(window.localStorage.getItem("token"))&&d("/member/auth/signin")},[C]),e("div",{className:"dark:bg-boxdark-2 dark:text-bodydark",children:t("div",{className:"flex h-screen overflow-hidden",children:[e(y1,{sidebarOpen:r,setSidebarOpen:i}),t("div",{className:"relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden",children:[e(k1,{sidebarOpen:r,setSidebarOpen:i,headerInfo:s}),e("main",{children:e("div",{className:"mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10",children:e(g1,{})})})]})]})})};export{H1 as default};