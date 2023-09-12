(()=>{"use strict";var e,t={940:()=>{const e=window.wp.blocks,t=window.wp.element,s=(window.wp.i18n,window.wp.blockEditor),i=window.wp.components,n=window.React,r=window.ReactDOM;function o(e){const t=window.getComputedStyle(e);return Math.max(parseInt(t["margin-top"],10),parseInt(t["margin-bottom"],10))+e.getBoundingClientRect().height}function a(e,t=0,s=0){e&&(null!==t&&null!==s?e.style.transform=`translate(${s}px, ${t}px)`:e.style.removeProperty("transform"))}function l(e,t,s){e&&(e.style.transition=`transform ${t}ms${s?` ${s}`:""}`)}const h=e=>{let t=[],s=null;const i=(...i)=>{t=i,s||(s=requestAnimationFrame((()=>{s=null,e(...t)})))};return i.cancel=()=>{s&&cancelAnimationFrame(s)},i};function c(e,t){const s=["input","textarea","select","option","optgroup","video","audio","button","a"],i=["button","link","checkbox","tab"];for(;e!==t;){if(e.getAttribute("data-movable-handle"))return!1;if(s.includes(e.tagName.toLowerCase()))return!0;const t=e.getAttribute("role");if(t&&i.includes(t.toLowerCase()))return!0;if("label"===e.tagName.toLowerCase()&&e.hasAttribute("for"))return!0;e.tagName&&(e=e.parentElement)}return!1}const d=200;class u extends n.Component{constructor(e){super(e),this.listRef=n.createRef(),this.ghostRef=n.createRef(),this.topOffsets=[],this.itemTranslateOffsets=[],this.initialYOffset=0,this.lastScroll=0,this.lastYOffset=0,this.lastListYOffset=0,this.needle=-1,this.afterIndex=-2,this.state={itemDragged:-1,itemDraggedOutOfBounds:-1,selectedItem:-1,initialX:0,initialY:0,targetX:0,targetY:0,targetHeight:0,targetWidth:0,liveText:"",scrollingSpeed:0,scrollWindow:!1},this.doScrolling=()=>{const{scrollingSpeed:e,scrollWindow:t}=this.state,s=this.listRef.current;window.requestAnimationFrame((()=>{t?window.scrollTo(window.pageXOffset,window.pageYOffset+1.5*e):s.scrollTop+=e,0!==e&&this.doScrolling()}))},this.getChildren=()=>this.listRef&&this.listRef.current?Array.from(this.listRef.current.children):(console.warn("No items found in the List container. Did you forget to pass & spread the `props` param in renderList?"),[]),this.calculateOffsets=()=>{this.topOffsets=this.getChildren().map((e=>e.getBoundingClientRect().top)),this.itemTranslateOffsets=this.getChildren().map((e=>o(e)))},this.getTargetIndex=e=>this.getChildren().findIndex((t=>t===e.target||t.contains(e.target))),this.onMouseOrTouchStart=e=>{this.dropTimeout&&this.state.itemDragged>-1&&(window.clearTimeout(this.dropTimeout),this.finishDrop());const t=(s=e).touches&&s.touches.length||s.changedTouches&&s.changedTouches.length;var s;if(!t&&0!==e.button)return;const i=this.getTargetIndex(e);if(-1===i||this.props.values[i]&&this.props.values[i].disabled)return void(-1!==this.state.selectedItem&&(this.setState({selectedItem:-1}),this.finishDrop()));const n=this.getChildren()[i],r=n.querySelector("[data-movable-handle]");if((!r||r.contains(e.target))&&!c(e.target,n)){if(e.preventDefault(),this.props.beforeDrag&&this.props.beforeDrag({elements:this.getChildren(),index:i}),t){const e={passive:!1};n.style.touchAction="none",document.addEventListener("touchend",this.schdOnEnd,e),document.addEventListener("touchmove",this.schdOnTouchMove,e),document.addEventListener("touchcancel",this.schdOnEnd,e)}else{document.addEventListener("mousemove",this.schdOnMouseMove),document.addEventListener("mouseup",this.schdOnEnd);const e=this.getChildren()[this.state.itemDragged];e&&e.style&&(e.style.touchAction="")}this.onStart(n,t?e.touches[0].clientX:e.clientX,t?e.touches[0].clientY:e.clientY,i)}},this.getYOffset=()=>{const e=this.listRef.current?this.listRef.current.scrollTop:0;return window.pageYOffset+e},this.onStart=(e,t,s,i)=>{this.state.selectedItem>-1&&(this.setState({selectedItem:-1}),this.needle=-1);const n=e.getBoundingClientRect(),r=window.getComputedStyle(e);this.calculateOffsets(),this.initialYOffset=this.getYOffset(),this.lastYOffset=window.pageYOffset,this.lastListYOffset=this.listRef.current.scrollTop,this.setState({itemDragged:i,targetX:n.left-parseInt(r["margin-left"],10),targetY:n.top-parseInt(r["margin-top"],10),targetHeight:n.height,targetWidth:n.width,initialX:t,initialY:s})},this.onMouseMove=e=>{e.cancelable&&e.preventDefault(),this.onMove(e.clientX,e.clientY)},this.onTouchMove=e=>{e.cancelable&&e.preventDefault(),this.onMove(e.touches[0].clientX,e.touches[0].clientY)},this.onWheel=e=>{this.state.itemDragged<0||(this.lastScroll=this.listRef.current.scrollTop+=e.deltaY,this.moveOtherItems())},this.onMove=(e,t)=>{if(-1===this.state.itemDragged)return null;a(this.ghostRef.current,t-this.state.initialY,this.props.lockVertically?0:e-this.state.initialX),this.autoScrolling(t),this.moveOtherItems()},this.moveOtherItems=()=>{const e=this.ghostRef.current.getBoundingClientRect(),t=e.top+e.height/2,s=o(this.getChildren()[this.state.itemDragged]),i=this.getYOffset();this.initialYOffset!==i&&(this.topOffsets=this.topOffsets.map((e=>e-(i-this.initialYOffset))),this.initialYOffset=i),this.isDraggedItemOutOfBounds()&&this.props.removableByMove?this.afterIndex=this.topOffsets.length+1:this.afterIndex=function(e,t){let s,i=0,n=e.length-1;for(;i<=n;){if(s=Math.floor((n+i)/2),!e[s+1]||e[s]<=t&&e[s+1]>=t)return s;e[s]<t&&e[s+1]<t?i=s+1:n=s-1}return-1}(this.topOffsets,t),this.animateItems(-1===this.afterIndex?0:this.afterIndex,this.state.itemDragged,s)},this.autoScrolling=e=>{const{top:t,bottom:s,height:i}=this.listRef.current.getBoundingClientRect(),n=window.innerHeight||document.documentElement.clientHeight;if(s>n&&n-e<d)this.setState({scrollingSpeed:Math.round((d-(n-e))/10),scrollWindow:!0});else if(t<0&&e<d)this.setState({scrollingSpeed:Math.round((d-e)/-10),scrollWindow:!0});else if(this.state.scrollWindow&&0!==this.state.scrollingSpeed&&this.setState({scrollingSpeed:0,scrollWindow:!1}),i+20<this.listRef.current.scrollHeight){let i=0;e-t<d?i=Math.round((d-(e-t))/-10):s-e<d&&(i=Math.round((d-(s-e))/10)),this.state.scrollingSpeed!==i&&this.setState({scrollingSpeed:i})}},this.animateItems=(e,t,s,i=!1)=>{this.getChildren().forEach(((n,r)=>{if(l(n,this.props.transitionDuration),t===r&&i){if(t===e)return a(n,null);a(n,t<e?this.itemTranslateOffsets.slice(t+1,e+1).reduce(((e,t)=>e+t),0):-1*this.itemTranslateOffsets.slice(e,t).reduce(((e,t)=>e+t),0))}else a(n,t<e&&r>t&&r<=e?-s:r<t&&t>e&&r>=e?s:null)}))},this.isDraggedItemOutOfBounds=()=>{const e=this.getChildren()[this.state.itemDragged].getBoundingClientRect(),t=this.ghostRef.current.getBoundingClientRect();return Math.abs(e.left-t.left)>t.width?(-1===this.state.itemDraggedOutOfBounds&&this.setState({itemDraggedOutOfBounds:this.state.itemDragged}),!0):(this.state.itemDraggedOutOfBounds>-1&&this.setState({itemDraggedOutOfBounds:-1}),!1)},this.onEnd=e=>{e.cancelable&&e.preventDefault(),document.removeEventListener("mousemove",this.schdOnMouseMove),document.removeEventListener("touchmove",this.schdOnTouchMove),document.removeEventListener("mouseup",this.schdOnEnd),document.removeEventListener("touchup",this.schdOnEnd),document.removeEventListener("touchcancel",this.schdOnEnd);const t=this.props.removableByMove&&this.isDraggedItemOutOfBounds();!t&&this.props.transitionDuration>0&&-2!==this.afterIndex&&h((()=>{l(this.ghostRef.current,this.props.transitionDuration,"cubic-bezier(.2,1,.1,1)"),this.afterIndex<1&&0===this.state.itemDragged?a(this.ghostRef.current,0,0):a(this.ghostRef.current,-(window.pageYOffset-this.lastYOffset)-(this.listRef.current.scrollTop-this.lastListYOffset)+(this.state.itemDragged<this.afterIndex?this.itemTranslateOffsets.slice(this.state.itemDragged+1,this.afterIndex+1).reduce(((e,t)=>e+t),0):-1*this.itemTranslateOffsets.slice(this.afterIndex<0?0:this.afterIndex,this.state.itemDragged).reduce(((e,t)=>e+t),0)),0)}))(),this.dropTimeout=window.setTimeout(this.finishDrop,t||-2===this.afterIndex?0:this.props.transitionDuration)},this.finishDrop=()=>{const e=this.props.removableByMove&&this.isDraggedItemOutOfBounds();(e||this.afterIndex>-2&&this.state.itemDragged!==this.afterIndex)&&this.props.onChange({oldIndex:this.state.itemDragged,newIndex:e?-1:Math.max(this.afterIndex,0),targetRect:this.ghostRef.current.getBoundingClientRect()}),this.getChildren().forEach((e=>{l(e,0),a(e,null),e.style.touchAction=""})),this.setState({itemDragged:-1,scrollingSpeed:0}),this.afterIndex=-2,this.lastScroll>0&&(this.listRef.current.scrollTop=this.lastScroll,this.lastScroll=0)},this.onKeyDown=e=>{const t=this.state.selectedItem,s=this.getTargetIndex(e);if(!c(e.target,e.currentTarget)&&-1!==s){if(" "===e.key&&(e.preventDefault(),t===s?(t!==this.needle&&(this.getChildren().forEach((e=>{l(e,0),a(e,null)})),this.props.onChange({oldIndex:t,newIndex:this.needle,targetRect:this.getChildren()[this.needle].getBoundingClientRect()}),this.getChildren()[this.needle].focus()),this.setState({selectedItem:-1,liveText:this.props.voiceover.dropped(t+1,this.needle+1)}),this.needle=-1):(this.setState({selectedItem:s,liveText:this.props.voiceover.lifted(s+1)}),this.needle=s,this.calculateOffsets())),("ArrowDown"===e.key||"j"===e.key)&&t>-1&&this.needle<this.props.values.length-1){e.preventDefault();const s=o(this.getChildren()[t]);this.needle++,this.animateItems(this.needle,t,s,!0),this.setState({liveText:this.props.voiceover.moved(this.needle+1,!1)})}if(("ArrowUp"===e.key||"k"===e.key)&&t>-1&&this.needle>0){e.preventDefault();const s=o(this.getChildren()[t]);this.needle--,this.animateItems(this.needle,t,s,!0),this.setState({liveText:this.props.voiceover.moved(this.needle+1,!0)})}"Escape"===e.key&&t>-1&&(this.getChildren().forEach((e=>{l(e,0),a(e,null)})),this.setState({selectedItem:-1,liveText:this.props.voiceover.canceled(t+1)}),this.needle=-1),("Tab"===e.key||"Enter"===e.key)&&t>-1&&e.preventDefault()}},this.schdOnMouseMove=h(this.onMouseMove),this.schdOnTouchMove=h(this.onTouchMove),this.schdOnEnd=h(this.onEnd)}componentDidMount(){this.calculateOffsets(),document.addEventListener("touchstart",this.onMouseOrTouchStart,{passive:!1,capture:!1}),document.addEventListener("mousedown",this.onMouseOrTouchStart)}componentDidUpdate(e,t){t.scrollingSpeed!==this.state.scrollingSpeed&&0===t.scrollingSpeed&&this.doScrolling()}componentWillUnmount(){document.removeEventListener("touchstart",this.onMouseOrTouchStart),document.removeEventListener("mousedown",this.onMouseOrTouchStart),this.dropTimeout&&window.clearTimeout(this.dropTimeout),this.schdOnMouseMove.cancel(),this.schdOnTouchMove.cancel(),this.schdOnEnd.cancel()}render(){const e={userSelect:"none",WebkitUserSelect:"none",MozUserSelect:"none",msUserSelect:"none",boxSizing:"border-box",position:"relative"},t={...e,top:this.state.targetY,left:this.state.targetX,width:this.state.targetWidth,height:this.state.targetHeight,position:"fixed",marginTop:0};return n.createElement(n.Fragment,null,this.props.renderList({children:this.props.values.map(((t,s)=>{const i=s===this.state.itemDragged,n=s===this.state.selectedItem,r={key:s,tabIndex:this.props.values[s]&&this.props.values[s].disabled?-1:0,"aria-roledescription":this.props.voiceover.item(s+1),onKeyDown:this.onKeyDown,style:{...e,visibility:i?"hidden":void 0,zIndex:n?5e3:0}};return this.props.renderItem({value:t,props:r,index:s,isDragged:!1,isSelected:n,isOutOfBounds:!1})})),isDragged:this.state.itemDragged>-1,props:{ref:this.listRef}}),this.state.itemDragged>-1&&r.createPortal(this.props.renderItem({value:this.props.values[this.state.itemDragged],props:{ref:this.ghostRef,style:t,onWheel:this.onWheel},index:this.state.itemDragged,isDragged:!0,isSelected:!1,isOutOfBounds:this.state.itemDraggedOutOfBounds>-1}),this.props.container||document.body),n.createElement("div",{"aria-live":"assertive",role:"log","aria-atomic":"true",style:{position:"absolute",width:"1px",height:"1px",margin:"-1px",border:"0px",padding:"0px",overflow:"hidden",clip:"rect(0px, 0px, 0px, 0px)",clipPath:"inset(100%)"}},this.state.liveText))}}u.defaultProps={transitionDuration:300,lockVertically:!1,removableByMove:!1,voiceover:{item:e=>`You are currently at a draggable item at position ${e}. Press space bar to lift.`,lifted:e=>`You have lifted item at position ${e}. Press j to move down, k to move up, space bar to drop and escape to cancel.`,moved:(e,t)=>`You have moved the lifted item ${t?"up":"down"} to position ${e}. Press j to move down, k to move up, space bar to drop and escape to cancel.`,dropped:(e,t)=>`You have dropped the item. It has moved from position ${e} to ${t}.`,canceled:e=>`You have cancelled the movement. The item has returned to its starting position of ${e}.`}};const m=u,g=JSON.parse('{"u2":"create-block/team-cta-blocks"}');(0,e.registerBlockType)(g.u2,{edit:function(e){const r=(0,s.useBlockProps)(),{attributes:{teams:o},setAttributes:a}=e,l=(0,n.useCallback)((()=>{e.setAttributes({teams:[...e.attributes?.teams||[],{}]})}),[e.attributes,a]),h=(0,n.useCallback)((t=>{let s=[...e?.attributes?.teams];s=s.filter(((e,s)=>s!==t)),a({teams:s})}),[e.attributes,a]),c=(0,n.useCallback)(((t,s,i)=>{const n=[...e.attributes?.teams];n[i][t]=s,a({teams:n})}),[e.attributes,a]);return(0,t.createElement)("div",{...r},(0,t.createElement)(i.Panel,{header:"Team block"},(0,t.createElement)(i.PanelBody,{title:" ",initialOpen:!1},(0,t.createElement)("label",null,"Team member:"),o?.length>0?(0,t.createElement)(m,{values:o||[],onChange:({oldIndex:t,newIndex:s})=>{var i,n,r;e.setAttributes({teams:(i=e?.attributes,n=t,r=s,(i=i.slice()).splice(r<0?i.length+r:r,0,i.splice(n,1)[0]),i)})},renderList:({children:e,props:s})=>(0,t.createElement)("ul",{style:{padding:0},...s},e),renderItem:({value:e,props:n})=>(0,t.createElement)("li",{className:"drag-item",...n},(0,t.createElement)("div",{className:"repater-close-icon"},(0,t.createElement)("button",{style:{color:"red",border:"none",background:"white",cursor:"pointer"},onClick:e=>{e.stopPropagation(),h(n.key)}},"Remove")),(0,t.createElement)("div",null,(0,t.createElement)("label",null,"Member name:"),(0,t.createElement)(i.TextControl,{placeholder:"Type your cta label here",value:e?.name,onChange:e=>c("name",e,n.key)})),(0,t.createElement)("div",null,(0,t.createElement)("label",null,"Link control:"),(0,t.createElement)(s.__experimentalLinkControl,{searchInputPlaceholder:"Search here...",value:e?.href,settings:[],onChange:e=>c("href",{...e,title:e?.url},n.key),withCreateSuggestion:!0,createSuggestionButtonText:e=>`New: ${e}`})),(0,t.createElement)("div",null,(0,t.createElement)("div",null,(0,t.createElement)("label",null,"Avatar:")," ",(0,t.createElement)("br",null),(0,t.createElement)(s.MediaUpload,{gallery:!0,onSelect:e=>{c("avatar",e,n.key)},render:({open:s})=>e?.avatar?.url?(0,t.createElement)("div",{className:"image_grid"},(0,t.createElement)("button",{onClick:s},(0,t.createElement)("img",{style:{width:"100%",height:"100%"},src:e?.avatar?.url,alt:e?.avatar?.alt}))):(0,t.createElement)(i.Button,{variant:"primary",onClick:s},"Upload Image")}))))}):(0,t.createElement)("h4",null,"Click button bellow too add member"),(0,t.createElement)(i.Button,{variant:"primary",onClick:l},"Add member"))))},save:function(e){const{className:i,attributes:{title:n,mediaURL:r,body:o,alignment:a}}=e;return(0,t.createElement)("div",{className:"bootstrap-block"},(0,t.createElement)("div",null,(0,t.createElement)(s.RichText.Content,{tagName:"h2",className:"callout-title",value:n})),(0,t.createElement)("div",null,(0,t.createElement)("div",null,r&&(0,t.createElement)("img",{className:"the-image",src:r}))))}})}},s={};function i(e){var n=s[e];if(void 0!==n)return n.exports;var r=s[e]={exports:{}};return t[e](r,r.exports,i),r.exports}i.m=t,e=[],i.O=(t,s,n,r)=>{if(!s){var o=1/0;for(c=0;c<e.length;c++){s=e[c][0],n=e[c][1],r=e[c][2];for(var a=!0,l=0;l<s.length;l++)(!1&r||o>=r)&&Object.keys(i.O).every((e=>i.O[e](s[l])))?s.splice(l--,1):(a=!1,r<o&&(o=r));if(a){e.splice(c--,1);var h=n();void 0!==h&&(t=h)}}return t}r=r||0;for(var c=e.length;c>0&&e[c-1][2]>r;c--)e[c]=e[c-1];e[c]=[s,n,r]},i.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{var e={741:0,754:0};i.O.j=t=>0===e[t];var t=(t,s)=>{var n,r,o=s[0],a=s[1],l=s[2],h=0;if(o.some((t=>0!==e[t]))){for(n in a)i.o(a,n)&&(i.m[n]=a[n]);if(l)var c=l(i)}for(t&&t(s);h<o.length;h++)r=o[h],i.o(e,r)&&e[r]&&e[r][0](),e[r]=0;return i.O(c)},s=self.webpackChunkwhw_blocks=self.webpackChunkwhw_blocks||[];s.forEach(t.bind(null,0)),s.push=t.bind(null,s.push.bind(s))})();var n=i.O(void 0,[754],(()=>i(940)));n=i.O(n)})();