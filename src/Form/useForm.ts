import React from 'react';
import { FormItemInstanceType } from './Item';

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

class FormInstance implements FormInstanceType {
    private initialized: boolean;
    private initialValues: { [name: string]: any };
    private store: { [name: string]: any };
    private wired: { [name: string]: React.MutableRefObject<FormItemInstanceType> };
    constructor() {
        this.initialized = false;
        this.initialValues = {};
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
        if (!this.initialized) {
            this.initialValues = this.store;
            this.initialized = true;
        }
        Object.entries(values).forEach(([name, value]) => {
            if (this.wired[name]) {
                this.wired[name].current.setValue(value);
            }
        })
        if (this.onValuesChange) {
            this.onValuesChange(oldStore, this.store);
        }
    }

    resetFields = () => {
        const oldStore = { ...this.store };
        this.store = { ...this.initialValues };
        Object.entries(this.wired).forEach(([name, _this]) => {
            _this.current.setValue(this.store[name]);
        })
        this.onValuesChange(oldStore, this.store);
    }

    scrollToField = (name) => {
        const _this = this.wired[name];
        if (!_this) return;
        _this.current.element.scrollIntoView();
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

