import{X as e,et as t,l as n,v as r,x as i}from"./runtime-core.esm-bundler-CPj5JcoF.js";import{F as a,G as o,I as s,L as c,V as l,W as u,Z as d,at as f,ct as p,dt as m,i as h,lt as g,n as _,o as v,ot as y,r as b,rt as x,t as S,tt as C,ut as w}from"./light-K75ssbgo.js";import{t as T}from"./use-merged-state-gv66ZBw1.js";import{r as E}from"./index-C4ysj8FM.js";function D(e){let{primaryColor:t,opacityDisabled:n,borderRadius:r,textColor3:i}=e;return Object.assign(Object.assign({},E),{iconColor:i,textColor:`white`,loadingColor:t,opacityDisabled:n,railColor:`rgba(0, 0, 0, .14)`,railColorActive:t,buttonBoxShadow:`0 1px 4px 0 rgba(0, 0, 0, 0.3), inset 0 0 1px 0 rgba(0, 0, 0, 0.05)`,buttonColor:`#FFF`,railBorderRadiusSmall:r,railBorderRadiusMedium:r,railBorderRadiusLarge:r,buttonBorderRadiusSmall:r,buttonBorderRadiusMedium:r,buttonBorderRadiusLarge:r,boxShadowFocus:`0 0 0 2px ${d(t,{alpha:.2})}`})}var O={name:`Switch`,common:S,self:D},k=y(`switch`,`
 height: var(--n-height);
 min-width: var(--n-width);
 vertical-align: middle;
 user-select: none;
 -webkit-user-select: none;
 display: inline-flex;
 outline: none;
 justify-content: center;
 align-items: center;
`,[p(`children-placeholder`,`
 height: var(--n-rail-height);
 display: flex;
 flex-direction: column;
 overflow: hidden;
 pointer-events: none;
 visibility: hidden;
 `),p(`rail-placeholder`,`
 display: flex;
 flex-wrap: none;
 `),p(`button-placeholder`,`
 width: calc(1.75 * var(--n-rail-height));
 height: var(--n-rail-height);
 `),y(`base-loading`,`
 position: absolute;
 top: 50%;
 left: 50%;
 transform: translateX(-50%) translateY(-50%);
 font-size: calc(var(--n-button-width) - 4px);
 color: var(--n-loading-color);
 transition: color .3s var(--n-bezier);
 `,[b({left:`50%`,top:`50%`,originalTransform:`translateX(-50%) translateY(-50%)`})]),p(`checked, unchecked`,`
 transition: color .3s var(--n-bezier);
 color: var(--n-text-color);
 box-sizing: border-box;
 position: absolute;
 white-space: nowrap;
 top: 0;
 bottom: 0;
 display: flex;
 align-items: center;
 line-height: 1;
 `),p(`checked`,`
 right: 0;
 padding-right: calc(1.25 * var(--n-rail-height) - var(--n-offset));
 `),p(`unchecked`,`
 left: 0;
 justify-content: flex-end;
 padding-left: calc(1.25 * var(--n-rail-height) - var(--n-offset));
 `),f(`&:focus`,[p(`rail`,`
 box-shadow: var(--n-box-shadow-focus);
 `)]),g(`round`,[p(`rail`,`border-radius: calc(var(--n-rail-height) / 2);`,[p(`button`,`border-radius: calc(var(--n-button-height) / 2);`)])]),w(`disabled`,[w(`icon`,[g(`rubber-band`,[g(`pressed`,[p(`rail`,[p(`button`,`max-width: var(--n-button-width-pressed);`)])]),p(`rail`,[f(`&:active`,[p(`button`,`max-width: var(--n-button-width-pressed);`)])]),g(`active`,[g(`pressed`,[p(`rail`,[p(`button`,`left: calc(100% - var(--n-offset) - var(--n-button-width-pressed));`)])]),p(`rail`,[f(`&:active`,[p(`button`,`left: calc(100% - var(--n-offset) - var(--n-button-width-pressed));`)])])])])])]),g(`active`,[p(`rail`,[p(`button`,`left: calc(100% - var(--n-button-width) - var(--n-offset))`)])]),p(`rail`,`
 overflow: hidden;
 height: var(--n-rail-height);
 min-width: var(--n-rail-width);
 border-radius: var(--n-rail-border-radius);
 cursor: pointer;
 position: relative;
 transition:
 opacity .3s var(--n-bezier),
 background .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier);
 background-color: var(--n-rail-color);
 `,[p(`button-icon`,`
 color: var(--n-icon-color);
 transition: color .3s var(--n-bezier);
 font-size: calc(var(--n-button-height) - 4px);
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 display: flex;
 justify-content: center;
 align-items: center;
 line-height: 1;
 `,[b()]),p(`button`,`
 align-items: center; 
 top: var(--n-offset);
 left: var(--n-offset);
 height: var(--n-button-height);
 width: var(--n-button-width-pressed);
 max-width: var(--n-button-width);
 border-radius: var(--n-button-border-radius);
 background-color: var(--n-button-color);
 box-shadow: var(--n-button-box-shadow);
 box-sizing: border-box;
 cursor: inherit;
 content: "";
 position: absolute;
 transition:
 background-color .3s var(--n-bezier),
 left .3s var(--n-bezier),
 opacity .3s var(--n-bezier),
 max-width .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier);
 `)]),g(`active`,[p(`rail`,`background-color: var(--n-rail-color-active);`)]),g(`loading`,[p(`rail`,`
 cursor: wait;
 `)]),g(`disabled`,[p(`rail`,`
 cursor: not-allowed;
 opacity: .5;
 `)])]),A=Object.assign(Object.assign({},v.props),{size:String,value:{type:[String,Number,Boolean],default:void 0},loading:Boolean,defaultValue:{type:[String,Number,Boolean],default:!1},disabled:{type:Boolean,default:void 0},round:{type:Boolean,default:!0},"onUpdate:value":[Function,Array],onUpdateValue:[Function,Array],checkedValue:{type:[String,Number,Boolean],default:!0},uncheckedValue:{type:[String,Number,Boolean],default:!1},railStyle:Function,rubberBand:{type:Boolean,default:!0},spinProps:Object,onChange:[Function,Array]}),j,M=r({name:`Switch`,props:A,slots:Object,setup(r){j===void 0&&(j=typeof CSS<`u`?CSS.supports===void 0?!1:CSS.supports(`width`,`max(1px)`):!0);let{mergedClsPrefixRef:i,inlineThemeDisabled:l,mergedComponentPropsRef:u}=c(r),d=v(`Switch`,`-switch`,k,O,r,i),f=a(r,{mergedSize(e){return r.size===void 0?e?e.mergedSize.value:u?.value?.Switch?.size||`medium`:r.size}}),{mergedSizeRef:p,mergedDisabledRef:h}=f,g=e(r.defaultValue),_=T(t(r,`value`),g),y=n(()=>_.value===r.checkedValue),b=e(!1),S=e(!1),w=n(()=>{let{railStyle:e}=r;if(e)return e({focused:S.value,checked:y.value})});function E(e){let{"onUpdate:value":t,onChange:n,onUpdateValue:i}=r,{nTriggerFormInput:a,nTriggerFormChange:s}=f;t&&o(t,e),i&&o(i,e),n&&o(n,e),g.value=e,a(),s()}function D(){let{nTriggerFormFocus:e}=f;e()}function A(){let{nTriggerFormBlur:e}=f;e()}function M(){r.loading||h.value||(_.value===r.checkedValue?E(r.uncheckedValue):E(r.checkedValue))}function N(){S.value=!0,D()}function P(){S.value=!1,A(),b.value=!1}function F(e){r.loading||h.value||e.key===` `&&(_.value===r.checkedValue?E(r.uncheckedValue):E(r.checkedValue),b.value=!1)}function I(e){r.loading||h.value||e.key===` `&&(e.preventDefault(),b.value=!0)}let L=n(()=>{let{value:e}=p,{self:{opacityDisabled:t,railColor:n,railColorActive:r,buttonBoxShadow:i,buttonColor:a,boxShadowFocus:o,loadingColor:s,textColor:c,iconColor:l,[m(`buttonHeight`,e)]:u,[m(`buttonWidth`,e)]:f,[m(`buttonWidthPressed`,e)]:h,[m(`railHeight`,e)]:g,[m(`railWidth`,e)]:_,[m(`railBorderRadius`,e)]:v,[m(`buttonBorderRadius`,e)]:y},common:{cubicBezierEaseInOut:b}}=d.value,S,w,T;return j?(S=`calc((${g} - ${u}) / 2)`,w=`max(${g}, ${u})`,T=`max(${_}, calc(${_} + ${u} - ${g}))`):(S=x((C(g)-C(u))/2),w=x(Math.max(C(g),C(u))),T=C(g)>C(u)?_:x(C(_)+C(u)-C(g))),{"--n-bezier":b,"--n-button-border-radius":y,"--n-button-box-shadow":i,"--n-button-color":a,"--n-button-width":f,"--n-button-width-pressed":h,"--n-button-height":u,"--n-height":w,"--n-offset":S,"--n-opacity-disabled":t,"--n-rail-border-radius":v,"--n-rail-color":n,"--n-rail-color-active":r,"--n-rail-height":g,"--n-rail-width":_,"--n-width":T,"--n-box-shadow-focus":o,"--n-loading-color":s,"--n-text-color":c,"--n-icon-color":l}}),R=l?s(`switch`,n(()=>p.value[0]),L,r):void 0;return{handleClick:M,handleBlur:P,handleFocus:N,handleKeyup:F,handleKeydown:I,mergedRailStyle:w,pressed:b,mergedClsPrefix:i,mergedValue:_,checked:y,mergedDisabled:h,cssVars:l?void 0:L,themeClass:R?.themeClass,onRender:R?.onRender}},render(){let{mergedClsPrefix:e,mergedDisabled:t,checked:n,mergedRailStyle:r,onRender:a,$slots:o}=this;a?.();let{checked:s,unchecked:c,icon:d,"checked-icon":f,"unchecked-icon":p}=o,m=!(l(d)&&l(f)&&l(p));return i(`div`,{role:`switch`,"aria-checked":n,class:[`${e}-switch`,this.themeClass,m&&`${e}-switch--icon`,n&&`${e}-switch--active`,t&&`${e}-switch--disabled`,this.round&&`${e}-switch--round`,this.loading&&`${e}-switch--loading`,this.pressed&&`${e}-switch--pressed`,this.rubberBand&&`${e}-switch--rubber-band`],tabindex:this.mergedDisabled?void 0:0,style:this.cssVars,onClick:this.handleClick,onFocus:this.handleFocus,onBlur:this.handleBlur,onKeyup:this.handleKeyup,onKeydown:this.handleKeydown},i(`div`,{class:`${e}-switch__rail`,"aria-hidden":`true`,style:r},u(s,t=>u(c,n=>t||n?i(`div`,{"aria-hidden":!0,class:`${e}-switch__children-placeholder`},i(`div`,{class:`${e}-switch__rail-placeholder`},i(`div`,{class:`${e}-switch__button-placeholder`}),t),i(`div`,{class:`${e}-switch__rail-placeholder`},i(`div`,{class:`${e}-switch__button-placeholder`}),n)):null)),i(`div`,{class:`${e}-switch__button`},u(d,t=>u(f,n=>u(p,r=>i(h,null,{default:()=>this.loading?i(_,Object.assign({key:`loading`,clsPrefix:e,strokeWidth:20},this.spinProps)):this.checked&&(n||t)?i(`div`,{class:`${e}-switch__button-icon`,key:n?`checked-icon`:`icon`},n||t):!this.checked&&(r||t)?i(`div`,{class:`${e}-switch__button-icon`,key:r?`unchecked-icon`:`icon`},r||t):null})))),u(s,t=>t&&i(`div`,{key:`checked`,class:`${e}-switch__checked`},t)),u(c,t=>t&&i(`div`,{key:`unchecked`,class:`${e}-switch__unchecked`},t)))))}}),N=[{id:`nfz-001`,name:`西湖景区`,type:`重点区域`,enabled:!0,createdAt:`2025-07-17 14:16:39`,path:[[120.1295,30.259],[120.132,30.253],[120.137,30.2465],[120.142,30.241],[120.149,30.237],[120.156,30.2365],[120.162,30.24],[120.165,30.246],[120.166,30.254],[120.164,30.261],[120.158,30.266],[120.151,30.269],[120.143,30.269],[120.136,30.266]]},{id:`nfz-002`,name:`钱塘区`,type:`其他`,enabled:!0,createdAt:`2025-06-18 10:45:05`,path:[[120.275,30.335],[120.31,30.35],[120.35,30.355],[120.39,30.345],[120.41,30.32],[120.415,30.29],[120.4,30.26],[120.37,30.245],[120.335,30.235],[120.3,30.24],[120.27,30.26],[120.26,30.29]]}];export{M as n,N as t};