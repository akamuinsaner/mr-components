import React from 'react';
import { TextFieldProps } from '@mui/material';
import { GridProps } from '@mui/material/Grid';
export type RuleConfig = {
    required?: boolean;
    len?: number;
    max?: number;
    min?: number;
    regex?: RegExp;
    msg?: string;
};
export type FormItemProps = {
    name: string;
    children: JSX.Element | {
        (props: Partial<TextFieldProps & {
            onChange: (value: any) => void;
        }>): JSX.Element;
    };
    rules?: RuleConfig[];
    checkable?: boolean;
    multiple?: boolean;
    gridProps?: GridProps | null;
};
export type FormItemInstanceType = {
    element?: HTMLElement;
    onChange?(v: any): void;
    getValue?: () => any;
    setValue?: (v: any) => void;
    setError?: (error: string) => void;
    validate?: (cb: (error: string, value: any) => void) => void;
};
type FormItemComponent<T> = React.FunctionComponent<T>;
declare const FormItem: FormItemComponent<FormItemProps>;
export default FormItem;
