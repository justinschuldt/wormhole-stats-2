(self.webpackChunkwormhole=self.webpackChunkwormhole||[]).push([[591],{34591:function(n,r,e){"use strict";var t,_={};_.__wbindgen_placeholder__=n.exports;var o=e(15895),i=o.TextDecoder,a=o.TextEncoder,c=new i("utf-8",{ignoreBOM:!0,fatal:!0});c.decode();var u=null;function s(){return null!==u&&u.buffer===t.memory.buffer||(u=new Uint8Array(t.memory.buffer)),u}function l(n,r){return c.decode(s().subarray(n,n+r))}var d=new Array(32).fill(void 0);d.push(void 0,null,!0,!1);var p=d.length;function f(n){p===d.length&&d.push(d.length+1);var r=p;return p=d[r],d[r]=n,r}function b(n){return d[n]}function w(n){var r=b(n);return function(n){n<36||(d[n]=p,p=n)}(n),r}var g=0,y=new a("utf-8"),v="function"==typeof y.encodeInto?function(n,r){return y.encodeInto(n,r)}:function(n,r){var e=y.encode(n);return r.set(e),{read:n.length,written:e.length}};function m(n,r,e){if(void 0===e){var t=y.encode(n),_=r(t.length);return s().subarray(_,_+t.length).set(t),g=t.length,_}for(var o=n.length,i=r(o),a=s(),c=0;c<o;c++){var u=n.charCodeAt(c);if(u>127)break;a[i+c]=u}if(c!==o){0!==c&&(n=n.slice(c)),i=e(i,o,o=c+3*n.length);var l=s().subarray(i+c,i+o);c+=v(n,l).written}return g=c,i}function h(n){return null==n}var x=null;function k(){return null!==x&&x.buffer===t.memory.buffer||(x=new Int32Array(t.memory.buffer)),x}var A=null;function S(n){var r=typeof n;if("number"==r||"boolean"==r||null==n)return""+n;if("string"==r)return'"'+n+'"';if("symbol"==r){var e=n.description;return null==e?"Symbol":"Symbol("+e+")"}if("function"==r){var t=n.name;return"string"==typeof t&&t.length>0?"Function("+t+")":"Function"}if(Array.isArray(n)){var _=n.length,o="[";_>0&&(o+=S(n[0]));for(var i=1;i<_;i++)o+=", "+S(n[i]);return o+="]"}var a,c=/\[object ([^\]]+)\]/.exec(toString.call(n));if(!(c.length>1))return toString.call(n);if("Object"==(a=c[1]))try{return"Object("+JSON.stringify(n)+")"}catch(u){return"Object"}return n instanceof Error?n.name+": "+n.message+"\n"+n.stack:a}var j=new Uint32Array(2),O=new BigUint64Array(j.buffer);function W(n,r){return s().subarray(n/1,n/1+r)}function N(n,r){if(!(n instanceof r))throw new Error("expected instance of "+r.name);return n.ptr}n.exports.add_liquidity=function(n,r,e,_,o,i){var a=m(n,t.__wbindgen_malloc,t.__wbindgen_realloc),c=g,u=m(r,t.__wbindgen_malloc,t.__wbindgen_realloc),s=g,l=m(e,t.__wbindgen_malloc,t.__wbindgen_realloc),d=g,p=m(_,t.__wbindgen_malloc,t.__wbindgen_realloc),f=g,b=m(o,t.__wbindgen_malloc,t.__wbindgen_realloc),y=g;O[0]=i;var v=j[0],h=j[1];return w(t.add_liquidity(a,c,u,s,l,d,p,f,b,y,v,h))},n.exports.remove_liquidity=function(n,r,e,_,o,i){var a=m(n,t.__wbindgen_malloc,t.__wbindgen_realloc),c=g,u=m(r,t.__wbindgen_malloc,t.__wbindgen_realloc),s=g,l=m(e,t.__wbindgen_malloc,t.__wbindgen_realloc),d=g,p=m(_,t.__wbindgen_malloc,t.__wbindgen_realloc),f=g,b=m(o,t.__wbindgen_malloc,t.__wbindgen_realloc),y=g;O[0]=i;var v=j[0],h=j[1];return w(t.remove_liquidity(a,c,u,s,l,d,p,f,b,y,v,h))},n.exports.claim_shares=function(n,r,e,_,o,i){var a=m(n,t.__wbindgen_malloc,t.__wbindgen_realloc),c=g,u=m(r,t.__wbindgen_malloc,t.__wbindgen_realloc),s=g,l=m(e,t.__wbindgen_malloc,t.__wbindgen_realloc),d=g,p=m(_,t.__wbindgen_malloc,t.__wbindgen_realloc),f=g,b=m(o,t.__wbindgen_malloc,t.__wbindgen_realloc),y=g;O[0]=i;var v=j[0],h=j[1];return w(t.claim_shares(a,c,u,s,l,d,p,f,b,y,v,h))},n.exports.create_pool=function(n,r,e,_){var o=m(n,t.__wbindgen_malloc,t.__wbindgen_realloc),i=g,a=m(r,t.__wbindgen_malloc,t.__wbindgen_realloc),c=g,u=m(e,t.__wbindgen_malloc,t.__wbindgen_realloc),s=g,l=m(_,t.__wbindgen_malloc,t.__wbindgen_realloc),d=g;return w(t.create_pool(o,i,a,c,u,s,l,d))},n.exports.migrate_tokens=function(n,r,e,_,o,i){var a=m(n,t.__wbindgen_malloc,t.__wbindgen_realloc),c=g,u=m(r,t.__wbindgen_malloc,t.__wbindgen_realloc),s=g,l=m(e,t.__wbindgen_malloc,t.__wbindgen_realloc),d=g,p=m(_,t.__wbindgen_malloc,t.__wbindgen_realloc),f=g,b=m(o,t.__wbindgen_malloc,t.__wbindgen_realloc),y=g;O[0]=i;var v=j[0],h=j[1];return w(t.migrate_tokens(a,c,u,s,l,d,p,f,b,y,v,h))},n.exports.pool_address=function(n,r,e){try{var _=t.__wbindgen_add_to_stack_pointer(-16),o=m(n,t.__wbindgen_malloc,t.__wbindgen_realloc),i=g,a=m(r,t.__wbindgen_malloc,t.__wbindgen_realloc),c=g,u=m(e,t.__wbindgen_malloc,t.__wbindgen_realloc),s=g;t.pool_address(_,o,i,a,c,u,s);var l=k()[_/4+0],d=k()[_/4+1],p=W(l,d).slice();return t.__wbindgen_free(l,1*d),p}finally{t.__wbindgen_add_to_stack_pointer(16)}},n.exports.authority_address=function(n){try{var r=t.__wbindgen_add_to_stack_pointer(-16),e=m(n,t.__wbindgen_malloc,t.__wbindgen_realloc),_=g;t.authority_address(r,e,_);var o=k()[r/4+0],i=k()[r/4+1],a=W(o,i).slice();return t.__wbindgen_free(o,1*i),a}finally{t.__wbindgen_add_to_stack_pointer(16)}},n.exports.share_mint_address=function(n,r){try{var e=t.__wbindgen_add_to_stack_pointer(-16),_=m(n,t.__wbindgen_malloc,t.__wbindgen_realloc),o=g,i=m(r,t.__wbindgen_malloc,t.__wbindgen_realloc),a=g;t.share_mint_address(e,_,o,i,a);var c=k()[e/4+0],u=k()[e/4+1],s=W(c,u).slice();return t.__wbindgen_free(c,1*u),s}finally{t.__wbindgen_add_to_stack_pointer(16)}},n.exports.from_custody_address=function(n,r){try{var e=t.__wbindgen_add_to_stack_pointer(-16),_=m(n,t.__wbindgen_malloc,t.__wbindgen_realloc),o=g,i=m(r,t.__wbindgen_malloc,t.__wbindgen_realloc),a=g;t.from_custody_address(e,_,o,i,a);var c=k()[e/4+0],u=k()[e/4+1],s=W(c,u).slice();return t.__wbindgen_free(c,1*u),s}finally{t.__wbindgen_add_to_stack_pointer(16)}},n.exports.to_custody_address=function(n,r){try{var e=t.__wbindgen_add_to_stack_pointer(-16),_=m(n,t.__wbindgen_malloc,t.__wbindgen_realloc),o=g,i=m(r,t.__wbindgen_malloc,t.__wbindgen_realloc),a=g;t.to_custody_address(e,_,o,i,a);var c=k()[e/4+0],u=k()[e/4+1],s=W(c,u).slice();return t.__wbindgen_free(c,1*u),s}finally{t.__wbindgen_add_to_stack_pointer(16)}},n.exports.parse_pool=function(n){var r,e,_,o=(r=n,e=t.__wbindgen_malloc,_=e(1*r.length),s().set(r,_/1),g=r.length,_),i=g;return w(t.parse_pool(o,i))},n.exports.init=function(){t.init()};var q=null;function I(n,r){for(var e=r(4*n.length),_=(null!==q&&q.buffer===t.memory.buffer||(q=new Uint32Array(t.memory.buffer)),q),o=0;o<n.length;o++)_[e/4+o]=f(n[o]);return g=n.length,e}function U(n,r){try{return n.apply(this,r)}catch(e){t.__wbindgen_exn_store(f(e))}}var B=function(){function n(r){var e=t.hash_constructor(f(r));return n.__wrap(e)}return n.__wrap=function(r){var e=Object.create(n.prototype);return e.ptr=r,e},n.prototype.__destroy_into_raw=function(){var n=this.ptr;return this.ptr=0,n},n.prototype.free=function(){var n=this.__destroy_into_raw();t.__wbg_hash_free(n)},n.prototype.toString=function(){try{var n=t.__wbindgen_add_to_stack_pointer(-16);t.hash_toString(n,this.ptr);var r=k()[n/4+0],e=k()[n/4+1];return l(r,e)}finally{t.__wbindgen_add_to_stack_pointer(16),t.__wbindgen_free(r,e)}},n.prototype.equals=function(r){return N(r,n),0!==t.hash_equals(this.ptr,r.ptr)},n.prototype.toBytes=function(){try{var n=t.__wbindgen_add_to_stack_pointer(-16);t.hash_toBytes(n,this.ptr);var r=k()[n/4+0],e=k()[n/4+1],_=W(r,e).slice();return t.__wbindgen_free(r,1*e),_}finally{t.__wbindgen_add_to_stack_pointer(16)}},n}();n.exports.Hash=B;var P=function(){function n(){}return n.__wrap=function(r){var e=Object.create(n.prototype);return e.ptr=r,e},n.prototype.__destroy_into_raw=function(){var n=this.ptr;return this.ptr=0,n},n.prototype.free=function(){var n=this.__destroy_into_raw();t.__wbg_instruction_free(n)},n}();n.exports.Instruction=P;var C=function(){function n(){var r=t.instructions_constructor();return n.__wrap(r)}return n.__wrap=function(r){var e=Object.create(n.prototype);return e.ptr=r,e},n.prototype.__destroy_into_raw=function(){var n=this.ptr;return this.ptr=0,n},n.prototype.free=function(){var n=this.__destroy_into_raw();t.__wbg_instructions_free(n)},n.prototype.push=function(n){N(n,P);var r=n.ptr;n.ptr=0,t.instructions_push(this.ptr,r)},n}();n.exports.Instructions=C;var E=function(){function n(){}return n.prototype.__destroy_into_raw=function(){var n=this.ptr;return this.ptr=0,n},n.prototype.free=function(){var n=this.__destroy_into_raw();t.__wbg_message_free(n)},Object.defineProperty(n.prototype,"recent_blockhash",{get:function(){var n=t.__wbg_get_message_recent_blockhash(this.ptr);return B.__wrap(n)},set:function(n){N(n,B);var r=n.ptr;n.ptr=0,t.__wbg_set_message_recent_blockhash(this.ptr,r)},enumerable:!1,configurable:!0}),n}();n.exports.Message=E;var F=function(){function n(r){var e=t.pubkey_constructor(f(r));return n.__wrap(e)}return n.__wrap=function(r){var e=Object.create(n.prototype);return e.ptr=r,e},n.prototype.__destroy_into_raw=function(){var n=this.ptr;return this.ptr=0,n},n.prototype.free=function(){var n=this.__destroy_into_raw();t.__wbg_pubkey_free(n)},n.prototype.toString=function(){try{var n=t.__wbindgen_add_to_stack_pointer(-16);t.pubkey_toString(n,this.ptr);var r=k()[n/4+0],e=k()[n/4+1];return l(r,e)}finally{t.__wbindgen_add_to_stack_pointer(16),t.__wbindgen_free(r,e)}},n.prototype.isOnCurve=function(){return 0!==t.pubkey_isOnCurve(this.ptr)},n.prototype.equals=function(r){return N(r,n),0!==t.pubkey_equals(this.ptr,r.ptr)},n.prototype.toBytes=function(){try{var n=t.__wbindgen_add_to_stack_pointer(-16);t.pubkey_toBytes(n,this.ptr);var r=k()[n/4+0],e=k()[n/4+1],_=W(r,e).slice();return t.__wbindgen_free(r,1*e),_}finally{t.__wbindgen_add_to_stack_pointer(16)}},n.createWithSeed=function(r,e,_){N(r,n);var o=m(e,t.__wbindgen_malloc,t.__wbindgen_realloc),i=g;N(_,n);var a=t.pubkey_createWithSeed(r.ptr,o,i,_.ptr);return n.__wrap(a)},n.createProgramAddress=function(r,e){var _=I(r,t.__wbindgen_malloc),o=g;N(e,n);var i=t.pubkey_createProgramAddress(_,o,e.ptr);return n.__wrap(i)},n.findProgramAddress=function(r,e){var _=I(r,t.__wbindgen_malloc),o=g;return N(e,n),w(t.pubkey_findProgramAddress(_,o,e.ptr))},n}();n.exports.Pubkey=F;var M=function(){function n(){}return n.prototype.__destroy_into_raw=function(){var n=this.ptr;return this.ptr=0,n},n.prototype.free=function(){var n=this.__destroy_into_raw();t.__wbg_systeminstruction_free(n)},n.createAccount=function(n,r,e,_,o){N(n,F),N(r,F),O[0]=e;var i=j[0],a=j[1];O[0]=_;var c=j[0],u=j[1];N(o,F);var s=t.systeminstruction_createAccount(n.ptr,r.ptr,i,a,c,u,o.ptr);return P.__wrap(s)},n.createAccountWithSeed=function(n,r,e,_,o,i,a){N(n,F),N(r,F),N(e,F);var c=m(_,t.__wbindgen_malloc,t.__wbindgen_realloc),u=g;O[0]=o;var s=j[0],l=j[1];O[0]=i;var d=j[0],p=j[1];N(a,F);var f=t.systeminstruction_createAccountWithSeed(n.ptr,r.ptr,e.ptr,c,u,s,l,d,p,a.ptr);return P.__wrap(f)},n.assign=function(n,r){N(n,F),N(r,F);var e=t.systeminstruction_assign(n.ptr,r.ptr);return P.__wrap(e)},n.assignWithSeed=function(n,r,e,_){N(n,F),N(r,F);var o=m(e,t.__wbindgen_malloc,t.__wbindgen_realloc),i=g;N(_,F);var a=t.systeminstruction_assignWithSeed(n.ptr,r.ptr,o,i,_.ptr);return P.__wrap(a)},n.transfer=function(n,r,e){N(n,F),N(r,F),O[0]=e;var _=j[0],o=j[1],i=t.systeminstruction_transfer(n.ptr,r.ptr,_,o);return P.__wrap(i)},n.transferWithSeed=function(n,r,e,_,o,i){N(n,F),N(r,F);var a=m(e,t.__wbindgen_malloc,t.__wbindgen_realloc),c=g;N(_,F),N(o,F),O[0]=i;var u=j[0],s=j[1],l=t.systeminstruction_transferWithSeed(n.ptr,r.ptr,a,c,_.ptr,o.ptr,u,s);return P.__wrap(l)},n.allocate=function(n,r){N(n,F),O[0]=r;var e=j[0],_=j[1],o=t.systeminstruction_allocate(n.ptr,e,_);return P.__wrap(o)},n.allocateWithSeed=function(n,r,e,_,o){N(n,F),N(r,F);var i=m(e,t.__wbindgen_malloc,t.__wbindgen_realloc),a=g;O[0]=_;var c=j[0],u=j[1];N(o,F);var s=t.systeminstruction_allocateWithSeed(n.ptr,r.ptr,i,a,c,u,o.ptr);return P.__wrap(s)},n.createNonceAccount=function(n,r,e,_){N(n,F),N(r,F),N(e,F),O[0]=_;var o=j[0],i=j[1];return w(t.systeminstruction_createNonceAccount(n.ptr,r.ptr,e.ptr,o,i))},n.advanceNonceAccount=function(n,r){N(n,F),N(r,F);var e=t.systeminstruction_advanceNonceAccount(n.ptr,r.ptr);return P.__wrap(e)},n.withdrawNonceAccount=function(n,r,e,_){N(n,F),N(r,F),N(e,F),O[0]=_;var o=j[0],i=j[1],a=t.systeminstruction_withdrawNonceAccount(n.ptr,r.ptr,e.ptr,o,i);return P.__wrap(a)},n.authorizeNonceAccount=function(n,r,e){N(n,F),N(r,F),N(e,F);var _=t.systeminstruction_authorizeNonceAccount(n.ptr,r.ptr,e.ptr);return P.__wrap(_)},n}();n.exports.SystemInstruction=M,n.exports.__wbindgen_json_parse=function(n,r){return f(JSON.parse(l(n,r)))},n.exports.__wbg_instruction_new=function(n){return f(P.__wrap(n))},n.exports.__wbindgen_object_drop_ref=function(n){w(n)},n.exports.__wbindgen_string_new=function(n,r){return f(l(n,r))},n.exports.__wbg_pubkey_new=function(n){return f(F.__wrap(n))},n.exports.__wbindgen_string_get=function(n,r){var e=b(r),_="string"==typeof e?e:void 0,o=h(_)?0:m(_,t.__wbindgen_malloc,t.__wbindgen_realloc),i=g;k()[n/4+1]=i,k()[n/4+0]=o},n.exports.__wbindgen_is_undefined=function(n){return void 0===b(n)},n.exports.__wbindgen_number_get=function(n,r){var e=b(r),_="number"==typeof e?e:void 0;(null!==A&&A.buffer===t.memory.buffer||(A=new Float64Array(t.memory.buffer)),A)[n/8+1]=h(_)?0:_,k()[n/4+0]=!h(_)},n.exports.__wbindgen_number_new=function(n){return f(n)},n.exports.__wbg_debug_675b0ecb65722d2a=function(n){console.debug(b(n))},n.exports.__wbg_error_cc38ce2b4b661e1d=function(n){console.error(b(n))},n.exports.__wbg_info_e0c9813e6fd3bdc1=function(n){console.info(b(n))},n.exports.__wbg_log_3445347661d4505e=function(n){console.log(b(n))},n.exports.__wbg_warn_5ec7c7c02d0b3841=function(n){console.warn(b(n))},n.exports.__wbg_new_693216e109162396=function(){return f(new Error)},n.exports.__wbg_stack_0ddaca5d1abfb52f=function(n,r){var e=m(b(r).stack,t.__wbindgen_malloc,t.__wbindgen_realloc),_=g;k()[n/4+1]=_,k()[n/4+0]=e},n.exports.__wbg_error_09919627ac0992f5=function(n,r){try{console.error(l(n,r))}finally{t.__wbindgen_free(n,r)}},n.exports.__wbg_new_949bbc1147195c4e=function(){return f(new Array)},n.exports.__wbindgen_is_function=function(n){return"function"==typeof b(n)},n.exports.__wbindgen_is_object=function(n){var r=b(n);return"object"==typeof r&&null!==r},n.exports.__wbg_next_c4151d46d5fa7097=function(n){return f(b(n).next)},n.exports.__wbg_next_7720502039b96d00=function(){return U((function(n){return f(b(n).next())}),arguments)},n.exports.__wbg_done_b06cf0578e89ff68=function(n){return b(n).done},n.exports.__wbg_value_e74a542443d92451=function(n){return f(b(n).value)},n.exports.__wbg_iterator_4fc4ce93e6b92958=function(){return f(Symbol.iterator)},n.exports.__wbg_get_4d0f21c2f823742e=function(){return U((function(n,r){return f(Reflect.get(b(n),b(r)))}),arguments)},n.exports.__wbg_call_888d259a5fefc347=function(){return U((function(n,r){return f(b(n).call(b(r)))}),arguments)},n.exports.__wbg_newwithlength_75ee2b96c288e6bc=function(n){return f(new Array(n>>>0))},n.exports.__wbg_set_1820441f7fb79aad=function(n,r,e){b(n)[r>>>0]=w(e)},n.exports.__wbg_isArray_eb7ad55f2da67dde=function(n){return Array.isArray(b(n))},n.exports.__wbg_push_284486ca27c6aa8b=function(n,r){return b(n).push(b(r))},n.exports.__wbg_values_364ae56c608e6824=function(n){return f(b(n).values())},n.exports.__wbg_buffer_397eaa4d72ee94dd=function(n){return f(b(n).buffer)},n.exports.__wbg_new_a7ce447f15ff496f=function(n){return f(new Uint8Array(b(n)))},n.exports.__wbg_set_969ad0a60e51d320=function(n,r,e){b(n).set(b(r),e>>>0)},n.exports.__wbg_length_1eb8fc608a0d4cdb=function(n){return b(n).length},n.exports.__wbg_instanceof_Uint8Array_08a1f3a179095e76=function(n){return b(n)instanceof Uint8Array},n.exports.__wbindgen_debug_string=function(n,r){var e=m(S(b(r)),t.__wbindgen_malloc,t.__wbindgen_realloc),_=g;k()[n/4+1]=_,k()[n/4+0]=e},n.exports.__wbindgen_throw=function(n,r){throw new Error(l(n,r))},n.exports.__wbindgen_rethrow=function(n){throw w(n)},n.exports.__wbindgen_memory=function(){return f(t.memory)};var z=e(10433).join("/","wormhole_migration_bg.wasm"),J=e(99474).readFileSync(z),T=new WebAssembly.Module(J),D=new WebAssembly.Instance(T,_);t=D.exports,n.exports.__wasm=t},99474:function(){},10433:function(){}}]);
//# sourceMappingURL=591-18a14a316de18e2d769d.js.map