/**
 * Created by Lucas OMS on 11/08/2018.
 */

/*
 * ................................................................................................................................
 *  . Copyright (c)
 *  .
 *  . The user.service.ts class was created by :
 *  . A.Bolot, O.Osgart, L.Oms and G.Peltier
 *  .
 *  . As part of the polygame project
 *  .
 *  . Last modified : 23/07/18 00:27
 *  .
 *  . Contact : idevedit@gmail.com
 *  ...............................................................................................................................
 *
 */


import {Injectable} from "@angular/core";
import {AngularFireStorage} from "angularfire2/storage";
import * as firebase from "firebase";
import {firestore} from "firebase";
import {Article} from "../models/article";

/**
 * This class contains all functions used to manage users
 */
@Injectable()
export class ArticleService {

    constructor(private st: AngularFireStorage) {
    }

    addArticle(article: Article) {
        return firestore().collection('Articles').add({
            title: article.title,
            content: article.content,
            category: article.category,
            imageUrl: article.imageUrl,
            creation: firebase.firestore.FieldValue.serverTimestamp()
        });
    }

    async getAllArticles(): Promise<Article[]> {
        const articles = [];
        const docs = await firestore().collection('Articles').orderBy('creation', "desc").limit(10).get();
        docs.docs.forEach(article => {
            articles.push(Article.fromDB(article));
        });
        return Promise.resolve(articles);
    }
}
