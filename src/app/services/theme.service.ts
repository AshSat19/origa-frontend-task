import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  darkThemeEnabled: boolean;
  private themeListener: Subject<boolean>;

  constructor() {
    this.darkThemeEnabled = false;
    this.themeListener = new Subject<boolean>();

    this.fetchTheme();
  }

  toggleDarkTheme() {
    this.darkThemeEnabled = !this.darkThemeEnabled;
    this.themeListener.next(this.darkThemeEnabled);
    localStorage.setItem(
      'origa-app-theme', this.darkThemeEnabled ? 'dark' : 'light'
    );
  }

  fetchTheme() {
    const origaAppTheme = localStorage.getItem('origa-app-theme');
    if (origaAppTheme) {
      const fetchedDarkThemeEnabled = origaAppTheme === 'dark' ? true : false;
      this.darkThemeEnabled = fetchedDarkThemeEnabled;
      this.themeListener.next(fetchedDarkThemeEnabled);
    }
  }

  getThemeListener() {
    return this.themeListener.asObservable();
  }
}
