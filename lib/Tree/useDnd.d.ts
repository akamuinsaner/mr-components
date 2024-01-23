import { TreeData } from './index';
import { DataSet } from '../utils/getTreeDataFormatted';
export type UseDndProps = {
    dataSet: DataSet<TreeData>;
    toggleExpand: (node: TreeData, expand: boolean) => void;
    onDrop: (active: TreeData, over: TreeData) => void;
};
declare const _default: ({ dataSet, toggleExpand, onDrop }: UseDndProps) => {
    activeId: any;
    overId: any;
    onDragStart: (e: any) => void;
    onDragOver: (e: any) => void;
    onDragEnd: (e: any) => void;
};
export default _default;
