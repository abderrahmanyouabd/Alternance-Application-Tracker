import { Component } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-language-switcher',
  standalone: true,
  imports: [AsyncPipe],
  template: `
    <div class="flex items-center space-x-2">
      <button 
        (click)="switchLanguage('en')"
        class="px-2 py-1 rounded-md text-sm"
        [class.bg-primary-500]="(languageService.currentLang$ | async) === 'en'"
        [class.text-white]="(languageService.currentLang$ | async) === 'en'"
        [class.bg-gray-100]="(languageService.currentLang$ | async) !== 'en'">
        EN
      </button>
      <button 
        (click)="switchLanguage('fr')"
        class="px-2 py-1 rounded-md text-sm"
        [class.bg-primary-500]="(languageService.currentLang$ | async) === 'fr'"
        [class.text-white]="(languageService.currentLang$ | async) === 'fr'"
        [class.bg-gray-100]="(languageService.currentLang$ | async) !== 'fr'">
        FR
      </button>
    </div>
  `
})
export class LanguageSwitcherComponent {
  constructor(public languageService: LanguageService) {}

  switchLanguage(lang: 'en' | 'fr') {
    this.languageService.setLanguage(lang);
  }
} 