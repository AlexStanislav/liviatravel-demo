import{u as i,s as l,o as r,c as o,m as u}from"./index-4425e9eb.js";var p=`
.p-inputtextarea-resizable {
    overflow: hidden;
    resize: none;
}

.p-fluid .p-inputtextarea {
    width: 100%;
}
`,d={root:function(t){var s=t.instance,n=t.props;return["p-inputtextarea p-inputtext p-component",{"p-filled":s.filled,"p-inputtextarea-resizable ":n.autoResize}]}},h=i(p,{name:"textarea",manual:!0}),c=h.load,m={name:"BaseTextarea",extends:l,props:{modelValue:null,autoResize:Boolean},css:{classes:d,loadStyle:c},provide:function(){return{$parentInstance:this}}},f={name:"Textarea",extends:m,emits:["update:modelValue"],mounted:function(){this.$el.offsetParent&&this.autoResize&&this.resize()},updated:function(){this.$el.offsetParent&&this.autoResize&&this.resize()},methods:{resize:function(){var t=window.getComputedStyle(this.$el);this.$el.style.height="auto",this.$el.style.height="calc(".concat(t.borderTopWidth," + ").concat(t.borderBottomWidth," + ").concat(this.$el.scrollHeight,"px)"),parseFloat(this.$el.style.height)>=parseFloat(this.$el.style.maxHeight)?(this.$el.style.overflowY="scroll",this.$el.style.height=this.$el.style.maxHeight):this.$el.style.overflow="hidden"},onInput:function(t){this.autoResize&&this.resize(),this.$emit("update:modelValue",t.target.value)}},computed:{filled:function(){return this.modelValue!=null&&this.modelValue.toString().length>0},ptmParams:function(){return{context:{disabled:this.$attrs.disabled||this.$attrs.disabled===""}}}}},$=["value"];function v(e,t,s,n,x,a){return r(),o("textarea",u({class:e.cx("root"),value:e.modelValue,onInput:t[0]||(t[0]=function(){return a.onInput&&a.onInput.apply(a,arguments)})},e.ptm("root",a.ptmParams),{"data-pc-name":"textarea"}),null,16,$)}f.render=v;export{f as s};
