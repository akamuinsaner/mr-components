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
import useTagLimits from './useTagLimits';
import { PopperPlacementType } from '@mui/material/Popper';
import { TextFieldProps } from '@mui/material';
import getTreeDataFormatted, {
    DataSet,
    RESERVED_KEY
} from '../utils/getTreeDataFormatted';
import useExpanded from './useExpanded';
import useLoadData from './useLoadData';
import useSearch from './useSearch';
import useAnchor from './useAnchor';

export type TreeSelectOption = {
    id: number | string;
    name: React.ReactNode | string | number;
    parentId?: number | string;
    children?: TreeSelectOption[];
}

export type TreeSelectProp = TextFieldProps & {
    options: TreeSelectOption[];
    multiple?: boolean;
    placement?: PopperPlacementType;
    checkable?: boolean;
    checkWithRelation?: boolean;
    defaultExpandAll?: boolean;
    defaultExpandedKeys?: Array<TreeSelectOption["id"]>;
    expandedKeys?: Array<number | string>;
    popperStyle?: React.CSSProperties;
    popperClassName?: string;
    search?: boolean;
    value?: any;
    onChange?: (v: any) => void;
    onExpand?: (expandedKeys: Array<number | string>) => void;
    loadData?: (o: TreeSelectOption) => any;
    allowClear?: boolean;
    maxTagCount?: number | 'responsive';
}

const TreeSelect = ({
    search = false,
    options,
    multiple = false,
    placement = "bottom-start",
    checkable = false,
    checkWithRelation,
    defaultExpandAll = false,
    defaultExpandedKeys,
    popperStyle = {},
    popperClassName,
    value,
    expandedKeys,
    onChange,
    onExpand,
    loadData,
    allowClear = false,
    maxTagCount = 0,
    ...inputProps
}: TreeSelectProp) => {
    const initializedRef = React.useRef<boolean>(false);
    const [dataSet, setDataSet] = React.useState<DataSet<TreeSelectOption>>(getTreeDataFormatted(options));
    const {
        flattedData,
        idTreeNodeMap,
    } = dataSet;
    React.useEffect(() => {
        if (!initializedRef.current) initializedRef.current = true;
        else setDataSet(getTreeDataFormatted(options));
    }, [options]);
    const [selected, setSelected] = React.useState<Array<string | number>>(Array.isArray(value) ? value : (value ? [value] : []));
    const [initialized, setInitialized] = React.useState<boolean>(false);
    React.useEffect(() => {
        if (initialized) onChange && onChange(multiple ? selected : selected[0]);
        else setInitialized(true)
    }, [selected]);

    const { inputValue, onInputChange } = useSearch({
        multiple,
        dataSet,
    })

    const { expandKeys, toggleExpand } = useExpanded({
        flattedData,
        defaultExpandAll,
        defaultExpandedKeys,
        expandedKeys,
        onExpand,
    })

    const { loadingId, startLoadData } = useLoadData({
        loadData,
        toggleExpand,
    })

    const {
        anchorEl,
        inputRef,
        eleRef,
        openDropDown,
        hovering,
        setHovering
    } = useAnchor({
        onInputChange,
    })

    const { tagLimit, tagWidths, setTagWidths } = useTagLimits({
        maxTagCount,
        selected,
        inputRef
    });

    const onClear = () => setSelected([]);

    const renderTags = (value: readonly any[], getTagProps) => {
        const rendered = value.slice(0, tagLimit);
        const rest = value.slice(tagLimit);
        const size = inputProps.size;
        return rendered.map((id, index) => {
            const o = idTreeNodeMap.get(id);
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
        const o = idTreeNodeMap.get(selected[0]);
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
                    showCheck={multiple && checkable}
                    search={search}
                    multiple={multiple}
                    selected={selected}
                    inputValue={inputValue}
                    setSelected={setSelected}
                    loadData={loadData}
                    expandKeys={expandKeys}
                    toggleExpand={toggleExpand}
                    dataSet={dataSet}
                    checkWithRelation={checkWithRelation}
                    loadingId={loadingId}
                    startLoadData={startLoadData}
                />
            </DropDown>
        </>
    )
}

export default TreeSelect;
