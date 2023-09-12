(()=>{"use strict";var e,t={70:()=>{const e=window.wp.blocks,t=window.wp.element,a=window.wp.i18n,l=window.wp.blockEditor,n=window.wp.components,r=window.React,o=JSON.parse('{"u2":"create-block/map-blocks"}');(0,e.registerBlockType)(o.u2,{edit:function(e){const o=(0,l.useBlockProps)(),{className:i,isSelected:c,attributes:{mediaID:s,mediaURL:m,alignment:p,title:d},setAttributes:u}=e;return(0,r.useEffect)((()=>{})),(0,t.createElement)("div",{...o},c&&(0,t.createElement)(l.BlockControls,{key:"controls"},(0,t.createElement)(l.AlignmentToolbar,{value:p,onChange:e=>{u({alignment:e})}})),(0,t.createElement)(n.Panel,{header:"Map block"},(0,t.createElement)(n.PanelBody,{title:" ",initialOpen:!1},(0,t.createElement)("div",{className:"map-wrapper",key:"container"},(0,t.createElement)("div",{className:"map-text"},(0,t.createElement)(l.RichText,{tagName:"h2",className:"callout-title",placeholder:(0,a.__)("Write a map title…"),value:d,onChange:e=>{u({title:e})}})),(0,t.createElement)("div",{className:"callout-image"},(0,t.createElement)(l.MediaUpload,{onSelect:e=>{u({mediaURL:e.url,mediaID:e.id})},type:"image",value:s,render:({open:e})=>(0,t.createElement)(n.Button,{className:m?"image-button":"button button-large",onClick:e},m?(0,t.createElement)("img",{src:m,style:{width:"80%",marginTop:"0px"}}):(0,a.__)("Upload Map Image"))}))))))},save:function(e){const{className:a,attributes:{title:n,mediaURL:r,body:o,alignment:i}}=e;return(0,t.createElement)("div",{className:"bootstrap-block"},(0,t.createElement)("div",null,(0,t.createElement)(l.RichText.Content,{tagName:"h2",className:"callout-title",value:n})),(0,t.createElement)("div",null,(0,t.createElement)("div",null,r&&(0,t.createElement)("img",{className:"the-image",src:r}))))}})}},a={};function l(e){var n=a[e];if(void 0!==n)return n.exports;var r=a[e]={exports:{}};return t[e](r,r.exports,l),r.exports}l.m=t,e=[],l.O=(t,a,n,r)=>{if(!a){var o=1/0;for(m=0;m<e.length;m++){a=e[m][0],n=e[m][1],r=e[m][2];for(var i=!0,c=0;c<a.length;c++)(!1&r||o>=r)&&Object.keys(l.O).every((e=>l.O[e](a[c])))?a.splice(c--,1):(i=!1,r<o&&(o=r));if(i){e.splice(m--,1);var s=n();void 0!==s&&(t=s)}}return t}r=r||0;for(var m=e.length;m>0&&e[m-1][2]>r;m--)e[m]=e[m-1];e[m]=[a,n,r]},l.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{var e={855:0,684:0};l.O.j=t=>0===e[t];var t=(t,a)=>{var n,r,o=a[0],i=a[1],c=a[2],s=0;if(o.some((t=>0!==e[t]))){for(n in i)l.o(i,n)&&(l.m[n]=i[n]);if(c)var m=c(l)}for(t&&t(a);s<o.length;s++)r=o[s],l.o(e,r)&&e[r]&&e[r][0](),e[r]=0;return l.O(m)},a=self.webpackChunkwhw_blocks=self.webpackChunkwhw_blocks||[];a.forEach(t.bind(null,0)),a.push=t.bind(null,a.push.bind(a))})();var n=l.O(void 0,[684],(()=>l(70)));n=l.O(n)})();