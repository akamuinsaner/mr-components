import { TreeSelectOption } from './index';
import { DataSet } from '../utils/getTreeDataFormatted';
type UseSearchProps = {
    search: boolean;
    multiple: boolean;
    dataSet: DataSet<TreeSelectOption>;
};
declare const _default: ({ search, multiple, dataSet }: UseSearchProps) => {
    inputValue: string;
    onInputChange: (e: any, value: any, reason: any) => void;
    searchData: TreeSelectOption[];
};
export default _default;
