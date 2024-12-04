import React, { useState } from 'react';
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import { Draggable } from './Draggable';
import { Droppable } from './Droppable';
import styles from './Example.module.css'

interface Over {
  id: string;
}

const Example: React.FC = () => {
  const [items, setItems] = useState<{ [key: string]: string | null }>({
    draggable1: null,
    draggable2: null,
    draggable3: null,
    draggable4: null,
    draggable5: null,
    draggable6: null,
  });

  const draggables = [
    { id: 'draggable1', text: 'Drag me 1' },
    { id: 'draggable2', text: 'Drag me 2' },
    { id: 'draggable3', text: 'Drag me 3' },
    { id: 'draggable4', text: 'Drag me 4' },
    { id: 'draggable5', text: 'Drag me 5' },
    { id: 'draggable6', text: 'Drag me 6' },
  ];

  const handleDragEnd = ({ active, over }: DragEndEvent & { over?: Over }) => {
    if (over) {
      setItems((prevItems) => ({
        ...prevItems,
        [active.id]: over.id,
      }));
    } else {
      setItems((prevItems) => ({
        ...prevItems,
        [active.id]: null,
      }));
    }
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className={styles.dndContent}>
        <div className={styles.titleSubdomains}>
          <span>Поддомены</span>
          <div className={styles.subdomains}>
            {draggables.map((item) => (
              items[item.id] === null ? (
                <Draggable key={item.id} id={item.id}>
                  {item.text}
                </Draggable>
              ) : null
            ))}
          </div>
        </div>
        <div className={styles.droppables}>
          <Droppable id="droppable1" label='Нужно проверять часто'>
            {draggables.map((item) => (
              items[item.id] === 'droppable1' ? (
                <Draggable key={item.id} id={item.id}>
                  {item.text}
                </Draggable>
              ) : null
            ))}
          </Droppable>
          <Droppable id="droppable2" label='Нужно проверять реже'>
            {draggables.map((item) => (
              items[item.id] === 'droppable2' ? (
                <Draggable key={item.id} id={item.id}>
                  {item.text}
                </Draggable>
              ) : null
            )) }
          </Droppable>
        </div>
      </div>
    </DndContext>
  );
};

export default Example;