import { CascaderProps, CascaderOption } from './index';
import { DataSet } from '../utils/getTreeDataFormatted';
type UseValueProps = {
    value: CascaderProps["value"];
    multiple: CascaderProps["multiple"];
    onChange: CascaderProps["onChange"];
    dataSet: DataSet<CascaderOption>;
    checkWithRelation: CascaderProps["checkWithRelation"];
};
declare const _default: ({ value, multiple, onChange, dataSet, checkWithRelation, }: UseValueProps) => {
    selected: (string | number)[];
    toggleCheck: (node: CascaderOption, checked: boolean) => void;
    onValueChange: (changedData: Array<string | number>) => void;
    onOptionSelect: (o: CascaderOption) => void;
};
export default _default;
