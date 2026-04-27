'use client';
import styles from './Divider.module.scss';
import classNames from 'classnames';

/**
 * @param {{
 *   orientation?: string,
 *   color?: string,
 *   margin?: any,
 *   top?: any,
 *   bottom?: any,
 *   left?: any,
 *   right?: any,
 *   zIndex?: number,
 *   css?: any,
 * }} props
 */
export const Divider = ({
    orientation = 'horizontal',
    color = 'default',
    margin,
    top,
    bottom,
    left,
    right,
    zIndex = 0,
    css,
}) => {

    const dividerClass = classNames(
        styles.divider,
        styles[`divider-${orientation}`],
        styles[`divider-color-${color}`],
    );

    const style = {
        backgroundColor: color,
        height: orientation === 'horizontal' ? '1px' : '100%',
        width: orientation === 'horizontal' ? '100%' : '1px',
        position: top || bottom || left || right ? 'absolute' : 'none',
        top: typeof top === 'number' ? `${top}px` : 0,
        bottom: typeof bottom === 'number' ? `${bottom}px` : 0,
        left: typeof left === 'number' ? `${left}px` : 0,
        right: typeof right === 'number' ? `${right}px` : 0,
        margin: typeof margin === 'number' ? `${margin}px` : 0,
        zIndex,
        ...css,
    };

    return (
        <div
            className={dividerClass}
            style={style}
        />
    );
};

// background-color: ${({ color, theme }) => color || lineColors(theme).default}
