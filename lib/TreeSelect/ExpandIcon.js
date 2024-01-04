import { jsx as _jsx } from "react/jsx-runtime";
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import CircularProgress from '@mui/material/CircularProgress';
export default (function (_a) {
    var showChildren = _a.showChildren, hasChildren = _a.hasChildren, isLoading = _a.isLoading, visibility = _a.visibility, toggleOpen = _a.toggleOpen, startLoadData = _a.startLoadData;
    if (showChildren) {
        return _jsx(ArrowDropDownIcon, { sx: { opacity: visibility ? 1 : 0 }, onClick: function (e) {
                e.stopPropagation();
                if (!visibility)
                    return;
                toggleOpen(false);
            } });
    }
    if (isLoading) {
        return _jsx(CircularProgress, { size: 20, sx: { marginRight: '4px' }, onClick: function (e) { return e.stopPropagation(); } });
    }
    return _jsx(ArrowRightIcon, { sx: { opacity: visibility ? 1 : 0 }, onClick: function (e) {
            e.stopPropagation();
            if (!visibility)
                return;
            if (hasChildren)
                toggleOpen(true);
            startLoadData();
        } });
});
//# sourceMappingURL=ExpandIcon.js.map