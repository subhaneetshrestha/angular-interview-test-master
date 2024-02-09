import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, filter, map, switchMap, take, takeUntil, tap } from 'rxjs';
import { DataApiService } from 'src/app/service/data-api.service';
import { YesNoModalComponent } from 'src/app/shared/component/yes-no-modal/yes-no-modal.component';
import { ISong } from 'src/app/shared/interface';
import { generateRandomString } from 'src/app/shared/utils/stringOperation';

type SongForm = {
  name: FormControl<string | null>;
  singerList: FormControl<string | null>;
  type: FormControl<string | null>;
};

@Component({
  selector: 'app-song-form',
  templateUrl: './song-form.component.html',
  styleUrls: ['./song-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SongFormComponent implements OnInit, OnDestroy {
  @ViewChild('yesNoModal', { static: true }) yesNoModal!: YesNoModalComponent;
  private destroy$ = new Subject();
  private uri = '';
  public songForm!: FormGroup;
  public submitted = false;
  constructor(
    private activatedRoute: ActivatedRoute,
    private dataApiService: DataApiService,
    private ref: ChangeDetectorRef,
    private router: Router
  ) {
    this.songForm = new FormGroup<SongForm>({
      name: new FormControl('', [Validators.required]),
      singerList: new FormControl('', [Validators.required]),
      type: new FormControl('', [Validators.required]),
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.songForm.controls;
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap
      .pipe(
        tap((params) => {
          if (!params.has('id')) {
            const unsavedForm = localStorage.getItem('songForm');
            if (unsavedForm) {
              this.yesNoModal.openModal(
                'Would you like to continue your unsaved changes?'
              );
              this.yesNoModal.confirmation.pipe(take(1)).subscribe({
                next: (confirmation) => {
                  if (confirmation) {
                    this.songForm.patchValue(JSON.parse(unsavedForm));
                  } else {
                    localStorage.clear();
                  }
                  this.ref.markForCheck();
                },
              });
            }
          }
        }),
        filter((params) => params.has('id')),
        map((params) => params.get('id')),
        switchMap((songUri) => this.dataApiService.getSongByUri(songUri!)),
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: (song: ISong) => {
          this.uri = song.uri;
          this.songForm.patchValue({
            name: song.name,
            type: song.type,
            singerList: (song.singerList as string[]).join(','),
          });
          this.ref.markForCheck();
        },
      });

    this.songForm.valueChanges
      .pipe(
        filter(() => (!!this.uri ? false : true)), // stores in localstorage only if there is change in form and it is in add state
        takeUntil(this.destroy$)
      )
      .subscribe((data) => {
        localStorage.setItem('songForm', JSON.stringify(data));
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  /**
   * Submits the song form values to add a new song or update existing
   */
  onSubmit(): void {
    this.submitted = true;
    if (this.songForm.invalid) return;
    this.dataApiService[this.uri ? 'updateSong' : 'addSong']({
      ...this.songForm.value,
      uri: this.uri || generateRandomString(),
      singerList: this.songForm.value.singerList?.split(',').filter(Boolean),
    });
    localStorage.clear();
    this.ref.markForCheck();
    this.router.navigate(['']);
  }
}
