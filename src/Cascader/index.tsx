import React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { TextFieldProps } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Chip from '@mui/material/Chip';
import Tag from '../TreeSelect/Tag';

import { flatOptions, idAllChildrenMap } from '../TreeSelect/helper';
import DropDown from './DropDown';
import Options from './Options';
import { TreeSelectOption } from '../TreeSelect';

export type CascaderOption = TreeSelectOption;

export type CascaderProps = {
    options: CascaderOption[];
    multiple?: boolean;
    checkable?: boolean;
    popperStyle?: React.CSSProperties;
    popperClassName?: string;
    search?: boolean;
    value?: any;
    onChange?: (v: any) => void;
    loadData?: (o: CascaderOption) => Promise<CascaderOption[]>;
    allowClear?: boolean;
    maxTagCount?: number | 'responsive';
}

const Cascader = ({
    search = false,
    options,
    multiple = false,
    checkable = false,
    popperStyle = {},
    popperClassName,
    value,
    onChange,
    loadData,
    allowClear = false,
    maxTagCount = 0,
    ...inputProps
}: TextFieldProps & CascaderProps) => {
    const inputRef = React.useRef(null);
    const eleRef = React.useRef<HTMLElement>(null);
    const [tagWidths, setTagWidths] = React.useState([]);
    const [initialized, setInitialized] = React.useState<boolean>(false);
    const [anchorEl, setAnchorEl] = React.useState<HTMLElement>(null);
    const [hovering, setHovering] = React.useState<boolean>(false);
    const [selected, setSelected] = React.useState<CascaderOption["id"][]>(Array.isArray(value) ? value : (value ? [value] : []));
    const [tagLimit, setTagLimit] = React.useState<number>(10000);
    const [inputValue, setInputValue] = React.useState<string>('');
    const [flattedOptions, setFlattedOptions] = React.useState<CascaderOption[]>(flatOptions(options));
    const [allChildrenMap, setAllChildrenMap] = React.useState<Map<CascaderOption["id"], CascaderOption[]>>(new Map())
    const [openKeys, setOpenKeys] = React.useState<CascaderOption["id"][]>([""]);
    React.useEffect(() => {
        setAllChildrenMap(idAllChildrenMap(options))
    }, [flattedOptions]);

    const calculateTagLimit = () => {
        const inputWidth = inputRef.current.offsetWidth;
        let width = 0;
        for (let i = 0; i < tagWidths.length;) {
            width += tagWidths[0];
            if (inputWidth - width < 150) {
                setTagLimit(i + 1);
                break;
            } else {
                i++;
            }
        }
    };
    React.useEffect(() => {
        if (typeof maxTagCount === 'number') setTagLimit(maxTagCount || 10000);
        if (maxTagCount === 'responsive') {
            setTagLimit(10000);
            calculateTagLimit();
            window.addEventListener('resize', calculateTagLimit);
        }
        return () => {
            window.removeEventListener('resize', calculateTagLimit);
        }
    }, [maxTagCount, tagWidths, selected]);
    const onClear = () => setSelected([]);
    const openDropDown = (e) => {
        e.stopPropagation();
        setInputValue('');
        setAnchorEl(eleRef.current);
    };
    const closeOptions = (e) => {
        setInputValue('');
        setAnchorEl(null);
        document.removeEventListener('click', closeOptions);
    };

    React.useEffect(() => {
        if (initialized) onChange && onChange(multiple ? selected : selected[0]);
        else setInitialized(true)
    }, [selected]);
    React.useEffect(() => {
        if (anchorEl) setTimeout(() => {
            document.addEventListener('click', closeOptions)
        }, 300);
    }, [anchorEl])
    const renderInput = (params) => {
        const isFocus = !!anchorEl;
        return (
            <TextField
                {...params}
                {...inputProps}
                ref={inputRef}
                onClick={e => e.stopPropagation()}
                focused={isFocus}
                placeholder={(isFocus && !multiple) ? renderValue() : inputProps.placeholder}
                sx={{
                    '& .MuiAutocomplete-inputRoot': {
                        flexWrap: maxTagCount === 'responsive' ? 'nowrap' : 'wrap'
                    }
                }}
            />
        )
    };

    const renderTags = (value: readonly any[], getTagProps) => {
        const rendered = value.slice(0, tagLimit);
        const rest = value.slice(tagLimit);
        const size = inputProps.size;
        return rendered.map((id, index) => {
            const o = flattedOptions.find(o => o.id === id);
            return (<Tag
                size={size}
                onDelete={(id) => {
                    setSelected(selected.filter(s => s !== id));
                    setTagWidths(tagWidths.filter((w, i) => i !== index));
                }}
                option={o}
                onInit={(width) => {
                    let widths = [...tagWidths];
                    widths[index] = width;
                    setTagWidths(widths);
                }}
            />)
        }).concat(rest.length
            ? [<Chip size={size} label={`+${rest.length}...`} />]
            : [])
    };

    
    const renderPopupIcon = () => {
        if (hovering && selected.length && allowClear) {
            return <CancelIcon onClick={onClear} />;
        } else {
            return <ArrowDropDownIcon onClick={openDropDown} />
        }
    };

    const onInputChange = (e, value, reason) => {
        if (reason === 'reset' && multiple) return;
        setInputValue(value);
    };

    const renderValue = () => {
        if (multiple) return selected
        const isFocused = !!anchorEl;
        if (isFocused && search) {
            return inputValue;
        }
        const o = flattedOptions.find(o => o.id === selected[0]);
        return o?.name || '';
    };

    const renderDropDowns = () => {
        return openKeys.map((key, depth) => {
            const showCheck = checkable && multiple;
            const dense = inputProps.size === 'small';
            const openChildren = id => {
                const a = [...openKeys];
                a[depth + 1] = id;
                setOpenKeys(a);
            }
            return (
                <DropDown
                    key={key}
                    depth={depth}
                    anchorEl={anchorEl}
                    popperStyle={popperStyle}
                    popperClassName={popperClassName}
                >
                    <Options
                        dense={dense}
                        parentId={key}
                        showCheck={showCheck}
                        search={search}
                        multiple={multiple}
                        selected={selected}
                        inputValue={inputValue}
                        flatOptions={flattedOptions}
                        setSelected={setSelected}
                        allChildrenMap={allChildrenMap}
                        setFlattedOptions={setFlattedOptions}
                        loadData={loadData}
                        openChildren={openChildren}
                    />
                </DropDown>
            )
        })
    }

    return (
        <>
            <Autocomplete
                ref={eleRef}
                options={[]}
                open={false}
                readOnly={!(search && !!anchorEl)}
                multiple={multiple}
                disabled={inputProps.disabled}
                disableClearable={true}
                value={renderValue()}
                onFocus={openDropDown}
                inputValue={inputValue}
                onClick={e => e.stopPropagation()}
                onInputChange={onInputChange}
                onMouseEnter={e => setHovering(true)}
                onMouseLeave={e => setHovering(false)}
                popupIcon={renderPopupIcon()}
                renderInput={renderInput}
                renderTags={renderTags}
            />
            {renderDropDowns()}
        </>

    )
}

export default Cascader;