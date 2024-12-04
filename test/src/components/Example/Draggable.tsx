import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import styles from './Example.module.css'

interface DraggableProps {
  id: string;
  children: React.ReactNode;
}

export const Draggable: React.FC<DraggableProps> = (props) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: props.id,
  });

  const style: React.CSSProperties = {
    transform: transform ? CSS.Translate.toString(transform) : undefined,
    cursor: 'move',
  };

  return (
    <div ref={setNodeRef} className={styles.draggable} style={style} {...listeners} {...attributes}>
      {props.children}
    </div>
  );
};