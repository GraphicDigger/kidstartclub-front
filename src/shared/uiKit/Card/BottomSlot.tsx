"use client"
import type { ReactNode } from 'react'
import { Empty } from '../Empty'
import styled from '@emotion/styled'

export const BottomSlot = ({ children }: { children?: ReactNode }) => {
    return <>{children ?? <Empty />}</>
}

BottomSlot.displayName = 'BottomSlot'