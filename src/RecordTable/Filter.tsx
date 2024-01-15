import React from 'react';
import {
    IconButton,
    Popper,
    DialogActions,
    DialogContent,
    Button,
    Checkbox,
    FormControlLabel,
    FormGroup,
    Autocomplete,
    TextField,
    MenuItem,
    PopperProps
} from '@mui/material';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import styles from '../index.module.css';
import {
    RecordTableColumn,
    RecordTableProps,
    MRTableContext,
} from '.';

export type RecordTableFilters = {
    parentId?: string | number;
    name: string;
    id: string | number;
    children?: RecordTableFilters;
}

export type ReactTableFilterModes = 'autoComplete' | 'input' | 'checkbox';

export type RecordTableFilterProps = {
    column: RecordTableColumn<any>;
    index: number;
    value?: Array<string | number>;
    onChange?: (value: Array<string | number>) => void;
}

export default ({
    column,
    index,
    value,
    onChange
}: RecordTableFilterProps) => {
    const context = React.useContext<Partial<RecordTableProps<any>>>(MRTableContext);
    const { filterInfo } = context;
    const filters = filterInfo ?.filters ? filterInfo?.filters(column, index) : column.filters
    if (!filters) return null;
    const mode = filterInfo?.filterMode ? filterInfo?.filterMode(column, index) : column.filterMode
    const [values, setValues] = React.useState<Array<string | number>>([]);
    const [anchorEl, setAnchorEl] = React.useState(null);
    React.useEffect(() => {
        if (value) setValues(value);
    }, [value])
    const reset = (e) => {
        e.stopPropagation();
        setValues([]);
    }
    const onConfirm = (e) => {
        e.stopPropagation();
        onChange(values);
        closePopper();
    }
    const showPopper = (e) => {
        e.stopPropagation();
        setAnchorEl(e.currentTarget)
    }
    const closePopper = () => {
        setAnchorEl(null);
        document.removeEventListener('click', closePopper);
        document.body.click()
    }
    React.useEffect(() => {
        if (anchorEl) document.addEventListener('click', closePopper);
    }, [anchorEl]);
    const sxProps = {
        width: '200px'
    }
    const renderFilters = () => {
        switch (mode) {
            case 'input':
                return (<TextField
                    value={values[0]}
                    onChange={e => setValues([e.target.value])}
                    size="small"
                    sx={sxProps}
                    placeholder="please input"
                />)
            case 'autoComplete':
                return (<Autocomplete
                    multiple
                    options={filters}
                    renderInput={p => <TextField
                        {...p}
                        placeholder="please select"
                    />}
                    getOptionKey={o => o.id}
                    getOptionLabel={o => o.name}
                    size="small"
                    sx={sxProps}
                    value={filters.filter(f => values.includes(f.id))}
                    onChange={(e, v) => setValues(v.map(f => f.id))}
                />)
            case 'checkbox':
            default:
                return (<FormGroup>
                    {filters.map(filter => (<FormControlLabel
                        key={filter.id}
                        control={<Checkbox
                            checked={values.includes(filter.id)}
                            onChange={(e) => {
                                if (e.target.checked) {
                                    setValues([...values, filter.id]);
                                } else {
                                    setValues(values.filter(v => v !== filter.id));
                                }
                            }}
                        />}
                        label={filter.name}
                    />))}
                </FormGroup>)
        }
    }
    let popperProps: PopperProps = {
        open: !!anchorEl,
        anchorEl,
        placement: "bottom-end",
        className: styles["mr-table-filter-popper"],
        onClick: e => e.stopPropagation(),
    };
    if (filterInfo?.popperProps) {
        if (typeof filterInfo.popperProps === 'function') {
            popperProps = Object.assign({}, popperProps, filterInfo.popperProps(column, index));
        } else {
            popperProps = Object.assign({}, popperProps, filterInfo.popperProps);
        }
    }

    let FilterIcon: any = FilterAltIcon;
    if (filterInfo?.filterIcon) {
        FilterIcon = filterInfo.filterIcon(column, index);
    }

    return (
        <>
            <IconButton
                size='small'
                sx={{ float: 'right' }}
                onClick={showPopper}
            >
                <FilterIcon
                    fontSize="small"
                />
            </IconButton>
            <Popper {...popperProps}>
                <DialogContent>
                    {renderFilters()}
                </DialogContent>
                <DialogActions>
                    <Button
                        size='small'
                        variant="text"
                        disabled={!values.length}
                        onClick={reset}
                    >reset</Button>
                    <Button
                        size='small'
                        variant="contained"
                        onClick={onConfirm}
                    >confirm</Button>
                </DialogActions>
            </Popper>
        </>

    )
}