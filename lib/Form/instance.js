var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var FormInstance = /** @class */ (function () {
    function FormInstance() {
        var _this_1 = this;
        this.fieldChange = function (values) {
        };
        this.getValues = function (fields) {
            if (fields && fields.length) {
                return fields.reduce(function (prev, key) {
                    var _a;
                    return _this_1.fields[key]
                        ? __assign(__assign({}, prev), (_a = {}, _a[key] = _this_1.fields[key].current.getValue(), _a)) : __assign({}, prev);
                }, {});
            }
            return Object.entries(_this_1.fields).reduce(function (prev, _a) {
                var _b;
                var key = _a[0], _this = _a[1];
                return __assign(__assign({}, prev), (_b = {}, _b[key] = _this.current.getValue(), _b));
            }, {});
        };
        this.store = {};
        this.fields = {};
    }
    return FormInstance;
}());
export {};
//# sourceMappingURL=instance.js.map