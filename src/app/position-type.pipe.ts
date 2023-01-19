import { Pipe, PipeTransform } from '@angular/core';
import { PositionTypes } from './enums';

@Pipe({
  name: 'positionType'
})
export class PositionTypePipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): unknown {
    return PositionTypes.get(value);
  }

}
