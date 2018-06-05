// Object.keys()
// developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys
Object.keys || (Object.keys = function () {
    "use strict";
    var a = Object.prototype.hasOwnProperty, b = !{toString: null}.propertyIsEnumerable("toString"),
        c = ["toString", "toLocaleString", "valueOf", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "constructor"],
        d = c.length;
    return function (e) {
        if ("object" != typeof e && ("function" != typeof e || null === e)) throw new TypeError("Object.keys called on non-object");
        var g, h, f = [];
        for (g in e) a.call(e, g) && f.push(g);
        if (b) for (h = 0; d > h; h++) a.call(e, c[h]) && f.push(c[h]);
        return f
    }
}());

// Array.forEach()
// developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach
Array.prototype.forEach || (Array.prototype.forEach = function (a, b) {
    var c, d;
    if (null == this) throw new TypeError(" this is null or not defined");
    var e = Object(this), f = e.length >>> 0;
    if ("function" != typeof a) throw new TypeError(a + " is not a function");
    for (arguments.length > 1 && (c = b), d = 0; f > d;) {
        var g;
        d in e && (g = e[d], a.call(c, g, d, e)), d++
    }
});

// JSON
// github.com/douglascrockford/JSON-js/tree/c07c287e39ab5a1726818e0436490bf071b7c838
"object" != typeof JSON && (JSON = {}), function () {
    "use strict";

    function f(a) {
        return 10 > a ? "0" + a : a
    }

    function this_value() {
        return this.valueOf()
    }

    function quote(a) {
        return escapable.lastIndex = 0, escapable.test(a) ? '"' + a.replace(escapable, function (a) {
            var b = meta[a];
            return "string" == typeof b ? b : "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4)
        }) + '"' : '"' + a + '"'
    }

    function str(a, b) {
        var c, d, e, f, h, g = gap, i = b[a];
        switch (i && "object" == typeof i && "function" == typeof i.toJSON && (i = i.toJSON(a)), "function" == typeof rep && (i = rep.call(b, a, i)), typeof i) {
            case"string":
                return quote(i);
            case"number":
                return isFinite(i) ? String(i) : "null";
            case"boolean":
            case"null":
                return String(i);
            case"object":
                if (!i) return "null";
                if (gap += indent, h = [], "[object Array]" === Object.prototype.toString.apply(i)) {
                    for (f = i.length, c = 0; f > c; c += 1) h[c] = str(c, i) || "null";
                    return e = 0 === h.length ? "[]" : gap ? "[\n" + gap + h.join(",\n" + gap) + "\n" + g + "]" : "[" + h.join(",") + "]", gap = g, e
                }
                if (rep && "object" == typeof rep) for (f = rep.length, c = 0; f > c; c += 1) "string" == typeof rep[c] && (d = rep[c], e = str(d, i), e && h.push(quote(d) + (gap ? ": " : ":") + e)); else for (d in i) Object.prototype.hasOwnProperty.call(i, d) && (e = str(d, i), e && h.push(quote(d) + (gap ? ": " : ":") + e));
                return e = 0 === h.length ? "{}" : gap ? "{\n" + gap + h.join(",\n" + gap) + "\n" + g + "}" : "{" + h.join(",") + "}", gap = g, e
        }
    }

    "function" != typeof Date.prototype.toJSON && (Date.prototype.toJSON = function () {
        return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" + f(this.getUTCMonth() + 1) + "-" + f(this.getUTCDate()) + "T" + f(this.getUTCHours()) + ":" + f(this.getUTCMinutes()) + ":" + f(this.getUTCSeconds()) + "Z" : null
    }, Boolean.prototype.toJSON = this_value, Number.prototype.toJSON = this_value, String.prototype.toJSON = this_value);
    var cx, escapable, gap, indent, meta, rep;
    "function" != typeof JSON.stringify && (escapable = /[\\\"\u0000-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, meta = {
        "\b": "\\b",
        "	": "\\t",
        "\n": "\\n",
        "\f": "\\f",
        "\r": "\\r",
        '"': '\\"',
        "\\": "\\\\"
    }, JSON.stringify = function (a, b, c) {
        var d;
        if (gap = "", indent = "", "number" == typeof c) for (d = 0; c > d; d += 1) indent += " "; else "string" == typeof c && (indent = c);
        if (rep = b, b && "function" != typeof b && ("object" != typeof b || "number" != typeof b.length)) throw new Error("JSON.stringify");
        return str("", {"": a})
    }), "function" != typeof JSON.parse && (cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, JSON.parse = function (text, reviver) {
        function walk(a, b) {
            var c, d, e = a[b];
            if (e && "object" == typeof e) for (c in e) Object.prototype.hasOwnProperty.call(e, c) && (d = walk(e, c), void 0 !== d ? e[c] = d : delete e[c]);
            return reviver.call(a, b, e)
        }

        var j;
        if (text = String(text), cx.lastIndex = 0, cx.test(text) && (text = text.replace(cx, function (a) {
                return "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4)
            })), /^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, ""))) return j = eval("(" + text + ")"), "function" == typeof reviver ? walk({"": j}, "") : j;
        throw new SyntaxError("JSON.parse")
    })
}();