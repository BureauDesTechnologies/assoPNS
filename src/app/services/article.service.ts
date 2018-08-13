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
            throw Error("You should not try to load doawnload url on a article without imageUrl");
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

    async loadComments(article: Article) {
        if (isNullOrUndefined(article.comments)) {
            article.comments = new Set();
        }
        const articleData = (await firestore().collection('Articles').doc(article.id).get()).data();
        if (isNullOrUndefined(articleData.comments)) {
            return;
        }
        articleData.comments.forEach(async comment => {
            const user = User.fromDB(await comment.user.get());
            article.addComment(new ArticleComment(user, new Date(comment.date), comment.content));
        });
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
}
