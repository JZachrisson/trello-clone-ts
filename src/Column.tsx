import React, { useRef } from 'react';
import { AddNewItem } from './AddNewItem';
import { useAppState } from './AppStateContext';
import { ColumnContainer, ColumnTitle } from './styles';
import { Card } from './Card';
import { useItemDrag } from './hooks/useItemDrag';
import { useDrop } from 'react-dnd';
import { DragItem } from './DragItem';
import { isHidden } from './utils/isHidden';

interface ColumnProps {
  text: string;
  index: number;
  id: string;
}

export const Column = ({ text, index, id }: ColumnProps) => {
  const { state, dispatch } = useAppState();
  const ref = useRef<HTMLDivElement>(null);
  const { drag } = useItemDrag({ type: 'COLUMN', id, index, text });

  const [, drop] = useDrop({
    accept: 'COLUMN',
    hover(item: DragItem) {
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }

      dispatch({ type: 'MOVE_LIST', payload: { dragIndex, hoverIndex } });

      item.index = hoverIndex;
    },
  });

  drag(drop(ref));

  return (
    <ColumnContainer
      ref={ref}
      isHidden={isHidden(state.draggedItem, 'COLUMN', id)}
    >
      <ColumnTitle>{text}</ColumnTitle>
      {state.lists[index].tasks.map((task) => {
        return <Card text={task.text} key={task.id} />;
      })}
      <AddNewItem
        toggleButtonText="+ Add another task"
        onAdd={(text) =>
          dispatch({ type: 'ADD_TASK', payload: { text, taskId: id } })
        }
        dark
      />
    </ColumnContainer>
  );
};
