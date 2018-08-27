//gets an object by using a string
// jshint ignore: start
function getObjByValue(path, origin) {
    if (origin === void 0 || origin === null) origin = self ? self : this;
    if (typeof path !== 'string') path = '' + path;
    var c, pc, i = 0, n = path.length, name = '', q;
    while (i<=n)
        ((c = path[i++]) == '.' || c == '[' || c == ']' || c == "'" || c == '"' || c == void 0) ? (c==q&&path[i]==']'?q='':q?name+=c:name?(origin?origin=origin[name]:i=n+2,name='') : (pc=='['&&(c=='"'||c=="'")?q=c:pc=='.'||pc=='['||pc==']'&&c==']'||pc=='"'||pc=="'"?i=n+2:void 0), pc=c) : name += c;
    if (i==n+2 || name) throw "Invalid path: "+path;
    return origin;
}