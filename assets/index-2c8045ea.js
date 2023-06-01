(function() {
    const t = document.createElement("link").relList;
    if (t && t.supports && t.supports("modulepreload"))
        return;
    for (const r of document.querySelectorAll('link[rel="modulepreload"]'))
        s(r);
    new MutationObserver(r=>{
        for (const i of r)
            if (i.type === "childList")
                for (const o of i.addedNodes)
                    o.tagName === "LINK" && o.rel === "modulepreload" && s(o)
    }
    ).observe(document, {
        childList: !0,
        subtree: !0
    });
    function n(r) {
        const i = {};
        return r.integrity && (i.integrity = r.integrity),
        r.referrerPolicy && (i.referrerPolicy = r.referrerPolicy),
        r.crossOrigin === "use-credentials" ? i.credentials = "include" : r.crossOrigin === "anonymous" ? i.credentials = "omit" : i.credentials = "same-origin",
        i
    }
    function s(r) {
        if (r.ep)
            return;
        r.ep = !0;
        const i = n(r);
        fetch(r.href, i)
    }
}
)();
function bn(e, t) {
    const n = Object.create(null)
      , s = e.split(",");
    for (let r = 0; r < s.length; r++)
        n[s[r]] = !0;
    return t ? r=>!!n[r.toLowerCase()] : r=>!!n[r]
}
const S = {}
  , qe = []
  , fe = ()=>{}
  , _r = ()=>!1
  , br = /^on[^a-z]/
  , St = e=>br.test(e)
  , xn = e=>e.startsWith("onUpdate:")
  , q = Object.assign
  , yn = (e,t)=>{
    const n = e.indexOf(t);
    n > -1 && e.splice(n, 1)
}
  , xr = Object.prototype.hasOwnProperty
  , N = (e,t)=>xr.call(e, t)
  , P = Array.isArray
  , Qe = e=>$t(e) === "[object Map]"
  , Es = e=>$t(e) === "[object Set]"
  , I = e=>typeof e == "function"
  , W = e=>typeof e == "string"
  , wn = e=>typeof e == "symbol"
  , $ = e=>e !== null && typeof e == "object"
  , vs = e=>$(e) && I(e.then) && I(e.catch)
  , Os = Object.prototype.toString
  , $t = e=>Os.call(e)
  , yr = e=>$t(e).slice(8, -1)
  , Cs = e=>$t(e) === "[object Object]"
  , En = e=>W(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e
  , At = bn(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted")
  , Dt = e=>{
    const t = Object.create(null);
    return n=>t[n] || (t[n] = e(n))
}
  , wr = /-(\w)/g
  , Ye = Dt(e=>e.replace(wr, (t,n)=>n ? n.toUpperCase() : ""))
  , Er = /\B([A-Z])/g
  , Ge = Dt(e=>e.replace(Er, "-$1").toLowerCase())
  , Ts = Dt(e=>e.charAt(0).toUpperCase() + e.slice(1))
  , Zt = Dt(e=>e ? `on ${Ts(e)}` : "")
  , ut = (e,t)=>!Object.is(e, t)
  , Vt = (e,t)=>{
    for (let n = 0; n < e.length; n++)
        e[n](t)
}
  , Rt = (e,t,n)=>{
    Object.defineProperty(e, t, {
        configurable: !0,
        enumerable: !1,
        value: n
    })
}
  , vr = e=>{
    const t = parseFloat(e);
    return isNaN(t) ? e : t
}
;
let Qn;
const on = ()=>Qn || (Qn = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function vn(e) {
    if (P(e)) {
        const t = {};
        for (let n = 0; n < e.length; n++) {
            const s = e[n]
              , r = W(s) ? Pr(s) : vn(s);
            if (r)
                for (const i in r)
                    t[i] = r[i]
        }
        return t
    } else {
        if (W(e))
            return e;
        if ($(e))
            return e
    }
}
const Or = /;(?![^(]*\))/g
  , Cr = /:([^]+)/
  , Tr = new RegExp("\\/\\*.*?\\*\\/","gs");
function Pr(e) {
    const t = {};
    return e.replace(Tr, "").split(Or).forEach(n=>{
        if (n) {
            const s = n.split(Cr);
            s.length > 1 && (t[s[0].trim()] = s[1].trim())
        }
    }
    ),
    t
}
function On(e) {
    let t = "";
    if (W(e))
        t = e;
    else if (P(e))
        for (let n = 0; n < e.length; n++) {
            const s = On(e[n]);
            s && (t += s + " ")
        }
    else if ($(e))
        for (const n in e)
            e[n] && (t += n + " ");
    return t.trim()
}
const Ar = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly"
  , Ir = bn(Ar);
function Ps(e) {
    return !!e || e === ""
}
const Ke = e=>W(e) ? e : e == null ? "" : P(e) || $(e) && (e.toString === Os || !I(e.toString)) ? JSON.stringify(e, As, 2) : String(e)
  , As = (e,t)=>t && t.__v_isRef ? As(e, t.value) : Qe(t) ? {
    [`Map(${t.size})`]: [...t.entries()].reduce((n,[s,r])=>(n[`${s} =>`] = r,
    n), {})
} : Es(t) ? {
    [`Set(${t.size})`]: [...t.values()]
} : $(t) && !P(t) && !Cs(t) ? String(t) : t;
let ie;
class Mr {
    constructor(t=!1) {
        this.detached = t,
        this._active = !0,
        this.effects = [],
        this.cleanups = [],
        this.parent = ie,
        !t && ie && (this.index = (ie.scopes || (ie.scopes = [])).push(this) - 1)
    }
    get active() {
        return this._active
    }
    run(t) {
        if (this._active) {
            const n = ie;
            try {
                return ie = this,
                t()
            } finally {
                ie = n
            }
        }
    }
    on() {
        ie = this
    }
    off() {
        ie = this.parent
    }
    stop(t) {
        if (this._active) {
            let n, s;
            for (n = 0,
            s = this.effects.length; n < s; n++)
                this.effects[n].stop();
            for (n = 0,
            s = this.cleanups.length; n < s; n++)
                this.cleanups[n]();
            if (this.scopes)
                for (n = 0,
                s = this.scopes.length; n < s; n++)
                    this.scopes[n].stop(!0);
            if (!this.detached && this.parent && !t) {
                const r = this.parent.scopes.pop();
                r && r !== this && (this.parent.scopes[this.index] = r,
                r.index = this.index)
            }
            this.parent = void 0,
            this._active = !1
        }
    }
}
function Fr(e, t=ie) {
    t && t.active && t.effects.push(e)
}
function Rr() {
    return ie
}
const Cn = e=>{
    const t = new Set(e);
    return t.w = 0,
    t.n = 0,
    t
}
  , Is = e=>(e.w & Ae) > 0
  , Ms = e=>(e.n & Ae) > 0
  , Nr = ({deps: e})=>{
    if (e.length)
        for (let t = 0; t < e.length; t++)
            e[t].w |= Ae
}
  , jr = e=>{
    const {deps: t} = e;
    if (t.length) {
        let n = 0;
        for (let s = 0; s < t.length; s++) {
            const r = t[s];
            Is(r) && !Ms(r) ? r.delete(e) : t[n++] = r,
            r.w &= ~Ae,
            r.n &= ~Ae
        }
        t.length = n
    }
}
  , ln = new WeakMap;
let ot = 0
  , Ae = 1;
const cn = 30;
let le;
const Se = Symbol("")
  , fn = Symbol("");
class Tn {
    constructor(t, n=null, s) {
        this.fn = t,
        this.scheduler = n,
        this.active = !0,
        this.deps = [],
        this.parent = void 0,
        Fr(this, s)
    }
    run() {
        if (!this.active)
            return this.fn();
        let t = le
          , n = Ce;
        for (; t; ) {
            if (t === this)
                return;
            t = t.parent
        }
        try {
            return this.parent = le,
            le = this,
            Ce = !0,
            Ae = 1 << ++ot,
            ot <= cn ? Nr(this) : kn(this),
            this.fn()
        } finally {
            ot <= cn && jr(this),
            Ae = 1 << --ot,
            le = this.parent,
            Ce = n,
            this.parent = void 0,
            this.deferStop && this.stop()
        }
    }
    stop() {
        le === this ? this.deferStop = !0 : this.active && (kn(this),
        this.onStop && this.onStop(),
        this.active = !1)
    }
}
function kn(e) {
    const {deps: t} = e;
    if (t.length) {
        for (let n = 0; n < t.length; n++)
            t[n].delete(e);
        t.length = 0
    }
}
let Ce = !0;
const Fs = [];
function et() {
    Fs.push(Ce),
    Ce = !1
}
function tt() {
    const e = Fs.pop();
    Ce = e === void 0 ? !0 : e
}
function te(e, t, n) {
    if (Ce && le) {
        let s = ln.get(e);
        s || ln.set(e, s = new Map);
        let r = s.get(n);
        r || s.set(n, r = Cn()),
        Rs(r)
    }
}
function Rs(e, t) {
    let n = !1;
    ot <= cn ? Ms(e) || (e.n |= Ae,
    n = !Is(e)) : n = !e.has(le),
    n && (e.add(le),
    le.deps.push(e))
}
function ye(e, t, n, s, r, i) {
    const o = ln.get(e);
    if (!o)
        return;
    let f = [];
    if (t === "clear")
        f = [...o.values()];
    else if (n === "length" && P(e)) {
        const u = Number(s);
        o.forEach((a,m)=>{
            (m === "length" || m >= u) && f.push(a)
        }
        )
    } else
        switch (n !== void 0 && f.push(o.get(n)),
        t) {
        case "add":
            P(e) ? En(n) && f.push(o.get("length")) : (f.push(o.get(Se)),
            Qe(e) && f.push(o.get(fn)));
            break;
        case "delete":
            P(e) || (f.push(o.get(Se)),
            Qe(e) && f.push(o.get(fn)));
            break;
        case "set":
            Qe(e) && f.push(o.get(Se));
            break
        }
    if (f.length === 1)
        f[0] && un(f[0]);
    else {
        const u = [];
        for (const a of f)
            a && u.push(...a);
        un(Cn(u))
    }
}
function un(e, t) {
    const n = P(e) ? e : [...e];
    for (const s of n)
        s.computed && Jn(s);
    for (const s of n)
        s.computed || Jn(s)
}
function Jn(e, t) {
    (e !== le || e.allowRecurse) && (e.scheduler ? e.scheduler() : e.run())
}
const Hr = bn("__proto__,__v_isRef,__isVue")
  , Ns = new Set(Object.getOwnPropertyNames(Symbol).filter(e=>e !== "arguments" && e !== "caller").map(e=>Symbol[e]).filter(wn))
  , Br = Pn()
  , Lr = Pn(!1, !0)
  , Sr = Pn(!0)
  , Yn = $r();
function $r() {
    const e = {};
    return ["includes", "indexOf", "lastIndexOf"].forEach(t=>{
        e[t] = function(...n) {
            const s = j(this);
            for (let i = 0, o = this.length; i < o; i++)
                te(s, "get", i + "");
            const r = s[t](...n);
            return r === -1 || r === !1 ? s[t](...n.map(j)) : r
        }
    }
    ),
    ["push", "pop", "shift", "unshift", "splice"].forEach(t=>{
        e[t] = function(...n) {
            et();
            const s = j(this)[t].apply(this, n);
            return tt(),
            s
        }
    }
    ),
    e
}
function Dr(e) {
    const t = j(this);
    return te(t, "has", e),
    t.hasOwnProperty(e)
}
function Pn(e=!1, t=!1) {
    return function(s, r, i) {
        if (r === "__v_isReactive")
            return !e;
        if (r === "__v_isReadonly")
            return e;
        if (r === "__v_isShallow")
            return t;
        if (r === "__v_raw" && i === (e ? t ? ni : Ss : t ? Ls : Bs).get(s))
            return s;
        const o = P(s);
        if (!e) {
            if (o && N(Yn, r))
                return Reflect.get(Yn, r, i);
            if (r === "hasOwnProperty")
                return Dr
        }
        const f = Reflect.get(s, r, i);
        return (wn(r) ? Ns.has(r) : Hr(r)) || (e || te(s, "get", r),
        t) ? f : Z(f) ? o && En(r) ? f : f.value : $(f) ? e ? $s(f) : Mn(f) : f
    }
}
const Ur = js()
  , Kr = js(!0);
function js(e=!1) {
    return function(n, s, r, i) {
        let o = n[s];
        if (Xe(o) && Z(o) && !Z(r))
            return !1;
        if (!e && (!Nt(r) && !Xe(r) && (o = j(o),
        r = j(r)),
        !P(n) && Z(o) && !Z(r)))
            return o.value = r,
            !0;
        const f = P(n) && En(s) ? Number(s) < n.length : N(n, s)
          , u = Reflect.set(n, s, r, i);
        return n === j(i) && (f ? ut(r, o) && ye(n, "set", s, r) : ye(n, "add", s, r)),
        u
    }
}
function Wr(e, t) {
    const n = N(e, t);
    e[t];
    const s = Reflect.deleteProperty(e, t);
    return s && n && ye(e, "delete", t, void 0),
    s
}
function zr(e, t) {
    const n = Reflect.has(e, t);
    return (!wn(t) || !Ns.has(t)) && te(e, "has", t),
    n
}
function qr(e) {
    return te(e, "iterate", P(e) ? "length" : Se),
    Reflect.ownKeys(e)
}
const Hs = {
    get: Br,
    set: Ur,
    deleteProperty: Wr,
    has: zr,
    ownKeys: qr
}
  , Qr = {
    get: Sr,
    set(e, t) {
        return !0
    },
    deleteProperty(e, t) {
        return !0
    }
}
  , kr = q({}, Hs, {
    get: Lr,
    set: Kr
})
  , An = e=>e
  , Ut = e=>Reflect.getPrototypeOf(e);
function Et(e, t, n=!1, s=!1) {
    e = e.__v_raw;
    const r = j(e)
      , i = j(t);
    n || (t !== i && te(r, "get", t),
    te(r, "get", i));
    const {has: o} = Ut(r)
      , f = s ? An : n ? Rn : at;
    if (o.call(r, t))
        return f(e.get(t));
    if (o.call(r, i))
        return f(e.get(i));
    e !== r && e.get(t)
}
function vt(e, t=!1) {
    const n = this.__v_raw
      , s = j(n)
      , r = j(e);
    return t || (e !== r && te(s, "has", e),
    te(s, "has", r)),
    e === r ? n.has(e) : n.has(e) || n.has(r)
}
function Ot(e, t=!1) {
    return e = e.__v_raw,
    !t && te(j(e), "iterate", Se),
    Reflect.get(e, "size", e)
}
function Xn(e) {
    e = j(e);
    const t = j(this);
    return Ut(t).has.call(t, e) || (t.add(e),
    ye(t, "add", e, e)),
    this
}
function Zn(e, t) {
    t = j(t);
    const n = j(this)
      , {has: s, get: r} = Ut(n);
    let i = s.call(n, e);
    i || (e = j(e),
    i = s.call(n, e));
    const o = r.call(n, e);
    return n.set(e, t),
    i ? ut(t, o) && ye(n, "set", e, t) : ye(n, "add", e, t),
    this
}
function Vn(e) {
    const t = j(this)
      , {has: n, get: s} = Ut(t);
    let r = n.call(t, e);
    r || (e = j(e),
    r = n.call(t, e)),
    s && s.call(t, e);
    const i = t.delete(e);
    return r && ye(t, "delete", e, void 0),
    i
}
function Gn() {
    const e = j(this)
      , t = e.size !== 0
      , n = e.clear();
    return t && ye(e, "clear", void 0, void 0),
    n
}
function Ct(e, t) {
    return function(s, r) {
        const i = this
          , o = i.__v_raw
          , f = j(o)
          , u = t ? An : e ? Rn : at;
        return !e && te(f, "iterate", Se),
        o.forEach((a,m)=>s.call(r, u(a), u(m), i))
    }
}
function Tt(e, t, n) {
    return function(...s) {
        const r = this.__v_raw
          , i = j(r)
          , o = Qe(i)
          , f = e === "entries" || e === Symbol.iterator && o
          , u = e === "keys" && o
          , a = r[e](...s)
          , m = n ? An : t ? Rn : at;
        return !t && te(i, "iterate", u ? fn : Se),
        {
            next() {
                const {value: w, done: v} = a.next();
                return v ? {
                    value: w,
                    done: v
                } : {
                    value: f ? [m(w[0]), m(w[1])] : m(w),
                    done: v
                }
            },
            [Symbol.iterator]() {
                return this
            }
        }
    }
}
function ve(e) {
    return function(...t) {
        return e === "delete" ? !1 : this
    }
}
function Jr() {
    const e = {
        get(i) {
            return Et(this, i)
        },
        get size() {
            return Ot(this)
        },
        has: vt,
        add: Xn,
        set: Zn,
        delete: Vn,
        clear: Gn,
        forEach: Ct(!1, !1)
    }
      , t = {
        get(i) {
            return Et(this, i, !1, !0)
        },
        get size() {
            return Ot(this)
        },
        has: vt,
        add: Xn,
        set: Zn,
        delete: Vn,
        clear: Gn,
        forEach: Ct(!1, !0)
    }
      , n = {
        get(i) {
            return Et(this, i, !0)
        },
        get size() {
            return Ot(this, !0)
        },
        has(i) {
            return vt.call(this, i, !0)
        },
        add: ve("add"),
        set: ve("set"),
        delete: ve("delete"),
        clear: ve("clear"),
        forEach: Ct(!0, !1)
    }
      , s = {
        get(i) {
            return Et(this, i, !0, !0)
        },
        get size() {
            return Ot(this, !0)
        },
        has(i) {
            return vt.call(this, i, !0)
        },
        add: ve("add"),
        set: ve("set"),
        delete: ve("delete"),
        clear: ve("clear"),
        forEach: Ct(!0, !0)
    };
    return ["keys", "values", "entries", Symbol.iterator].forEach(i=>{
        e[i] = Tt(i, !1, !1),
        n[i] = Tt(i, !0, !1),
        t[i] = Tt(i, !1, !0),
        s[i] = Tt(i, !0, !0)
    }
    ),
    [e, n, t, s]
}
const [Yr,Xr,Zr,Vr] = Jr();
function In(e, t) {
    const n = t ? e ? Vr : Zr : e ? Xr : Yr;
    return (s,r,i)=>r === "__v_isReactive" ? !e : r === "__v_isReadonly" ? e : r === "__v_raw" ? s : Reflect.get(N(n, r) && r in s ? n : s, r, i)
}
const Gr = {
    get: In(!1, !1)
}
  , ei = {
    get: In(!1, !0)
}
  , ti = {
    get: In(!0, !1)
}
  , Bs = new WeakMap
  , Ls = new WeakMap
  , Ss = new WeakMap
  , ni = new WeakMap;
function si(e) {
    switch (e) {
    case "Object":
    case "Array":
        return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
        return 2;
    default:
        return 0
    }
}
function ri(e) {
    return e.__v_skip || !Object.isExtensible(e) ? 0 : si(yr(e))
}
function Mn(e) {
    return Xe(e) ? e : Fn(e, !1, Hs, Gr, Bs)
}
function ii(e) {
    return Fn(e, !1, kr, ei, Ls)
}
function $s(e) {
    return Fn(e, !0, Qr, ti, Ss)
}
function Fn(e, t, n, s, r) {
    if (!$(e) || e.__v_raw && !(t && e.__v_isReactive))
        return e;
    const i = r.get(e);
    if (i)
        return i;
    const o = ri(e);
    if (o === 0)
        return e;
    const f = new Proxy(e,o === 2 ? s : n);
    return r.set(e, f),
    f
}
function ke(e) {
    return Xe(e) ? ke(e.__v_raw) : !!(e && e.__v_isReactive)
}
function Xe(e) {
    return !!(e && e.__v_isReadonly)
}
function Nt(e) {
    return !!(e && e.__v_isShallow)
}
function Ds(e) {
    return ke(e) || Xe(e)
}
function j(e) {
    const t = e && e.__v_raw;
    return t ? j(t) : e
}
function Us(e) {
    return Rt(e, "__v_skip", !0),
    e
}
const at = e=>$(e) ? Mn(e) : e
  , Rn = e=>$(e) ? $s(e) : e;
function Ks(e) {
    Ce && le && (e = j(e),
    Rs(e.dep || (e.dep = Cn())))
}
function Ws(e, t) {
    e = j(e);
    const n = e.dep;
    n && un(n)
}
function Z(e) {
    return !!(e && e.__v_isRef === !0)
}
function oi(e) {
    return li(e, !1)
}
function li(e, t) {
    return Z(e) ? e : new ci(e,t)
}
class ci {
    constructor(t, n) {
        this.__v_isShallow = n,
        this.dep = void 0,
        this.__v_isRef = !0,
        this._rawValue = n ? t : j(t),
        this._value = n ? t : at(t)
    }
    get value() {
        return Ks(this),
        this._value
    }
    set value(t) {
        const n = this.__v_isShallow || Nt(t) || Xe(t);
        t = n ? t : j(t),
        ut(t, this._rawValue) && (this._rawValue = t,
        this._value = n ? t : at(t),
        Ws(this))
    }
}
function jt(e) {
    return Z(e) ? e.value : e
}
const fi = {
    get: (e,t,n)=>jt(Reflect.get(e, t, n)),
    set: (e,t,n,s)=>{
        const r = e[t];
        return Z(r) && !Z(n) ? (r.value = n,
        !0) : Reflect.set(e, t, n, s)
    }
};
function zs(e) {
    return ke(e) ? e : new Proxy(e,fi)
}
class ui {
    constructor(t, n, s, r) {
        this._setter = n,
        this.dep = void 0,
        this.__v_isRef = !0,
        this.__v_isReadonly = !1,
        this._dirty = !0,
        this.effect = new Tn(t,()=>{
            this._dirty || (this._dirty = !0,
            Ws(this))
        }
        ),
        this.effect.computed = this,
        this.effect.active = this._cacheable = !r,
        this.__v_isReadonly = s
    }
    get value() {
        const t = j(this);
        return Ks(t),
        (t._dirty || !t._cacheable) && (t._dirty = !1,
        t._value = t.effect.run()),
        t._value
    }
    set value(t) {
        this._setter(t)
    }
}
function ai(e, t, n=!1) {
    let s, r;
    const i = I(e);
    return i ? (s = e,
    r = fe) : (s = e.get,
    r = e.set),
    new ui(s,r,i || !r,n)
}
function Te(e, t, n, s) {
    let r;
    try {
        r = s ? e(...s) : e()
    } catch (i) {
        Kt(i, t, n)
    }
    return r
}
function ue(e, t, n, s) {
    if (I(e)) {
        const i = Te(e, t, n, s);
        return i && vs(i) && i.catch(o=>{
            Kt(o, t, n)
        }
        ),
        i
    }
    const r = [];
    for (let i = 0; i < e.length; i++)
        r.push(ue(e[i], t, n, s));
    return r
}
function Kt(e, t, n, s=!0) {
    const r = t ? t.vnode : null;
    if (t) {
        let i = t.parent;
        const o = t.proxy
          , f = n;
        for (; i; ) {
            const a = i.ec;
            if (a) {
                for (let m = 0; m < a.length; m++)
                    if (a[m](e, o, f) === !1)
                        return
            }
            i = i.parent
        }
        const u = t.appContext.config.errorHandler;
        if (u) {
            Te(u, null, 10, [e, o, f]);
            return
        }
    }
    di(e, n, r, s)
}
function di(e, t, n, s=!0) {
    console.error(e)
}
let dt = !1
  , an = !1;
const Y = [];
let ge = 0;
const Je = [];
let be = null
  , He = 0;
const qs = Promise.resolve();
let Nn = null;
function hi(e) {
    const t = Nn || qs;
    return e ? t.then(this ? e.bind(this) : e) : t
}
function pi(e) {
    let t = ge + 1
      , n = Y.length;
    for (; t < n; ) {
        const s = t + n >>> 1;
        ht(Y[s]) < e ? t = s + 1 : n = s
    }
    return t
}
function jn(e) {
    (!Y.length || !Y.includes(e, dt && e.allowRecurse ? ge + 1 : ge)) && (e.id == null ? Y.push(e) : Y.splice(pi(e.id), 0, e),
    Qs())
}
function Qs() {
    !dt && !an && (an = !0,
    Nn = qs.then(Js))
}
function gi(e) {
    const t = Y.indexOf(e);
    t > ge && Y.splice(t, 1)
}
function mi(e) {
    P(e) ? Je.push(...e) : (!be || !be.includes(e, e.allowRecurse ? He + 1 : He)) && Je.push(e),
    Qs()
}
function es(e, t=dt ? ge + 1 : 0) {
    for (; t < Y.length; t++) {
        const n = Y[t];
        n && n.pre && (Y.splice(t, 1),
        t--,
        n())
    }
}
function ks(e) {
    if (Je.length) {
        const t = [...new Set(Je)];
        if (Je.length = 0,
        be) {
            be.push(...t);
            return
        }
        for (be = t,
        be.sort((n,s)=>ht(n) - ht(s)),
        He = 0; He < be.length; He++)
            be[He]();
        be = null,
        He = 0
    }
}
const ht = e=>e.id == null ? 1 / 0 : e.id
  , _i = (e,t)=>{
    const n = ht(e) - ht(t);
    if (n === 0) {
        if (e.pre && !t.pre)
            return -1;
        if (t.pre && !e.pre)
            return 1
    }
    return n
}
;
function Js(e) {
    an = !1,
    dt = !0,
    Y.sort(_i);
    const t = fe;
    try {
        for (ge = 0; ge < Y.length; ge++) {
            const n = Y[ge];
            n && n.active !== !1 && Te(n, null, 14)
        }
    } finally {
        ge = 0,
        Y.length = 0,
        ks(),
        dt = !1,
        Nn = null,
        (Y.length || Je.length) && Js()
    }
}
function bi(e, t, ...n) {
    if (e.isUnmounted)
        return;
    const s = e.vnode.props || S;
    let r = n;
    const i = t.startsWith("update:")
      , o = i && t.slice(7);
    if (o && o in s) {
        const m = `${o === "modelValue" ? "model" : o}Modifiers`
          , {number: w, trim: v} = s[m] || S;
        v && (r = n.map(A=>W(A) ? A.trim() : A)),
        w && (r = n.map(vr))
    }
    let f, u = s[f = Zt(t)] || s[f = Zt(Ye(t))];
    !u && i && (u = s[f = Zt(Ge(t))]),
    u && ue(u, e, 6, r);
    const a = s[f + "Once"];
    if (a) {
        if (!e.emitted)
            e.emitted = {};
        else if (e.emitted[f])
            return;
        e.emitted[f] = !0,
        ue(a, e, 6, r)
    }
}
function Ys(e, t, n=!1) {
    const s = t.emitsCache
      , r = s.get(e);
    if (r !== void 0)
        return r;
    const i = e.emits;
    let o = {}
      , f = !1;
    if (!I(e)) {
        const u = a=>{
            const m = Ys(a, t, !0);
            m && (f = !0,
            q(o, m))
        }
        ;
        !n && t.mixins.length && t.mixins.forEach(u),
        e.extends && u(e.extends),
        e.mixins && e.mixins.forEach(u)
    }
    return !i && !f ? ($(e) && s.set(e, null),
    null) : (P(i) ? i.forEach(u=>o[u] = null) : q(o, i),
    $(e) && s.set(e, o),
    o)
}
function Wt(e, t) {
    return !e || !St(t) ? !1 : (t = t.slice(2).replace(/Once$/, ""),
    N(e, t[0].toLowerCase() + t.slice(1)) || N(e, Ge(t)) || N(e, t))
}
let me = null
  , Xs = null;
function Ht(e) {
    const t = me;
    return me = e,
    Xs = e && e.type.__scopeId || null,
    t
}
function xi(e, t=me, n) {
    if (!t || e._n)
        return e;
    const s = (...r)=>{
        s._d && us(-1);
        const i = Ht(t);
        let o;
        try {
            o = e(...r)
        } finally {
            Ht(i),
            s._d && us(1)
        }
        return o
    }
    ;
    return s._n = !0,
    s._c = !0,
    s._d = !0,
    s
}
function Gt(e) {
    const {type: t, vnode: n, proxy: s, withProxy: r, props: i, propsOptions: [o], slots: f, attrs: u, emit: a, render: m, renderCache: w, data: v, setupState: A, ctx: U, inheritAttrs: R} = e;
    let z, Q;
    const k = Ht(e);
    try {
        if (n.shapeFlag & 4) {
            const M = r || s;
            z = pe(m.call(M, M, w, i, A, v, U)),
            Q = u
        } else {
            const M = t;
            z = pe(M.length > 1 ? M(i, {
                attrs: u,
                slots: f,
                emit: a
            }) : M(i, null)),
            Q = t.props ? u : yi(u)
        }
    } catch (M) {
        ft.length = 0,
        Kt(M, e, 1),
        z = Pe(pt)
    }
    let J = z;
    if (Q && R !== !1) {
        const M = Object.keys(Q)
          , {shapeFlag: Ee} = J;
        M.length && Ee & 7 && (o && M.some(xn) && (Q = wi(Q, o)),
        J = Ze(J, Q))
    }
    return n.dirs && (J = Ze(J),
    J.dirs = J.dirs ? J.dirs.concat(n.dirs) : n.dirs),
    n.transition && (J.transition = n.transition),
    z = J,
    Ht(k),
    z
}
const yi = e=>{
    let t;
    for (const n in e)
        (n === "class" || n === "style" || St(n)) && ((t || (t = {}))[n] = e[n]);
    return t
}
  , wi = (e,t)=>{
    const n = {};
    for (const s in e)
        (!xn(s) || !(s.slice(9)in t)) && (n[s] = e[s]);
    return n
}
;
function Ei(e, t, n) {
    const {props: s, children: r, component: i} = e
      , {props: o, children: f, patchFlag: u} = t
      , a = i.emitsOptions;
    if (t.dirs || t.transition)
        return !0;
    if (n && u >= 0) {
        if (u & 1024)
            return !0;
        if (u & 16)
            return s ? ts(s, o, a) : !!o;
        if (u & 8) {
            const m = t.dynamicProps;
            for (let w = 0; w < m.length; w++) {
                const v = m[w];
                if (o[v] !== s[v] && !Wt(a, v))
                    return !0
            }
        }
    } else
        return (r || f) && (!f || !f.$stable) ? !0 : s === o ? !1 : s ? o ? ts(s, o, a) : !0 : !!o;
    return !1
}
function ts(e, t, n) {
    const s = Object.keys(t);
    if (s.length !== Object.keys(e).length)
        return !0;
    for (let r = 0; r < s.length; r++) {
        const i = s[r];
        if (t[i] !== e[i] && !Wt(n, i))
            return !0
    }
    return !1
}
function vi({vnode: e, parent: t}, n) {
    for (; t && t.subTree === e; )
        (e = t.vnode).el = n,
        t = t.parent
}
const Oi = e=>e.__isSuspense;
function Ci(e, t) {
    t && t.pendingBranch ? P(e) ? t.effects.push(...e) : t.effects.push(e) : mi(e)
}
const Pt = {};
function en(e, t, n) {
    return Zs(e, t, n)
}
function Zs(e, t, {immediate: n, deep: s, flush: r, onTrack: i, onTrigger: o}=S) {
    var f;
    const u = Rr() === ((f = X) == null ? void 0 : f.scope) ? X : null;
    let a, m = !1, w = !1;
    if (Z(e) ? (a = ()=>e.value,
    m = Nt(e)) : ke(e) ? (a = ()=>e,
    s = !0) : P(e) ? (w = !0,
    m = e.some(M=>ke(M) || Nt(M)),
    a = ()=>e.map(M=>{
        if (Z(M))
            return M.value;
        if (ke(M))
            return ze(M);
        if (I(M))
            return Te(M, u, 2)
    }
    )) : I(e) ? t ? a = ()=>Te(e, u, 2) : a = ()=>{
        if (!(u && u.isUnmounted))
            return v && v(),
            ue(e, u, 3, [A])
    }
    : a = fe,
    t && s) {
        const M = a;
        a = ()=>ze(M())
    }
    let v, A = M=>{
        v = k.onStop = ()=>{
            Te(M, u, 4)
        }
    }
    , U;
    if (mt)
        if (A = fe,
        t ? n && ue(t, u, 3, [a(), w ? [] : void 0, A]) : a(),
        r === "sync") {
            const M = wo();
            U = M.__watcherHandles || (M.__watcherHandles = [])
        } else
            return fe;
    let R = w ? new Array(e.length).fill(Pt) : Pt;
    const z = ()=>{
        if (k.active)
            if (t) {
                const M = k.run();
                (s || m || (w ? M.some((Ee,nt)=>ut(Ee, R[nt])) : ut(M, R))) && (v && v(),
                ue(t, u, 3, [M, R === Pt ? void 0 : w && R[0] === Pt ? [] : R, A]),
                R = M)
            } else
                k.run()
    }
    ;
    z.allowRecurse = !!t;
    let Q;
    r === "sync" ? Q = z : r === "post" ? Q = ()=>ee(z, u && u.suspense) : (z.pre = !0,
    u && (z.id = u.uid),
    Q = ()=>jn(z));
    const k = new Tn(a,Q);
    t ? n ? z() : R = k.run() : r === "post" ? ee(k.run.bind(k), u && u.suspense) : k.run();
    const J = ()=>{
        k.stop(),
        u && u.scope && yn(u.scope.effects, k)
    }
    ;
    return U && U.push(J),
    J
}
function Ti(e, t, n) {
    const s = this.proxy
      , r = W(e) ? e.includes(".") ? Vs(s, e) : ()=>s[e] : e.bind(s, s);
    let i;
    I(t) ? i = t : (i = t.handler,
    n = t);
    const o = X;
    Ve(this);
    const f = Zs(r, i.bind(s), n);
    return o ? Ve(o) : $e(),
    f
}
function Vs(e, t) {
    const n = t.split(".");
    return ()=>{
        let s = e;
        for (let r = 0; r < n.length && s; r++)
            s = s[n[r]];
        return s
    }
}
function ze(e, t) {
    if (!$(e) || e.__v_skip || (t = t || new Set,
    t.has(e)))
        return e;
    if (t.add(e),
    Z(e))
        ze(e.value, t);
    else if (P(e))
        for (let n = 0; n < e.length; n++)
            ze(e[n], t);
    else if (Es(e) || Qe(e))
        e.forEach(n=>{
            ze(n, t)
        }
        );
    else if (Cs(e))
        for (const n in e)
            ze(e[n], t);
    return e
}
function Ne(e, t, n, s) {
    const r = e.dirs
      , i = t && t.dirs;
    for (let o = 0; o < r.length; o++) {
        const f = r[o];
        i && (f.oldValue = i[o].value);
        let u = f.dir[s];
        u && (et(),
        ue(u, n, 8, [e.el, f, e, t]),
        tt())
    }
}
const It = e=>!!e.type.__asyncLoader
  , Gs = e=>e.type.__isKeepAlive;
function Pi(e, t) {
    er(e, "a", t)
}
function Ai(e, t) {
    er(e, "da", t)
}
function er(e, t, n=X) {
    const s = e.__wdc || (e.__wdc = ()=>{
        let r = n;
        for (; r; ) {
            if (r.isDeactivated)
                return;
            r = r.parent
        }
        return e()
    }
    );
    if (zt(t, s, n),
    n) {
        let r = n.parent;
        for (; r && r.parent; )
            Gs(r.parent.vnode) && Ii(s, t, n, r),
            r = r.parent
    }
}
function Ii(e, t, n, s) {
    const r = zt(t, e, s, !0);
    tr(()=>{
        yn(s[t], r)
    }
    , n)
}
function zt(e, t, n=X, s=!1) {
    if (n) {
        const r = n[e] || (n[e] = [])
          , i = t.__weh || (t.__weh = (...o)=>{
            if (n.isUnmounted)
                return;
            et(),
            Ve(n);
            const f = ue(t, n, e, o);
            return $e(),
            tt(),
            f
        }
        );
        return s ? r.unshift(i) : r.push(i),
        i
    }
}
const we = e=>(t,n=X)=>(!mt || e === "sp") && zt(e, (...s)=>t(...s), n)
  , Mi = we("bm")
  , Fi = we("m")
  , Ri = we("bu")
  , Ni = we("u")
  , ji = we("bum")
  , tr = we("um")
  , Hi = we("sp")
  , Bi = we("rtg")
  , Li = we("rtc");
function Si(e, t=X) {
    zt("ec", e, t)
}
const $i = Symbol.for("v-ndc");
function Di(e, t, n, s) {
    let r;
    const i = n && n[s];
    if (P(e) || W(e)) {
        r = new Array(e.length);
        for (let o = 0, f = e.length; o < f; o++)
            r[o] = t(e[o], o, void 0, i && i[o])
    } else if (typeof e == "number") {
        r = new Array(e);
        for (let o = 0; o < e; o++)
            r[o] = t(o + 1, o, void 0, i && i[o])
    } else if ($(e))
        if (e[Symbol.iterator])
            r = Array.from(e, (o,f)=>t(o, f, void 0, i && i[f]));
        else {
            const o = Object.keys(e);
            r = new Array(o.length);
            for (let f = 0, u = o.length; f < u; f++) {
                const a = o[f];
                r[f] = t(e[a], a, f, i && i[f])
            }
        }
    else
        r = [];
    return n && (n[s] = r),
    r
}
const dn = e=>e ? hr(e) ? $n(e) || e.proxy : dn(e.parent) : null
  , ct = q(Object.create(null), {
    $: e=>e,
    $el: e=>e.vnode.el,
    $data: e=>e.data,
    $props: e=>e.props,
    $attrs: e=>e.attrs,
    $slots: e=>e.slots,
    $refs: e=>e.refs,
    $parent: e=>dn(e.parent),
    $root: e=>dn(e.root),
    $emit: e=>e.emit,
    $options: e=>Hn(e),
    $forceUpdate: e=>e.f || (e.f = ()=>jn(e.update)),
    $nextTick: e=>e.n || (e.n = hi.bind(e.proxy)),
    $watch: e=>Ti.bind(e)
})
  , tn = (e,t)=>e !== S && !e.__isScriptSetup && N(e, t)
  , Ui = {
    get({_: e}, t) {
        const {ctx: n, setupState: s, data: r, props: i, accessCache: o, type: f, appContext: u} = e;
        let a;
        if (t[0] !== "$") {
            const A = o[t];
            if (A !== void 0)
                switch (A) {
                case 1:
                    return s[t];
                case 2:
                    return r[t];
                case 4:
                    return n[t];
                case 3:
                    return i[t]
                }
            else {
                if (tn(s, t))
                    return o[t] = 1,
                    s[t];
                if (r !== S && N(r, t))
                    return o[t] = 2,
                    r[t];
                if ((a = e.propsOptions[0]) && N(a, t))
                    return o[t] = 3,
                    i[t];
                if (n !== S && N(n, t))
                    return o[t] = 4,
                    n[t];
                hn && (o[t] = 0)
            }
        }
        const m = ct[t];
        let w, v;
        if (m)
            return t === "$attrs" && te(e, "get", t),
            m(e);
        if ((w = f.__cssModules) && (w = w[t]))
            return w;
        if (n !== S && N(n, t))
            return o[t] = 4,
            n[t];
        if (v = u.config.globalProperties,
        N(v, t))
            return v[t]
    },
    set({_: e}, t, n) {
        const {data: s, setupState: r, ctx: i} = e;
        return tn(r, t) ? (r[t] = n,
        !0) : s !== S && N(s, t) ? (s[t] = n,
        !0) : N(e.props, t) || t[0] === "$" && t.slice(1)in e ? !1 : (i[t] = n,
        !0)
    },
    has({_: {data: e, setupState: t, accessCache: n, ctx: s, appContext: r, propsOptions: i}}, o) {
        let f;
        return !!n[o] || e !== S && N(e, o) || tn(t, o) || (f = i[0]) && N(f, o) || N(s, o) || N(ct, o) || N(r.config.globalProperties, o)
    },
    defineProperty(e, t, n) {
        return n.get != null ? e._.accessCache[t] = 0 : N(n, "value") && this.set(e, t, n.value, null),
        Reflect.defineProperty(e, t, n)
    }
};
function ns(e) {
    return P(e) ? e.reduce((t,n)=>(t[n] = null,
    t), {}) : e
}
let hn = !0;
function Ki(e) {
    const t = Hn(e)
      , n = e.proxy
      , s = e.ctx;
    hn = !1,
    t.beforeCreate && ss(t.beforeCreate, e, "bc");
    const {data: r, computed: i, methods: o, watch: f, provide: u, inject: a, created: m, beforeMount: w, mounted: v, beforeUpdate: A, updated: U, activated: R, deactivated: z, beforeDestroy: Q, beforeUnmount: k, destroyed: J, unmounted: M, render: Ee, renderTracked: nt, renderTriggered: _t, errorCaptured: Ie, serverPrefetch: kt, expose: Me, inheritAttrs: st, components: bt, directives: xt, filters: Jt} = t;
    if (a && Wi(a, s, null),
    o)
        for (const D in o) {
            const B = o[D];
            I(B) && (s[D] = B.bind(n))
        }
    if (r) {
        const D = r.call(n, n);
        $(D) && (e.data = Mn(D))
    }
    if (hn = !0,
    i)
        for (const D in i) {
            const B = i[D]
              , Fe = I(B) ? B.bind(n, n) : I(B.get) ? B.get.bind(n, n) : fe
              , yt = !I(B) && I(B.set) ? B.set.bind(n) : fe
              , Re = xo({
                get: Fe,
                set: yt
            });
            Object.defineProperty(s, D, {
                enumerable: !0,
                configurable: !0,
                get: ()=>Re.value,
                set: ae=>Re.value = ae
            })
        }
    if (f)
        for (const D in f)
            nr(f[D], s, n, D);
    if (u) {
        const D = I(u) ? u.call(n) : u;
        Reflect.ownKeys(D).forEach(B=>{
            Yi(B, D[B])
        }
        )
    }
    m && ss(m, e, "c");
    function V(D, B) {
        P(B) ? B.forEach(Fe=>D(Fe.bind(n))) : B && D(B.bind(n))
    }
    if (V(Mi, w),
    V(Fi, v),
    V(Ri, A),
    V(Ni, U),
    V(Pi, R),
    V(Ai, z),
    V(Si, Ie),
    V(Li, nt),
    V(Bi, _t),
    V(ji, k),
    V(tr, M),
    V(Hi, kt),
    P(Me))
        if (Me.length) {
            const D = e.exposed || (e.exposed = {});
            Me.forEach(B=>{
                Object.defineProperty(D, B, {
                    get: ()=>n[B],
                    set: Fe=>n[B] = Fe
                })
            }
            )
        } else
            e.exposed || (e.exposed = {});
    Ee && e.render === fe && (e.render = Ee),
    st != null && (e.inheritAttrs = st),
    bt && (e.components = bt),
    xt && (e.directives = xt)
}
function Wi(e, t, n=fe) {
    P(e) && (e = pn(e));
    for (const s in e) {
        const r = e[s];
        let i;
        $(r) ? "default"in r ? i = Mt(r.from || s, r.default, !0) : i = Mt(r.from || s) : i = Mt(r),
        Z(i) ? Object.defineProperty(t, s, {
            enumerable: !0,
            configurable: !0,
            get: ()=>i.value,
            set: o=>i.value = o
        }) : t[s] = i
    }
}
function ss(e, t, n) {
    ue(P(e) ? e.map(s=>s.bind(t.proxy)) : e.bind(t.proxy), t, n)
}
function nr(e, t, n, s) {
    const r = s.includes(".") ? Vs(n, s) : ()=>n[s];
    if (W(e)) {
        const i = t[e];
        I(i) && en(r, i)
    } else if (I(e))
        en(r, e.bind(n));
    else if ($(e))
        if (P(e))
            e.forEach(i=>nr(i, t, n, s));
        else {
            const i = I(e.handler) ? e.handler.bind(n) : t[e.handler];
            I(i) && en(r, i, e)
        }
}
function Hn(e) {
    const t = e.type
      , {mixins: n, extends: s} = t
      , {mixins: r, optionsCache: i, config: {optionMergeStrategies: o}} = e.appContext
      , f = i.get(t);
    let u;
    return f ? u = f : !r.length && !n && !s ? u = t : (u = {},
    r.length && r.forEach(a=>Bt(u, a, o, !0)),
    Bt(u, t, o)),
    $(t) && i.set(t, u),
    u
}
function Bt(e, t, n, s=!1) {
    const {mixins: r, extends: i} = t;
    i && Bt(e, i, n, !0),
    r && r.forEach(o=>Bt(e, o, n, !0));
    for (const o in t)
        if (!(s && o === "expose")) {
            const f = zi[o] || n && n[o];
            e[o] = f ? f(e[o], t[o]) : t[o]
        }
    return e
}
const zi = {
    data: rs,
    props: is,
    emits: is,
    methods: lt,
    computed: lt,
    beforeCreate: G,
    created: G,
    beforeMount: G,
    mounted: G,
    beforeUpdate: G,
    updated: G,
    beforeDestroy: G,
    beforeUnmount: G,
    destroyed: G,
    unmounted: G,
    activated: G,
    deactivated: G,
    errorCaptured: G,
    serverPrefetch: G,
    components: lt,
    directives: lt,
    watch: Qi,
    provide: rs,
    inject: qi
};
function rs(e, t) {
    return t ? e ? function() {
        return q(I(e) ? e.call(this, this) : e, I(t) ? t.call(this, this) : t)
    }
    : t : e
}
function qi(e, t) {
    return lt(pn(e), pn(t))
}
function pn(e) {
    if (P(e)) {
        const t = {};
        for (let n = 0; n < e.length; n++)
            t[e[n]] = e[n];
        return t
    }
    return e
}
function G(e, t) {
    return e ? [...new Set([].concat(e, t))] : t
}
function lt(e, t) {
    return e ? q(Object.create(null), e, t) : t
}
function is(e, t) {
    return e ? P(e) && P(t) ? [...new Set([...e, ...t])] : q(Object.create(null), ns(e), ns(t ?? {})) : t
}
function Qi(e, t) {
    if (!e)
        return t;
    if (!t)
        return e;
    const n = q(Object.create(null), e);
    for (const s in t)
        n[s] = G(e[s], t[s]);
    return n
}
function sr() {
    return {
        app: null,
        config: {
            isNativeTag: _r,
            performance: !1,
            globalProperties: {},
            optionMergeStrategies: {},
            errorHandler: void 0,
            warnHandler: void 0,
            compilerOptions: {}
        },
        mixins: [],
        components: {},
        directives: {},
        provides: Object.create(null),
        optionsCache: new WeakMap,
        propsCache: new WeakMap,
        emitsCache: new WeakMap
    }
}
let ki = 0;
function Ji(e, t) {
    return function(s, r=null) {
        I(s) || (s = q({}, s)),
        r != null && !$(r) && (r = null);
        const i = sr()
          , o = new Set;
        let f = !1;
        const u = i.app = {
            _uid: ki++,
            _component: s,
            _props: r,
            _container: null,
            _context: i,
            _instance: null,
            version: Eo,
            get config() {
                return i.config
            },
            set config(a) {},
            use(a, ...m) {
                return o.has(a) || (a && I(a.install) ? (o.add(a),
                a.install(u, ...m)) : I(a) && (o.add(a),
                a(u, ...m))),
                u
            },
            mixin(a) {
                return i.mixins.includes(a) || i.mixins.push(a),
                u
            },
            component(a, m) {
                return m ? (i.components[a] = m,
                u) : i.components[a]
            },
            directive(a, m) {
                return m ? (i.directives[a] = m,
                u) : i.directives[a]
            },
            mount(a, m, w) {
                if (!f) {
                    const v = Pe(s, r);
                    return v.appContext = i,
                    m && t ? t(v, a) : e(v, a, w),
                    f = !0,
                    u._container = a,
                    a.__vue_app__ = u,
                    $n(v.component) || v.component.proxy
                }
            },
            unmount() {
                f && (e(null, u._container),
                delete u._container.__vue_app__)
            },
            provide(a, m) {
                return i.provides[a] = m,
                u
            },
            runWithContext(a) {
                Lt = u;
                try {
                    return a()
                } finally {
                    Lt = null
                }
            }
        };
        return u
    }
}
let Lt = null;
function Yi(e, t) {
    if (X) {
        let n = X.provides;
        const s = X.parent && X.parent.provides;
        s === n && (n = X.provides = Object.create(s)),
        n[e] = t
    }
}
function Mt(e, t, n=!1) {
    const s = X || me;
    if (s || Lt) {
        const r = s ? s.parent == null ? s.vnode.appContext && s.vnode.appContext.provides : s.parent.provides : Lt._context.provides;
        if (r && e in r)
            return r[e];
        if (arguments.length > 1)
            return n && I(t) ? t.call(s && s.proxy) : t
    }
}
function Xi(e, t, n, s=!1) {
    const r = {}
      , i = {};
    Rt(i, Qt, 1),
    e.propsDefaults = Object.create(null),
    rr(e, t, r, i);
    for (const o in e.propsOptions[0])
        o in r || (r[o] = void 0);
    n ? e.props = s ? r : ii(r) : e.type.props ? e.props = r : e.props = i,
    e.attrs = i
}
function Zi(e, t, n, s) {
    const {props: r, attrs: i, vnode: {patchFlag: o}} = e
      , f = j(r)
      , [u] = e.propsOptions;
    let a = !1;
    if ((s || o > 0) && !(o & 16)) {
        if (o & 8) {
            const m = e.vnode.dynamicProps;
            for (let w = 0; w < m.length; w++) {
                let v = m[w];
                if (Wt(e.emitsOptions, v))
                    continue;
                const A = t[v];
                if (u)
                    if (N(i, v))
                        A !== i[v] && (i[v] = A,
                        a = !0);
                    else {
                        const U = Ye(v);
                        r[U] = gn(u, f, U, A, e, !1)
                    }
                else
                    A !== i[v] && (i[v] = A,
                    a = !0)
            }
        }
    } else {
        rr(e, t, r, i) && (a = !0);
        let m;
        for (const w in f)
            (!t || !N(t, w) && ((m = Ge(w)) === w || !N(t, m))) && (u ? n && (n[w] !== void 0 || n[m] !== void 0) && (r[w] = gn(u, f, w, void 0, e, !0)) : delete r[w]);
        if (i !== f)
            for (const w in i)
                (!t || !N(t, w)) && (delete i[w],
                a = !0)
    }
    a && ye(e, "set", "$attrs")
}
function rr(e, t, n, s) {
    const [r,i] = e.propsOptions;
    let o = !1, f;
    if (t)
        for (let u in t) {
            if (At(u))
                continue;
            const a = t[u];
            let m;
            r && N(r, m = Ye(u)) ? !i || !i.includes(m) ? n[m] = a : (f || (f = {}))[m] = a : Wt(e.emitsOptions, u) || (!(u in s) || a !== s[u]) && (s[u] = a,
            o = !0)
        }
    if (i) {
        const u = j(n)
          , a = f || S;
        for (let m = 0; m < i.length; m++) {
            const w = i[m];
            n[w] = gn(r, u, w, a[w], e, !N(a, w))
        }
    }
    return o
}
function gn(e, t, n, s, r, i) {
    const o = e[n];
    if (o != null) {
        const f = N(o, "default");
        if (f && s === void 0) {
            const u = o.default;
            if (o.type !== Function && !o.skipFactory && I(u)) {
                const {propsDefaults: a} = r;
                n in a ? s = a[n] : (Ve(r),
                s = a[n] = u.call(null, t),
                $e())
            } else
                s = u
        }
        o[0] && (i && !f ? s = !1 : o[1] && (s === "" || s === Ge(n)) && (s = !0))
    }
    return s
}
function ir(e, t, n=!1) {
    const s = t.propsCache
      , r = s.get(e);
    if (r)
        return r;
    const i = e.props
      , o = {}
      , f = [];
    let u = !1;
    if (!I(e)) {
        const m = w=>{
            u = !0;
            const [v,A] = ir(w, t, !0);
            q(o, v),
            A && f.push(...A)
        }
        ;
        !n && t.mixins.length && t.mixins.forEach(m),
        e.extends && m(e.extends),
        e.mixins && e.mixins.forEach(m)
    }
    if (!i && !u)
        return $(e) && s.set(e, qe),
        qe;
    if (P(i))
        for (let m = 0; m < i.length; m++) {
            const w = Ye(i[m]);
            os(w) && (o[w] = S)
        }
    else if (i)
        for (const m in i) {
            const w = Ye(m);
            if (os(w)) {
                const v = i[m]
                  , A = o[w] = P(v) || I(v) ? {
                    type: v
                } : q({}, v);
                if (A) {
                    const U = fs(Boolean, A.type)
                      , R = fs(String, A.type);
                    A[0] = U > -1,
                    A[1] = R < 0 || U < R,
                    (U > -1 || N(A, "default")) && f.push(w)
                }
            }
        }
    const a = [o, f];
    return $(e) && s.set(e, a),
    a
}
function os(e) {
    return e[0] !== "$"
}
function ls(e) {
    const t = e && e.toString().match(/^\s*(function|class) (\w+)/);
    return t ? t[2] : e === null ? "null" : ""
}
function cs(e, t) {
    return ls(e) === ls(t)
}
function fs(e, t) {
    return P(t) ? t.findIndex(n=>cs(n, e)) : I(t) && cs(t, e) ? 0 : -1
}
const or = e=>e[0] === "_" || e === "$stable"
  , Bn = e=>P(e) ? e.map(pe) : [pe(e)]
  , Vi = (e,t,n)=>{
    if (t._n)
        return t;
    const s = xi((...r)=>Bn(t(...r)), n);
    return s._c = !1,
    s
}
  , lr = (e,t,n)=>{
    const s = e._ctx;
    for (const r in e) {
        if (or(r))
            continue;
        const i = e[r];
        if (I(i))
            t[r] = Vi(r, i, s);
        else if (i != null) {
            const o = Bn(i);
            t[r] = ()=>o
        }
    }
}
  , cr = (e,t)=>{
    const n = Bn(t);
    e.slots.default = ()=>n
}
  , Gi = (e,t)=>{
    if (e.vnode.shapeFlag & 32) {
        const n = t._;
        n ? (e.slots = j(t),
        Rt(t, "_", n)) : lr(t, e.slots = {})
    } else
        e.slots = {},
        t && cr(e, t);
    Rt(e.slots, Qt, 1)
}
  , eo = (e,t,n)=>{
    const {vnode: s, slots: r} = e;
    let i = !0
      , o = S;
    if (s.shapeFlag & 32) {
        const f = t._;
        f ? n && f === 1 ? i = !1 : (q(r, t),
        !n && f === 1 && delete r._) : (i = !t.$stable,
        lr(t, r)),
        o = t
    } else
        t && (cr(e, t),
        o = {
            default: 1
        });
    if (i)
        for (const f in r)
            !or(f) && !(f in o) && delete r[f]
}
;
function mn(e, t, n, s, r=!1) {
    if (P(e)) {
        e.forEach((v,A)=>mn(v, t && (P(t) ? t[A] : t), n, s, r));
        return
    }
    if (It(s) && !r)
        return;
    const i = s.shapeFlag & 4 ? $n(s.component) || s.component.proxy : s.el
      , o = r ? null : i
      , {i: f, r: u} = e
      , a = t && t.r
      , m = f.refs === S ? f.refs = {} : f.refs
      , w = f.setupState;
    if (a != null && a !== u && (W(a) ? (m[a] = null,
    N(w, a) && (w[a] = null)) : Z(a) && (a.value = null)),
    I(u))
        Te(u, f, 12, [o, m]);
    else {
        const v = W(u)
          , A = Z(u);
        if (v || A) {
            const U = ()=>{
                if (e.f) {
                    const R = v ? N(w, u) ? w[u] : m[u] : u.value;
                    r ? P(R) && yn(R, i) : P(R) ? R.includes(i) || R.push(i) : v ? (m[u] = [i],
                    N(w, u) && (w[u] = m[u])) : (u.value = [i],
                    e.k && (m[e.k] = u.value))
                } else
                    v ? (m[u] = o,
                    N(w, u) && (w[u] = o)) : A && (u.value = o,
                    e.k && (m[e.k] = o))
            }
            ;
            o ? (U.id = -1,
            ee(U, n)) : U()
        }
    }
}
const ee = Ci;
function to(e) {
    return no(e)
}
function no(e, t) {
    const n = on();
    n.__VUE__ = !0;
    const {insert: s, remove: r, patchProp: i, createElement: o, createText: f, createComment: u, setText: a, setElementText: m, parentNode: w, nextSibling: v, setScopeId: A=fe, insertStaticContent: U} = e
      , R = (l,c,d,p=null,h=null,b=null,y=!1,_=null,x=!!c.dynamicChildren)=>{
        if (l === c)
            return;
        l && !it(l, c) && (p = wt(l),
        ae(l, h, b, !0),
        l = null),
        c.patchFlag === -2 && (x = !1,
        c.dynamicChildren = null);
        const {type: g, ref: O, shapeFlag: E} = c;
        switch (g) {
        case qt:
            z(l, c, d, p);
            break;
        case pt:
            Q(l, c, d, p);
            break;
        case nn:
            l == null && k(c, d, p, y);
            break;
        case oe:
            bt(l, c, d, p, h, b, y, _, x);
            break;
        default:
            E & 1 ? Ee(l, c, d, p, h, b, y, _, x) : E & 6 ? xt(l, c, d, p, h, b, y, _, x) : (E & 64 || E & 128) && g.process(l, c, d, p, h, b, y, _, x, De)
        }
        O != null && h && mn(O, l && l.ref, b, c || l, !c)
    }
      , z = (l,c,d,p)=>{
        if (l == null)
            s(c.el = f(c.children), d, p);
        else {
            const h = c.el = l.el;
            c.children !== l.children && a(h, c.children)
        }
    }
      , Q = (l,c,d,p)=>{
        l == null ? s(c.el = u(c.children || ""), d, p) : c.el = l.el
    }
      , k = (l,c,d,p)=>{
        [l.el,l.anchor] = U(l.children, c, d, p, l.el, l.anchor)
    }
      , J = ({el: l, anchor: c},d,p)=>{
        let h;
        for (; l && l !== c; )
            h = v(l),
            s(l, d, p),
            l = h;
        s(c, d, p)
    }
      , M = ({el: l, anchor: c})=>{
        let d;
        for (; l && l !== c; )
            d = v(l),
            r(l),
            l = d;
        r(c)
    }
      , Ee = (l,c,d,p,h,b,y,_,x)=>{
        y = y || c.type === "svg",
        l == null ? nt(c, d, p, h, b, y, _, x) : kt(l, c, h, b, y, _, x)
    }
      , nt = (l,c,d,p,h,b,y,_)=>{
        let x, g;
        const {type: O, props: E, shapeFlag: C, transition: T, dirs: F} = l;
        if (x = l.el = o(l.type, b, E && E.is, E),
        C & 8 ? m(x, l.children) : C & 16 && Ie(l.children, x, null, p, h, b && O !== "foreignObject", y, _),
        F && Ne(l, null, p, "created"),
        _t(x, l, l.scopeId, y, p),
        E) {
            for (const H in E)
                H !== "value" && !At(H) && i(x, H, null, E[H], b, l.children, p, h, _e);
            "value"in E && i(x, "value", null, E.value),
            (g = E.onVnodeBeforeMount) && he(g, p, l)
        }
        F && Ne(l, null, p, "beforeMount");
        const L = (!h || h && !h.pendingBranch) && T && !T.persisted;
        L && T.beforeEnter(x),
        s(x, c, d),
        ((g = E && E.onVnodeMounted) || L || F) && ee(()=>{
            g && he(g, p, l),
            L && T.enter(x),
            F && Ne(l, null, p, "mounted")
        }
        , h)
    }
      , _t = (l,c,d,p,h)=>{
        if (d && A(l, d),
        p)
            for (let b = 0; b < p.length; b++)
                A(l, p[b]);
        if (h) {
            let b = h.subTree;
            if (c === b) {
                const y = h.vnode;
                _t(l, y, y.scopeId, y.slotScopeIds, h.parent)
            }
        }
    }
      , Ie = (l,c,d,p,h,b,y,_,x=0)=>{
        for (let g = x; g < l.length; g++) {
            const O = l[g] = _ ? Oe(l[g]) : pe(l[g]);
            R(null, O, c, d, p, h, b, y, _)
        }
    }
      , kt = (l,c,d,p,h,b,y)=>{
        const _ = c.el = l.el;
        let {patchFlag: x, dynamicChildren: g, dirs: O} = c;
        x |= l.patchFlag & 16;
        const E = l.props || S
          , C = c.props || S;
        let T;
        d && je(d, !1),
        (T = C.onVnodeBeforeUpdate) && he(T, d, c, l),
        O && Ne(c, l, d, "beforeUpdate"),
        d && je(d, !0);
        const F = h && c.type !== "foreignObject";
        if (g ? Me(l.dynamicChildren, g, _, d, p, F, b) : y || B(l, c, _, null, d, p, F, b, !1),
        x > 0) {
            if (x & 16)
                st(_, c, E, C, d, p, h);
            else if (x & 2 && E.class !== C.class && i(_, "class", null, C.class, h),
            x & 4 && i(_, "style", E.style, C.style, h),
            x & 8) {
                const L = c.dynamicProps;
                for (let H = 0; H < L.length; H++) {
                    const K = L[H]
                      , re = E[K]
                      , Ue = C[K];
                    (Ue !== re || K === "value") && i(_, K, re, Ue, h, l.children, d, p, _e)
                }
            }
            x & 1 && l.children !== c.children && m(_, c.children)
        } else
            !y && g == null && st(_, c, E, C, d, p, h);
        ((T = C.onVnodeUpdated) || O) && ee(()=>{
            T && he(T, d, c, l),
            O && Ne(c, l, d, "updated")
        }
        , p)
    }
      , Me = (l,c,d,p,h,b,y)=>{
        for (let _ = 0; _ < c.length; _++) {
            const x = l[_]
              , g = c[_]
              , O = x.el && (x.type === oe || !it(x, g) || x.shapeFlag & 70) ? w(x.el) : d;
            R(x, g, O, null, p, h, b, y, !0)
        }
    }
      , st = (l,c,d,p,h,b,y)=>{
        if (d !== p) {
            if (d !== S)
                for (const _ in d)
                    !At(_) && !(_ in p) && i(l, _, d[_], null, y, c.children, h, b, _e);
            for (const _ in p) {
                if (At(_))
                    continue;
                const x = p[_]
                  , g = d[_];
                x !== g && _ !== "value" && i(l, _, g, x, y, c.children, h, b, _e)
            }
            "value"in p && i(l, "value", d.value, p.value)
        }
    }
      , bt = (l,c,d,p,h,b,y,_,x)=>{
        const g = c.el = l ? l.el : f("")
          , O = c.anchor = l ? l.anchor : f("");
        let {patchFlag: E, dynamicChildren: C, slotScopeIds: T} = c;
        T && (_ = _ ? _.concat(T) : T),
        l == null ? (s(g, d, p),
        s(O, d, p),
        Ie(c.children, d, O, h, b, y, _, x)) : E > 0 && E & 64 && C && l.dynamicChildren ? (Me(l.dynamicChildren, C, d, h, b, y, _),
        (c.key != null || h && c === h.subTree) && fr(l, c, !0)) : B(l, c, d, O, h, b, y, _, x)
    }
      , xt = (l,c,d,p,h,b,y,_,x)=>{
        c.slotScopeIds = _,
        l == null ? c.shapeFlag & 512 ? h.ctx.activate(c, d, p, y, x) : Jt(c, d, p, h, b, y, x) : Dn(l, c, x)
    }
      , Jt = (l,c,d,p,h,b,y)=>{
        const _ = l.component = ho(l, p, h);
        if (Gs(l) && (_.ctx.renderer = De),
        po(_),
        _.asyncDep) {
            if (h && h.registerDep(_, V),
            !l.el) {
                const x = _.subTree = Pe(pt);
                Q(null, x, c, d)
            }
            return
        }
        V(_, l, c, d, h, b, y)
    }
      , Dn = (l,c,d)=>{
        const p = c.component = l.component;
        if (Ei(l, c, d))
            if (p.asyncDep && !p.asyncResolved) {
                D(p, c, d);
                return
            } else
                p.next = c,
                gi(p.update),
                p.update();
        else
            c.el = l.el,
            p.vnode = c
    }
      , V = (l,c,d,p,h,b,y)=>{
        const _ = ()=>{
            if (l.isMounted) {
                let {next: O, bu: E, u: C, parent: T, vnode: F} = l, L = O, H;
                je(l, !1),
                O ? (O.el = F.el,
                D(l, O, y)) : O = F,
                E && Vt(E),
                (H = O.props && O.props.onVnodeBeforeUpdate) && he(H, T, O, F),
                je(l, !0);
                const K = Gt(l)
                  , re = l.subTree;
                l.subTree = K,
                R(re, K, w(re.el), wt(re), l, h, b),
                O.el = K.el,
                L === null && vi(l, K.el),
                C && ee(C, h),
                (H = O.props && O.props.onVnodeUpdated) && ee(()=>he(H, T, O, F), h)
            } else {
                let O;
                const {el: E, props: C} = c
                  , {bm: T, m: F, parent: L} = l
                  , H = It(c);
                if (je(l, !1),
                T && Vt(T),
                !H && (O = C && C.onVnodeBeforeMount) && he(O, L, c),
                je(l, !0),
                E && Xt) {
                    const K = ()=>{
                        l.subTree = Gt(l),
                        Xt(E, l.subTree, l, h, null)
                    }
                    ;
                    H ? c.type.__asyncLoader().then(()=>!l.isUnmounted && K()) : K()
                } else {
                    const K = l.subTree = Gt(l);
                    R(null, K, d, p, l, h, b),
                    c.el = K.el
                }
                if (F && ee(F, h),
                !H && (O = C && C.onVnodeMounted)) {
                    const K = c;
                    ee(()=>he(O, L, K), h)
                }
                (c.shapeFlag & 256 || L && It(L.vnode) && L.vnode.shapeFlag & 256) && l.a && ee(l.a, h),
                l.isMounted = !0,
                c = d = p = null
            }
        }
          , x = l.effect = new Tn(_,()=>jn(g),l.scope)
          , g = l.update = ()=>x.run();
        g.id = l.uid,
        je(l, !0),
        g()
    }
      , D = (l,c,d)=>{
        c.component = l;
        const p = l.vnode.props;
        l.vnode = c,
        l.next = null,
        Zi(l, c.props, p, d),
        eo(l, c.children, d),
        et(),
        es(),
        tt()
    }
      , B = (l,c,d,p,h,b,y,_,x=!1)=>{
        const g = l && l.children
          , O = l ? l.shapeFlag : 0
          , E = c.children
          , {patchFlag: C, shapeFlag: T} = c;
        if (C > 0) {
            if (C & 128) {
                yt(g, E, d, p, h, b, y, _, x);
                return
            } else if (C & 256) {
                Fe(g, E, d, p, h, b, y, _, x);
                return
            }
        }
        T & 8 ? (O & 16 && _e(g, h, b),
        E !== g && m(d, E)) : O & 16 ? T & 16 ? yt(g, E, d, p, h, b, y, _, x) : _e(g, h, b, !0) : (O & 8 && m(d, ""),
        T & 16 && Ie(E, d, p, h, b, y, _, x))
    }
      , Fe = (l,c,d,p,h,b,y,_,x)=>{
        l = l || qe,
        c = c || qe;
        const g = l.length
          , O = c.length
          , E = Math.min(g, O);
        let C;
        for (C = 0; C < E; C++) {
            const T = c[C] = x ? Oe(c[C]) : pe(c[C]);
            R(l[C], T, d, null, h, b, y, _, x)
        }
        g > O ? _e(l, h, b, !0, !1, E) : Ie(c, d, p, h, b, y, _, x, E)
    }
      , yt = (l,c,d,p,h,b,y,_,x)=>{
        let g = 0;
        const O = c.length;
        let E = l.length - 1
          , C = O - 1;
        for (; g <= E && g <= C; ) {
            const T = l[g]
              , F = c[g] = x ? Oe(c[g]) : pe(c[g]);
            if (it(T, F))
                R(T, F, d, null, h, b, y, _, x);
            else
                break;
            g++
        }
        for (; g <= E && g <= C; ) {
            const T = l[E]
              , F = c[C] = x ? Oe(c[C]) : pe(c[C]);
            if (it(T, F))
                R(T, F, d, null, h, b, y, _, x);
            else
                break;
            E--,
            C--
        }
        if (g > E) {
            if (g <= C) {
                const T = C + 1
                  , F = T < O ? c[T].el : p;
                for (; g <= C; )
                    R(null, c[g] = x ? Oe(c[g]) : pe(c[g]), d, F, h, b, y, _, x),
                    g++
            }
        } else if (g > C)
            for (; g <= E; )
                ae(l[g], h, b, !0),
                g++;
        else {
            const T = g
              , F = g
              , L = new Map;
            for (g = F; g <= C; g++) {
                const ne = c[g] = x ? Oe(c[g]) : pe(c[g]);
                ne.key != null && L.set(ne.key, g)
            }
            let H, K = 0;
            const re = C - F + 1;
            let Ue = !1
              , Wn = 0;
            const rt = new Array(re);
            for (g = 0; g < re; g++)
                rt[g] = 0;
            for (g = T; g <= E; g++) {
                const ne = l[g];
                if (K >= re) {
                    ae(ne, h, b, !0);
                    continue
                }
                let de;
                if (ne.key != null)
                    de = L.get(ne.key);
                else
                    for (H = F; H <= C; H++)
                        if (rt[H - F] === 0 && it(ne, c[H])) {
                            de = H;
                            break
                        }
                de === void 0 ? ae(ne, h, b, !0) : (rt[de - F] = g + 1,
                de >= Wn ? Wn = de : Ue = !0,
                R(ne, c[de], d, null, h, b, y, _, x),
                K++)
            }
            const zn = Ue ? so(rt) : qe;
            for (H = zn.length - 1,
            g = re - 1; g >= 0; g--) {
                const ne = F + g
                  , de = c[ne]
                  , qn = ne + 1 < O ? c[ne + 1].el : p;
                rt[g] === 0 ? R(null, de, d, qn, h, b, y, _, x) : Ue && (H < 0 || g !== zn[H] ? Re(de, d, qn, 2) : H--)
            }
        }
    }
      , Re = (l,c,d,p,h=null)=>{
        const {el: b, type: y, transition: _, children: x, shapeFlag: g} = l;
        if (g & 6) {
            Re(l.component.subTree, c, d, p);
            return
        }
        if (g & 128) {
            l.suspense.move(c, d, p);
            return
        }
        if (g & 64) {
            y.move(l, c, d, De);
            return
        }
        if (y === oe) {
            s(b, c, d);
            for (let E = 0; E < x.length; E++)
                Re(x[E], c, d, p);
            s(l.anchor, c, d);
            return
        }
        if (y === nn) {
            J(l, c, d);
            return
        }
        if (p !== 2 && g & 1 && _)
            if (p === 0)
                _.beforeEnter(b),
                s(b, c, d),
                ee(()=>_.enter(b), h);
            else {
                const {leave: E, delayLeave: C, afterLeave: T} = _
                  , F = ()=>s(b, c, d)
                  , L = ()=>{
                    E(b, ()=>{
                        F(),
                        T && T()
                    }
                    )
                }
                ;
                C ? C(b, F, L) : L()
            }
        else
            s(b, c, d)
    }
      , ae = (l,c,d,p=!1,h=!1)=>{
        const {type: b, props: y, ref: _, children: x, dynamicChildren: g, shapeFlag: O, patchFlag: E, dirs: C} = l;
        if (_ != null && mn(_, null, d, l, !0),
        O & 256) {
            c.ctx.deactivate(l);
            return
        }
        const T = O & 1 && C
          , F = !It(l);
        let L;
        if (F && (L = y && y.onVnodeBeforeUnmount) && he(L, c, l),
        O & 6)
            mr(l.component, d, p);
        else {
            if (O & 128) {
                l.suspense.unmount(d, p);
                return
            }
            T && Ne(l, null, c, "beforeUnmount"),
            O & 64 ? l.type.remove(l, c, d, h, De, p) : g && (b !== oe || E > 0 && E & 64) ? _e(g, c, d, !1, !0) : (b === oe && E & 384 || !h && O & 16) && _e(x, c, d),
            p && Un(l)
        }
        (F && (L = y && y.onVnodeUnmounted) || T) && ee(()=>{
            L && he(L, c, l),
            T && Ne(l, null, c, "unmounted")
        }
        , d)
    }
      , Un = l=>{
        const {type: c, el: d, anchor: p, transition: h} = l;
        if (c === oe) {
            gr(d, p);
            return
        }
        if (c === nn) {
            M(l);
            return
        }
        const b = ()=>{
            r(d),
            h && !h.persisted && h.afterLeave && h.afterLeave()
        }
        ;
        if (l.shapeFlag & 1 && h && !h.persisted) {
            const {leave: y, delayLeave: _} = h
              , x = ()=>y(d, b);
            _ ? _(l.el, b, x) : x()
        } else
            b()
    }
      , gr = (l,c)=>{
        let d;
        for (; l !== c; )
            d = v(l),
            r(l),
            l = d;
        r(c)
    }
      , mr = (l,c,d)=>{
        const {bum: p, scope: h, update: b, subTree: y, um: _} = l;
        p && Vt(p),
        h.stop(),
        b && (b.active = !1,
        ae(y, l, c, d)),
        _ && ee(_, c),
        ee(()=>{
            l.isUnmounted = !0
        }
        , c),
        c && c.pendingBranch && !c.isUnmounted && l.asyncDep && !l.asyncResolved && l.suspenseId === c.pendingId && (c.deps--,
        c.deps === 0 && c.resolve())
    }
      , _e = (l,c,d,p=!1,h=!1,b=0)=>{
        for (let y = b; y < l.length; y++)
            ae(l[y], c, d, p, h)
    }
      , wt = l=>l.shapeFlag & 6 ? wt(l.component.subTree) : l.shapeFlag & 128 ? l.suspense.next() : v(l.anchor || l.el)
      , Kn = (l,c,d)=>{
        l == null ? c._vnode && ae(c._vnode, null, null, !0) : R(c._vnode || null, l, c, null, null, null, d),
        es(),
        ks(),
        c._vnode = l
    }
      , De = {
        p: R,
        um: ae,
        m: Re,
        r: Un,
        mt: Jt,
        mc: Ie,
        pc: B,
        pbc: Me,
        n: wt,
        o: e
    };
    let Yt, Xt;
    return t && ([Yt,Xt] = t(De)),
    {
        render: Kn,
        hydrate: Yt,
        createApp: Ji(Kn, Yt)
    }
}
function je({effect: e, update: t}, n) {
    e.allowRecurse = t.allowRecurse = n
}
function fr(e, t, n=!1) {
    const s = e.children
      , r = t.children;
    if (P(s) && P(r))
        for (let i = 0; i < s.length; i++) {
            const o = s[i];
            let f = r[i];
            f.shapeFlag & 1 && !f.dynamicChildren && ((f.patchFlag <= 0 || f.patchFlag === 32) && (f = r[i] = Oe(r[i]),
            f.el = o.el),
            n || fr(o, f)),
            f.type === qt && (f.el = o.el)
        }
}
function so(e) {
    const t = e.slice()
      , n = [0];
    let s, r, i, o, f;
    const u = e.length;
    for (s = 0; s < u; s++) {
        const a = e[s];
        if (a !== 0) {
            if (r = n[n.length - 1],
            e[r] < a) {
                t[s] = r,
                n.push(s);
                continue
            }
            for (i = 0,
            o = n.length - 1; i < o; )
                f = i + o >> 1,
                e[n[f]] < a ? i = f + 1 : o = f;
            a < e[n[i]] && (i > 0 && (t[s] = n[i - 1]),
            n[i] = s)
        }
    }
    for (i = n.length,
    o = n[i - 1]; i-- > 0; )
        n[i] = o,
        o = t[o];
    return n
}
const ro = e=>e.__isTeleport
  , oe = Symbol.for("v-fgt")
  , qt = Symbol.for("v-txt")
  , pt = Symbol.for("v-cmt")
  , nn = Symbol.for("v-stc")
  , ft = [];
let ce = null;
function xe(e=!1) {
    ft.push(ce = e ? null : [])
}
function io() {
    ft.pop(),
    ce = ft[ft.length - 1] || null
}
let gt = 1;
function us(e) {
    gt += e
}
function ur(e) {
    return e.dynamicChildren = gt > 0 ? ce || qe : null,
    io(),
    gt > 0 && ce && ce.push(e),
    e
}
function Be(e, t, n, s, r, i) {
    return ur(se(e, t, n, s, r, i, !0))
}
function as(e, t, n, s, r) {
    return ur(Pe(e, t, n, s, r, !0))
}
function oo(e) {
    return e ? e.__v_isVNode === !0 : !1
}
function it(e, t) {
    return e.type === t.type && e.key === t.key
}
const Qt = "__vInternal"
  , ar = ({key: e})=>e ?? null
  , Ft = ({ref: e, ref_key: t, ref_for: n})=>(typeof e == "number" && (e = "" + e),
e != null ? W(e) || Z(e) || I(e) ? {
    i: me,
    r: e,
    k: t,
    f: !!n
} : e : null);
function se(e, t=null, n=null, s=0, r=null, i=e === oe ? 0 : 1, o=!1, f=!1) {
    const u = {
        __v_isVNode: !0,
        __v_skip: !0,
        type: e,
        props: t,
        key: t && ar(t),
        ref: t && Ft(t),
        scopeId: Xs,
        slotScopeIds: null,
        children: n,
        component: null,
        suspense: null,
        ssContent: null,
        ssFallback: null,
        dirs: null,
        transition: null,
        el: null,
        anchor: null,
        target: null,
        targetAnchor: null,
        staticCount: 0,
        shapeFlag: i,
        patchFlag: s,
        dynamicProps: r,
        dynamicChildren: null,
        appContext: null,
        ctx: me
    };
    return f ? (Ln(u, n),
    i & 128 && e.normalize(u)) : n && (u.shapeFlag |= W(n) ? 8 : 16),
    gt > 0 && !o && ce && (u.patchFlag > 0 || i & 6) && u.patchFlag !== 32 && ce.push(u),
    u
}
const Pe = lo;
function lo(e, t=null, n=null, s=0, r=null, i=!1) {
    if ((!e || e === $i) && (e = pt),
    oo(e)) {
        const f = Ze(e, t, !0);
        return n && Ln(f, n),
        gt > 0 && !i && ce && (f.shapeFlag & 6 ? ce[ce.indexOf(e)] = f : ce.push(f)),
        f.patchFlag |= -2,
        f
    }
    if (bo(e) && (e = e.__vccOpts),
    t) {
        t = co(t);
        let {class: f, style: u} = t;
        f && !W(f) && (t.class = On(f)),
        $(u) && (Ds(u) && !P(u) && (u = q({}, u)),
        t.style = vn(u))
    }
    const o = W(e) ? 1 : Oi(e) ? 128 : ro(e) ? 64 : $(e) ? 4 : I(e) ? 2 : 0;
    return se(e, t, n, s, r, o, i, !0)
}
function co(e) {
    return e ? Ds(e) || Qt in e ? q({}, e) : e : null
}
function Ze(e, t, n=!1) {
    const {props: s, ref: r, patchFlag: i, children: o} = e
      , f = t ? fo(s || {}, t) : s;
    return {
        __v_isVNode: !0,
        __v_skip: !0,
        type: e.type,
        props: f,
        key: f && ar(f),
        ref: t && t.ref ? n && r ? P(r) ? r.concat(Ft(t)) : [r, Ft(t)] : Ft(t) : r,
        scopeId: e.scopeId,
        slotScopeIds: e.slotScopeIds,
        children: o,
        target: e.target,
        targetAnchor: e.targetAnchor,
        staticCount: e.staticCount,
        shapeFlag: e.shapeFlag,
        patchFlag: t && e.type !== oe ? i === -1 ? 16 : i | 16 : i,
        dynamicProps: e.dynamicProps,
        dynamicChildren: e.dynamicChildren,
        appContext: e.appContext,
        dirs: e.dirs,
        transition: e.transition,
        component: e.component,
        suspense: e.suspense,
        ssContent: e.ssContent && Ze(e.ssContent),
        ssFallback: e.ssFallback && Ze(e.ssFallback),
        el: e.el,
        anchor: e.anchor,
        ctx: e.ctx,
        ce: e.ce
    }
}
function dr(e=" ", t=0) {
    return Pe(qt, null, e, t)
}
function pe(e) {
    return e == null || typeof e == "boolean" ? Pe(pt) : P(e) ? Pe(oe, null, e.slice()) : typeof e == "object" ? Oe(e) : Pe(qt, null, String(e))
}
function Oe(e) {
    return e.el === null && e.patchFlag !== -1 || e.memo ? e : Ze(e)
}
function Ln(e, t) {
    let n = 0;
    const {shapeFlag: s} = e;
    if (t == null)
        t = null;
    else if (P(t))
        n = 16;
    else if (typeof t == "object")
        if (s & 65) {
            const r = t.default;
            r && (r._c && (r._d = !1),
            Ln(e, r()),
            r._c && (r._d = !0));
            return
        } else {
            n = 32;
            const r = t._;
            !r && !(Qt in t) ? t._ctx = me : r === 3 && me && (me.slots._ === 1 ? t._ = 1 : (t._ = 2,
            e.patchFlag |= 1024))
        }
    else
        I(t) ? (t = {
            default: t,
            _ctx: me
        },
        n = 32) : (t = String(t),
        s & 64 ? (n = 16,
        t = [dr(t)]) : n = 8);
    e.children = t,
    e.shapeFlag |= n
}
function fo(...e) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
        const s = e[n];
        for (const r in s)
            if (r === "class")
                t.class !== s.class && (t.class = On([t.class, s.class]));
            else if (r === "style")
                t.style = vn([t.style, s.style]);
            else if (St(r)) {
                const i = t[r]
                  , o = s[r];
                o && i !== o && !(P(i) && i.includes(o)) && (t[r] = i ? [].concat(i, o) : o)
            } else
                r !== "" && (t[r] = s[r])
    }
    return t
}
function he(e, t, n, s=null) {
    ue(e, t, 7, [n, s])
}
const uo = sr();
let ao = 0;
function ho(e, t, n) {
    const s = e.type
      , r = (t ? t.appContext : e.appContext) || uo
      , i = {
        uid: ao++,
        vnode: e,
        type: s,
        parent: t,
        appContext: r,
        root: null,
        next: null,
        subTree: null,
        effect: null,
        update: null,
        scope: new Mr(!0),
        render: null,
        proxy: null,
        exposed: null,
        exposeProxy: null,
        withProxy: null,
        provides: t ? t.provides : Object.create(r.provides),
        accessCache: null,
        renderCache: [],
        components: null,
        directives: null,
        propsOptions: ir(s, r),
        emitsOptions: Ys(s, r),
        emit: null,
        emitted: null,
        propsDefaults: S,
        inheritAttrs: s.inheritAttrs,
        ctx: S,
        data: S,
        props: S,
        attrs: S,
        slots: S,
        refs: S,
        setupState: S,
        setupContext: null,
        attrsProxy: null,
        slotsProxy: null,
        suspense: n,
        suspenseId: n ? n.pendingId : 0,
        asyncDep: null,
        asyncResolved: !1,
        isMounted: !1,
        isUnmounted: !1,
        isDeactivated: !1,
        bc: null,
        c: null,
        bm: null,
        m: null,
        bu: null,
        u: null,
        um: null,
        bum: null,
        da: null,
        a: null,
        rtg: null,
        rtc: null,
        ec: null,
        sp: null
    };
    return i.ctx = {
        _: i
    },
    i.root = t ? t.root : i,
    i.emit = bi.bind(null, i),
    e.ce && e.ce(i),
    i
}
let X = null, Sn, We, ds = "__VUE_INSTANCE_SETTERS__";
(We = on()[ds]) || (We = on()[ds] = []),
We.push(e=>X = e),
Sn = e=>{
    We.length > 1 ? We.forEach(t=>t(e)) : We[0](e)
}
;
const Ve = e=>{
    Sn(e),
    e.scope.on()
}
  , $e = ()=>{
    X && X.scope.off(),
    Sn(null)
}
;
function hr(e) {
    return e.vnode.shapeFlag & 4
}
let mt = !1;
function po(e, t=!1) {
    mt = t;
    const {props: n, children: s} = e.vnode
      , r = hr(e);
    Xi(e, n, r, t),
    Gi(e, s);
    const i = r ? go(e, t) : void 0;
    return mt = !1,
    i
}
function go(e, t) {
    const n = e.type;
    e.accessCache = Object.create(null),
    e.proxy = Us(new Proxy(e.ctx,Ui));
    const {setup: s} = n;
    if (s) {
        const r = e.setupContext = s.length > 1 ? _o(e) : null;
        Ve(e),
        et();
        const i = Te(s, e, 0, [e.props, r]);
        if (tt(),
        $e(),
        vs(i)) {
            if (i.then($e, $e),
            t)
                return i.then(o=>{
                    hs(e, o, t)
                }
                ).catch(o=>{
                    Kt(o, e, 0)
                }
                );
            e.asyncDep = i
        } else
            hs(e, i, t)
    } else
        pr(e, t)
}
function hs(e, t, n) {
    I(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : $(t) && (e.setupState = zs(t)),
    pr(e, n)
}
let ps;
function pr(e, t, n) {
    const s = e.type;
    if (!e.render) {
        if (!t && ps && !s.render) {
            const r = s.template || Hn(e).template;
            if (r) {
                const {isCustomElement: i, compilerOptions: o} = e.appContext.config
                  , {delimiters: f, compilerOptions: u} = s
                  , a = q(q({
                    isCustomElement: i,
                    delimiters: f
                }, o), u);
                s.render = ps(r, a)
            }
        }
        e.render = s.render || fe
    }
    Ve(e),
    et(),
    Ki(e),
    tt(),
    $e()
}
function mo(e) {
    return e.attrsProxy || (e.attrsProxy = new Proxy(e.attrs,{
        get(t, n) {
            return te(e, "get", "$attrs"),
            t[n]
        }
    }))
}
function _o(e) {
    const t = n=>{
        e.exposed = n || {}
    }
    ;
    return {
        get attrs() {
            return mo(e)
        },
        slots: e.slots,
        emit: e.emit,
        expose: t
    }
}
function $n(e) {
    if (e.exposed)
        return e.exposeProxy || (e.exposeProxy = new Proxy(zs(Us(e.exposed)),{
            get(t, n) {
                if (n in t)
                    return t[n];
                if (n in ct)
                    return ct[n](e)
            },
            has(t, n) {
                return n in t || n in ct
            }
        }))
}
function bo(e) {
    return I(e) && "__vccOpts"in e
}
const xo = (e,t)=>ai(e, t, mt)
  , yo = Symbol.for("v-scx")
  , wo = ()=>Mt(yo)
  , Eo = "3.3.2"
  , vo = "http://www.w3.org/2000/svg"
  , Le = typeof document < "u" ? document : null
  , gs = Le && Le.createElement("template")
  , Oo = {
    insert: (e,t,n)=>{
        t.insertBefore(e, n || null)
    }
    ,
    remove: e=>{
        const t = e.parentNode;
        t && t.removeChild(e)
    }
    ,
    createElement: (e,t,n,s)=>{
        const r = t ? Le.createElementNS(vo, e) : Le.createElement(e, n ? {
            is: n
        } : void 0);
        return e === "select" && s && s.multiple != null && r.setAttribute("multiple", s.multiple),
        r
    }
    ,
    createText: e=>Le.createTextNode(e),
    createComment: e=>Le.createComment(e),
    setText: (e,t)=>{
        e.nodeValue = t
    }
    ,
    setElementText: (e,t)=>{
        e.textContent = t
    }
    ,
    parentNode: e=>e.parentNode,
    nextSibling: e=>e.nextSibling,
    querySelector: e=>Le.querySelector(e),
    setScopeId(e, t) {
        e.setAttribute(t, "")
    },
    insertStaticContent(e, t, n, s, r, i) {
        const o = n ? n.previousSibling : t.lastChild;
        if (r && (r === i || r.nextSibling))
            for (; t.insertBefore(r.cloneNode(!0), n),
            !(r === i || !(r = r.nextSibling)); )
                ;
        else {
            gs.innerHTML = s ? `<svg>${e}</svg>` : e;
            const f = gs.content;
            if (s) {
                const u = f.firstChild;
                for (; u.firstChild; )
                    f.appendChild(u.firstChild);
                f.removeChild(u)
            }
            t.insertBefore(f, n)
        }
        return [o ? o.nextSibling : t.firstChild, n ? n.previousSibling : t.lastChild]
    }
};
function Co(e, t, n) {
    const s = e._vtc;
    s && (t = (t ? [t, ...s] : [...s]).join(" ")),
    t == null ? e.removeAttribute("class") : n ? e.setAttribute("class", t) : e.className = t
}
function To(e, t, n) {
    const s = e.style
      , r = W(n);
    if (n && !r) {
        if (t && !W(t))
            for (const i in t)
                n[i] == null && _n(s, i, "");
        for (const i in n)
            _n(s, i, n[i])
    } else {
        const i = s.display;
        r ? t !== n && (s.cssText = n) : t && e.removeAttribute("style"),
        "_vod"in e && (s.display = i)
    }
}
const ms = /\s*!important$/;
function _n(e, t, n) {
    if (P(n))
        n.forEach(s=>_n(e, t, s));
    else if (n == null && (n = ""),
    t.startsWith("--"))
        e.setProperty(t, n);
    else {
        const s = Po(e, t);
        ms.test(n) ? e.setProperty(Ge(s), n.replace(ms, ""), "important") : e[s] = n
    }
}
const _s = ["Webkit", "Moz", "ms"]
  , sn = {};
function Po(e, t) {
    const n = sn[t];
    if (n)
        return n;
    let s = Ye(t);
    if (s !== "filter" && s in e)
        return sn[t] = s;
    s = Ts(s);
    for (let r = 0; r < _s.length; r++) {
        const i = _s[r] + s;
        if (i in e)
            return sn[t] = i
    }
    return t
}
const bs = "http://www.w3.org/1999/xlink";
function Ao(e, t, n, s, r) {
    if (s && t.startsWith("xlink:"))
        n == null ? e.removeAttributeNS(bs, t.slice(6, t.length)) : e.setAttributeNS(bs, t, n);
    else {
        const i = Ir(t);
        n == null || i && !Ps(n) ? e.removeAttribute(t) : e.setAttribute(t, i ? "" : n)
    }
}
function Io(e, t, n, s, r, i, o) {
    if (t === "innerHTML" || t === "textContent") {
        s && o(s, r, i),
        e[t] = n ?? "";
        return
    }
    const f = e.tagName;
    if (t === "value" && f !== "PROGRESS" && !f.includes("-")) {
        e._value = n;
        const a = f === "OPTION" ? e.getAttribute("value") : e.value
          , m = n ?? "";
        a !== m && (e.value = m),
        n == null && e.removeAttribute(t);
        return
    }
    let u = !1;
    if (n === "" || n == null) {
        const a = typeof e[t];
        a === "boolean" ? n = Ps(n) : n == null && a === "string" ? (n = "",
        u = !0) : a === "number" && (n = 0,
        u = !0)
    }
    try {
        e[t] = n
    } catch {}
    u && e.removeAttribute(t)
}
function Mo(e, t, n, s) {
    e.addEventListener(t, n, s)
}
function Fo(e, t, n, s) {
    e.removeEventListener(t, n, s)
}
function Ro(e, t, n, s, r=null) {
    const i = e._vei || (e._vei = {})
      , o = i[t];
    if (s && o)
        o.value = s;
    else {
        const [f,u] = No(t);
        if (s) {
            const a = i[t] = Bo(s, r);
            Mo(e, f, a, u)
        } else
            o && (Fo(e, f, o, u),
            i[t] = void 0)
    }
}
const xs = /(?:Once|Passive|Capture)$/;
function No(e) {
    let t;
    if (xs.test(e)) {
        t = {};
        let s;
        for (; s = e.match(xs); )
            e = e.slice(0, e.length - s[0].length),
            t[s[0].toLowerCase()] = !0
    }
    return [e[2] === ":" ? e.slice(3) : Ge(e.slice(2)), t]
}
let rn = 0;
const jo = Promise.resolve()
  , Ho = ()=>rn || (jo.then(()=>rn = 0),
rn = Date.now());
function Bo(e, t) {
    const n = s=>{
        if (!s._vts)
            s._vts = Date.now();
        else if (s._vts <= n.attached)
            return;
        ue(Lo(s, n.value), t, 5, [s])
    }
    ;
    return n.value = e,
    n.attached = Ho(),
    n
}
function Lo(e, t) {
    if (P(t)) {
        const n = e.stopImmediatePropagation;
        return e.stopImmediatePropagation = ()=>{
            n.call(e),
            e._stopped = !0
        }
        ,
        t.map(s=>r=>!r._stopped && s && s(r))
    } else
        return t
}
const ys = /^on[a-z]/
  , So = (e,t,n,s,r=!1,i,o,f,u)=>{
    t === "class" ? Co(e, s, r) : t === "style" ? To(e, n, s) : St(t) ? xn(t) || Ro(e, t, n, s, o) : (t[0] === "." ? (t = t.slice(1),
    !0) : t[0] === "^" ? (t = t.slice(1),
    !1) : $o(e, t, s, r)) ? Io(e, t, s, i, o, f, u) : (t === "true-value" ? e._trueValue = s : t === "false-value" && (e._falseValue = s),
    Ao(e, t, s, r))
}
;
function $o(e, t, n, s) {
    return s ? !!(t === "innerHTML" || t === "textContent" || t in e && ys.test(t) && I(n)) : t === "spellcheck" || t === "draggable" || t === "translate" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA" || ys.test(t) && W(n) ? !1 : t in e
}
const Do = q({
    patchProp: So
}, Oo);
let ws;
function Uo() {
    return ws || (ws = to(Do))
}
const Ko = (...e)=>{
    const t = Uo().createApp(...e)
      , {mount: n} = t;
    return t.mount = s=>{
        const r = Wo(s);
        if (!r)
            return;
        const i = t._component;
        !I(i) && !i.render && !i.template && (i.template = r.innerHTML),
        r.innerHTML = "";
        const o = n(r, !1, r instanceof SVGElement);
        return r instanceof Element && (r.removeAttribute("v-cloak"),
        r.setAttribute("data-v-app", "")),
        o
    }
    ,
    t
}
;
function Wo(e) {
    return W(e) ? document.querySelector(e) : e
}
const zo = {
    class: "text-4xl mt-50 font-semibold text-center text-gray-800 dark:text-gray-600 ml-auto mr-auto mb-10 sm:mb-8 flex gap-2 items-center justify-center flex-grow"
}
  , qo = se("span", {
    class: "bg-yellow-200 text-yellow-900 py-0.5 px-1.5 text-xs md:text-sm rounded-md uppercase"
}, "Plus", -1)
  , Qo = {
    role: "list",
    class: "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
}
  , ko = ["onClick"]
  , Jo = {
    class: "flex w-full items-center justify-between space-x-6 p-6"
}
  , Yo = {
    class: "flex-1 truncate"
}
  , Xo = {
    class: "flex items-center space-x-3"
}
  , Zo = {
    class: "truncate text-sm font-medium text-gray-900"
}
  , Vo = {
    key: 0,
    class: "inline-flex flex-shrink-0 items-center rounded-full bg-green-50 px-1.5 py-0.5 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20"
}
  , Go = {
    key: 1,
    class: "inline-flex flex-shrink-0 items-center rounded-full bg-red-50 px-1.5 py-0.5 text-xs font-medium text-red-700 ring-1 ring-inset ring-green-600/20"
}
  , el = {
    class: "mt-1 truncate text-sm text-gray-500"
}
  , tl = {
    __name: "Bridge",
    props: {
        name: String
    },
    setup(e) {
        const t = oi([{
            name: "线路1",
            url: "https://chat1.52ai.pw",
            status: "检测中"
        }, {
            name: "线路2",
            url: "https://chat2.52ai.pw",
            status: "检测中"
        }, {
            name: "线路3",
            url: "https://chat3.52ai.pw",
            status: "检测中"
        }, {
            name: "线路4",
            url: "https://chat4.52ai.pw",
            status: "检测中"
        }, {
            name: "线路5",
            url: "https://chat5.52ai.pw",
            status: "检测中"
        }, {
            name: "线路6",
            url: "https://chat.zoai.cc",
            status: "检测中"
        }, {
            name: "线路7",
            url: "https://chat6.52ai.pw",
            status: "检测中"
        }, {
            name: "线路8",
            url: "https://chat7.52ai.pw",
            status: "检测中"
        }, {
            name: "线路9",
            url: "https://chat8.52ai.pw",
            status: "检测中"
        }, {
            name: "线路10",
            url: "https://chat9.52ai.pw",
            status: "检测中"
        }]);
        t.value.forEach(s=>{
            const r = new Date().getTime();
            fetch(s.url, {
                mode: "no-cors"
            }).then(()=>{
                s.status = new Date().getTime() - r,
                location.href = s.url
            }
            ).catch(()=>{
                s.status = "异常"
            }
            )
        }
        );
        function n(s="") {
            if (s)
                location.href = s;
            else {
                const r = t.value.find(i=>i.status !== "异常");
                r ? location.href = r.url : alert("所有线路异常，请稍后再试")
            }
        }
        return (s,r)=>(xe(),
        Be(oe, null, [se("h1", zo, [dr(Ke(e.name) + " ", 1), qo]), se("ul", Qo, [(xe(!0),
        Be(oe, null, Di(t.value, i=>(xe(),
        Be("li", {
            onClick: o=>n(i.url),
            key: i.name,
            class: "col-span-1 divide-y divide-gray-400 rounded-lg bg-white dark:bg-gray-600 shadow"
        }, [se("div", Jo, [se("div", Yo, [se("div", Xo, [se("h3", Zo, Ke(i.name), 1), i.status !== "异常" ? (xe(),
        Be("span", Vo, Ke(i.status) + Ke(i.status !== "检测中" ? "ms" : ""), 1)) : (xe(),
        Be("span", Go, Ke(i.status), 1))]), se("p", el, Ke(i.url), 1)])])], 8, ko))), 128))]), se("button", {
            onClick: r[0] || (r[0] = i=>n()),
            type: "button",
            class: "inline-flex items-center bg-green-600 gap-x-2 rounded-md db-white px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-green-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mt-6"
        }, " 立即前往 ")], 64))
    }
}
  , nl = "/assets/img-7792fcec.png"
  , sl = {
    style: {
        height: "100vh"
    }
}
  , rl = ["src"]
  , il = {
    __name: "Notion",
    setup(e) {
        return (t,n)=>(xe(),
        Be("div", sl, [se("img", {
            src: jt(nl),
            alt: ""
        }, null, 8, rl)]))
    }
};
function ol() {
    const e = navigator.appVersion
      , t = e.toLowerCase();
    return {
        IE: t.indexOf("msie") > -1 && !t.indexOf("opera") > -1,
        GECKO: t.indexOf("gecko") > -1 && !t.indexOf("khtml") > -1,
        WEBKIT: t.indexOf("applewebkit") > -1,
        OPERA: t.indexOf("opera") > -1 && t.indexOf("presto") > -1,
        TRIDENT: t.indexOf("trident") > -1,
        MOBILE: !!e.match(/AppleWebKit.*Mobile.*/),
        MobileDevice: !!t.match(/iphone|android|phone|mobile|wap|netfront|x11|java|opera mobi|opera mini|ucweb|windows ce|symbian|symbianos|series|webos|sony|blackberry|dopod|nokia|samsung|palmsource|xda|pieplus|meizu|midp|cldc|motorola|foma|docomo|up.browser|up.link|blazer|helio|hosin|huawei|novarra|coolpad|webos|techfaith|palmsource|alcatel|amoi|ktouch|nexian|ericsson|philips|sagem|wellcom|bunjalloo|maui|smartphone|iemobile|spice|bird|zte-|longcos|pantech|gionee|portalmmm|jig browser|hiptop|benq|haier|^lct|320x320|240x320|176x220/i),
        IOS: !!e.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
        ANDROID: e.indexOf("Android") > -1 || e.indexOf("Adr") > -1,
        IPHONE: e.indexOf("iPhone") > -1,
        IPAD: e.indexOf("iPad") > -1,
        WEBAPP: !e.indexOf("Safari") > -1,
        QQBrowser: e.indexOf("QQBrowser") > -1,
        WECHAT: e.indexOf("MicroMessenger") > -1,
        QQ: !!e.match(/QQ\/[0-9]/i),
        WEIBO: e.match(/WeiBo/i) === "weibo",
        ALIPAY: e.indexOf("AlipayClient") > -1
    }
}
const ll = {
    __name: "App",
    setup(e) {
        const t = ol();
        return (n,s)=>(xe(),
        Be("div", null, [jt(t).QQ || jt(t).WECHAT ? (xe(),
        as(il, {
            key: 1
        })) : (xe(),
        as(tl, {
            key: 0,
            name: "吾爱AI"
        }))]))
    }
};
Ko(ll).mount("#app");
