/*
 * ................................................................................................................................
 *  . Copyright (c)
 *  .
 *  . The app.po.ts class was created by :
 *  . A.Bolot, O.Osgart, L.Oms and G.Peltier
 *  .
 *  . As part of the polygame project
 *  .
 *  . Last modified : 23/06/18 14:19
 *  .
 *  . Contact : idevedit@gmail.com
 *  ...............................................................................................................................
 *
 */

import {browser, by, element} from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('app-root h1')).getText();
  }
}
