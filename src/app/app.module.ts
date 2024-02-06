import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SongListComponent } from './components/song-list/song-list.component';
import { FormsModule } from '@angular/forms';
import { SongsComponent } from './components/songs/songs.component';
import { SongListPipe } from './shared/pipes/song-list.pipe';

@NgModule({
  declarations: [AppComponent, SongListComponent, SongsComponent, SongListPipe],
  imports: [BrowserModule, AppRoutingModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
