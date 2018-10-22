import {Injectable} from "@angular/core";
import {AngularFireStorage} from "angularfire2/storage";
import * as firebase from "firebase";
import {firestore} from "firebase";
import {Article} from "../models/article";
import {isNullOrUndefined} from "util";
import {User} from "../models/user";
import {ArticleComment} from "../models/article-comment";

/**
 * This class contains all functions used to manage users
 */
@Injectable()
export class ArticleService {

    constructor(private st: AngularFireStorage) {
    }

    async getDownloadImageUrl(article: Article): Promise<string> {
        if (article.imageUrl === '' || isNullOrUndefined(article.imageUrl)) {
            throw Error("You should not try to load download url on a article without imageUrl");
        } else {
            return this.st.ref(article.imageUrl).getDownloadURL().toPromise();
        }
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

    deleteArticle(article: Article) {
        return firestore().collection('Articles').doc(article.id).delete();
    }

    favArticle(article: Article, user: User) {
        article.favorite.add(user.userId);
        firestore().collection('Articles').doc(article.id).update({
            favorite: [...Array.from(article.favorite.keys())],
        });
    }

    clapArticle(article: Article, user: User) {
        article.clap.add(user.userId);
        firestore().collection('Articles').doc(article.id).update({
            clap: [...Array.from(article.clap.keys())],
        });
    }

    unfavArticle(article: Article, user: User) {
        article.favorite.delete(user.userId);
        firestore().collection('Articles').doc(article.id).update({
            favorite: [...Array.from(article.favorite.keys())],
        });
        console.log('coucou');
    }

    unclapArticle(article: Article, user: User) {
        article.clap.delete(user.userId);
        firestore().collection('Articles').doc(article.id).update({
            clap: [...Array.from(article.clap.keys())],
        });
    }

    async postComment(article: Article, author: User, comment: string): Promise<void> {
        // Load previous comments to avoid override
        await this.loadComments(article);

        const result = [];
        article.addComment(new ArticleComment(author, new Date(Date.now()), comment));
        // Convert to JSON objects
        article.getComments().forEach(commentC => {
            result.push({
                author: firestore().collection('Users').doc(commentC.author.userId),
                date: commentC.date.getTime(),
                content: commentC.content
            });
        });

        return firestore().collection('Articles').doc(article.id).set({
            comments: result,
        }, {merge: true});
    }

    async loadComments(article: Article) {
        if (isNullOrUndefined(article.comments)) {
            article.comments = new Set();
        }
        const articleData = (await firestore().collection('Articles').doc(article.id).get()).data();
        if (isNullOrUndefined(articleData.comments)) {
            return;
        }
        const requests = [];
        articleData.comments.forEach(async comment => {
            const asyncR = comment.author.get();
            requests.push(asyncR);
            const user = User.fromDB(await asyncR);
            article.addComment(new ArticleComment(user, new Date(comment.date), comment.content));
        });
        return Promise.all(requests);
    }

    async getAllArticles(): Promise<Article[]> {
        const articles = [];
        const docs = await firestore().collection('Articles').orderBy('creation', "desc").limit(10).get();
        docs.docs.forEach(async article => {
            const art: Article = Article.fromDB(article);
            if (art.imageUrl !== '' && !isNullOrUndefined(art.imageUrl)) {
                art.downloadableImageUrl = await this.getDownloadImageUrl(art);
            }
            articles.push(art);
        });
        return Promise.resolve(articles);
    }

    async getAllArticlesOf(category: string): Promise<Article[]> {
        const articles = [];
        const docs = await firestore().collection('Articles')
            .where('category', '==', category)
            .orderBy('creation', "desc")
            .get();
        docs.docs.forEach(async article => {
            const art: Article = Article.fromDB(article);
            if (art.imageUrl !== '' && !isNullOrUndefined(art.imageUrl)) {
                art.downloadableImageUrl = await this.getDownloadImageUrl(art);
            }
            articles.push(art);
        });
        return Promise.resolve(articles);
    }

    streamLastArticles(whatToDoWithArticles) {
        return firestore().collection('Articles')
            .orderBy('creation', "desc").limit(10).onSnapshot(whatToDoWithArticles);
    }

    updateArticle(article: Article): Promise<void> {
        return firestore().collection('Articles').doc(article.id).set({
            title: article.title,
            content: article.content,
        }, {merge: true});
    }
}
