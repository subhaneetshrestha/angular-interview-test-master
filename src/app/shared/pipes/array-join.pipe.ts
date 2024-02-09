import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'arrayJoin',
})
export class ArrayJoinPipe implements PipeTransform {
  transform(value: string[], separator: string = ','): string {
    return value.join(separator);
  }
}
