import React from 'react';
import { ruleCheck } from './helpers';
import { FormContext } from './Form';
import { TextFieldProps } from '@mui/material';
import Grid, { GridProps } from '@mui/material/Grid';

const valueHelper = (e, checkable) => {
    if (checkable) return e.target.checked;
    if (e?.target && e?.target?.value !== null) return e.target.value;
    return e;
}

export type FormItemInstanceType = {
    element?: HTMLElement;
    onChange?(v: any): void;
    getValue?: () => any;
    setValue?: (v: any) => void;
    setError?: (error: string) => void;
    validate?: (cb: (error: string, value: any) => void) => void;
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

export type FormItemComponent<T> = React.FunctionComponent<T>

const FormItem: FormItemComponent<FormItemProps> = ({
    name,
    checkable = false,
    multiple,
    children,
    rules = [],
    gridProps
}) => {
    const itemRef = React.useRef<HTMLElement>(null);
    const context = React.useContext<any>(FormContext);
    const {
        instance,
        size,
        disabled,
        layout,
        gridProps: { itemProps },
        fullWidth
    } = context

    const getSafeValue = (value?: any) => {
        if (value) return value;
        if (multiple) return [];
        if (checkable) return false;
        return '';
    }

    const _this = React.useRef<FormItemInstanceType>({});
    const [value, setValue] = React.useState<any>(getSafeValue());
    const [error, setError] = React.useState<string>(null);



    const _setError = React.useCallback((error) => {
        setError(error);
    }, []);

    const _setValue = React.useCallback((v) => {
        const value = getSafeValue(v)
        setValue(value)
    }, []);

    const _getValue = React.useCallback(() => {
        return value;
    }, [value]);

    const _validate = React.useCallback((cb) => {
        const err = errorCheck(value)
        setError(err);
        cb(err, value);
    }, [value]);


    _this.current = {

        ..._this.current,
        element: itemRef.current,
        setError: _setError,
        setValue: _setValue,
        getValue: _getValue,
        validate: _validate,
    }

    React.useEffect(() => {
        instance.wire(name, _this);
        return () => {
            instance.unWire(name);
        }
    }, []);

    React.useEffect(() => {
        _setValue(instance.getFieldValue(name));
    }, [])


    const errorCheck = React.useCallback((value) => {
        if (!rules || !rules.length) return '';
        return ruleCheck(name, value, rules);
    }, [name]);

    const valueOnChange = React.useCallback((e: any) => {
        const value = valueHelper(e, checkable);
        setError(errorCheck(value));
        setValue(value);
        instance.setFieldValue(name, value);
    }, []);

    const required = !!rules.find(item => item.required);

    const props: Partial<TextFieldProps> = {
        value,
        onChange: valueOnChange,
        error: !!error,
        helperText: error,
        required,
        size,
        disabled,
    }

    let subComponent: JSX.Element;
    if (typeof children === 'function') {
        subComponent = children(props);
    } else {
        subComponent = children;
    }

    const preChildren = React.cloneElement(subComponent, {
        ref: itemRef,
        size,
        disabled,
        fullWidth,
        ...subComponent.props,
        ...props,
    });
    if (layout === 'Grid') {
        return <Grid {...(itemProps || {})} {...gridProps} item>
            {preChildren}
        </Grid>
    }
    return preChildren
}

export default FormItem;


