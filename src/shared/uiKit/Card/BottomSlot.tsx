import type { ReactNode } from 'react'
import { Empty } from '../Empty'

export const BottomSlot = ({ children }: { children?: ReactNode }) => {
    return <>{children ?? <Empty />}</>
}

BottomSlot.displayName = 'BottomSlot'