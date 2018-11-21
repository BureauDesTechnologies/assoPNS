import {Article} from "./article";

export class Event {
    article: Article;
    startDate: Date;
    endDate: Date;

    constructor(article: Article, startDate: Date, endDate: Date) {
        this.article = article;
        this.startDate = startDate;
        this.endDate = endDate;
    }
}
