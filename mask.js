var PhoneMask = function(e, t) {
  var n = this;
  (t = t || {}), (this.elements = e), (this.patternChar =
    t.patternChar || "_"), (this.prefix = t.prefix || ""), (this.pattern =
    t.pattern || "(___) ___-__-__"), (this.pattern =
    this.prefix + this.pattern), (this.backspaceCode =
    t.backspaceCode || 8), (this.deleteCode =
    t.deleteCode || 46), (this.allowedRegExp =
    t.allowedRegExp || /^\d$/), (this.igrogeKeyCodes = t.igrogeKeyCodes || [
    9,
    16,
    17,
    18,
    36,
    37,
    38,
    39,
    40,
    91,
    92,
    93
  ]);
  var r = function(e) {
      e = e || window.event;
      var t = e.target || e.srcElement,
        r = !0;
      if (!n.isIgnoredKey(e.keyCode)) {
        if (e.keyCode != n.backspaceCode && e.keyCode != n.deleteCode) {
          var s = String.fromCharCode(e.keyCode);
          (0 != n.allowedRegExp && null == s.match(n.allowedRegExp)) ||
            (t.value = n.replaceToChar(t, s));
        }
        r = !1;
      }
      if ((n.selectFirstPatterntChar(t), 0 == r))
        return e.preventDefault && e.preventDefault(), r;
    },
    s = function(e) {
      e = e || window.event;
      var t = e.target || e.srcElement,
        r = !0;
      if (
        (
          n.isIgnoredKey(e.keyCode) ||
            (
              e.keyCode == n.backspaceCode &&
                ((t.value = n.replaceToPatternChar(t)), (r = !1)),
              e.keyCode == n.deleteCode &&
                ((t.value = n.replaceToPatternChar(t)), (r = !1))
            ),
          n.selectFirstPatterntChar(t),
          r === !1
        )
      )
        return !1;
    },
    a = function(e) {
      e = e || window.event;
      var t = e.target || e.srcElement,
        r = t.value.indexOf(n.patternChar),
        s = r + 1;
      r < 0 && ((r = t.value.length - 1), (s = r + 1)), n.selectCharInInput(
        t,
        r,
        s
      );
    };
  if ("[object NodeList]" === Object.prototype.toString.call(this.elements))
    for (var o = 0; o < this.elements.length; o++)
      (this.elements[o].value = n.pattern), (this.elements[
        o
      ].onkeydown = s), (this.elements[o].onkeypress = r), (this.elements[
        o
      ].onfocus = a);
  else
    null != this.elements &&
      (
        (this.elements.value = n.pattern),
        (this.elements.onkeydown = s),
        (this.elements.onkeypress = r),
        (this.elements.onfocus = a)
      );
};
(PhoneMask.prototype.selectFirstPatterntChar = function(e) {
  var t = e.value.indexOf(this.patternChar);
  if (t > -1) {
    var n = t + 1;
    this.selectCharInInput(e, t, n);
  }
}), (PhoneMask.prototype.isIgnoredKey = function(e) {
  return !(this.igrogeKeyCodes.indexOf(e) < 0);
}), (PhoneMask.prototype.selectCharInInput = function(e, t, n) {
  e.setSelectionRange
    ? (e.focus(), e.setSelectionRange(t, n))
    : e.createTextRange &&
      (
        (range = e.createTextRange()),
        range.collapse(!0),
        range.moveEnd("character", n),
        range.moveStart("character", t),
        range.select()
      );
}), (PhoneMask.prototype.replaceAt = function(e, t, n) {
  var r = e.split("");
  return (r[t] = n), r.join("");
}), (PhoneMask.prototype.replaceToChar = function(e, t) {
  var n = e.value,
    r = n.indexOf(this.patternChar);
  return r > -1 ? this.replaceAt(n, r, t) : n;
}), (PhoneMask.prototype.replaceToPatternChar = function(e) {
  var t,
    n = e.value,
    r = n.indexOf(this.patternChar),
    s = !1;
  if (r == -1) (t = n.length - 1), (s = !0);
  else
    for (t = r - 1; !s; )
      if (this.pattern[t] != n[t]) s = !0;
      else if ((t--, t < 0)) break;
  return s && t >= this.prefix.length
    ? this.replaceAt(n, t, this.patternChar)
    : n;
}), (PhoneMask.prototype.destroy = function() {
  if ("[object NodeList]" === Object.prototype.toString.call(this.elements))
    for (var e = 0; e < this.elements.length; e++)
      (this.elements[e].value = null), (this.elements[
        e
      ].onkeydown = null), (this.elements[e].onkeypress = null), (this.elements[
        e
      ].onfocus = null);
  else
    null != this.elements &&
      (
        (this.elements.value = null),
        (this.elements.onkeydown = null),
        (this.elements.onkeypress = null),
        (this.elements.onfocus = null)
      );
});
