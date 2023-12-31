import React from 'react';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/ListItem';
import { TreeSelectProp, TreeSelectOption } from './index';
import Check from './Check';
import ExpandIcon from './ExpandIcon';

type Props = {
    dense: boolean;
    expandKeys: Array<TreeSelectOption["id"]>;
    expandAll: boolean;
    showCheck: boolean;
    inputValue: string;
    selected: Array<TreeSelectOption["id"]>;
    search: TreeSelectProp["search"];
    flatOptions: TreeSelectOption[];
    multiple: TreeSelectProp["multiple"];
    allChildrenMap: Map<number | string, TreeSelectOption[]>;
    setSelected: (s: Array<TreeSelectOption["id"]>) => void;
    loadData: TreeSelectProp["loadData"];
    setFlattedOptions: (f: TreeSelectOption[]) => void;
}

export default ({
    dense,
    expandKeys,
    expandAll,
    showCheck,
    search,
    multiple,
    selected,
    inputValue,
    flatOptions,
    setSelected,
    allChildrenMap,
    setFlattedOptions,
    loadData
}: Props) => {
    const [loadingId, setLoadingId] = React.useState<string | number>(null);
    const [cascadeOpen, setCascadeOpen] = React.useState<{ [name: string]: boolean }>({});

    React.useEffect(() => {
        if (expandAll) {
            setCascadeOpen(flatOptions.reduce((pre, cur) => ({ ...pre, [cur.id]: true }), {}));
        } else if (expandKeys && expandKeys.length) {
            setCascadeOpen(flatOptions.reduce((pre, cur) => {
                if (!expandKeys.includes(cur.id)) return pre;
                return { ...pre, [cur.id]: true }
            }, {}));
        }
    }, [expandAll, expandKeys, flatOptions]);


    const onSelect = (o: TreeSelectOption) => {
        if (multiple) {
            if (selected.includes(o.id)) {
                setSelected(selected.filter(s => s !== o.id));
            } else {
                setSelected([...selected, o.id]);
            }
        } else {
            setSelected([o.id]);
        }
    };

    const toggleOpen = (id, open) => {
        setCascadeOpen({ ...cascadeOpen, [id]: open });
    }

    const startLoadData = (option) => {
        if (!loadData) return;
        setLoadingId(option.id)
        loadData(option).then(data => {
            setFlattedOptions(flatOptions
                .map(item => (item.id === option.id ? { ...item, children: data } : item))
                .concat(data.map(item => ({ ...item, parentId: option.id }))))
            toggleOpen(option.id, true)
        }).finally(() => {
            setLoadingId(null)
        })
    }

    const renderOptionItem = (option, depth, children) => {
        const itemSelected = selected.includes(option.id);
        const hasChildren = children && children.length;
        const showChildren = cascadeOpen[option.id];
        const isLoading = loadingId === option.id;
        const visibility = hasChildren || !!loadData;

        return (
            <ListItem
                key={option.id}
                sx={{
                    paddingLeft: `${depth * 20 + 16}px`,
                    cursor: 'pointer'
                }}
                dense={dense}
                selected={itemSelected}
                onClick={(e) => {
                    multiple && e.stopPropagation();
                    onSelect(option);
                }}
            >
                <ExpandIcon
                    hasChildren={hasChildren}
                    showChildren={showChildren}
                    isLoading={isLoading}
                    visibility={visibility}
                    toggleOpen={open => toggleOpen(option.id, open)}
                    startLoadData={() => startLoadData(option)}
                />
                <Check
                    option={option}
                    show={showCheck}
                    selected={selected}
                    setSelected={setSelected}
                    allChildrenMap={allChildrenMap}
                />
                <Typography>{option.name}</Typography>
            </ListItem>
        )
    }

    const filterOptionsByInput = (options: TreeSelectOption[]) => {
        let filteredIds = [];
        for (let [key, list] of allChildrenMap.entries()) {
            const filteredByInput = list
                .filter(l => (`${l.name}`)
                    .indexOf(inputValue) > -1);
            if (!!filteredByInput.length) filteredIds.push(key);
        }
        const filterCondition: (o: TreeSelectOption) => boolean
            = o => filteredIds.includes(o.id) || `${o.name}`.indexOf(inputValue) > -1;
        return options.filter(filterCondition);
    }

    const renderOptions = (parentId: TreeSelectOption["id"] = '', depth: number = 0) => {
        let options = flatOptions.filter(o => o.parentId === parentId);
        if (search && inputValue) options = filterOptionsByInput(options);
        return [...options.map(o => {
            const children = flatOptions.filter(item => item.parentId === o.id);
            const hasChildren = children && children.length;
            const showChildren = cascadeOpen[o.id]
            let renders: any = [renderOptionItem(o, depth, children)];
            if (showChildren && hasChildren) renders = [...renders, ...renderOptions(o.id, depth + 1)];
            return renders;
        })]
    };
    return renderOptions() as any;
}