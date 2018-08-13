import {User} from "./user";

export class ArticleComment {
    /**
     * @param author
     * @param date
     * @param content can be long
     */
    constructor(author: User, date: Date, content: string) {
        this.author = author;
        this.date = date;
        this.content = content;
    }

    date: Date;
    author: User;
    content: string;
}
