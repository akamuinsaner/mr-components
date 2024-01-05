import React from 'react';
import Form from './Form';
import Grid, { GridProps } from '@mui/material/Grid';
import { FormContext } from './Form';
import { FormInstanceType } from './useForm';

export type SubmitItemProps = {
    children: JSX.Element;
    gridProps?: GridProps
}


export type SubmitItemComponent<T> = React.FunctionComponent<T>

const Submit: SubmitItemComponent<SubmitItemProps> = ({
    children,
    gridProps
}) => {
    const context = React.useContext<any>(FormContext);
    const {
        instance,
        size,
        disabled,
        layout,
        gridProps: { itemProps }
    } = context
    const preChildren = React.cloneElement(children, {
        size,
        disabled,
        type: 'submit',
        ...children.props,
        onClick: () => {
            if ('onClick' in children.props) {
                children.props.onClick();
            }
        }
    })
    if (layout === 'Grid') {
        return <Grid {...(itemProps || {})} {...gridProps} item>
            {preChildren}
        </Grid>
    }
    return preChildren
}

export default Submit;



