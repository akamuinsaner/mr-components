/// <reference types="react" />
import { TreeSelectOption } from './types';
export declare const reservedKey = "ewrewetet43etwefwer23423454";
type commonType<T> = {
    id: number | string;
    name: React.ReactNode | string | number;
    parentId?: number | string;
    children?: T[];
};
export declare const flatOptions: <T extends commonType<T>>(options: T[], result?: any[], parentId?: number | string) => T[];
export declare const idAllChildrenMap: <T extends commonType<T>>(list: T[], result?: Map<string | number, T[]>) => Map<string | number, T[]>;
export declare const idChildrenMap: (list: TreeSelectOption[], result?: Map<number | string, TreeSelectOption[]>) => Map<string | number, TreeSelectOption[]>;
export {};
