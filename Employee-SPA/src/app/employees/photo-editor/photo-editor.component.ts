import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FileUploader } from 'ng2-file-upload';
import { Photo } from 'src/app/_models/photo.model';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { EmployeeService } from 'src/app/_services/employee.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrls: ['./photo-editor.component.css']
})
export class PhotoEditorComponent implements OnInit {
  @Input() photos: Photo[];
  @Output() getEmployeePhotoChange = new EventEmitter<string>();
  uploader: FileUploader;
  hasBaseDropZoneOver: boolean;
  baseUrl = environment.apiBaseUrl;
  // response: string;
  employeeId: number;
  currentMainPhoto: Photo;

  constructor(
      private route: ActivatedRoute,
      private employeeService: EmployeeService,
      private alertify: AlertifyService
    ) {
    this.employeeId = 0;
  }

  initializeUploader() {
    this.employeeId = +this.route.snapshot.params['id'];
    this.uploader = new FileUploader({
      url: this.baseUrl + 'employees/' + this.employeeId + '/photos',
      // url: this.baseUrl + 'employees/7/photos',
      authToken: 'Bearer ' + localStorage.getItem('token'),
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024
      // disableMultipart: true, // 'DisableMultipart' must be 'true' for formatDataFunction to be called.
      // formatDataFunctionIsAsync: true,
      // formatDataFunction: async (item) => {
      //   return new Promise( (resolve, reject) => {
      //     resolve({
      //       name: item._file.name,
      //       length: item._file.size,
      //       contentType: item._file.type,
      //       date: new Date()
      //     });
      //   });
      // }
    });

    this.hasBaseDropZoneOver = false;
    // this.response = '';
    // this.uploader.response.subscribe( res => this.response = res );

    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };

    this.uploader.onSuccessItem = (item, response, status, headers) => {
       if (response) {
         const res: Photo = JSON.parse(response);
         const photo = {
           id: res.id,
           url: res.url,
           dateAdded: res.dateAdded,
           description: res.description,
           isMain: res.isMain
         };
         this.photos.push(photo);
       }
    };

  }

  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  ngOnInit(): void {
    this.initializeUploader();
  }

  setMainPhoto(photo: Photo) {
    this.employeeService.setMainPhoto(this.employeeId, photo.id).subscribe(() => {
      // console.log('Successfully set the photo as Main...');
      this.currentMainPhoto = this.photos.filter(p => p.isMain)[0];
      if (this.currentMainPhoto !== null) {
        this.currentMainPhoto.isMain = false;
      }
      photo.isMain = true;
      this.getEmployeePhotoChange.emit(photo.url);
    }, error => {
      this.alertify.error(error);
    });
  }

}
