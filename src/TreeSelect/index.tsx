import React from 'react';
import TextField from '@mui/material/TextField';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { flatOptions, idAllChildrenMap } from './helper';
import Autocomplete from '@mui/material/Autocomplete';
import CancelIcon from '@mui/icons-material/Cancel';
import Chip from '@mui/material/Chip';
import Tag from './Tag';
import DropDown from './DropDown';
import Options from './Options';
import { TreeSelectProp, TreeSelectOption } from './types';
import useTagLimits from './useTagLimits';


const TreeSelect = ({
    search = false,
    options,
    multiple = false,
    placement = "bottom-start",
    checkable = false,
    expandAll = false,
    popperStyle = {},
    popperClassName,
    value,
    expandKeys,
    onChange,
    loadData,
    allowClear = false,
    maxTagCount = 0,
    ...inputProps
}: TreeSelectProp) => {
    const inputRef = React.useRef(null);
    const eleRef = React.useRef<HTMLElement>(null);
    const [initialized, setInitialized] = React.useState<boolean>(false);
    const [anchorEl, setAnchorEl] = React.useState<HTMLElement>(null);
    const [hovering, setHovering] = React.useState<boolean>(false);
    const [selected, setSelected] = React.useState<Array<string | number>>(Array.isArray(value) ? value : (value ? [value] : []));
    const [flattedOptions, setFlattedOptions] = React.useState<TreeSelectOption[]>(flatOptions(options));
    const [allChildrenMap, setAllChildrenMap] = React.useState<Map<number | string, TreeSelectOption[]>>(new Map())
    const [inputValue, setInputValue] = React.useState<string>('');
    React.useEffect(() => {
        setAllChildrenMap(idAllChildrenMap(options))
    }, [flattedOptions]);

    const {
        tagLimit, tagWidths, setTagWidths
    } = useTagLimits({
        maxTagCount,
        selected,
        inputRef
    });


    const onClear = () => setSelected([]);
    const openDropDown = (e) => {
        e.stopPropagation();
        setInputValue('');
        setAnchorEl(inputRef.current);
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


    const renderValue = () => {
        if (multiple) return selected
        const isFocused = !!anchorEl;
        if (isFocused && search) {
            return inputValue;
        }
        const o = flattedOptions.find(o => o.id === selected[0]);
        return o?.name || '';
    };

    const renderInput = (params) => {
        const isFocus = !!anchorEl;
        return (
            <TextField
                {...params}
                {...inputProps}
                onClick={e => e.stopPropagation()}
                focused={isFocus}
                ref={inputRef}
                placeholder={(isFocus && !multiple) ? renderValue() : inputProps.placeholder}
                sx={{
                    '& .MuiAutocomplete-inputRoot': {
                        flexWrap: maxTagCount === 'responsive' ? 'nowrap' : 'wrap'
                    }
                }}
            />
        )
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
    return (
        <>
            <Autocomplete
                ref={eleRef}
                options={[]}
                open={false}
                disabled={inputProps.disabled}
                onFocus={openDropDown}
                readOnly={!(search && !!anchorEl)}
                multiple={multiple}
                disableClearable={true}
                value={renderValue()}
                inputValue={inputValue}
                onClick={e => e.stopPropagation()}
                onInputChange={onInputChange}
                onMouseEnter={e => setHovering(true)}
                onMouseLeave={e => setHovering(false)}
                popupIcon={renderPopupIcon()}
                renderInput={renderInput}
                renderTags={renderTags}
            />
            <DropDown
                anchorEl={anchorEl}
                placement={placement}
                popperStyle={popperStyle}
                popperClassName={popperClassName}
                initialWidth={eleRef?.current?.offsetWidth}
            >
                <Options
                    dense={inputProps.size === 'small'}
                    expandAll={expandAll}
                    showCheck={multiple && checkable}
                    search={search}
                    multiple={multiple}
                    selected={selected}
                    inputValue={inputValue}
                    flatOptions={flattedOptions}
                    setSelected={setSelected}
                    allChildrenMap={allChildrenMap}
                    setFlattedOptions={setFlattedOptions}
                    loadData={loadData}
                    expandKeys={expandKeys}
                />
            </DropDown>
        </>
    )
}

export default TreeSelect;
