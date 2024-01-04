import React from 'react';
import Stack, { StackProps } from '@mui/material/Stack';
import Grid, { GridProps } from '@mui/material/Grid';
import FormItem, { FormItemProps, FormItemExtraProps } from './Item';
import Submit, { SubmitItemComponent, SubmitItemProps } from './Submit';

type FormProps = {
    initialValues?: { [name: string]: any };
    children: JSX.Element | JSX.Element[];
    onValuesChange?: (prev: any, cur: any) => void;
    submit?: (values: any) => void;
    form?: formInstance;
    layout?: 'Stack' | 'Grid';
    stackProps?: StackProps;
    gridProps?: GridProps;
    name?: string
}

export type formInstance = {
    clear: () => void;
    reset: () => void;
    setValues: (value: { [name: string]: any }) => void;
    getValues: () => any;
    validates: (callback?: (errors, values) => void, fields?: string[]) => void;
}

type FormComponent<T> = React.FunctionComponent<T> & {
    useForm: () => formInstance;
    register?: (key: string, _this: React.MutableRefObject<FormItemExtraProps>) => void;
    registerSubmits?: any;
    unRegister?: (key: string) => void;
    Item: React.FunctionComponent<FormItemProps>;
    Submit: SubmitItemComponent<SubmitItemProps>
}



const Form: FormComponent<FormProps> = ({
    form,
    children,
    initialValues = {},
    onValuesChange,
    submit,
    layout,
    stackProps = {},
    gridProps = {},
    name
}) => {
    const fieldValues = React.useRef<any>(Object.assign({}, initialValues));
    const wiredFields = React.useRef<{ [name: string]: React.MutableRefObject<FormItemExtraProps>}>({});
    const wiredSubmits = React.useRef<any[]>([]);
    const fieldsChange = (values: any) => {
        onValuesChange && onValuesChange(fieldValues.current, values);
        fieldValues.current = values;
    }

    const getValues = React.useCallback((fields?: string[]) => {
        if (fields && fields.length) {
            return fields.reduce((prev, key) => {
                return wiredFields.current?.[key]
                    ? { ...prev, [key]: wiredFields.current[key].current.getValue() }
                    : { ...prev }
            }, {});
        }
        return Object.entries(wiredFields.current).reduce((prev, [key, _this]) => {
            return { ...prev, [key]: _this.current.getValue() }
        }, {});
    }, []);

    const setValues = React.useCallback((values: any) => {
        Object.entries(values).forEach(([key, value]) => {
            if (key in values) wiredFields.current[key]?.current.setValue(value);
        })
        fieldsChange(values);
    }, []);

    const clear = React.useCallback(() => {
        Object.entries(wiredFields.current).forEach(([key, _this]) => {
            _this.current.setError('');
        })
        fieldsChange({})
    }, []);

    const reset = React.useCallback(() => {
        Object.entries(wiredFields.current).forEach(([key, _this]) => {
            _this.current.setError('');
            if (key in initialValues) {
                _this.current.setValue(initialValues[key]);
            } else {
                _this.current.setValue('')
            }
        })
        fieldsChange({ ...initialValues })
    }, []);

    const validates = React.useCallback((cb, fields) => {
        let errors = null;
        let values = {}
        Object.entries(wiredFields.current).forEach(([key, _this]) => {
            if ((fields && (fields.includes(key))) || !fields) {
                _this.current.validate((error, value) => {
                    if (error) errors = Object.assign({}, errors, { [key]: error });
                    values = Object.assign({}, values, { [key]: value });
                })
            }
        })
        typeof cb === 'function' && cb(errors, values);
    }, []);

    const submitForm = React.useCallback((data?: SubmitItemProps["data"]) => {
        console.log(wiredFields)
        let errors = null;
        let values = {}
        Object.entries(wiredFields.current).forEach(([key, _this]) => {
            _this.current.validate((error, value) => {
                if (error) errors = Object.assign({}, errors, { [key]: error });
                values = Object.assign({}, values, { [key]: value });
            })
        })
        if (!errors) {
            if (typeof submit === 'function') {
                if (!data) submit(values);
                if (data && typeof data !== 'function') submit(data);
                if (data && typeof data === 'function') submit(data(values))
            }
        }
    }, []);

    Form.registerSubmits = React.useCallback((_this) => {
        const order = wiredSubmits.current.length;
        wiredSubmits.current.push(_this);
        _this.current.submit = submitForm;
        _this.current.setOrder(order);
    }, []);

    Form.register = React.useCallback((key: string, _this: React.MutableRefObject<FormItemExtraProps>) => {
        if (key in fieldValues.current) _this.current.setValue(fieldValues.current?.[key] || null);
        _this.current.emitValue = (value) => fieldsChange({ ...fieldValues.current, [key]: value });
        wiredFields.current[key] = _this
    }, []);

    Form.unRegister = React.useCallback((key: string) => {
        delete wiredFields.current[key];
        delete fieldValues.current[key];
    }, []);

    const registerForm = React.useCallback(() => {
        if (form) {
            form["getValues"] = getValues;
            form["setValues"] = setValues;
            form["reset"] = reset;
            form["clear"] = clear;
            form["validates"] = validates;
        }
    }, [form]);

    registerForm();

    let preChildren = children;

    if (layout === 'Stack') {
        preChildren = <Stack {...stackProps}>
            {children}
        </Stack>
    }

    if (layout === 'Grid') {
        preChildren = <Grid {...gridProps} container>
            {children}
        </Grid>
    }

    return <>{preChildren}</>
}

Form.Item = FormItem;
Form.Submit = Submit;

Form.useForm = () => {
    const form = React.useRef<formInstance>({
        clear: () => { },
        reset: () => { },
        setValues: () => { },
        getValues: () => { },
        validates: () => { },
    });
    return form.current;
}

export default Form;