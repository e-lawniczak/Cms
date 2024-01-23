/*! For license information please see common-bundle.js.LICENSE.txt */
(()=>{var e,t={802:(e,t,n)=>{"use strict";n.r(t),n.d(t,{Editor:()=>O});var r,o,i,a=n(526),u=n(652),c=function(){return c=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var o in t=arguments[n])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e},c.apply(this,arguments)},s={onActivate:u.func,onAddUndo:u.func,onBeforeAddUndo:u.func,onBeforeExecCommand:u.func,onBeforeGetContent:u.func,onBeforeRenderUI:u.func,onBeforeSetContent:u.func,onBeforePaste:u.func,onBlur:u.func,onChange:u.func,onClearUndos:u.func,onClick:u.func,onContextMenu:u.func,onCommentChange:u.func,onCopy:u.func,onCut:u.func,onDblclick:u.func,onDeactivate:u.func,onDirty:u.func,onDrag:u.func,onDragDrop:u.func,onDragEnd:u.func,onDragGesture:u.func,onDragOver:u.func,onDrop:u.func,onExecCommand:u.func,onFocus:u.func,onFocusIn:u.func,onFocusOut:u.func,onGetContent:u.func,onHide:u.func,onInit:u.func,onKeyDown:u.func,onKeyPress:u.func,onKeyUp:u.func,onLoadContent:u.func,onMouseDown:u.func,onMouseEnter:u.func,onMouseLeave:u.func,onMouseMove:u.func,onMouseOut:u.func,onMouseOver:u.func,onMouseUp:u.func,onNodeChange:u.func,onObjectResizeStart:u.func,onObjectResized:u.func,onObjectSelected:u.func,onPaste:u.func,onPostProcess:u.func,onPostRender:u.func,onPreProcess:u.func,onProgressState:u.func,onRedo:u.func,onRemove:u.func,onReset:u.func,onSaveContent:u.func,onSelectionChange:u.func,onSetAttrib:u.func,onSetContent:u.func,onShow:u.func,onSubmit:u.func,onUndo:u.func,onVisualAid:u.func,onSkinLoadError:u.func,onThemeLoadError:u.func,onModelLoadError:u.func,onPluginLoadError:u.func,onIconsLoadError:u.func,onLanguageLoadError:u.func,onScriptsLoad:u.func,onScriptsLoadError:u.func},l=c({apiKey:u.string,id:u.string,inline:u.bool,init:u.object,initialValue:u.string,onEditorChange:u.func,value:u.string,tagName:u.string,cloudChannel:u.string,plugins:u.oneOfType([u.string,u.array]),toolbar:u.oneOfType([u.string,u.array]),disabled:u.bool,textareaName:u.string,tinymceScriptSrc:u.oneOfType([u.string,u.arrayOf(u.string),u.arrayOf(u.shape({src:u.string,async:u.bool,defer:u.bool}))]),rollback:u.oneOfType([u.number,u.oneOf([!1])]),scriptLoading:u.shape({async:u.bool,defer:u.bool,delay:u.number})},s),f=function(e){return"function"==typeof e},p=function(e){return e in s},d=function(e){return e.substr(2)},h=function(e,t,n,r,o){return function(t,n,r,o,i,a,u){var c=Object.keys(i).filter(p),s=Object.keys(a).filter(p),l=c.filter((function(e){return void 0===a[e]})),f=s.filter((function(e){return void 0===i[e]}));l.forEach((function(e){var t=d(e),n=u[t];r(t,n),delete u[t]})),f.forEach((function(r){var o=function(t,n){return function(r){var o;return null===(o=t(n))||void 0===o?void 0:o(r,e)}}(t,r),i=d(r);u[i]=o,n(i,o)}))}(o,e.on.bind(e),e.off.bind(e),0,t,n,r)},v=0,y=function(e){var t=Date.now();return e+"_"+Math.floor(1e9*Math.random())+ ++v+String(t)},m=function(e){return null!==e&&("textarea"===e.tagName.toLowerCase()||"input"===e.tagName.toLowerCase())},g=function(e){return void 0===e||""===e?[]:Array.isArray(e)?e:e.split(" ")},b=function(e,t){void 0!==e&&(null!=e.mode&&"object"==typeof e.mode&&"function"==typeof e.mode.set?e.mode.set(t):e.setMode(t))},C=function(){return C=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var o in t=arguments[n])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e},C.apply(this,arguments)},E=function(e,t,n){var r,o,i=e.createElement("script");i.referrerPolicy="origin",i.type="application/javascript",i.id=t.id,i.src=t.src,i.async=null!==(r=t.async)&&void 0!==r&&r,i.defer=null!==(o=t.defer)&&void 0!==o&&o;var a=function(){i.removeEventListener("load",a),i.removeEventListener("error",u),n(t.src)},u=function(e){i.removeEventListener("load",a),i.removeEventListener("error",u),n(t.src,e)};i.addEventListener("load",a),i.addEventListener("error",u),e.head&&e.head.appendChild(i)},S=(r=[],o=function(e){var t=r.find((function(t){return t.getDocument()===e}));return void 0===t&&(t=function(e){var t={},n=function(e,n){var r=t[e];r.done=!0,r.error=n;for(var o=0,i=r.handlers;o<i.length;o++)(0,i[o])(e,n);r.handlers=[]};return{loadScripts:function(r,o,i){var a=function(e){return void 0!==i?i(e):console.error(e)};if(0!==r.length)for(var u=0,c=!1,s=function(e,t){c||(t?(c=!0,a(t)):++u===r.length&&o())},l=0,f=r;l<f.length;l++){var p=f[l],d=t[p.src];if(d)d.done?s(p.src,d.error):d.handlers.push(s);else{var h=y("tiny-");t[p.src]={id:h,src:p.src,done:!1,error:null,handlers:[s]},E(e,C({id:h},p),n)}}else a(new Error("At least one script must be provided"))},deleteScripts:function(){for(var n,r=0,o=Object.values(t);r<o.length;r++){var i=o[r],a=e.getElementById(i.id);null!=a&&"SCRIPT"===a.tagName&&(null===(n=a.parentNode)||void 0===n||n.removeChild(a))}t={}},getDocument:function(){return e}}}(e),r.push(t)),t},{loadList:function(e,t,n,r,i){var a=function(){return o(e).loadScripts(t,r,i)};n>0?setTimeout(a,n):a()},reinitialize:function(){for(var e=r.pop();null!=e;e=r.pop())e.deleteScripts()}}),k=function(e){var t=e;return t&&t.tinymce?t.tinymce:null},_=(i=function(e,t){return i=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n])},i(e,t)},function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Class extends value "+String(t)+" is not a constructor or null");function n(){this.constructor=e}i(e,t),e.prototype=null===t?Object.create(t):(n.prototype=t.prototype,new n)}),w=function(){return w=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var o in t=arguments[n])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e},w.apply(this,arguments)},O=function(e){function t(t){var n,r,o,i=e.call(this,t)||this;return i.rollbackTimer=void 0,i.valueCursor=void 0,i.rollbackChange=function(){var e=i.editor,t=i.props.value;e&&t&&t!==i.currentContent&&e.undoManager.ignore((function(){if(e.setContent(t),i.valueCursor&&(!i.inline||e.hasFocus()))try{e.selection.moveToBookmark(i.valueCursor)}catch(e){}})),i.rollbackTimer=void 0},i.handleBeforeInput=function(e){if(void 0!==i.props.value&&i.props.value===i.currentContent&&i.editor&&(!i.inline||i.editor.hasFocus()))try{i.valueCursor=i.editor.selection.getBookmark(3)}catch(e){}},i.handleBeforeInputSpecial=function(e){"Enter"!==e.key&&"Backspace"!==e.key&&"Delete"!==e.key||i.handleBeforeInput(e)},i.handleEditorChange=function(e){var t=i.editor;if(t&&t.initialized){var n=t.getContent();void 0!==i.props.value&&i.props.value!==n&&!1!==i.props.rollback&&(i.rollbackTimer||(i.rollbackTimer=window.setTimeout(i.rollbackChange,"number"==typeof i.props.rollback?i.props.rollback:200))),n!==i.currentContent&&(i.currentContent=n,f(i.props.onEditorChange)&&i.props.onEditorChange(n,t))}},i.handleEditorChangeSpecial=function(e){"Backspace"!==e.key&&"Delete"!==e.key||i.handleEditorChange(e)},i.initialise=function(e){var t,n,r;void 0===e&&(e=0);var o=i.elementRef.current;if(o)if(function(e){if(!("isConnected"in Node.prototype)){for(var t=e,n=e.parentNode;null!=n;)n=(t=n).parentNode;return t===e.ownerDocument}return e.isConnected}(o)){var a=k(i.view);if(!a)throw new Error("tinymce should have been loaded into global scope");var u,c,s=w(w({},i.props.init),{selector:void 0,target:o,readonly:i.props.disabled,inline:i.inline,plugins:(u=null===(t=i.props.init)||void 0===t?void 0:t.plugins,c=i.props.plugins,g(u).concat(g(c))),toolbar:null!==(n=i.props.toolbar)&&void 0!==n?n:null===(r=i.props.init)||void 0===r?void 0:r.toolbar,setup:function(e){i.editor=e,i.bindHandlers({}),i.inline&&!m(o)&&e.once("PostRender",(function(t){e.setContent(i.getInitialValue(),{no_events:!0})})),i.props.init&&f(i.props.init.setup)&&i.props.init.setup(e)},init_instance_callback:function(e){var t,n,r=i.getInitialValue();i.currentContent=null!==(t=i.currentContent)&&void 0!==t?t:e.getContent(),i.currentContent!==r&&(i.currentContent=r,e.setContent(r),e.undoManager.clear(),e.undoManager.add(),e.setDirty(!1));var o=null!==(n=i.props.disabled)&&void 0!==n&&n;b(i.editor,o?"readonly":"design"),i.props.init&&f(i.props.init.init_instance_callback)&&i.props.init.init_instance_callback(e)}});i.inline||(o.style.visibility=""),m(o)&&(o.value=i.getInitialValue()),a.init(s)}else if(0===e)setTimeout((function(){return i.initialise(1)}),1);else{if(!(e<100))throw new Error("tinymce can only be initialised when in a document");setTimeout((function(){return i.initialise(e+1)}),100)}},i.id=i.props.id||y("tiny-react"),i.elementRef=a.createRef(),i.inline=null!==(o=null!==(n=i.props.inline)&&void 0!==n?n:null===(r=i.props.init)||void 0===r?void 0:r.inline)&&void 0!==o&&o,i.boundHandlers={},i}return _(t,e),Object.defineProperty(t.prototype,"view",{get:function(){var e,t;return null!==(t=null===(e=this.elementRef.current)||void 0===e?void 0:e.ownerDocument.defaultView)&&void 0!==t?t:window},enumerable:!1,configurable:!0}),t.prototype.componentDidUpdate=function(e){var t,n,r=this;if(this.rollbackTimer&&(clearTimeout(this.rollbackTimer),this.rollbackTimer=void 0),this.editor&&(this.bindHandlers(e),this.editor.initialized)){if(this.currentContent=null!==(t=this.currentContent)&&void 0!==t?t:this.editor.getContent(),"string"==typeof this.props.initialValue&&this.props.initialValue!==e.initialValue)this.editor.setContent(this.props.initialValue),this.editor.undoManager.clear(),this.editor.undoManager.add(),this.editor.setDirty(!1);else if("string"==typeof this.props.value&&this.props.value!==this.currentContent){var o=this.editor;o.undoManager.transact((function(){var e;if(!r.inline||o.hasFocus())try{e=o.selection.getBookmark(3)}catch(e){}var t=r.valueCursor;if(o.setContent(r.props.value),!r.inline||o.hasFocus())for(var n=0,i=[e,t];n<i.length;n++){var a=i[n];if(a)try{o.selection.moveToBookmark(a),r.valueCursor=a;break}catch(e){}}}))}if(this.props.disabled!==e.disabled){var i=null!==(n=this.props.disabled)&&void 0!==n&&n;b(this.editor,i?"readonly":"design")}}},t.prototype.componentDidMount=function(){var e,t,n,r,o,i=this;null!==k(this.view)?this.initialise():Array.isArray(this.props.tinymceScriptSrc)&&0===this.props.tinymceScriptSrc.length?null===(t=(e=this.props).onScriptsLoadError)||void 0===t||t.call(e,new Error("No `tinymce` global is present but the `tinymceScriptSrc` prop was an empty array.")):(null===(n=this.elementRef.current)||void 0===n?void 0:n.ownerDocument)&&S.loadList(this.elementRef.current.ownerDocument,this.getScriptSources(),null!==(o=null===(r=this.props.scriptLoading)||void 0===r?void 0:r.delay)&&void 0!==o?o:0,(function(){var e,t;null===(t=(e=i.props).onScriptsLoad)||void 0===t||t.call(e),i.initialise()}),(function(e){var t,n;null===(n=(t=i.props).onScriptsLoadError)||void 0===n||n.call(t,e)}))},t.prototype.componentWillUnmount=function(){var e=this,t=this.editor;t&&(t.off(this.changeEvents(),this.handleEditorChange),t.off(this.beforeInputEvent(),this.handleBeforeInput),t.off("keypress",this.handleEditorChangeSpecial),t.off("keydown",this.handleBeforeInputSpecial),t.off("NewBlock",this.handleEditorChange),Object.keys(this.boundHandlers).forEach((function(n){t.off(n,e.boundHandlers[n])})),this.boundHandlers={},t.remove(),this.editor=void 0)},t.prototype.render=function(){return this.inline?this.renderInline():this.renderIframe()},t.prototype.changeEvents=function(){var e,t,n;return(null===(n=null===(t=null===(e=k(this.view))||void 0===e?void 0:e.Env)||void 0===t?void 0:t.browser)||void 0===n?void 0:n.isIE())?"change keyup compositionend setcontent CommentChange":"change input compositionend setcontent CommentChange"},t.prototype.beforeInputEvent=function(){return window.InputEvent&&"function"==typeof InputEvent.prototype.getTargetRanges?"beforeinput SelectionChange":"SelectionChange"},t.prototype.renderInline=function(){var e=this.props.tagName,t=void 0===e?"div":e;return a.createElement(t,{ref:this.elementRef,id:this.id})},t.prototype.renderIframe=function(){return a.createElement("textarea",{ref:this.elementRef,style:{visibility:"hidden"},name:this.props.textareaName,id:this.id})},t.prototype.getScriptSources=function(){var e,t,n=null===(e=this.props.scriptLoading)||void 0===e?void 0:e.async,r=null===(t=this.props.scriptLoading)||void 0===t?void 0:t.defer;if(void 0!==this.props.tinymceScriptSrc)return"string"==typeof this.props.tinymceScriptSrc?[{src:this.props.tinymceScriptSrc,async:n,defer:r}]:this.props.tinymceScriptSrc.map((function(e){return"string"==typeof e?{src:e,async:n,defer:r}:e}));var o=this.props.cloudChannel,i=this.props.apiKey?this.props.apiKey:"no-api-key";return[{src:"https://cdn.tiny.cloud/1/".concat(i,"/tinymce/").concat(o,"/tinymce.min.js"),async:n,defer:r}]},t.prototype.getInitialValue=function(){return"string"==typeof this.props.initialValue?this.props.initialValue:"string"==typeof this.props.value?this.props.value:""},t.prototype.bindHandlers=function(e){var t=this;if(void 0!==this.editor){h(this.editor,e,this.props,this.boundHandlers,(function(e){return t.props[e]}));var n=function(e){return void 0!==e.onEditorChange||void 0!==e.value},r=n(e),o=n(this.props);!r&&o?(this.editor.on(this.changeEvents(),this.handleEditorChange),this.editor.on(this.beforeInputEvent(),this.handleBeforeInput),this.editor.on("keydown",this.handleBeforeInputSpecial),this.editor.on("keyup",this.handleEditorChangeSpecial),this.editor.on("NewBlock",this.handleEditorChange)):r&&!o&&(this.editor.off(this.changeEvents(),this.handleEditorChange),this.editor.off(this.beforeInputEvent(),this.handleBeforeInput),this.editor.off("keydown",this.handleBeforeInputSpecial),this.editor.off("keyup",this.handleEditorChangeSpecial),this.editor.off("NewBlock",this.handleEditorChange))}},t.propTypes=l,t.defaultProps={cloudChannel:"6"},t}(a.Component)},372:(e,t,n)=>{"use strict";var r=n(567);function o(){}function i(){}i.resetWarningCache=o,e.exports=function(){function e(e,t,n,o,i,a){if(a!==r){var u=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw u.name="Invariant Violation",u}}function t(){return e}e.isRequired=e;var n={array:e,bigint:e,bool:e,func:e,number:e,object:e,string:e,symbol:e,any:e,arrayOf:t,element:e,elementType:e,instanceOf:t,node:e,objectOf:t,oneOf:t,oneOfType:t,shape:t,exact:t,checkPropTypes:i,resetWarningCache:o};return n.PropTypes=n,n}},652:(e,t,n)=>{e.exports=n(372)()},567:e=>{"use strict";e.exports="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED"},218:(e,t)=>{"use strict";var n=Symbol.for("react.element"),r=Symbol.for("react.portal"),o=Symbol.for("react.fragment"),i=Symbol.for("react.strict_mode"),a=Symbol.for("react.profiler"),u=Symbol.for("react.provider"),c=Symbol.for("react.context"),s=Symbol.for("react.forward_ref"),l=Symbol.for("react.suspense"),f=Symbol.for("react.memo"),p=Symbol.for("react.lazy"),d=Symbol.iterator,h={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},v=Object.assign,y={};function m(e,t,n){this.props=e,this.context=t,this.refs=y,this.updater=n||h}function g(){}function b(e,t,n){this.props=e,this.context=t,this.refs=y,this.updater=n||h}m.prototype.isReactComponent={},m.prototype.setState=function(e,t){if("object"!=typeof e&&"function"!=typeof e&&null!=e)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,e,t,"setState")},m.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")},g.prototype=m.prototype;var C=b.prototype=new g;C.constructor=b,v(C,m.prototype),C.isPureReactComponent=!0;var E=Array.isArray,S=Object.prototype.hasOwnProperty,k={current:null},_={key:!0,ref:!0,__self:!0,__source:!0};function w(e,t,r){var o,i={},a=null,u=null;if(null!=t)for(o in void 0!==t.ref&&(u=t.ref),void 0!==t.key&&(a=""+t.key),t)S.call(t,o)&&!_.hasOwnProperty(o)&&(i[o]=t[o]);var c=arguments.length-2;if(1===c)i.children=r;else if(1<c){for(var s=Array(c),l=0;l<c;l++)s[l]=arguments[l+2];i.children=s}if(e&&e.defaultProps)for(o in c=e.defaultProps)void 0===i[o]&&(i[o]=c[o]);return{$$typeof:n,type:e,key:a,ref:u,props:i,_owner:k.current}}function O(e){return"object"==typeof e&&null!==e&&e.$$typeof===n}var j=/\/+/g;function P(e,t){return"object"==typeof e&&null!==e&&null!=e.key?function(e){var t={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,(function(e){return t[e]}))}(""+e.key):t.toString(36)}function I(e,t,o,i,a){var u=typeof e;"undefined"!==u&&"boolean"!==u||(e=null);var c=!1;if(null===e)c=!0;else switch(u){case"string":case"number":c=!0;break;case"object":switch(e.$$typeof){case n:case r:c=!0}}if(c)return a=a(c=e),e=""===i?"."+P(c,0):i,E(a)?(o="",null!=e&&(o=e.replace(j,"$&/")+"/"),I(a,t,o,"",(function(e){return e}))):null!=a&&(O(a)&&(a=function(e,t){return{$$typeof:n,type:e.type,key:t,ref:e.ref,props:e.props,_owner:e._owner}}(a,o+(!a.key||c&&c.key===a.key?"":(""+a.key).replace(j,"$&/")+"/")+e)),t.push(a)),1;if(c=0,i=""===i?".":i+":",E(e))for(var s=0;s<e.length;s++){var l=i+P(u=e[s],s);c+=I(u,t,o,l,a)}else if(l=function(e){return null===e||"object"!=typeof e?null:"function"==typeof(e=d&&e[d]||e["@@iterator"])?e:null}(e),"function"==typeof l)for(e=l.call(e),s=0;!(u=e.next()).done;)c+=I(u=u.value,t,o,l=i+P(u,s++),a);else if("object"===u)throw t=String(e),Error("Objects are not valid as a React child (found: "+("[object Object]"===t?"object with keys {"+Object.keys(e).join(", ")+"}":t)+"). If you meant to render a collection of children, use an array instead.");return c}function R(e,t,n){if(null==e)return e;var r=[],o=0;return I(e,r,"","",(function(e){return t.call(n,e,o++)})),r}function T(e){if(-1===e._status){var t=e._result;(t=t()).then((function(t){0!==e._status&&-1!==e._status||(e._status=1,e._result=t)}),(function(t){0!==e._status&&-1!==e._status||(e._status=2,e._result=t)})),-1===e._status&&(e._status=0,e._result=t)}if(1===e._status)return e._result.default;throw e._result}var x={current:null},L={transition:null},D={ReactCurrentDispatcher:x,ReactCurrentBatchConfig:L,ReactCurrentOwner:k};t.Children={map:R,forEach:function(e,t,n){R(e,(function(){t.apply(this,arguments)}),n)},count:function(e){var t=0;return R(e,(function(){t++})),t},toArray:function(e){return R(e,(function(e){return e}))||[]},only:function(e){if(!O(e))throw Error("React.Children.only expected to receive a single React element child.");return e}},t.Component=m,t.Fragment=o,t.Profiler=a,t.PureComponent=b,t.StrictMode=i,t.Suspense=l,t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=D,t.cloneElement=function(e,t,r){if(null==e)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+e+".");var o=v({},e.props),i=e.key,a=e.ref,u=e._owner;if(null!=t){if(void 0!==t.ref&&(a=t.ref,u=k.current),void 0!==t.key&&(i=""+t.key),e.type&&e.type.defaultProps)var c=e.type.defaultProps;for(s in t)S.call(t,s)&&!_.hasOwnProperty(s)&&(o[s]=void 0===t[s]&&void 0!==c?c[s]:t[s])}var s=arguments.length-2;if(1===s)o.children=r;else if(1<s){c=Array(s);for(var l=0;l<s;l++)c[l]=arguments[l+2];o.children=c}return{$$typeof:n,type:e.type,key:i,ref:a,props:o,_owner:u}},t.createContext=function(e){return(e={$$typeof:c,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null}).Provider={$$typeof:u,_context:e},e.Consumer=e},t.createElement=w,t.createFactory=function(e){var t=w.bind(null,e);return t.type=e,t},t.createRef=function(){return{current:null}},t.forwardRef=function(e){return{$$typeof:s,render:e}},t.isValidElement=O,t.lazy=function(e){return{$$typeof:p,_payload:{_status:-1,_result:e},_init:T}},t.memo=function(e,t){return{$$typeof:f,type:e,compare:void 0===t?null:t}},t.startTransition=function(e){var t=L.transition;L.transition={};try{e()}finally{L.transition=t}},t.unstable_act=function(){throw Error("act(...) is not supported in production builds of React.")},t.useCallback=function(e,t){return x.current.useCallback(e,t)},t.useContext=function(e){return x.current.useContext(e)},t.useDebugValue=function(){},t.useDeferredValue=function(e){return x.current.useDeferredValue(e)},t.useEffect=function(e,t){return x.current.useEffect(e,t)},t.useId=function(){return x.current.useId()},t.useImperativeHandle=function(e,t,n){return x.current.useImperativeHandle(e,t,n)},t.useInsertionEffect=function(e,t){return x.current.useInsertionEffect(e,t)},t.useLayoutEffect=function(e,t){return x.current.useLayoutEffect(e,t)},t.useMemo=function(e,t){return x.current.useMemo(e,t)},t.useReducer=function(e,t,n){return x.current.useReducer(e,t,n)},t.useRef=function(e){return x.current.useRef(e)},t.useState=function(e){return x.current.useState(e)},t.useSyncExternalStore=function(e,t,n){return x.current.useSyncExternalStore(e,t,n)},t.useTransition=function(){return x.current.useTransition()},t.version="18.2.0"},526:(e,t,n)=>{"use strict";e.exports=n(218)},115:function(e,t,n){"use strict";var r=this&&this.__assign||function(){return r=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var o in t=arguments[n])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e},r.apply(this,arguments)},o=this&&this.__createBinding||(Object.create?function(e,t,n,r){void 0===r&&(r=n);var o=Object.getOwnPropertyDescriptor(t,n);o&&!("get"in o?!t.__esModule:o.writable||o.configurable)||(o={enumerable:!0,get:function(){return t[n]}}),Object.defineProperty(e,r,o)}:function(e,t,n,r){void 0===r&&(r=n),e[r]=t[n]}),i=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),a=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)"default"!==n&&Object.prototype.hasOwnProperty.call(e,n)&&o(t,e,n);return i(t,e),t};Object.defineProperty(t,"__esModule",{value:!0}),t.getCookie=t.callApi=t.testFunc=t.axiosBaseConfig=t.baseApiUrl=t.mapObjectToSelect=t.PInput=t.Image=t.PageWrapper=t.PEditor=t.PageSettingsSection=t.Select=t.sortFunc=t.PictureListElement=void 0;var u=a(n(526)),c=n(802);function s(e){for(var t=e+"=",n=decodeURIComponent(document.cookie).split(";"),r=0;r<n.length;r++){for(var o=n[r];" "==o.charAt(0);)o=o.substring(1);if(0==o.indexOf(t))return o.substring(t.length,o.length)}return""}t.PictureListElement=function(e){var n=e.item,r=e.onClick,o=e.src;return u.createElement("div",{className:"picture-list-element",onClick:r},u.createElement(t.Image,{src:o||t.baseApiUrl+"/GetPicture/Mini/".concat(n.pictureId),item:n}))},t.sortFunc=function(e,t,n){return n?t[n]-e[n]:t.id-e.id},t.Select=function(e){var t=e.name,n=e.data,o=e.register,i=e.selectProps,a=e.defaultValue,c=void 0===a?null:a,s=function(e,t){var n=!1;return!!c&&((null==i?void 0:i.multiple)?(t.forEach((function(t){t==e.value&&(n=!0)})),n):e.value==t)};return u.createElement("select",r({className:"select-comp"},o(t),i),n.map((function(e,t){return u.createElement("option",{key:t,value:e.value,selected:s(e,c)},e.label)})))},t.PageSettingsSection=function(e){return u.createElement("section",{className:["card settings-section",e.className||""].join(" ")},e.title&&u.createElement("div",{className:"section-title"},e.title),e.subtext&&u.createElement("div",{className:"section-subtext"},e.subtext),u.createElement("div",{className:"section-content"},e.children))},t.PEditor=function(e){var t=e.editorProps,n=e.register,o=e.formEls,i=o.getValues,a=o.setValue,s=u.useRef(null);return u.createElement(c.Editor,r({},n,{apiKey:"no-api-key",onInit:function(e,t){return s.current=t},initialValue:i("content"),onEditorChange:function(){s.current&&a("content",s.current.getContent())},init:{height:500,menubar:!1,plugins:["a11ychecker","advlist","advcode","advtable","autolink","checklist","export","lists","link","image","charmap","preview","anchor","searchreplace","visualblocks","powerpaste","fullscreen","formatpainter","insertdatetime","media","table","help","wordcount","code"],toolbar:"undo redo | casechange blocks | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist checklist outdent indent | removeformat | a11ycheck code table help",content_style:"body { font-family:Helvetica,Arial,sans-serif; font-size:14px }"}},t))},t.PageWrapper=function(e){return u.createElement("div",{className:["react-page",e.className||""].join(" ")},e.children)},t.Image=function(e){var t=e.imageClass,n=e.src,r=e.onImageClick,o=void 0===r?function(){}:r,i=e.item;return u.createElement("div",{className:["img-container",t||""].join(" "),onClick:function(e){return o(i,e)}},u.createElement("img",{src:n}))},t.PInput=function(e){var t=e.register,n=e.inputClass,o=e.wrapperClass,i=e.inputProps;return u.createElement("div",{className:["input-wrapper",o||""].join(" ")},u.createElement("input",r({},t,{className:["input-field",n||""].join(" ")},i)))},t.mapObjectToSelect=function(e,t,n){var r=[];return null==e||e.forEach((function(e,o){r.push({label:e[t],value:e[n]})})),r},t.baseApiUrl="https://localhost:7156",t.axiosBaseConfig={headers:{Authorization:"Bearer ".concat(s("token"))}},t.testFunc=function(){},t.callApi=function(e,t,n){null!=n&&({method:e,url:"https://localhost:7156"+t}.data=n)},t.getCookie=s}},n={};function r(e){var o=n[e];if(void 0!==o)return o.exports;var i=n[e]={exports:{}};return t[e].call(i.exports,i,i.exports,r),i.exports}r.m=t,e=[],r.O=(t,n,o,i)=>{if(!n){var a=1/0;for(l=0;l<e.length;l++){for(var[n,o,i]=e[l],u=!0,c=0;c<n.length;c++)(!1&i||a>=i)&&Object.keys(r.O).every((e=>r.O[e](n[c])))?n.splice(c--,1):(u=!1,i<a&&(a=i));if(u){e.splice(l--,1);var s=o();void 0!==s&&(t=s)}}return t}i=i||0;for(var l=e.length;l>0&&e[l-1][2]>i;l--)e[l]=e[l-1];e[l]=[n,o,i]},r.d=(e,t)=>{for(var n in t)r.o(t,n)&&!r.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},r.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),r.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},(()=>{var e={592:0};r.O.j=t=>0===e[t];var t=(t,n)=>{var o,i,[a,u,c]=n,s=0;if(a.some((t=>0!==e[t]))){for(o in u)r.o(u,o)&&(r.m[o]=u[o]);if(c)var l=c(r)}for(t&&t(n);s<a.length;s++)i=a[s],r.o(e,i)&&e[i]&&e[i][0](),e[i]=0;return r.O(l)},n=self.webpackChunkpizzeriafrontadmin=self.webpackChunkpizzeriafrontadmin||[];n.forEach(t.bind(null,0)),n.push=t.bind(null,n.push.bind(n))})();var o=r(115);o=r.O(o)})();
//# sourceMappingURL=common-bundle.js.map