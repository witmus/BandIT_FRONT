import { Pipe, PipeTransform } from '@angular/core';
import { GearTypes } from './enums';

@Pipe({
  name: 'gearType'
})
export class GearTypePipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): unknown {
    return GearTypes.get(value);
  }

}
