import { Pipe, PipeTransform } from '@angular/core';
import { UserRoles } from './enums';

@Pipe({
  name: 'userRole'
})
export class UserRolePipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): unknown {
    return UserRoles.get(value);
  }

}
