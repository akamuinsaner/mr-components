import { CascaderOption } from './index';
import { DataSet } from '../utils/getTreeDataFormatted';
type UseSearchProps = {
    search: boolean;
    multiple: boolean;
    dataSet: DataSet<CascaderOption>;
};
declare const _default: ({ search, multiple, dataSet }: UseSearchProps) => {
    inputValue: string;
    onInputChange: (e: any, value: any, reason: any) => void;
    searchData: import("../TreeSelect").TreeSelectOption[];
};
export default _default;
