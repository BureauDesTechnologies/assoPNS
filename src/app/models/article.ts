import {isNullOrUndefined} from "util";

export class Article {
    /**
     * @param id On firebase
     * @param title No more than one line
     * @param content can be long
     * @param imageUrl one image, if wanted, set null otherwise
     * @param category that could be displayed
     * @param favorite
     * @param clap
     */
    constructor(id: string, title: string, content: string, imageUrl: string, category: string, favorite: string[], clap: string[]) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.imageUrl = imageUrl;
        this.category = category;
        this.favorite = category;
        this.clap = category;
    }

    id: string;
    title: string;
    content: string;
    imageUrl: string;
    category: string;
    downloadableImageUrl: string;
    favorite: Set<string>;
    clap: Set<string>;

    static fromDB(res): Article {
        return this.fromJSON(res.id, res.data());
    }

    static fromJSON(id: string, doc): Article {
        const article = new Article(id, doc.title, doc.content, doc.imageUrl, doc.category, [], []);
        if (isNullOrUndefined(doc.favorite)) {
            article.favorite = new Set();
        } else {
            article.favorite = new Set(doc.favorite);
        }
        if (isNullOrUndefined(doc.clap)) {
            article.clap = new Set();
        } else {
            article.clap = new Set(doc.clap);
        }

        return article;
    }
}
