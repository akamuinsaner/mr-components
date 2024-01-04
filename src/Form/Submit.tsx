import React from 'react';
import Form from './Form';
import Grid, { GridProps } from '@mui/material/Grid';

export type SubmitItemProps = {
    children: JSX.Element;
    data?: object | { (values: any): object };
    gridProps?: GridProps
}

export type SubmitItemExtraProps = {
    setOrder?: (o: number) => void;
    submit?: (data?: SubmitItemProps["data"]) => void;
}

export type SubmitItemComponent<T> = React.FunctionComponent<T>

const Submit: SubmitItemComponent<SubmitItemProps> = ({
    children,
    data,
    gridProps
}) => {
    const _this = React.useRef<SubmitItemExtraProps>({});
    const order = React.useRef<number>(null);

    const _setOrder = (o: number) => order.current = o;

    _this.current = {
        ..._this.current,
        setOrder: _setOrder,
    }

    React.useEffect(() => {
        Form.registerSubmits(_this);
        return () => {

        }
    }, []);
    if (gridProps) {
        return <Grid {...gridProps} item>
            {React.cloneElement(children, {
                ...children.props,
                onClick: () => {
                    _this.current.submit(data);
                    if ('onClick' in children.props) {
                        children.props.onClick();
                    }
                }
            })}
        </Grid>
    }
    return React.cloneElement(children, {
        ...children.props,
        type: 'submit',
        onClick: () => {
            _this.current.submit(data);
            if ('onClick' in children.props) {
                children.props.onClick();
            }
        }
    })
}

export default Submit;



