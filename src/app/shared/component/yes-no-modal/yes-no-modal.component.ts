import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  OnDestroy,
  Output,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-yes-no-modal',
  templateUrl: './yes-no-modal.component.html',
  styleUrls: ['./yes-no-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class YesNoModalComponent implements OnDestroy {
  @ViewChild('yesNoDialog', { static: true })
  dialog!: ElementRef<HTMLDialogElement>;
  @Output() confirmation = new EventEmitter<boolean>();
  message: string = '';

  constructor(private ref: ChangeDetectorRef) {}

  public openModal(message: string) {
    this.message = message;
    this.dialog.nativeElement.showModal();
    this.ref.markForCheck();
  }

  ngOnDestroy(): void {
    this.dialog.nativeElement.close();
    this.ref.markForCheck();
  }

  confirmDialog(event?: string) {
    this.confirmation.next(!!event);
    this.dialog.nativeElement.close();
  }
}
