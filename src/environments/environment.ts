/*
 * ................................................................................................................................
 *  . Copyright (c)
 *  .
 *  . The environment.ts class was created by :
 *  . A.Bolot, O.Osgart, L.Oms and G.Peltier
 *  .
 *  . As part of the polygame project
 *  .
 *  . Last modified : 29/06/18 11:02
 *  .
 *  . Contact : idevedit@gmail.com
 *  ...............................................................................................................................
 *
 */

// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,
    firebase: {
        apiKey: 'AIzaSyAjfhqoRNbO-CFZVdB-ax8QWoP3WMuY-0s',
        authDomain: 'site-asso-pns.firebaseapp.com',
        databaseURL: 'https://site-asso-pns.firebaseio.com',
        projectId: 'site-asso-pns',
        storageBucket: 'site-asso-pns.appspot.com',
        messagingSenderId: '797343092119'
    }
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
