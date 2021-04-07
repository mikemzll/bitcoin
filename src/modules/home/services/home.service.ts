import { DIVIDER, SPACE } from '../constants/home';

class HomeService {
  stringToIdList = (message: string, symbolList: string[]): number[] => {
    return message.split('').map((symbol: string) => symbolList.indexOf(symbol));
  }

  idListToString = (idList: number[], symbolList: string[]): string => {
    const stringList = idList.map((id: number) => symbolList[id]);
    return stringList.length ? stringList.reduce((prevValue, currentValue) => prevValue + currentValue) : '';
  }

  prepareSymbolList = (dataList: string[]): string[] => {
    const mergeArrays = (prevValue: string[], currentValue: string[]) => [...prevValue, ...currentValue];
    const symbolList = dataList.map((string: string) => string.split(DIVIDER)).reduce(mergeArrays).filter((item) => !!item);
    return [SPACE, ...symbolList, SPACE];
  }

  encryptIdList = (messageIdList: number[], keywordIdList: number[], maxId: number): number[] => {
    const eIdList = messageIdList.map((id, i) => (id + keywordIdList[i % keywordIdList.length]) % maxId);

    return eIdList;
  }
  
  decryptIdList = (messageIdList: number[], keywordIdList: number[], maxId: number): number[] => {
    const eIdList = messageIdList.map((id, i) => {
      const val = id - keywordIdList[i % keywordIdList.length]
      
      return val > 0 ? val : maxId + val;
    });

    return eIdList;
  }
}

export default new HomeService();
