import React from 'react';
import { GridProps } from '@mui/material/Grid';
export type SubmitItemProps = {
    children: JSX.Element;
    data?: object | {
        (values: any): object;
    };
    gridProps?: GridProps;
};
export type SubmitItemExtraProps = {
    setOrder?: (o: number) => void;
    submit?: (data?: SubmitItemProps["data"]) => void;
};
export type SubmitItemComponent<T> = React.FunctionComponent<T>;
declare const Submit: SubmitItemComponent<SubmitItemProps>;
export default Submit;
