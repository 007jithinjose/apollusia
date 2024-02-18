import {CommonModule, NgOptimizedImage} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {NgbxDarkmodeModule, THEME_ATTRIBUTE} from '@mean-stream/ngbx';
import {NgbAlertModule, NgbCollapseModule, NgbDropdownModule, NgbTooltipModule} from '@ng-bootstrap/ng-bootstrap';

import {CookieBannerComponent} from './cookie-banner/cookie-banner.component';
import {LocationLinkComponent} from './location-link/location-link.component';
import {MarkdownComponent} from './markdown/markdown.component';
import {NavbarComponent} from './navbar/navbar.component';
import {LocationIconPipe} from './pipes/location-icon.pipe';
import {TokenComponent} from './token/token.component';

@NgModule({
  declarations: [
    NavbarComponent,
    TokenComponent,
    MarkdownComponent,
    LocationLinkComponent,
    LocationIconPipe,
    CookieBannerComponent,
  ],
  imports: [
    CommonModule,
    NgbCollapseModule,
    RouterModule,
    FormsModule,
    NgbTooltipModule,
    ReactiveFormsModule,
    NgbAlertModule,
    NgOptimizedImage,
    NgbDropdownModule,
    NgbxDarkmodeModule,
  ],
  exports: [
    RouterModule,
    NavbarComponent,
    TokenComponent,
    MarkdownComponent,
    LocationLinkComponent,
    LocationIconPipe,
    CookieBannerComponent,
  ],
  providers: [
    {
      provide: THEME_ATTRIBUTE,
      useValue: 'data-bs-theme',
    },
  ],
})
export class CoreModule {
}
