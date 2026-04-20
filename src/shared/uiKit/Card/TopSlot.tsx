import type { ReactNode } from 'react'
import { Empty } from '../Empty'

export const TopSlot = ({ children }: { children?: ReactNode }) => {
    return <>{children ?? <Empty />}</>
}

TopSlot.displayName = 'TopSlot'

