'use client'
import styled from '@emotion/styled'
import { RichText } from './RichText'

interface RichTextColumnsProps {
    html: string
    splitOn?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
    minColWidth?: number
}

function splitByHeading(html: string, tag: string): { heading: string; body: string }[] {
    const re = new RegExp(`(?=<${tag}[^>]*>)`, 'i')
    const matchRe = new RegExp(`^<${tag}[^>]*>(.*?)<\\/${tag}>([\\s\\S]*)`, 'i')
    const parts = html.split(re).filter(Boolean)
    return parts.map((part) => {
        const match = part.match(matchRe)
        if (!match) return { heading: '', body: part }
        return { heading: match[1], body: match[2].trim() }
    })
}

export const RichTextColumns = ({ html, splitOn = 'h2', minColWidth = 280 }: RichTextColumnsProps) => {
    const sections = splitByHeading(html, splitOn)

    return (
        <Grid $minCol={minColWidth}>
            {sections.map((section, i) => (
                <RichText
                    key={i}
                    dangerouslySetInnerHTML={{
                        __html: `${section.heading ? `<${splitOn}>${section.heading}</${splitOn}>` : ''}${section.body}`,
                    }}
                />
            ))}
        </Grid>
    )
}

const Grid = styled.div<{ $minCol: number }>(({ $minCol }) => ({
    display: 'grid',
    width: '100%',
    gridTemplateColumns: `repeat(auto-fit, minmax(${$minCol}px, 1fr))`,
    gap: '24px 48px',
    alignItems: 'start',
}))
