'use client'
import styled from '@emotion/styled'
import { RichText } from './RichText'

interface RichTextColumnsProps {
    html: string
    minColWidth?: number
}

function splitByH2(html: string): { heading: string; body: string }[] {
    const parts = html.split(/(?=<h2[^>]*>)/i).filter(Boolean)
    return parts.map((part) => {
        const match = part.match(/^<h2[^>]*>(.*?)<\/h2>([\s\S]*)/i)
        if (!match) return { heading: '', body: part }
        return { heading: match[1], body: match[2].trim() }
    })
}

export const RichTextColumns = ({ html, minColWidth = 280 }: RichTextColumnsProps) => {
    const sections = splitByH2(html)

    return (
        <Grid $minCol={minColWidth}>
            {sections.map((section, i) => (
                <div key={i}>
                    {section.heading && (
                        <RichText dangerouslySetInnerHTML={{ __html: `<h2>${section.heading}</h2>` }} />
                    )}
                    {section.body && (
                        <RichText dangerouslySetInnerHTML={{ __html: section.body }} />
                    )}
                </div>
            ))}
        </Grid>
    )
}

const Grid = styled.div<{ $minCol: number }>(({ $minCol }) => ({
    display: 'grid',
    gridTemplateColumns: `repeat(auto-fit, minmax(${$minCol}px, 1fr))`,
    gap: '24px 48px',
    alignItems: 'start',
}))
