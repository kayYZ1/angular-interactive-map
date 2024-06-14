import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideState, provideStore } from '@ngrx/store'
import { provideStoreDevtools } from '@ngrx/store-devtools'

import { routes } from './app.routes';
import { objectsReducer } from './core/store/objects/objects.reducer';
import { tripReducer } from './core/store/trip/trip.reducer';

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
      name: "objects", reducer: objectsReducer
    }),
    provideState({
      name: "trip", reducer: tripReducer
    })
  ]
};
