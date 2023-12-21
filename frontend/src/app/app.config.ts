import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, withPreloading } from '@angular/router';

import { routes } from './app.routes';
import { HttpClientModule } from '@angular/common/http';
import { CustomPreloadStrategyService } from './data/services/CustomPreloadStrategy.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withPreloading(CustomPreloadStrategyService)),
    importProvidersFrom(HttpClientModule),
  ],
};
