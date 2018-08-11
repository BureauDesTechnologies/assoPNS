import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {AngularFireStorage, AngularFireUploadTask} from "angularfire2/storage";
import {Observable} from "rxjs/Observable";
import {AngularFirestore} from "angularfire2/firestore";
import {tap} from "rxjs/internal/operators";
import {AngularFireAuth} from "angularfire2/auth";

@Component({
    selector: 'app-file-upload',
    templateUrl: './file-upload.component.html',
    styleUrls: ['./file-upload.component.scss']
})
/**
 * Fetch the file from the PC and upload it to firestorage
 * Could handle multi file
 *
 * Source : https://angularfirebase.com/lessons/firebase-storage-with-angularfire-dropzone-file-uploader/
 *
 * @param displayedTitle First title on the component
 * @param displayedMessage Message under the title used to indicate which type of content is expected
 * @param expectedType type of content expected. Type MIME (such as image/jpeg <br> Use image would work
 * @returns uploadedOnURL link in the database
 * @returns downloadableOn link needed to access the file outside the database
 */
export class FileUploadComponent implements OnInit {

    @Input()
    displayedTitle: string;
    @Input()
    displayedMessage: string;
    @Input()
    expectedType: string;
    @Input()
    subFolder: string;

    @Output()
    uploadedOnURL = new EventEmitter<string>();

    @Output()
    downloadableOn = new EventEmitter<string>();

    basePath = 'uploads';

    // Main task
    task: AngularFireUploadTask;

    // Progress monitoring
    percentage: Observable<number>;

    snapshot: Observable<any>;

    // State for dropzone CSS toggling
    isHovering: boolean;

    constructor(private storage: AngularFireStorage, private db: AngularFirestore, private auth: AngularFireAuth) {
        this.displayedTitle = 'Envoyer un fichier';
        this.displayedMessage = '';
        this.expectedType = '';
        this.subFolder = '';
    }

    ngOnInit() {
    }

    toggleHover(event: boolean) {
        this.isHovering = event;
    }

    startUpload(event: FileList) {
        // The File object
        const file = event.item(0);

        // Client-side validation example
        if (!file.type.includes(this.expectedType)) {
            console.error('unsupported file type :( ');
            return;
        }

        // The storage path
        const path = `${this.basePath}/${this.subFolder}/${new Date().getTime()}_${file.name}`;

        // Totally optional metadata
        const customMetadata = {};

        // The main task
        this.task = this.storage.upload(path, file, {customMetadata});

        // Progress monitoring
        this.percentage = this.task.percentageChanges();
        this.snapshot = this.task.snapshotChanges().pipe(
            tap(snap => {
                if (snap.bytesTransferred === snap.totalBytes) {
                    // Update firestore on completion

                    this.uploadedOnURL.emit(path.toString());
                    this.storage.ref(path).getDownloadURL().subscribe(downloadUrl => {
                        this.downloadableOn.emit(downloadUrl.toString());
                    });
                }
            })
        );
    }

    // Determines if the upload task is active
    isActive(snapshot) {
        return snapshot.state === 'running' && snapshot.bytesTransferred < snapshot.totalBytes;
    }

}
