/*! KID.js 
    v1.1.0 (c) soso
    MIT License
    
    (っ◔◡◔)っ ♥ JSkid ♥ https://github.com/Generalsimus/JSkid

*/
var KD_group = {},
    KD_I = Math.round(100 * Math.random()),
    KD_cssselector = "KD_css_";

function KD_type(a) {
    return Object.prototype.toString.call(a).match(/(\w)\w+/g)[1]
}

function KD_map(val, fun) {
    if (val.length && "number" == typeof val.length)
        for (var array = [], i = 0; i < val.length; i++) {
            var v;
            (v = fun(val[i], i, val)) && array.push(v)
        } else
            for (var i in val) {
                var v;
                (v = fun(val[i], i, val)) && (val[i] = v)
            }
    return array || val
}
window.location.params = {};
var KD_method = {
    g: function (a) {
        return this.getAttribute(a)
    },
    m: function (a) {
        for (var i in a) "string" == typeof a[i] && this.setAttribute(i, a[i]);
        return this
    },
    q: function (s) {
        return s instanceof Array ? this.querySelectorAll(s[0]) : this.querySelector(s)
    },
    c: function (j) {},
    h: function (l) {
        var c = this.children;
        return "number" == typeof l ? c[l] : c
    },
    i: function (i) {
        return i && (i instanceof Object ? KD_T(this, i) : this.innerHTML = i), i ? this : this.innerHTML
    },
    y: function (o) {
        return o ? KD_assign(this.style, o) : this.style
    },
    e: function (s) {
        for (var l in s) l.split("_").forEach(function (v) {
            this.addEventListener(v, s[l])
        }.bind(this))
    },
    o: function (s, z) {
        z = this;
        for (var i = 0; i <= ("number" == typeof s ? s : 0); i++) z = z.parentElement;
        return z
    },
    n: function (s, z) {
        z = this;
        for (var i = 0; i <= ("number" == typeof s ? s : 0); i++) z = z.nextElementSibling;
        return z
    },
    p: function (s, z) {
        z = this;
        for (var i = 0; i <= ("number" == typeof s ? s : 0); i++) z = z.previousElementSibling;
        return z
    },
    a: function (s) {
        return this.appendChild(s), s
    },
    r: function () {
        this.o().removeChild(this)
    },
    f: function (t) {
        return this.parentElement.replaceChild(t, this), p
    },
    b: function (t, n) {
        var b = n || this;
        return KD_map(t, (function (v) {
            v instanceof Array ? KD_group[v[0]] ? KD_group[v[0]].push(b) : KD_group[v[0]] = [b] : KD_group[v] = b
        })), b
    },
    w: function (a) {
        var p = "in" == a[2] ? this : a[1],
            c = "in" == a[2] ? a[1] : this,
            l = null,
            o = null;

        function m() {
            if (window.innerWidth <= a[0]) {
                if (c.o() !== p) {
                    var n = c.n();
                    l = n ? c.n() : c.o(), o = n ? "u" : "a", p.a(c)
                }
            } else l && l[o](c)
        }
        m(), window.addEventListener("resize", m)
    },
    l: function (f) {
        var fun = f(this);
        return fun ? KD_T(this, fun) : this
    },
    x: function (o) {},
    u: function (o) {
        this.o().insertBefore(o, this)
    },
    restart: function (v) {
        var n = this.n(),
            o;
        (n ? this : this.o())[n ? "u" : "a"](KD_el(v || this.KD_OB)), this.r()
    }
};

function KD_assign(obj1, obj2) {
    try {
        obj1 = Object.assign(obj1, obj2)
    } catch (error) {
        KD_map(obj2, (function (method, key) {
            obj1[key] = method
        }))
    }
    return obj1
}
KD_assign(HTMLElement.prototype, KD_method);
var KD_style = KD_T(document.head, [{
    style: []
}]);

function KD_routeGeN(join, tag, genREGEX) {
    join && tag.to.replace(/\:/g, "").match(genREGEX).forEach((function (v, i) {
        window.location.params[v] = join[i]
    }))
}

function KD_routeReG(test) {
    for (var url in KD_ROUter) {
        var el = KD_ROUter[url];
        if (el[0][0].test(test)) {
            KD_routeGeN(document.location.pathname.match(el[0][0]), el[0][2], el[0][0]);
            var nm = document.location.pathname.match(el[0][0]),
                dom = el[el[0][2].to + nm] ? el[el[0][2].to + nm] : KD_el(el[0][2]);
            el[0][1].i(" "), el[0][1].a(dom), el[el[0][2].to + nm] = dom
        }
    }
}

function KD_el(r, p) {
    var domK = Object.keys(r);

    function KD_dom(name) {
        var a = document.createElement(name);
        for (var i in KD_T(a, r[domK[0]]), a.KD_OB = r, r) i !== domK[0] && (a[i] instanceof Function ? a[i](r[i]) : a.m({
            [i]: r[i]
        }));
        return a
    }
    var tags = {
        d: ["div", KD_dom],
        s: ["span", KD_dom],
        assign: [null, function () {
            var ass = r.assign;
            for (var i in delete r.assign, ass) KD_assign(ass[i], r);
            return KD_T(p, ass.slice(0, -1)), KD_el(ass[ass.length - 1])
        }],
        switch: ["a", function (name) {
            return KD_assign(r, {
                e: {
                    click: function (e) {
                        e.preventDefault(), window.history.pushState(r.href, "Title", r.href), KD_routeReG(r.href)
                    }
                }
            }), KD_dom(name)
        }],
        router: ["div", function (name) {
            var list = r.router;
            r.router = [];
            var parent = KD_dom(name);
            return KD_map(list, (function (tag) {
                var genREGEX = tag.unic ? (regexlist = [
                        [/[\-{}\[\]+?.,\\\^$|#\s]/g, "\\$&"],
                        [/\((.*?)\)/g, "(?:$1)?"],
                        [/(\(\?)?:\w+/g, function (match, optional) {
                            return optional ? match : "([^/]+)"
                        }],
                        [/\*\w+/g, "(.*?)"]
                    ], rgxURL = tag.to, regexlist.forEach((function (v) {
                        rgxURL = rgxURL.replace(v[0], v[1])
                    })), new RegExp("^" + rgxURL + "$", "i")) : new RegExp(tag.to.replace(/:[^\s/]+/g, "([\\w-]+)")),
                    join = document.location.pathname.match(genREGEX),
                    regexlist, rgxURL;
                KD_routeGeN(join, tag, genREGEX), KD_ROUter[tag.to] ? KD_ROUter[tag.to][tag.to + join] = tag : KD_ROUter[tag.to] = {
                    0: [genREGEX, parent, tag],
                    [tag.to + join]: tag
                }, genREGEX.test(document.location.pathname) && (KD_ROUter[tag.to][tag.to + join] = KD_el(tag), parent.a(KD_ROUter[tag.to][tag.to + join]))
            })), parent
        }]
    };
    return tags[domK[0]] ? tags[domK[0]][1](tags[domK[0]][0]) : KD_dom(domK[0])
}

function KD_T(p, s) {
    switch (KD_type(s)) {
        case "Array":
            KD_map(s, (function (tag) {
                p.a(KD_el(tag, p))
            }));
            break;
        case "Function":
            p.l(s);
            break;
        case "Object":
            p.a(KD_el(s, p));
            break;
        default:
            p.i(s)
    }
    return p
}

function KD_xhr(call, link, method) {
    var xhr = window.ActiveXObject ? new ActiveXObject("Microsoft.XMLHTTP") : XMLHttpRequest && new XMLHttpRequest;
    return xhr.open(method || "POST", link || window.location), xhr.onload = function () {
        call && call(xhr.response ? xhr.response : 0)
    }, xhr.run = function (t) {
        "string" == typeof t && this.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;"), this.send(t)
    }, xhr
}
KD_ROUter = {}, window.addEventListener("popstate", (function () {
    KD_routeReG(document.location.pathname)
}));