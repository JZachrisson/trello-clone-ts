import React from 'react';
import { AddNewItem } from './AddNewItem';
import { useAppState } from './AppStateContext';
import { ColumnContainer, ColumnTitle } from './styles';

interface ColumnProps {
  text: string;
  index: number;
}

export const Column = ({ text, index }: ColumnProps) => {
  const { state } = useAppState();
  return (
    <ColumnContainer>
      <ColumnTitle>{text}</ColumnTitle>
      {state.lists[index].tasks.map((task) => (
        <AddNewItem
          key={task.id}
          toggleButtonText="+ Add another task"
          onAdd={console.log}
          dark
        />
      ))}
    </ColumnContainer>
  );
};
