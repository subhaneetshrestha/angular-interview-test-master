import { Pipe, PipeTransform } from '@angular/core';
import { ISong } from '../interface';

@Pipe({
  name: 'songList'
})
export class SongListPipe implements PipeTransform {

  transform(value: ISong[]): ISong[] {
    return value.map((item) => {
      item.singerList = item.singerList.toString();
      return item;
    })
  }

}
