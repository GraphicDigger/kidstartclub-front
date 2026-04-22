import React from "react";
import styles from "./RichText.module.css";

interface RichTextProps {
    dangerouslySetInnerHTML?: { __html: string };
    children?: React.ReactNode;
    className?: string;
}

export const RichText = ({ className, ...props }: RichTextProps) => (
    <div className={`${styles.root}${className ? ` ${className}` : ''}`} {...props} />
);
