import React, { useState } from 'react';
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import TextField from '../TextField/TextField';
import Button from '../Button/Button';
import TextArea from '../TextArea/TextArea';
import { Draggable } from '../Example/Draggable';
import { Droppable } from '../Example/Droppable';
import styles from './EditSiteModal.module.css';
import close from '../../assets/Close.svg';
import InputNumber from '../InputNumber/InputNumber';

interface EditSiteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (newSubdomains: { [key: string]: string | null }, newValueOne: number, newValueTwo: number) => void;
  domain: string;
  subdomains: { [key: string]: string | null }; // Объект с состоянием поддоменов
  valueOne: number;
  valueTwo: number;
}

export default function EditSiteModal({
  isOpen,
  onClose,
  onSave,
  domain,
  subdomains,
  valueOne,
  valueTwo,
}: EditSiteModalProps) {
  const [subdomainsState, setSubdomainsState] = useState<{ [key: string]: string | null }>(subdomains);
  const [customSubdomains, setCustomSubdomains] = useState('');
  const [valueOneState, setValueOneState] = useState(valueOne);
  const [valueTwoState, setValueTwoState] = useState(valueTwo);

  const handleCustomSubdomainsChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCustomSubdomains(event.target.value);
  };

  const handleAddCustomSubdomains = () => {
    const newSubdomains = customSubdomains.split('\n').filter(Boolean).reduce((acc, subdomain) => ({ ...acc, [subdomain]: null }), {});
    setSubdomainsState({ ...subdomainsState, ...newSubdomains });
    setCustomSubdomains('');
  };

  const handleDragEnd = ({ active, over }: DragEndEvent & { over?: { id: string } }) => {
    if (over) {
      setSubdomainsState((prevSubdomains) => ({
        ...prevSubdomains,
        [active.id]: over.id,
      }));
    } else {
      setSubdomainsState((prevSubdomains) => ({
        ...prevSubdomains,
        [active.id]: null,
      }));
    }
  };

  const handleSave = () => {
    onSave(subdomainsState, valueOneState, valueTwoState);
    onClose();
  };

  const handleChangeOne = (newValueOne: number) => {
    setValueOneState(newValueOne);
  };

  const handleChangeTwo = (newValueTwo: number) => {
    setValueTwoState(newValueTwo);
  };

  const isSaveButtonDisabled = Object.values(subdomainsState).every((value) => value === null);

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeading}>
          <h2>Редактирование сайта на мониторинге</h2>
          <img src={close} onClick={onClose} />
        </div>
        <div className={styles.content}>
          <div className={styles.receivingDomains}>
            <TextField
              label="Домен:"
              placeholder="Например, https://telegram.org"
              value={domain}
              onChange={() => {}} // Пустая функция, так как поле disabled
              disabled
            />
          </div>
          <div className={styles.addingDomains}>
            <TextArea
              label="Хотите добавить свои? "
              value={customSubdomains}
              onChange={handleCustomSubdomainsChange}
              placeholder="Если хотите ввести несколько поддоменов, то пречисляйте их с новой строки"
            />
            <Button text="Добавить" onClick={handleAddCustomSubdomains} />
          </div>
          <DndContext onDragEnd={handleDragEnd}>
            <div className={styles.dndContent}>
              <div className={styles.titleSubdomains}>
                <span>Поддомены</span>
                <div className={styles.subdomains}>
                  {Object.keys(subdomainsState).map((subdomain) => (
                    subdomainsState[subdomain] === null ? (
                      <Draggable key={subdomain} id={subdomain}>
                        {subdomain}
                      </Draggable>
                    ) : null
                  ))}
                </div>
              </div>
              <div className={styles.droppables}>
                <div className={styles.frequencyVerification}>
                  <Droppable id="droppable1" label="Нужно проверять часто">
                    {Object.keys(subdomainsState).map((subdomain) => (
                      subdomainsState[subdomain] === 'droppable1' ? (
                        <Draggable key={subdomain} id={subdomain}>
                          {subdomain}
                        </Draggable>
                      ) : null
                    ))}
                  </Droppable>
                  <div className={styles.numberVerification}>
                    Частота проверки в днях <InputNumber value={valueOneState} onChange={handleChangeOne} min={1} max={20} step={1} />
                  </div>
                </div>
                <div className={styles.frequencyVerification}>
                  <Droppable id="droppable2" label="Нужно проверять реже">
                    {Object.keys(subdomainsState).map((subdomain) => (
                      subdomainsState[subdomain] === 'droppable2' ? (
                        <Draggable key={subdomain} id={subdomain}>
                          {subdomain}
                        </Draggable>
                      ) : null
                    ))}
                  </Droppable>
                  <div className={styles.numberVerification}>
                    Частота проверки в днях <InputNumber value={valueTwoState} onChange={handleChangeTwo} min={3} max={20} step={1} />
                  </div>
                </div>
              </div>
            </div>
          </DndContext>
        </div>
        <div className={styles.modalButtons}>
          <Button text="Сохранить изменения" onClick={handleSave} disabled={isSaveButtonDisabled} />
          <Button text="Отменить" variant="secondary" onClick={onClose} />
        </div>
      </div>
    </div>
  );
}