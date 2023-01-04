import { bootstrapApplication } from '@angular/platform-browser';
import {
  provideRouter,
  withEnabledBlockingInitialNavigation,
} from '@angular/router';
import { AppComponent } from './app/app.component';
import { CLIENT_FEAT_SHELL_ROUTES } from '@angular-image-generation/client/feat-shell';
import { HttpClientModule } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(
      CLIENT_FEAT_SHELL_ROUTES,
      withEnabledBlockingInitialNavigation(),
    ),
    importProvidersFrom(HttpClientModule),
  ],
}).catch((err) => console.error(err));
