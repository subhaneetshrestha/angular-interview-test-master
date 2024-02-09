import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  BehaviorSubject,
  Subject,
  debounceTime,
  distinctUntilChanged,
  switchMap,
  takeUntil,
  tap,
} from 'rxjs';
import { DataApiService } from 'src/app/service/data-api.service';
import { ISong } from 'src/app/shared/interface';

@Component({
  selector: 'app-songs',
  templateUrl: './songs.component.html',
  styleUrls: ['./songs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SongsComponent implements OnDestroy, OnInit {
  searchText$ = new BehaviorSubject<string>(
    this.route.snapshot.queryParams['q'] ?? ''
  );
  songLists: ISong[] = [];
  selectedSong: ISong | undefined;
  destroy$ = new Subject<boolean>();

  constructor(
    private dataApiService: DataApiService,
    private ref: ChangeDetectorRef,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.searchText$
      .pipe(
        distinctUntilChanged(),
        debounceTime(500),
        tap((text) => this.router.navigate([], { queryParams: { q: text } })),
        switchMap((text: string) => this.dataApiService.getSongsByName(text)),
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: (songs) => {
          this.songLists = songs;
          this.ref.markForCheck();
        },
        error: (err) => console.error(err),
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  /**
   * Show song detail
   *
   * @param songId
   */
  showDetails(songId: string) {
    this.selectedSong = this.songLists.find(
      (song: ISong) => song.uri === songId
    );
    this.ref.markForCheck();
  }

  /**
   * Change the selected song into the metal
   */
  changeSongToMetal() {
    if (!this.selectedSong) return;
    this.selectedSong = Object.assign(this.selectedSong, { type: 'metal' });
    this.songLists = this.songLists.map((song) =>
      song.uri === this.selectedSong?.uri ? this.selectedSong : song
    );
    this.ref.markForCheck();

    // FIXME Weird behavior, type get updated in the songs list but it is not reflected in the table
    // console.log(this.songLists);
  }
}
