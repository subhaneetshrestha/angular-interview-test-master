import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { Router } from '@angular/router';
import { ISong } from 'src/app/shared/interface';

@Component({
  selector: 'app-song-list',
  templateUrl: './song-list.component.html',
  styleUrls: ['./song-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SongListComponent {
  @Input()
  songLists: any[] = [];

  @Output()
  onSongViewDetailClicked: EventEmitter<string> = new EventEmitter<string>();

  constructor(private router: Router) {}

  trackByUri(_: number, song: ISong) {
    return song.uri;
  }

  /**
   * Emit song id to parent
   *
   * @param song - Selected song
   */
  viewDetail(song: ISong) {
    this.onSongViewDetailClicked.emit(song.uri);
  }

  /**
   * Open form with the prefilled data and allow to update the content
   */
  editSongs(uri: string) {
    this.router.navigate([`song/edit/${uri}`]);
  }
}
