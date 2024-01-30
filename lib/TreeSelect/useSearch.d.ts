import { TreeSelectOption } from './index';
import { DataSet } from '../utils/getTreeDataFormatted';
type UseSearchProps = {
    multiple: boolean;
    dataSet: DataSet<TreeSelectOption>;
};
declare const _default: ({ multiple, dataSet }: UseSearchProps) => {
    inputValue: string;
    onInputChange: (e: any, value: any, reason: any) => void;
    filterOptionsByInput: (options: TreeSelectOption[]) => TreeSelectOption[];
};
export default _default;
