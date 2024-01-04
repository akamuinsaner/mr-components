import { TreeSelectOption } from './index';

export const reservedKey = 'ewrewetet43etwefwer23423454'

export const flatOptions = (options: TreeSelectOption[], result = [], parentId: number | string = "") => {
    options.forEach(o => {
        result.push({ ...o, parentId });
        const hasChildren = o.children && o.children.length;
        if (hasChildren) flatOptions(o.children, result, o.id);
    });
    return result;
}

const collectChildren = (list: TreeSelectOption[]) => {
    list.map(item => {
        const hasChildren = item.children && item.children.length;
        if (hasChildren) {
            list = [...list, ...item.children];
            collectChildren(item.children);
        }
    })
    return list;
}

export const idAllChildrenMap = (list: TreeSelectOption[], result: Map<number | string, TreeSelectOption[]> = new Map()) => {
    list.map(item => {
        const hasChildren = item.children && item.children.length;
        if (hasChildren) {
            const children = collectChildren(item.children);
            result.set(item.id, children);
            idAllChildrenMap(item.children, result);
        } else {
            result.set(item.id, []);
        }
    })
    return result
}

export const idChildrenMap = (
    list: TreeSelectOption[],
    result: Map<number | string, TreeSelectOption[]> = new Map([[reservedKey, list]])
) => {
    list.map(item => {
        const hasChildren = item.children && item.children.length;
        if (hasChildren) {
            result.set(item.id, item.children);
            idChildrenMap(item.children, result);
        }
    })
    return result
}