import { jsx as _jsx } from "react/jsx-runtime";
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import CircularProgress from '@mui/material/CircularProgress';
export default (function (_a) {
    var hasChildren = _a.hasChildren, isLoading = _a.isLoading, openChildren = _a.openChildren, startLoadData = _a.startLoadData, loadData = _a.loadData;
    if (isLoading) {
        return _jsx(CircularProgress, { size: 20, sx: { marginRight: '4px' }, onClick: function (e) { return e.stopPropagation(); } });
    }
    if (!hasChildren && !loadData)
        return;
    return _jsx(ArrowRightIcon, { sx: { cursor: 'pointer' }, onClick: function (e) {
            e.stopPropagation();
            if (hasChildren)
                openChildren();
            startLoadData();
        } });
});
//# sourceMappingURL=ExpandIcon.js.map