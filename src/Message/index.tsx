import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import type { AlertColor } from '@mui/material';
import { SnackbarProps } from '@mui/material';

type cb = (msg: string, {
    duration,
    onClose,
    placement,
    icon,
}?: {
    duration?: number;
    onClose?: () => void;
    placement?: SnackbarProps["anchorOrigin"];
    icon?: React.ReactNode;
}) => void

const GlobalMessage = () => {
    const defaultPlacement: SnackbarProps["anchorOrigin"] = { vertical: 'top', horizontal: 'center' };
    const [open, setOpen] = React.useState<boolean>(false);
    const [content, setContent] = React.useState<string>("");
    const [severity, setSeverity] = React.useState<AlertColor>("info");
    const [duration, setDuration] = React.useState<number>(2000);
    const [placement, setPlacement] = React.useState<SnackbarProps["anchorOrigin"]>(defaultPlacement);
    const [icon, setIcon] = React.useState<React.ReactNode>(null);
    const closeFuncRef = React.useRef(null);
    const close: SnackbarProps["onClose"] = (event, reason) => setOpen(false);

    React.useEffect(() => {
        if (!open && closeFuncRef.current) closeFuncRef.current()
    }, [open])

    const commonMsgFunc = (severity: AlertColor): cb => {
        return (msg, {
            duration = 2000,
            onClose = () => { },
            placement = defaultPlacement,
            icon = null
        } = {
                duration: 2000,
                onClose: () => { },
                placement: defaultPlacement,
                icon: null
            }) => {
            setOpen(true);
            setSeverity(severity);
            setContent(msg);
            setDuration(duration)
            closeFuncRef.current = onClose;
            setPlacement(placement);
            setIcon(icon);
        };
    }

    React.useEffect(() => {
        message.info = commonMsgFunc('info')
        message.warning = commonMsgFunc('warning')
        message.success = commonMsgFunc('success')
        message.error = commonMsgFunc('error')
    }, [])

    return (
        <Snackbar
            key={content}
            anchorOrigin={placement}
            open={open}
            autoHideDuration={duration}
            onClose={close}>
            <Alert
                severity={severity}
                sx={{ width: '100%' }}
                icon={icon}
            >
                {content}
            </Alert>
        </Snackbar>
    )
}

class message {
    static info: cb
    static warning: cb
    static success: cb
    static error: cb
}

const MessageProvider = ({
    children
}: { children: any }) => {
    return <>
        {children}
        <GlobalMessage />
    </>

}



export default message;

export {
    MessageProvider
}

