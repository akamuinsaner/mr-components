import React from 'react';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import FormItem from './Item';
import Submit from './Submit';
import { useForm } from './useForm';
import {
    FormComponent,
    FormProps,
} from './types';


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
        instance.onValuesChange = onValuesChange;
        instance.setFieldsValue(initialValues);
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