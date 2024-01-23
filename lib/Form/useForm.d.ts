import React from 'react';
import { FormItemInstanceType } from './Item';
export interface FormInstanceType {
    wire: (name: string, _this: React.MutableRefObject<FormItemInstanceType>) => void;
    unWire: (name: string) => void;
    getFieldsValue: (names?: string[]) => any;
    onValuesChange?: (prev: any, cur: any) => void;
    getFieldValue: (name: string) => any;
    setFieldValue: (name: string, value: any) => void;
    setFieldsValue: (values: {
        [name: string]: any;
    }) => void;
    resetFields: () => void;
    scrollToField: (name: string) => void;
    validates: (callback: (errors: any, value: any) => void, names?: string[]) => void;
}
declare const useForm: (form?: FormInstanceType) => FormInstanceType;
export { useForm };
