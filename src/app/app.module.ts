import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SongListComponent } from './components/song-list/song-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SongsComponent } from './components/songs/songs.component';
import { ArrayJoinPipe } from './shared/pipes/array-join.pipe';
import { SongFormComponent } from './components/song-form/song-form.component';
import { YesNoModalComponent } from './shared/component/yes-no-modal/yes-no-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    SongListComponent,
    SongsComponent,
    ArrayJoinPipe,
    SongFormComponent,
    YesNoModalComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
