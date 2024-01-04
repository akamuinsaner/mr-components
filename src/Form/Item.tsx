import React from 'react';
import { ruleCheck } from './helpers';
import Form from './Form';
import { TextFieldProps } from '@mui/material';
import Grid, { GridProps } from '@mui/material/Grid';
import { v4 as uuidV4 } from 'uuid';

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
    multiple?: boolean;
    gridProps?: GridProps | null;
}

export type FormItemExtraProps = {
    emitValue?(v: any): void;
    getValue?: () => any;
    setValue?: (v: any) => void;
    setError?: (error: string) => void;
    validate?: (cb: (error: string, value: any) => void) => void;
}

type FormItemComponent<T> = React.FunctionComponent<T>

const valueHelper = (e) => {
    if (e?.target && e?.target?.value !== null) return e.target.value;
    return e;
}

const FormItem: FormItemComponent<FormItemProps> = ({
    name,
    multiple,
    children,
    rules = [],
    gridProps
}) => {
    const _this = React.useRef<FormItemExtraProps>({});
    const [value, setValue] = React.useState<any>((multiple ? [] : ''));
    const [error, setError] = React.useState<string>(null);
    const _setError = React.useCallback((error) => {
        setError(error);
    }, []);

    const _setValue = React.useCallback((v) => {
        const value = (!v && multiple) ? [] : v
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
        setError: _setError,
        setValue: _setValue,
        getValue: _getValue,
        validate: _validate,
    }

    React.useEffect(() => {
        Form.register(name, _this);
        return () => {
            Form.unRegister(name);
        }
    }, []);


    const errorCheck = React.useCallback((value) => {
        if (!rules || !rules.length) return '';
        return ruleCheck(name, value, rules);
    }, [name]);

    const valueOnChange = React.useCallback((e: any) => {
        const value = valueHelper(e);
        setError(errorCheck(value));
        setValue(value);
        if (_this.current?.emitValue) {
            _this.current?.emitValue(value);
        }
    }, []);

    const required = !!rules.find(item => item.required);

    const props: Partial<TextFieldProps> = {
        value,
        onChange: valueOnChange,
        error: !!error,
        helperText: error,
        required,
    }

    let subComponent: JSX.Element;
    if (typeof children === 'function') {
        subComponent = children(props);
    } else {
        subComponent = children;
    }
    if (gridProps) {
        return <Grid {...gridProps} item>
            {React.cloneElement(subComponent, {
                ...subComponent.props,
                ...props,
                fullWidth: true
            })}
        </Grid>
    }
    return React.cloneElement(subComponent, {
        key: uuidV4(),
        ...subComponent.props,
        ...props,
        fullWidth: true
    })
}

export default FormItem;


