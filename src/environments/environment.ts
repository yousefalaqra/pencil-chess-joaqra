// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  frameUrl: 'http://localhost:4200/game/chess',
  boardUrl: 'http://localhost:4200/game/board',
  firebase: {
    projectId: 'pencil-chess',
    appId: '1:269871994740:web:a3752ed1b01768843bbe21',
    storageBucket: 'pencil-chess.appspot.com',
    apiKey: 'AIzaSyACwEA7c3gu71ktcXxHDauC0U6h5irMOpI',
    authDomain: 'pencil-chess.firebaseapp.com',
    messagingSenderId: '269871994740',
    measurementId: 'G-8HP74TKT51',
  },
  production: false
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
