import { FormItemInstanceType } from './Item';
import React from 'react';
export interface FormInstanceType {
    wire: (name: string, _this: React.MutableRefObject<FormItemInstanceType>) => void;
    unWire: (name: string) => void;
    getFieldsValue: (names?: string[]) => void;
    onValuesChange?: (prev: any, cur: any) => void;
    getFieldValue: (name: string) => void;
    setFieldValue: (name: string, value: any) => void;
    setFieldsValue: (values: {
        [name: string]: any;
    }) => void;
    validates: (callback: (errors: any, value: any) => void, names?: string[]) => void;
}
declare const useForm: (form?: FormInstanceType) => FormInstanceType;
export { useForm };
