"use strict";(self.webpackChunksilogen_docs=self.webpackChunksilogen_docs||[]).push([[870],{8456:(e,i,s)=>{s.r(i),s.d(i,{assets:()=>l,contentTitle:()=>c,default:()=>d,frontMatter:()=>r,metadata:()=>o,toc:()=>a});var n=s(6070),t=s(4946);const r={},c="LLM Service",o={id:"using-the-api/llm-service/index",title:"LLM Service",description:"The service endpoint for chat is//model-service.services.silogen.ai/v1/chat/completions.",source:"@site/external-docs/docs/using-the-api/llm-service/index.mdx",sourceDirName:"using-the-api/llm-service",slug:"/using-the-api/llm-service/",permalink:"/using-the-api/llm-service/",draft:!1,unlisted:!1,tags:[],version:"current",frontMatter:{},sidebar:"docsSidebar",previous:{title:"Authentication",permalink:"/using-the-api/authentication"},next:{title:"Changing Prompt Template for RAG",permalink:"/using-the-api/llm-service/changing-prompt-template"}},l={},a=[];function h(e){const i={a:"a",code:"code",h1:"h1",header:"header",li:"li",p:"p",pre:"pre",ul:"ul",...(0,t.R)(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(i.header,{children:(0,n.jsx)(i.h1,{id:"llm-service",children:"LLM Service"})}),"\n",(0,n.jsxs)(i.p,{children:["The service endpoint for chat is: ",(0,n.jsx)(i.a,{href:"https://model-service.services.silogen.ai/v1/chat/completions",children:"https://model-service.services.silogen.ai/v1/chat/completions"}),"."]}),"\n",(0,n.jsxs)(i.p,{children:["The base url is: ",(0,n.jsx)(i.a,{href:"https://model-service.services.silogen.ai",children:"https://model-service.services.silogen.ai"})]}),"\n",(0,n.jsx)(i.p,{children:"Open API documentation is here:"}),"\n",(0,n.jsxs)(i.ul,{children:["\n",(0,n.jsx)(i.li,{children:(0,n.jsx)(i.a,{href:"https://model-service.services.silogen.ai/docs",children:"https://model-service.services.silogen.ai/docs"})}),"\n",(0,n.jsx)(i.li,{children:(0,n.jsx)(i.a,{href:"https://model-service.services.silogen.ai/redoc",children:"https://model-service.services.silogen.ai/redoc"})}),"\n"]}),"\n",(0,n.jsx)(i.p,{children:"Remember to send the authentication token that was generated in section Authentication with the request. An example is given below:"}),"\n",(0,n.jsx)(i.pre,{children:(0,n.jsx)(i.code,{className:"language-console",children:'curl -X POST https://model-service.services.silogen.ai/v1/chat/completions -H "Authorization: Bearer ${ACCESS_TOKEN}" -H "Content-Type: application/json" -d \'{"model": "THE_MODEL_NAME", "messages": [{"role": "user", "content": "YOUR PROMPT HERE"}], "collection": {"collectionId": "THE_COLLECTION_NAME"}, "temperature": 0.2}\'\n'})})]})}function d(e={}){const{wrapper:i}={...(0,t.R)(),...e.components};return i?(0,n.jsx)(i,{...e,children:(0,n.jsx)(h,{...e})}):h(e)}},4946:(e,i,s)=>{s.d(i,{R:()=>c,x:()=>o});var n=s(758);const t={},r=n.createContext(t);function c(e){const i=n.useContext(r);return n.useMemo((function(){return"function"==typeof e?e(i):{...i,...e}}),[i,e])}function o(e){let i;return i=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:c(e.components),n.createElement(r.Provider,{value:i},e.children)}}}]);