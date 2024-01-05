import { FormItemInstanceType } from './Item';
import React from 'react';

export interface FormInstanceType {
    wire: (name: string, _this: React.MutableRefObject<FormItemInstanceType>) => void;
    unWire: (name: string) => void;
    getFieldsValue: (names?: string[]) => void;
    onValuesChange?: (prev: any, cur: any) => void;
    getFieldValue: (name: string) => void;
    setFieldValue: (name: string, value: any) => void;
    setFieldsValue: (values: { [name: string]: any }) => void;
    validates: (callback: (errors: any, value: any) => void, names?: string[]) => void;
}

class FormInstance implements FormInstanceType {
    private store: { [name: string]: any };
    private wired: { [name: string]: React.MutableRefObject<FormItemInstanceType> };
    constructor() {
        this.store = {};
        this.wired = {};
    }

    wire = (name, _this) => {
        this.wired[name] = _this
    }

    unWire = (name) => {
        delete this.store[name];
        delete this.wired[name];
    }

    onValuesChange = (prev: any, cur: any) => {

    }

    getFieldsValue = (names) => {
        if (names) {
            return names.reduce((pre, key) => {
                return key in this.store
                    ? { ...pre, [key]: this.store[key] }
                    : pre;
            }, {})
        }
        return this.store;
    };

    getFieldValue = (name) => {
        return this.store[name];
    }

    setFieldValue = (name, value) => {
        const oldStore = { ...this.store };
        this.store = { ...this.store, [name]: value };
        this.wired[name].current.setValue(value);
        this.onValuesChange(oldStore, this.store);
    }

    setFieldsValue = (values) => {
        const oldStore = { ...this.store };
        this.store = { ...this.store, ...values };
        Object.entries(values).forEach(([name, value]) => {
            this.wired[name].current.setValue(value);
        })
        this.onValuesChange(oldStore, this.store);
    }

    validates = (cb, names) => {
        let errors = null;
        let values = {}
        Object.entries(this.wired).forEach(([key, _this]) => {
            if ((names && (names.includes(key))) || !names) {
                _this.current.validate((error, value) => {
                    if (error) errors = Object.assign({}, errors, { [key]: error });
                    values = Object.assign({}, values, { [key]: value });
                })
            }
        })
        typeof cb === 'function' && cb(errors, values);
    }
}

const useForm = (form?: FormInstanceType) => {
    const formRef = React.useRef<FormInstanceType>(null);
    if (form) {
        formRef.current = form;
    } else {
        formRef.current = new FormInstance();
    }
    return formRef.current;
}

export { useForm };

