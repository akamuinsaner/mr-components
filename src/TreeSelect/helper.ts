import { TreeSelectOption } from './types';

export const reservedKey = 'ewrewetet43etwefwer23423454'

type commonType<T> = {
    id: number | string;
    name: React.ReactNode | string | number;
    parentId?: number | string;
    children?: T[]
}

export const flatOptions = <T extends commonType<T>>(
    options: T[],
    result = [],
    parentId: number | string = ""
): T[] => {
    options.forEach(o => {
        result.push({ ...o, parentId });
        const hasChildren = o.children && o.children.length;
        if (hasChildren) flatOptions(o.children, result, o.id);
    });
    return result;
}

const collectChildren = <T extends commonType<T>>(list: T[]): T[] => {
    list.map(item => {
        const hasChildren = item.children && item.children.length;
        if (hasChildren) {
            list = [...list, ...item.children];
            collectChildren(item.children);
        }
    })
    return list;
}

export const idAllChildrenMap = <T extends commonType<T>>(
    list: T[],
    result: Map<number | string, T[]> = new Map()
) => {
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