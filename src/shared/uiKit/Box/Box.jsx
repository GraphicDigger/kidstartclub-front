import React from 'react';
import PropTypes from 'prop-types';

export const Box = ({
    children,
    css: customCss,
    className,
    onClick,
}) => {

    const style = {
        ...customCss,
    };

    return (
        <div
            style={style}
            className={className}
            onClick={onClick}
        >
            {children}
        </div>
    );
};

Box.propTypes = {
    children: PropTypes.node.isRequired,
    css: PropTypes.object,
    direction: PropTypes.oneOf(['row', 'column']),
    gap: PropTypes.string,
};
