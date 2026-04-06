'use client'
import { useMemo, useState, useCallback } from 'react';
import styled from '@emotion/styled';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

import { RowCheckButton } from './RowCheckButton';
import { RowDot } from './RowDot';

export const Row = ({ rowIndex }) => {
  const [rowClicked, setRowClicked] = useState(false);
  const size = 'small';

  // ✅ порядок точек в состоянии
  const [dots, setDots] = useState(() =>
    [0, 1, 2, 3].map((colIndex) => ({
      id: `r${rowIndex}-c${colIndex}`, // уникальный и стабильный id
      colIndex,
    }))
  );

  // чтобы droppableId был стабильным
  const droppableId = useMemo(() => `row-${rowIndex}-dots`, [rowIndex]);

  const onDragEnd = useCallback((result) => {
    const { destination, source } = result;
    if (!destination) return;
    if (destination.index === source.index) return;

    setDots((prev) => {
      const next = Array.from(prev);
      const [moved] = next.splice(source.index, 1);
      next.splice(destination.index, 0, moved);
      return next;
    });
  }, [setDots]);

  return (
    <StyledRow onClick={() => setRowClicked(true)}>
      <StyledCheck>
        <RowCheckButton
          rowIndex={rowIndex}
          rowClicked={rowClicked}
          size={size}
        />
      </StyledCheck>

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId={droppableId} direction="horizontal">
          {(provided) => (
            <StyledDot
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {dots.map((dot, index) => (
                <Draggable
                  key={dot.id}
                  draggableId={dot.id}
                  index={index}
                >
                  {(provided) => (
                    <DotWrap
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={provided.draggableProps.style}
                    >
                      <RowDot
                        rowIndex={rowIndex}
                        colIndex={dot.colIndex}
                        rowClicked={rowClicked}
                        size={size}
                      />
                    </DotWrap>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </StyledDot>
          )}
        </Droppable>
      </DragDropContext>
    </StyledRow>
  );
};

const StyledRow = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
`;

const StyledCheck = styled.div`
  position: absolute;
  bottom: 0;
  left: calc(-80px - 5*2px);
  @media (max-width: 768px) {
    position: static;
  }
`;

const StyledDot = styled.div`
  display: flex;
  flex-direction: row;
`;

const DotWrap = styled.div`
  display: inline-flex;
`;