export type FormProps = {
    fullWidth?: boolean;
    size?: 'small' | 'medium';
    disabled?: boolean;
    initialValues?: { [name: string]: any };
    children: JSX.Element | JSX.Element[];
    onValuesChange?: (prev: any, cur: any) => void;
    onSubmit?: (values: any) => void;
    onSubmitFail?: (errors: any) => void;
    form?: FormInstanceType;
    layout?: 'Stack' | 'Grid';
    stackProps?: StackProps;
    gridProps?: {
        containerProps?: GridProps;
        itemProps?: GridProps;
    };
    name?: string
}

export type FormComponent<T> = React.FunctionComponent<T> & {
    useForm: () => FormInstanceType;
    Item: React.FunctionComponent<FormItemProps>;
    Submit: SubmitItemComponent<SubmitItemProps>
}

export type RuleConfig = {
    required?: boolean;
    len?: number;
    max?: number;
    min?: number;
    regex?: RegExp;
    msg?: string;
}


export type FormItemProps = {
    name: string;
    children: JSX.Element | { (props: Partial<TextFieldProps & { onChange: (value: any) => void }>): JSX.Element };
    rules?: RuleConfig[];
    checkable?: boolean;
    multiple?: boolean;
    gridProps?: GridProps | null;
}

export type FormItemInstanceType = {
    element?: HTMLElement;
    onChange?(v: any): void;
    getValue?: () => any;
    setValue?: (v: any) => void;
    setError?: (error: string) => void;
    validate?: (cb: (error: string, value: any) => void) => void;
}

export type FormItemComponent<T> = React.FunctionComponent<T>

export type SubmitItemProps = {
    children: JSX.Element;
    gridProps?: GridProps
}


export type SubmitItemComponent<T> = React.FunctionComponent<T>;

export interface FormInstanceType {
    wire: (name: string, _this: React.MutableRefObject<FormItemInstanceType>) => void;
    unWire: (name: string) => void;
    getFieldsValue: (names?: string[]) => any;
    onValuesChange?: (prev: any, cur: any) => void;
    getFieldValue: (name: string) => any;
    setFieldValue: (name: string, value: any) => void;
    setFieldsValue: (values: { [name: string]: any }) => void;
    resetFields: () => void;
    scrollToField: (name: string) => void;
    validates: (callback: (errors: any, value: any) => void, names?: string[]) => void;
}