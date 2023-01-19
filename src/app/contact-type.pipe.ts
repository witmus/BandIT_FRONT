import { Pipe, PipeTransform } from '@angular/core';
import { ContactTypes } from './enums';

@Pipe({
  name: 'contactType'
})
export class ContactTypePipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): unknown {
    return ContactTypes.get(value);
  }

}
