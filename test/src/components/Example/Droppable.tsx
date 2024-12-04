import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import styles from './Example.module.css'

interface DroppableProps {
  id: string;
  children: React.ReactNode;
  label: string;
}

export const Droppable: React.FC<DroppableProps> = ({ id, children, label }) => {
  const { isOver, setNodeRef } = useDroppable({
    id,
  });

  const style: React.CSSProperties = {
    backgroundColor: isOver ? '#CDDFFF' : '#fff',
  };


  return (
    <div className={styles.frequencyVerification}>
      <div className={styles.droppableLabel}>
        {label}
        <div ref={setNodeRef} style={style} className={styles.droppable}>
          {children}
        </div>
      </div>
      Частота проверки
    </div>
  );
};