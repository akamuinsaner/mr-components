import { TreeSelectProp, TreeSelectOption } from './index';
import { DataSet } from '../utils/getTreeDataFormatted';
type UseValueProps = {
    value: TreeSelectProp["value"];
    multiple: TreeSelectProp["multiple"];
    onChange: TreeSelectProp["onChange"];
    dataSet: DataSet<TreeSelectOption>;
    checkWithRelation: TreeSelectProp["checkWithRelation"];
};
declare const _default: ({ value, multiple, onChange, dataSet, checkWithRelation, }: UseValueProps) => {
    selected: (string | number)[];
    toggleCheck: (node: TreeSelectOption, checked: boolean) => void;
    onValueChange: (changedData: Array<string | number>) => void;
    onOptionSelect: (o: TreeSelectOption) => void;
};
export default _default;
