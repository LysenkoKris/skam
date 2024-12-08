import React, { useState } from 'react';
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import TextField from '../TextField/TextField';
import Button from '../Button/Button';
import TextArea from '../TextArea/TextArea';
import { Draggable } from '../Example/Draggable';
import { Droppable } from '../Example/Droppable';
import styles from './AddSiteModal.module.css';
import close from '../../assets/Close.svg';
import InputNumber from '../InputNumber/InputNumber';

interface AddSiteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddSite: (domain: string, subdomains: string[]) => void;
}

export default function AddSiteModal({ isOpen, onClose, onAddSite }:AddSiteModalProps) {
  const [domain, setDomain] = useState('');
  const [subdomains, setSubdomains] = useState<{ [key: string]: string | null }>({});
  const [customSubdomains, setCustomSubdomains] = useState('');
  const [subdomainsFetched, setSubdomainsFetched] = useState(false);
  const [validationError, setValidationError] = useState('');

  const handleDomainChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDomain(event.target.value);
  };

  const handleCustomSubdomainsChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCustomSubdomains(event.target.value);
  };

  const isValidUrl = (url: string): boolean => {
    try {
      new URL(url);
      return true;
    } catch (error) {
      return false;
    }
  };

  const handleGetSubdomains = () => {
    if (!isValidUrl(domain)) {
      setValidationError('Пожалуйста, введите корректный URL.');
      return;
    }

    setValidationError('');

    // Здесь будет логика для получения поддоменов с FastAPI
    const exampleSubdomains = {
      'sub1.example.com': null,
      'sub2.example.com': null,
      'sub3.example.com': null,
    };
    setSubdomains({ ...subdomains, ...exampleSubdomains });
    setSubdomainsFetched(true);
  };

  const handleAddCustomSubdomains = () => {
    const newSubdomains = customSubdomains.split('\n').filter(Boolean).reduce((acc, subdomain) => ({ ...acc, [subdomain]: null }), {});
    setSubdomains({ ...subdomains, ...newSubdomains });
    setCustomSubdomains('');
  };

  const handleDragEnd = ({ active, over }: DragEndEvent & { over?: { id: string } }) => {
    if (over) {
      setSubdomains((prevSubdomains) => ({
        ...prevSubdomains,
        [active.id]: over.id,
      }));
    } else {
      setSubdomains((prevSubdomains) => ({
        ...prevSubdomains,
        [active.id]: null,
      }));
    }
  };

  const handleAddSite = () => {
    const droppable1Subdomains = Object.keys(subdomains).filter((key) => subdomains[key] === 'droppable1');
    const droppable2Subdomains = Object.keys(subdomains).filter((key) => subdomains[key] === 'droppable2');
    onAddSite(domain, [...droppable1Subdomains, ...droppable2Subdomains]);
    // Чистка состояния после добавления сайта
    setDomain('');
    setSubdomains({});
    setCustomSubdomains('');
    setSubdomainsFetched(false);
    onClose();
    setValueOne(1);
    setValueTwo(3);
  };

  const [valueOne, setValueOne] = useState(1);

	const handleChangeOne = (newValueOne: number) => {
		setValueOne(newValueOne);
	};

  const [valueTwo, setValueTwo] = useState(3);

	const handleChangeTwo = (newValueTwo: number) => {
		setValueTwo(newValueTwo);
	};

  const isAddSiteButtonDisabled = Object.values(subdomains).every((value) => value === null);
  const isGetSubdomainsButtonDisabled = !domain;

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeading}>
          <h2>Добавление сайта на мониторинг</h2>
          <img src={close} onClick={onClose}/>
        </div>
        <div className={styles.content}>
          <div className={styles.receivingDomains}>
            <TextField label="Домен:" placeholder='Например, https://telegram.org' value={domain} onChange={handleDomainChange} />
            <Button text="Получить поддомены" onClick={handleGetSubdomains} disabled={isGetSubdomainsButtonDisabled} />
          </div>
          {validationError && <p className={styles.validationError}>{validationError}</p>}
          <div className={styles.addingDomains}>
            <TextArea
              label="Хотите добавить свои? "
              value={customSubdomains}
              onChange={handleCustomSubdomainsChange}
              placeholder="Если хотите ввести несколько поддоменов, то пречисляйте их с новой строки"
            />
            <Button text="Добавить" onClick={handleAddCustomSubdomains} />
          </div>
          {subdomainsFetched ? (
            <DndContext onDragEnd={handleDragEnd}>
              <div className={styles.dndContent}>
                <div className={styles.titleSubdomains}>
                  <span>Поддомены</span>
                  <div className={styles.subdomains}>
                    {Object.keys(subdomains).map((subdomain) => (
                      subdomains[subdomain] === null ? (
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
                      {Object.keys(subdomains).map((subdomain) => (
                        subdomains[subdomain] === 'droppable1' ? (
                          <Draggable key={subdomain} id={subdomain}>
                            {subdomain}
                          </Draggable>
                        ) : null
                      ))}
                    </Droppable>
                    <div className={styles.numberVerification}>
                      Частота проверки в днях <InputNumber value={valueOne} onChange={handleChangeOne} min={1} max={20} step={1} />
                    </div>
                  </div>
                  <div className={styles.frequencyVerification}>
                    <Droppable id="droppable2" label="Нужно проверять реже">
                      {Object.keys(subdomains).map((subdomain) => (
                        subdomains[subdomain] === 'droppable2' ? (
                          <Draggable key={subdomain} id={subdomain}>
                            {subdomain}
                          </Draggable>
                        ) : null
                      ))}
                    </Droppable>
                    <div className={styles.numberVerification}>
                      Частота проверки в днях <InputNumber value={valueTwo} onChange={handleChangeTwo} min={3} max={20} step={1} />
                    </div>
                  </div>
                </div>
              </div>
            </DndContext>
          ) : (
            <div className={styles.titleSubdomains}>
              <span>Поддомены</span>
              <div className={styles.noSubdomains}>Пока нет поддоменов для проверки</div>
            </div>
          )}
        </div>
        <div className={styles.modalButtons}>
          <Button text="Добавить сайт" onClick={handleAddSite} disabled={isAddSiteButtonDisabled} />
          <Button text="Отменить" variant="secondary" onClick={onClose} />
        </div>
      </div>
    </div>
  );
};