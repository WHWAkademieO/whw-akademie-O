(()=>{"use strict";var e,t={99:()=>{const e=window.wp.blocks,t=window.wp.element,l=window.wp.i18n,a=window.wp.blockEditor,n=window.wp.components,r=window.React,o=JSON.parse('{"u2":"create-block/hero-blocks"}');(0,e.registerBlockType)(o.u2,{edit:function(e){const o=(0,a.useBlockProps)(),{className:i,isSelected:c,attributes:{mediaID:s,mediaURL:m,body:u,alignment:d,title:h,height:p},setAttributes:v}=e;return(0,r.useEffect)((()=>{})),(0,t.createElement)("div",{...o},c&&(0,t.createElement)(a.BlockControls,{key:"controls"},(0,t.createElement)(a.AlignmentToolbar,{value:d,onChange:e=>{v({alignment:e})}})),(0,t.createElement)(n.Panel,{header:"Hero block"},(0,t.createElement)(n.PanelBody,{title:" ",initialOpen:!1},(0,t.createElement)("div",{className:"hero-wrapper",key:"container"},(0,t.createElement)("div",{className:"hero-text"},(0,t.createElement)("label",null,"Title:"),(0,t.createElement)(a.RichText,{tagName:"h2",className:"callout-title",placeholder:(0,l.__)("Write a hero title…"),value:h,onChange:e=>{v({title:e})}})),(0,t.createElement)("div",null,(0,t.createElement)("label",null,"Banner:"),(0,t.createElement)(a.MediaUpload,{onSelect:e=>{v({mediaURL:e.url,mediaID:e.id})},type:"image",value:s,render:({open:e})=>(0,t.createElement)(n.Button,{className:s?"image-button":"button button-large",onClick:e},s?(0,t.createElement)("img",{src:m,style:{width:"50%",marginTop:"20px"}}):(0,l.__)("Upload Hero Image"))})),(0,t.createElement)("div",null,(0,t.createElement)(n.ToggleControl,{label:"Full height",checked:p,onChange:e=>{v({height:e})}}))))))},save:function(e){const{className:l,attributes:{title:n,mediaURL:r,body:o,alignment:i}}=e;return(0,t.createElement)("div",{className:"bootstrap-block"},(0,t.createElement)("div",null,(0,t.createElement)(a.RichText.Content,{tagName:"h2",className:"callout-title",value:n})),(0,t.createElement)("div",null,(0,t.createElement)("div",null,r&&(0,t.createElement)("img",{className:"the-image",src:r}))))}})}},l={};function a(e){var n=l[e];if(void 0!==n)return n.exports;var r=l[e]={exports:{}};return t[e](r,r.exports,a),r.exports}a.m=t,e=[],a.O=(t,l,n,r)=>{if(!l){var o=1/0;for(m=0;m<e.length;m++){l=e[m][0],n=e[m][1],r=e[m][2];for(var i=!0,c=0;c<l.length;c++)(!1&r||o>=r)&&Object.keys(a.O).every((e=>a.O[e](l[c])))?l.splice(c--,1):(i=!1,r<o&&(o=r));if(i){e.splice(m--,1);var s=n();void 0!==s&&(t=s)}}return t}r=r||0;for(var m=e.length;m>0&&e[m-1][2]>r;m--)e[m]=e[m-1];e[m]=[l,n,r]},a.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{var e={713:0,639:0};a.O.j=t=>0===e[t];var t=(t,l)=>{var n,r,o=l[0],i=l[1],c=l[2],s=0;if(o.some((t=>0!==e[t]))){for(n in i)a.o(i,n)&&(a.m[n]=i[n]);if(c)var m=c(a)}for(t&&t(l);s<o.length;s++)r=o[s],a.o(e,r)&&e[r]&&e[r][0](),e[r]=0;return a.O(m)},l=self.webpackChunkwhw_blocks=self.webpackChunkwhw_blocks||[];l.forEach(t.bind(null,0)),l.push=t.bind(null,l.push.bind(l))})();var n=a.O(void 0,[639],(()=>a(99)));n=a.O(n)})();