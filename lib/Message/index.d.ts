import React from 'react';
import { SnackbarProps } from '@mui/material';
type cb = (msg: string, { duration, onClose, placement, icon, }?: {
    duration?: number;
    onClose?: () => void;
    placement?: SnackbarProps["anchorOrigin"];
    icon?: React.ReactNode;
}) => void;
declare class message {
    static info: cb;
    static warning: cb;
    static success: cb;
    static error: cb;
}
declare const MessageProvider: ({ children }: {
    children: any;
}) => import("react/jsx-runtime").JSX.Element;
export default message;
export { MessageProvider };
