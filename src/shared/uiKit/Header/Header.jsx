'use client'
import { SlotBar, LeftSlot, RightSlot } from '../SlotBar';
import styles from './Header.module.scss';
import { Logo } from '../Logo';

export const Header = ({ rightSlot = true }) => {

    return (
        <header className={`${styles.header}`}>
            <SlotBar>
                <LeftSlot>
                    <Logo />
                </LeftSlot>
                {rightSlot &&
                    <RightSlot>
                    </RightSlot>
                }
            </SlotBar>
        </header>
    )
};