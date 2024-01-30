import React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { TextFieldProps } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Chip from '@mui/material/Chip';
import Tag from '../TreeSelect/Tag';
import getTreeDataFormatted, {
    DataSet,
    RESERVED_KEY,
} from '../utils/getTreeDataFormatted';
import DropDown from './DropDown';
import Options from './Options';
import { TreeSelectOption } from '../TreeSelect';
import useTagLimits from './useTagLimits';
import useAnchor from './useAnchor';
import useSearch from './useSearch';
import useValue from './useValue';
import useLoadData from './useLoadData';
import useOpen from './useOpen';

export type CascaderOption = TreeSelectOption;

export type CascaderProps = {
    options: CascaderOption[];
    multiple?: boolean;
    checkable?: boolean;
    checkWithRelation?: boolean;
    popperStyle?: React.CSSProperties;
    popperClassName?: string;
    search?: boolean;
    value?: any;
    onChange?: (v: any) => void;
    loadData?: (o: CascaderOption) => any;
    allowClear?: boolean;
    maxTagCount?: number | 'responsive';
}

const Cascader = ({
    search = false,
    options,
    multiple = false,
    checkable = false,
    checkWithRelation,
    popperStyle = {},
    popperClassName,
    value,
    onChange,
    loadData,
    allowClear = false,
    maxTagCount = 0,
    ...inputProps
}: TextFieldProps & CascaderProps) => {
    const initializedRef = React.useRef<boolean>(false);
    const [dataSet, setDataSet] = React.useState<DataSet<TreeSelectOption>>(getTreeDataFormatted(options));
    const { flattedData, idTreeNodeMap } = dataSet;

    React.useEffect(() => {
        if (!initializedRef.current) initializedRef.current = true;
        else setDataSet(getTreeDataFormatted(options));
    }, [options]);

    const { selected, onOptionSelect, onValueChange, toggleCheck } = useValue({
        value,
        multiple,
        onChange,
        dataSet,
        checkWithRelation,
    })

    const { openKeys, openChildren } = useOpen();

    const { searchData, inputValue, onInputChange } = useSearch({
        search,
        multiple,
        dataSet,
    })

    const { anchorEl, inputRef, eleRef, openDropDown, hovering, setHovering } = useAnchor({
        onInputChange,
    })

    const { tagLimit, tagWidths, setTagWidths } = useTagLimits({
        maxTagCount,
        selected,
        inputRef
    });

    const { loadingId, startLoadData } = useLoadData({ loadData, openChildren });


    const onClear = () => onValueChange([]);

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
            const o = idTreeNodeMap.get(id);
            return (<Tag
                size={size}
                onDelete={(id) => {
                    onValueChange(selected.filter(s => s !== id));
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


    const renderValue = () => {
        if (multiple) return selected
        const isFocused = !!anchorEl;
        if (isFocused && search) {
            return inputValue;
        }
        const o = idTreeNodeMap.get(selected[0]);
        return o?.name || '';
    };

    const renderDropDowns = () => {
        return openKeys.map((key, depth) => {
            const showCheck = checkable && multiple;
            const dense = inputProps.size === 'small';
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
                        multiple={multiple}
                        selected={selected}
                        loadData={loadData}
                        openChildren={openChildren}
                        dataSet={dataSet}
                        checkWithRelation={checkWithRelation}
                        toggleCheck={toggleCheck}
                        searchData={searchData}
                        onSelect={onOptionSelect}
                        startLoadData={startLoadData}
                        depth={depth}
                        loadingId={loadingId}
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