import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SongsComponent } from './components/songs/songs.component';
import { SongFormComponent } from './components/song-form/song-form.component';

const routes: Routes = [
  {
    path: '',
    component: SongsComponent,
  },
  {
    path: 'song/edit/:id',
    component: SongFormComponent,
  },
  {
    path: 'song/add',
    component: SongFormComponent,
  },
  {
    path: '**',
    redirectTo: '',
  }, // Redirect wildcard path to songs page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
