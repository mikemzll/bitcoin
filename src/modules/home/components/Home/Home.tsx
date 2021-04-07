import React, { FC, SyntheticEvent, useEffect, useState } from 'react';
import { SYMBOL_LIST } from '../../constants/home';
import HomeService from '../../services/home.service';

import './Home.scss';

const HomeComponent = () => {
  const [output, setOutput] = useState<string>('');
  const [input, setInput] = useState<string>('');
  const [key, setKey] = useState<string>('');
  const [symbolList, setSymbolList] = useState<string[]>([]);
  
  const title = "Теряйся Вася!";

  const decrypt = (output: string, key: string) => {
    setTimeout(() => {setInput(decryptMessage(output, key, symbolList))}, 500);
  }

  const encrypt = (input: string, key: string) => {
    setTimeout(() => {setOutput(encryptMessage(input, key, symbolList))}, 500);
  }

  const updateKey = (value: string) => {
    setKey(value);
    
    if (!value) {
      setOutput(input);
      return;
    }
    if (input) encrypt(input, value);
    if (!input && output) decrypt(output, value);
  }

  const updateInput = (value: string) => {
    setInput(value);

    if (key) encrypt(value, key);
    if (!key) setOutput(value);
  }

  const updateOutput = (value: string) => {
    setOutput(value);
    if (key) decrypt(value, key);
    if (!key) setInput(value);
  }

  const encryptMessage = (message: string, keyword: string, symbolList: string[]): string => {
    const maxId = symbolList.length - 1;
    const messageIdList = HomeService.stringToIdList(message, symbolList);
    const keywordIdList = HomeService.stringToIdList(keyword, symbolList);
    
    const eMessageIdList = HomeService.encryptIdList(messageIdList, keywordIdList, maxId);
    const eMessage = HomeService.idListToString(eMessageIdList, symbolList);
    
    return eMessage;
  };

  const decryptMessage = (eMessage: string, keyword: string, symbolList: string[]): string => {
    const maxId = symbolList.length - 1;
    const eMessageIdList = HomeService.stringToIdList(eMessage, symbolList);
    const keywordIdList = HomeService.stringToIdList(keyword, symbolList);

    const messageIdList = HomeService.decryptIdList(eMessageIdList, keywordIdList, maxId);
    const message = HomeService.idListToString(messageIdList, symbolList);

    return message;
  };

  useEffect(() => {
    setSymbolList(HomeService.prepareSymbolList(SYMBOL_LIST));
  }, []);

  return (
    <div className="home-wrapper">
      <div className="home">
        <div className="title">
          <h1>{title}</h1>
        </div>
        <div>
          <InputComponent type="input" label={'Ключ'} placeholder={'ключове слово ...'} value={key} onChange={(e) => {updateKey((e.target as HTMLInputElement).value)}} />
          <InputComponent label={'Текст'} placeholder={'сообщение ...'} value={input} onChange={(e) => {updateInput((e.target as HTMLInputElement).value)}} />
          <InputComponent label={'Bitcoin'} placeholder={'выхлоп тут...'} value={output} onChange={(e) => {updateOutput((e.target as HTMLInputElement).value)}} />
        </div>
      </div>
    </div>
  );
}

export default HomeComponent;

interface InputComponentProps {
  value: string;
  onChange: (event: SyntheticEvent) => void;
  type?: 'input' | 'textarea';
  label?: string;
  placeholder?: string;
  id?: string;
}

const InputComponent: FC<InputComponentProps> = ({
  type = 'textarea',
  label,
  placeholder,
  value,
  onChange = () => {},
  id
}) => {
  return (
    <div className="input">
      { label && (
        <label htmlFor={id}>{label}</label>
      )}
      <div>
        { type === 'textarea' && (
          <textarea id={id} cols={30} rows={10} placeholder={placeholder} value={value} onChange={onChange}></textarea>
        )}
        { type === 'input' && (
          <input id={id} placeholder={placeholder} value={value} onChange={onChange} />
        )}
      </div>
    </div>
  );
};