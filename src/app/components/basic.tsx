import React from "react";
import NextLink from "next/link";
import styles from './basic.module.css'

export const Link = ({ href, children, ...rest }: { href: string; children: React.ReactNode}) => {
    return (
       <NextLink className={styles.link} href={href} {...rest}>{children}</NextLink>
    )
}

