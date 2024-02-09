import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { songsCollection } from '../mockData/songs';
import { ISong } from '../shared/interface';

@Injectable({
  providedIn: 'root',
})
export class DataApiService {
  // Cache the songs list
  private allSongs = songsCollection;

  constructor() {}

  /**
   * Creates a mock Observable
   *
   * @param data
   * @param delayTime
   * @returns
   */
  private createMockObservable<T>(data: T, delayTime?: number): Observable<T> {
    return new Observable((observer) => {
      setTimeout(() => {
        observer.next(data);
      }, delayTime || 2000);
    });
  }

  /**
   * Get list of songs
   *
   * @returns
   */
  public fetchSongs(): Observable<any> {
    return of(this.allSongs);
  }

  /**
   * Get list of the songs based on song name
   *
   * @param songName
   * @returns
   */
  public getSongsByName(songName: string): Observable<ISong[]> {
    const songs = this.allSongs.filter((song) => song.name.includes(songName));

    return new Observable((observer) => {
      setTimeout(() => {
        observer.next(songs);
      }, 2000);
    });
  }

  /**
   * Gets a new song by its uri
   *
   * @param uri
   * @returns
   */
  public getSongByUri(uri: string): Observable<ISong> {
    const song = this.allSongs.find((song) => song.uri === uri);
    return this.createMockObservable<ISong>(song!);
  }

  /**
   * Adds a new song
   *
   * @param newSong
   */
  public addSong(newSong: any) {
    if (newSong satisfies ISong) {
      this.allSongs.push(newSong);
    }
  }

  /**
   * Update a song by its URI
   *
   * @param updatedSong
   */
  public updateSong(updatedSong: any): void {
    this.allSongs = this.allSongs.map((song) => {
      if (song.uri !== updatedSong.uri) return song;
      return updatedSong;
    });
  }
}
