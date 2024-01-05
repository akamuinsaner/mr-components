import React from 'react';
import { StackProps } from '@mui/material/Stack';
import { GridProps } from '@mui/material/Grid';
import { FormItemProps } from './Item';
import { SubmitItemComponent, SubmitItemProps } from './Submit';
import { FormInstanceType } from './useForm';
type FormProps = {
    size?: 'small' | 'medium';
    disabled?: boolean;
    initialValues?: {
        [name: string]: any;
    };
    children: JSX.Element | JSX.Element[];
    onValuesChange?: (prev: any, cur: any) => void;
    onSubmit?: (values: any) => void;
    form?: FormInstanceType;
    layout?: 'Stack' | 'Grid';
    stackProps?: StackProps;
    gridProps?: {
        containerProps?: GridProps;
        itemProps?: GridProps;
    };
    name?: string;
};
type FormComponent<T> = React.FunctionComponent<T> & {
    useForm: () => FormInstanceType;
    Item: React.FunctionComponent<FormItemProps>;
    Submit: SubmitItemComponent<SubmitItemProps>;
};
export declare const FormContext: React.Context<any>;
declare const Form: FormComponent<FormProps>;
export default Form;
