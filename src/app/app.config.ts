import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations'
import { provideRouter } from '@angular/router';
import { provideState, provideStore } from '@ngrx/store'
import { provideStoreDevtools } from '@ngrx/store-devtools'

import { routes } from './app.routes';
import { tripReducer } from './core/store/trip/trip.reducer';
import { filtersReducer } from './core/store/filters/filters.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideStore(),
    provideStoreDevtools({
      autoPause: true,
      trace: false,
      connectInZone: true
    }),
    provideState({
      name: "trip", reducer: tripReducer
    }),
    provideState({
      name: "filters", reducer: filtersReducer
    })
  ]
};
