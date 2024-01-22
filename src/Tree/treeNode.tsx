import React from 'react';
import {
    Box,
    ListItem,
    ListItemIcon,
    ListItemText,
    Checkbox,
} from '@mui/material';
import { TreeNodeProps } from './types';
import { ArrowRight } from '@mui/icons-material';
import classNames from 'classnames';
import styles from './index.module.css';
import { useDraggable, useDroppable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';

const TreeNode = ({
    blockNodes,
    activeId,
    checkable,
    indeterminate,
    checked,
    data,
    depth,
    draggable,
    expand,
    overId,
    toggleCheck,
    toggleExpand,
    selected,
    toggleSelect,
    showLine,
    idSiblingsAfterMap,
    switchIcon,
    parentChain
}: TreeNodeProps) => {
    const {
        id, name, children
    } = data;
    const hasChildren = children && children.length;

    const renderTreeNodeIndents = () => {
        return Array(depth).fill({}).reduce((pre, cur, index) => {
            const parentId = parentChain[index];
            const siblings = idSiblingsAfterMap.get(parentId);
            const lineVisible = !!(siblings.length > 0 && showLine);
            return [
                <Box
                    className={classNames(styles["mr-tree-node-indent"], {
                        [styles["mr-tree-node-indent-line"]]: lineVisible
                    })}
                ></Box>,
                ...pre,
            ]
        }, [])
    }

    const renderArrow = () => {
        let SwitchIcon: React.ReactNode = <ArrowRight />;
        if (typeof switchIcon !== 'function' && switchIcon) SwitchIcon = switchIcon;
        if (typeof switchIcon === 'function' && switchIcon) SwitchIcon = switchIcon(data, expand);
        return (
            <ListItemIcon
                className={classNames(styles["mr-tree-node-arrow"], {
                    [styles["mr-tree-node-switch"]]: true,
                    [styles["mr-tree-node-switch-open"]]: expand,
                })}
                onClick={() => toggleExpand(data, !expand)}
            >
                {SwitchIcon}
            </ListItemIcon>
        )
    }

    const renderCheckbox = () => {
        if (!checkable) return null;
        return (
            <ListItemIcon className={styles["mr-tree-node-checkbox"]}>
                <Checkbox
                    checked={checked}
                    indeterminate={indeterminate}
                    onChange={e => toggleCheck(data, e.target.checked)}
                    className={styles["mr-tree-node-checkbox-inner"]}
                />
            </ListItemIcon>
        )
    }

    const renderChildren = (
        <ListItem
            disablePadding
            className={classNames(styles["mr-tree-node"], {
                [styles["mr-tree-node-block"]]: blockNodes,
                [styles["mr-tree-leaf"]]: !hasChildren,
                [styles["mr-tree-node-selected"]]: selected
            })}
        >
            {renderTreeNodeIndents()}
            {renderArrow()}
            {renderCheckbox()}
            <ListItemText
                className={classNames(styles["mr-tree-node-text"])}
                onClick={() => toggleSelect(data, !selected)}
            >
                {name}
            </ListItemText>
        </ListItem>
    )

    if (draggable) {
        const {
            attributes,
            listeners,
            setNodeRef: dragRef,
            transform,
            isDragging
        } = useDraggable({ id, data });

        const {
            setNodeRef: dropRef
        } = useDroppable({ id, data });

        let style = Object.assign({}, {
            transform: CSS.Transform.toString(transform),
            opacity: isDragging ? 0.3 : 1
        });

        const isOver = overId === id;
        const isActive = activeId === id;
        return (
            <Box
                ref={dropRef}
                className={classNames(styles["mr-tree-drop"], {
                    [styles["mr-tree-drag-over"]]: isOver
                })}
            >
                {React.cloneElement(renderChildren, {
                    ref: dragRef,
                    style,
                    className: classNames(
                        renderChildren.props.className,
                        {
                            [styles["mr-tree-node-dragging"]]: isDragging
                        }
                    ),
                    ...listeners,
                    ...attributes
                })}
                {isActive ? 
                    React.cloneElement(renderChildren, {
                        className: classNames(
                            renderChildren.props.className,
                            [styles["mr-tree-drag-overlay"]]
                        )
                    })
                 : null}
            </Box>
        )
    }

    return renderChildren
}

export default TreeNode;