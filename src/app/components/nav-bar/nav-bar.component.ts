import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LanguageSwitcherComponent } from '../language-switcher/language-switcher.component';
import { LanguageService } from '../../services/language.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterModule, LanguageSwitcherComponent, AsyncPipe],
  template: `
    <nav class="bg-white shadow-lg">
      <div class="max-w-7xl mx-auto px-4">
        <div class="flex justify-between h-16">
          <div class="flex">
            <div class="flex-shrink-0 flex items-center">
              <h1 class="text-xl font-bold text-gray-800">Job Tracker</h1>
            </div>
            <div class="hidden sm:ml-6 sm:flex sm:space-x-8">
              <a routerLink="/" 
                 routerLinkActive="border-primary-500 text-gray-900"
                 [routerLinkActiveOptions]="{exact: true}"
                 class="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                {{languageService.translate('add_application')}}
              </a>
              <a routerLink="/list" 
                 routerLinkActive="border-primary-500 text-gray-900"
                 class="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                {{languageService.translate('view_applications')}}
              </a>
            </div>
          </div>
          <div class="flex items-center">
            <app-language-switcher></app-language-switcher>
          </div>
        </div>
      </div>
    </nav>
  `
})
export class NavBarComponent {
  constructor(public languageService: LanguageService) {}
} 