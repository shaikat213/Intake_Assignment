import { Injectable } from '@angular/core';
import { EnumExtension } from '../common/enum-extension';
import { ListItem } from '../model/common-model';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  // Get Enum list
public static getEnumList(en: any) {
  let enumItemList: ListItem[] = [];

  //Get name-value pairs from Enum
  let enumList = EnumExtension.getNamesAndValues(en);

  //Convert name-value pairs to EnumList[]
  enumList.forEach(pair => {
      let item = { 'id': pair.value.toString(), 'name': pair.name };
      enumItemList.push(item);
  });

  return enumItemList;
}
}
