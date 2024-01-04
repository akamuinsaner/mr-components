import React from 'react';
import { StackProps } from '@mui/material/Stack';
import { GridProps } from '@mui/material/Grid';
import { FormItemProps, FormItemExtraProps } from './Item';
import { SubmitItemComponent, SubmitItemProps } from './Submit';
type FormProps = {
    initialValues?: {
        [name: string]: any;
    };
    children: JSX.Element | JSX.Element[];
    onValuesChange?: (prev: any, cur: any) => void;
    submit?: (values: any) => void;
    form?: formInstance;
    layout?: 'Stack' | 'Grid';
    stackProps?: StackProps;
    gridProps?: GridProps;
    name?: string;
};
export type formInstance = {
    clear: () => void;
    reset: () => void;
    setValues: (value: {
        [name: string]: any;
    }) => void;
    getValues: () => any;
    validates: (callback?: (errors: any, values: any) => void, fields?: string[]) => void;
};
type FormComponent<T> = React.FunctionComponent<T> & {
    useForm: () => formInstance;
    register?: (key: string, _this: React.MutableRefObject<FormItemExtraProps>) => void;
    registerSubmits?: any;
    unRegister?: (key: string) => void;
    Item: React.FunctionComponent<FormItemProps>;
    Submit: SubmitItemComponent<SubmitItemProps>;
};
declare const Form: FormComponent<FormProps>;
export default Form;
