const $={name:"InvalidComponentArgs",title:"Invalid component arguments.",message:t=>`Invalid arguments passed to${t?` <${t}>`:""} component.`,hint:"Astro components cannot be rendered directly via function call, such as `Component()` or `{items.map(Component)}`."},T={name:"AstroGlobUsedOutside",title:"Astro.glob() used outside of an Astro file.",message:t=>`\`Astro.glob(${t})\` can only be used in \`.astro\` files. \`import.meta.glob(${t})\` can be used instead to achieve a similar result.`,hint:"See Vite's documentation on `import.meta.glob` for more information: https://vitejs.dev/guide/features.html#glob-import"},L={name:"AstroGlobNoMatch",title:"Astro.glob() did not match any files.",message:t=>`\`Astro.glob(${t})\` did not return any matching files. Check the pattern for typos.`};function W(t){return t.replace(/\r\n|\r(?!\n)|\n/g,`
`)}function U(t,e){if(!e||e.line===void 0||e.column===void 0)return"";const r=W(t).split(`
`).map(i=>i.replace(/\t/g,"  ")),n=[];for(let i=-2;i<=2;i++)r[e.line+i]&&n.push(e.line+i);let o=0;for(const i of n){let l=`> ${i}`;l.length>o&&(o=l.length)}let s="";for(const i of n){const l=i===e.line-1;s+=l?"> ":"  ",s+=`${i+1} | ${r[i]}
`,l&&(s+=`${Array.from({length:o}).join(" ")}  | ${Array.from({length:e.column}).join(" ")}^
`)}return s}class S extends Error{loc;title;hint;frame;type="AstroError";constructor(e,...r){super(...r);const{name:n,title:o,message:s,stack:i,location:l,hint:c,frame:u}=e;this.title=o,this.name=n,s&&(this.message=s),this.stack=i||this.stack,this.loc=l,this.hint=c,this.frame=u}setLocation(e){this.loc=e}setName(e){this.name=e}setMessage(e){this.message=e}setHint(e){this.hint=e}setFrame(e,r){this.frame=U(e,r)}static is(e){return e.type==="AstroError"}}function X(t){return!(t.length!==3||!t[0]||typeof t[0]!="object")}function R(t,e,r){const n=e?.split("/").pop()?.replace(".astro","")??"",o=(...s)=>{if(!X(s))throw new S({...$,message:$.message(n)});return t(...s)};return Object.defineProperty(o,"name",{value:n,writable:!1}),o.isAstroComponentFactory=!0,o.moduleId=e,o.propagation=r,o}function Y(t){return R(t.factory,t.moduleId,t.propagation)}function K(t,e,r){return typeof t=="function"?R(t,e,r):Y(t)}const _="3.2.3";function B(){return e=>{if(typeof e=="string")throw new S({...T,message:T.message(JSON.stringify(e))});let r=[...Object.values(e)];if(r.length===0)throw new S({...L,message:L.message(JSON.stringify(e))});return Promise.all(r.map(n=>n()))}}function G(t){return{site:t?new URL(t):void 0,generator:`Astro v${_}`,glob:B()}}const{replace:J}="",z=/[&<>'"]/g,Z={"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"},Q=t=>Z[t],tt=t=>J.call(t,z,Q);function et(t){return!!t&&typeof t=="object"&&typeof t.then=="function"}const rt=tt;class w extends String{get[Symbol.toStringTag](){return"HTMLString"}}const d=t=>t instanceof w?t:typeof t=="string"?new w(t):t;function nt(t){return Object.prototype.toString.call(t)==="[object HTMLString]"}function M(t){var e,r,n="";if(typeof t=="string"||typeof t=="number")n+=t;else if(typeof t=="object")if(Array.isArray(t))for(e=0;e<t.length;e++)t[e]&&(r=M(t[e]))&&(n&&(n+=" "),n+=r);else for(e in t)t[e]&&(n&&(n+=" "),n+=e);return n}function ot(){for(var t,e,r=0,n="";r<arguments.length;)(t=arguments[r++])&&(e=M(t))&&(n&&(n+=" "),n+=e);return n}const st=/^(allowfullscreen|async|autofocus|autoplay|controls|default|defer|disabled|disablepictureinpicture|disableremoteplayback|formnovalidate|hidden|loop|nomodule|novalidate|open|playsinline|readonly|required|reversed|scoped|seamless|itemscope)$/i,it=/^(contenteditable|draggable|spellcheck|value)$/i,at=/^(autoReverse|externalResourcesRequired|focusable|preserveAlpha)$/i,ct=new Set(["set:html","set:text"]),p=(t,e=!0)=>e?String(t).replace(/&/g,"&#38;").replace(/"/g,"&#34;"):t,lt=t=>t.toLowerCase()===t?t:t.replace(/[A-Z]/g,e=>`-${e.toLowerCase()}`),x=t=>Object.entries(t).map(([e,r])=>e[0]!=="-"&&e[1]!=="-"?`${lt(e)}:${r}`:`${e}:${r}`).join(";");function ft(t,e,r=!0){if(t==null)return"";if(t===!1)return it.test(e)||at.test(e)?d(` ${e}="false"`):"";if(ct.has(e))return console.warn(`[astro] The "${e}" directive cannot be applied dynamically at runtime. It will not be rendered as an attribute.

Make sure to use the static attribute syntax (\`${e}={value}\`) instead of the dynamic spread syntax (\`{...{ "${e}": value }}\`).`),"";if(e==="class:list"){const n=p(ot(t),r);return n===""?"":d(` ${e.slice(0,-5)}="${n}"`)}if(e==="style"&&!(t instanceof w)){if(Array.isArray(t)&&t.length===2)return d(` ${e}="${p(`${x(t[0])};${t[1]}`,r)}"`);if(typeof t=="object")return d(` ${e}="${p(x(t),r)}"`)}return e==="className"?d(` class="${p(t,r)}"`):t===!0&&(e.startsWith("data-")||st.test(e))?d(` ${e}`):d(` ${e}="${p(t,r)}"`)}function C(t){const e=[],r={write:o=>e.push(o)},n=t(r);return{async renderToFinalDestination(o){for(const s of e)o.write(s);r.write=s=>o.write(s),await n}}}const k=Symbol.for("astro:slot-string");class ut extends w{instructions;[k];constructor(e,r){super(e),this.instructions=r,this[k]=!0}}new TextEncoder;new TextDecoder;function dt(t){return!!t&&typeof t=="object"&&"render"in t&&typeof t.render=="function"}async function b(t,e){if(e=await e,e instanceof ut)t.write(e);else if(nt(e))t.write(e);else if(Array.isArray(e)){const r=e.map(n=>C(o=>b(o,n)));for(const n of r)n&&await n.renderToFinalDestination(t)}else if(typeof e=="function")await b(t,e());else if(typeof e=="string")t.write(d(rt(e)));else if(!(!e&&e!==0))if(dt(e))await e.render(t);else if(yt(e))await e.render(t);else if(ht(e))await e.render(t);else if(ArrayBuffer.isView(e))t.write(e);else if(typeof e=="object"&&(Symbol.asyncIterator in e||Symbol.iterator in e))for await(const r of e)await b(t,r);else t.write(e)}const mt=Symbol.for("astro.componentInstance");function ht(t){return typeof t=="object"&&!!t[mt]}const I=Symbol.for("astro.renderTemplateResult");class pt{[I]=!0;htmlParts;expressions;error;constructor(e,r){this.htmlParts=e,this.error=void 0,this.expressions=r.map(n=>et(n)?Promise.resolve(n).catch(o=>{if(!this.error)throw this.error=o,o}):n)}async render(e){const r=this.expressions.map(n=>C(o=>{if(n||n===0)return b(o,n)}));for(let n=0;n<this.htmlParts.length;n++){const o=this.htmlParts[n],s=r[n];e.write(d(o)),s&&await s.renderToFinalDestination(e)}}}function yt(t){return typeof t=="object"&&!!t[I]}function gt(t,...e){return new pt(t,e)}const bt=G("https://eviwammes.amsterdam"),wt=K(async(t,e,r)=>{const n=t.createAstro(bt,e,r);n.self=wt;const{fallback:o="animate"}=n.props;return gt`<meta name="astro-view-transitions-enabled" content="true"><meta name="astro-view-transitions-fallback"${ft(o,"content")}>`},"/Users/eviwammes/SynologyDrive/WebChange/Projecten/Portfolio update/Portfolio/node_modules/astro/components/ViewTransitions.astro",void 0),At=document.querySelector("[darkmodeswitch]");document.addEventListener("astro:page-load",()=>{const t=document.querySelectorAll("[menu]"),e=document.querySelectorAll("[knopMenu]");var r=!1;e.forEach(n=>{n.addEventListener("click",function(){r==!1?(r=!0,t.forEach(o=>{o.classList.remove("hidden"),o.classList.add("flex"),e[0].classList.add("hidden"),e[1].classList.remove("hidden")})):(r=!1,t.forEach(o=>{o.classList.add("hidden"),o.classList.remove("flex"),e[0].classList.remove("hidden"),e[1].classList.add("hidden")}))})})},{once:!1});At.addEventListener("click",St);var y=document.querySelector("html");function St(){y.classList.contains("dark")?(y.classList.remove("dark"),localStorage.removeItem("darkMode")):(y.classList.add("dark"),localStorage.setItem("darkMode","1"))}const q=()=>{localStorage.darkMode?(y.classList.add("dark"),localStorage.setItem("darkMode","1")):(y.classList.remove("dark"),localStorage.removeItem("darkMode"))};q();document.addEventListener("astro:after-swap",q);const vt=t=>history.state&&history.replaceState(t,""),v=!!document.startViewTransition,A=()=>!!document.querySelector('[name="astro-view-transitions-enabled"]'),H=t=>location.pathname===t.pathname&&location.search===t.search,O=t=>document.dispatchEvent(new Event(t)),F=()=>O("astro:page-load"),Et=()=>{let t=document.createElement("div");t.setAttribute("aria-live","assertive"),t.setAttribute("aria-atomic","true"),t.setAttribute("style","position:absolute;left:0;top:0;clip:rect(0 0 0 0);clip-path:inset(50%);overflow:hidden;white-space:nowrap;width:1px;height:1px"),document.body.append(t),setTimeout(()=>{let e=document.title||document.querySelector("h1")?.textContent||location.pathname;t.textContent=e},60)},h="data-astro-transition-persist",$t=new DOMParser;let g=0;history.state?(g=history.state.index,scrollTo({left:history.state.scrollX,top:history.state.scrollY})):A()&&history.replaceState({index:g,scrollX,scrollY,intraPage:!1},"");const Tt=(t,e)=>{let r=!1,n=!1;return(...o)=>{if(r){n=!0;return}t(...o),r=!0,setTimeout(()=>{n&&(n=!1,t(...o)),r=!1},e)}};async function Lt(t){try{const e=await fetch(t),r=e.headers.get("content-type")?.replace(/;.*$/,"");return r!=="text/html"&&r!=="application/xhtml+xml"?null:{html:await e.text(),redirected:e.redirected?e.url:void 0,mediaType:r}}catch{return null}}function j(){const t=document.querySelector('[name="astro-view-transitions-fallback"]');return t?t.getAttribute("content"):"animate"}function N(){for(const t of document.scripts)t.dataset.astroExec=""}function xt(){let t=Promise.resolve();for(const e of Array.from(document.scripts)){if(e.dataset.astroExec==="")continue;const r=document.createElement("script");r.innerHTML=e.innerHTML;for(const n of e.attributes){if(n.name==="src"){const o=new Promise(s=>{r.onload=s});t=t.then(()=>o)}r.setAttribute(n.name,n.value)}r.dataset.astroExec="",e.replaceWith(r)}return t}function kt(t){const e=t.effect;return!e||!(e instanceof KeyframeEffect)||!e.target?!1:window.getComputedStyle(e.target,e.pseudoElement).animationIterationCount==="infinite"}const V=(t,e,r)=>{const n=!H(t);t.href!==location.href&&(e?history.replaceState({...history.state},"",t.href):(history.replaceState({...history.state,intraPage:r},""),history.pushState({index:++g,scrollX,scrollY},"",t.href)),n&&scrollTo({left:0,top:0,behavior:"instant"})),t.hash?location.href=t.href:scrollTo({left:0,top:0,behavior:"instant"})};async function P(t,e,r,n,o){const s=c=>{const u=c.getAttribute(h),m=u&&t.head.querySelector(`[${h}="${u}"]`);if(m)return m;if(c.matches("link[rel=stylesheet]")){const a=c.getAttribute("href");return t.head.querySelector(`link[rel=stylesheet][href="${a}"]`)}return null},i=()=>{const c=document.documentElement,u=[...c.attributes].filter(({name:a})=>(c.removeAttribute(a),a.startsWith("data-astro-")));[...t.documentElement.attributes,...u].forEach(({name:a,value:f})=>c.setAttribute(a,f));for(const a of document.scripts)for(const f of t.scripts)if(!a.src&&a.textContent===f.textContent||a.src&&a.type===f.type&&a.src===f.src){f.dataset.astroExec="";break}for(const a of Array.from(document.head.children)){const f=s(a);f?f.remove():a.remove()}document.head.append(...t.head.children);const m=document.body;document.body.replaceWith(t.body);for(const a of m.querySelectorAll(`[${h}]`)){const f=a.getAttribute(h),E=document.querySelector(`[${h}="${f}"]`);E&&E.replaceWith(a)}n?scrollTo(n.scrollX,n.scrollY):V(e,r.history==="replace",!1),O("astro:after-swap")},l=[];for(const c of t.querySelectorAll("head link[rel=stylesheet]"))if(!document.querySelector(`[${h}="${c.getAttribute(h)}"], link[rel=stylesheet][href="${c.getAttribute("href")}"]`)){const u=document.createElement("link");u.setAttribute("rel","preload"),u.setAttribute("as","style"),u.setAttribute("href",c.getAttribute("href")),l.push(new Promise(m=>{["load","error"].forEach(a=>u.addEventListener(a,m)),document.head.append(u)}))}if(l.length&&await Promise.all(l),o==="animate"){const c=document.getAnimations();document.documentElement.dataset.astroTransitionFallback="old";const u=document.getAnimations().filter(f=>!c.includes(f)&&!kt(f)),m=Promise.all(u.map(f=>f.finished)),a=()=>{i(),document.documentElement.dataset.astroTransitionFallback="new"};await m,a()}else i()}async function D(t,e,r,n){let o;const s=e.href,i=await Lt(s);if(i===null){location.href=s;return}i.redirected&&(e=new URL(i.redirected));const l=$t.parseFromString(i.html,i.mediaType);if(l.querySelectorAll("noscript").forEach(c=>c.remove()),!l.querySelector('[name="astro-view-transitions-enabled"]')){location.href=s;return}n||history.replaceState({...history.state,scrollX,scrollY},""),document.documentElement.dataset.astroTransition=t,v?o=document.startViewTransition(()=>P(l,e,r,n)).finished:o=P(l,e,r,n,j());try{await o}finally{await xt(),N(),F(),Et()}}function Pt(t,e){if(!A()){location.href=t;return}const r=new URL(t,location.href);location.origin===r.origin&&H(r)?V(r,e?.history==="replace",!0):D("forward",r,e??{})}if(v||j()!=="none"){addEventListener("popstate",e=>{if(!A()&&e.state){history.scrollRestoration&&(history.scrollRestoration="manual"),location.reload();return}if(e.state===null){history.scrollRestoration&&(history.scrollRestoration="auto");return}history.scrollRestoration&&(history.scrollRestoration="manual");const r=history.state;if(r.intraPage)scrollTo(r.scrollX,r.scrollY);else{const n=r.index,o=n>g?"forward":"back";g=n,D(o,new URL(location.href),{},r)}}),addEventListener("load",F);const t=()=>{vt({...history.state,scrollX,scrollY})};"onscrollend"in window?addEventListener("scrollend",t):addEventListener("scroll",Tt(t,300)),N()}function Rt(){const t=document.querySelector('[name="astro-view-transitions-fallback"]');return t?t.getAttribute("content"):"animate"}function Mt(t){if(document.querySelector(`link[rel=prefetch][href="${t}"]`))return;if(navigator.connection){let r=navigator.connection;if(r.saveData||/(2|3)g/.test(r.effectiveType||""))return}let e=document.createElement("link");e.setAttribute("rel","prefetch"),e.setAttribute("href",t),document.head.append(e)}(v||Rt()!=="none")&&(document.addEventListener("click",t=>{let e=t.target;e instanceof Element&&e.tagName!=="A"&&(e=e.closest("a")),!(!e||!(e instanceof HTMLAnchorElement)||e.dataset.astroReload!==void 0||e.hasAttribute("download")||!e.href||e.target&&e.target!=="_self"||e.origin!==location.origin||t.button!==0||t.metaKey||t.ctrlKey||t.altKey||t.shiftKey||t.defaultPrevented)&&(t.preventDefault(),Pt(e.href,{history:e.dataset.astroHistory==="replace"?"replace":"auto"}))}),["mouseenter","touchstart","focus"].forEach(t=>{document.addEventListener(t,e=>{if(e.target instanceof HTMLAnchorElement){let r=e.target;r.origin===location.origin&&r.pathname!==location.pathname&&A()&&Mt(r.pathname)}},{passive:!0,capture:!0})}));
