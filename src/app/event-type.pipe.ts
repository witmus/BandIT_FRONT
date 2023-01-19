import { Pipe, PipeTransform } from '@angular/core';
import { EventTypes } from './enums';

@Pipe({
  name: 'eventType'
})
export class EventTypePipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): unknown {
    return EventTypes.get(value);
  }

}
