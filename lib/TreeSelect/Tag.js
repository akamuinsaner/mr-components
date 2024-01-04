import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import Chip from '@mui/material/Chip';
export default (function (_a) {
    var size = _a.size, option = _a.option, onDelete = _a.onDelete, onInit = _a.onInit;
    var ref = React.useRef(null);
    React.useEffect(function () {
        onInit(ref.current.offsetWidth);
    }, []);
    return (_jsx(Chip, { ref: ref, size: size, onDelete: function () { return onDelete(option.id); }, label: option === null || option === void 0 ? void 0 : option.name }));
});
//# sourceMappingURL=Tag.js.map