import React from 'react';
import Stack, { StackProps } from '@mui/material/Stack';
import Grid, { GridProps } from '@mui/material/Grid';
import FormItem, { FormItemProps } from './Item';
import Submit, { SubmitItemComponent, SubmitItemProps } from './Submit';
import { useForm } from './useForm';
import { FormInstanceType } from './useForm';

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

export const FormContext = React.createContext(null);

const Form: FormComponent<FormProps> = ({
    fullWidth = true,
    size = 'medium',
    disabled = false,
    form,
    children,
    initialValues = {},
    onValuesChange = () => {},
    onSubmit,
    onSubmitFail,
    layout,
    stackProps = {},
    gridProps = {},
    name
}) => {

    const instance = useForm(form);

    React.useEffect(() => {
        instance.setFieldsValue(initialValues);
        instance.onValuesChange = onValuesChange;
    }, [])

    const submitForm = (e) => {
        e.preventDefault();
        instance.validates((errors, values) => {
            if (errors && onSubmitFail) onSubmitFail(errors)
            if (!errors && onSubmit) onSubmit(values);
        })
    }


    let preChildren = children;

    if (layout === 'Stack') {
        preChildren = <Stack {...stackProps}>
            {children}
        </Stack>
    }

    if (layout === 'Grid') {
        preChildren = <Grid {...(gridProps.containerProps || {})} container>
            {children}
        </Grid>
    }


    return (
        <FormContext.Provider value={{
            instance,
            size,
            layout,
            gridProps,
            disabled,
            fullWidth
        }}>
            <form
                noValidate={true}
                onSubmit={submitForm}
            >
                {preChildren}
            </form>
        </FormContext.Provider>
    )
}

Form.Item = FormItem;
Form.Submit = Submit;
Form.useForm = useForm;

export default Form;