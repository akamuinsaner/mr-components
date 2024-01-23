import React from 'react';
import { GridProps } from '@mui/material/Grid';
export type SubmitItemProps = {
    children: JSX.Element;
    gridProps?: GridProps;
};
export type SubmitItemComponent<T> = React.FunctionComponent<T>;
declare const Submit: SubmitItemComponent<SubmitItemProps>;
export default Submit;
