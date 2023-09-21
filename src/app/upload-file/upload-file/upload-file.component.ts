import { Component, OnInit } from '@angular/core';
import { UploadFileService } from '../upload-file.service';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { filterResponse, uploadProgress } from 'src/app/shared/rxjs-operators';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss'],
})
export class UploadFileComponent implements OnInit {
  files: Set<File>;
  progress: number = 0;

  constructor(private service: UploadFileService) {}

  ngOnInit(): void {}

  onChange(event) {
    console.log(event);

    const selectedFiles = <FileList>event.srcElement.files;
    // document.getElementById('customFileLabel').innerHTML = selectedFiles[0].name;

    const fileNames = [];
    this.files = new Set();
    for (let i = 0; i < selectedFiles.length; i++) {
      fileNames.push(selectedFiles[i].name);
      this.files.add(selectedFiles[i]);
    }
    document.getElementById('customFileLabel').innerHTML = fileNames.join(', ');
    this.progress = 0;
  }

  onUpload() {
    if (this.files && this.files.size > 0) {
      this.service
        .upload(this.files, '/api/upload')
        .pipe(
          uploadProgress((progress) => {
            console.log(progress);
            this.progress = progress;
          }),
          filterResponse()
        )
        .subscribe((response) => console.log('Upload Concluído'));
    }
  }

  onDownloadExcel() {
    this.service
      .download('http://localhost:8000/downloadExcel')
      .subscribe((res: any) => {
        const file = new Blob([res], {
          type: res.type,
        });

        // Internet Explorer
        if (window.navigator && (<any>window.navigator).msSaveOrOpenBlob) {
          (<any>window.navigator).msSaveOrOpenBlob(file);
        }

        const blob = window.URL.createObjectURL(file);
        const link = document.createElement('a');
        link.href = blob;
        link.download = 'report.xlsx';

        link.click();
        window.URL.revokeObjectURL(blob);
        link.remove();
      });
  }

  onDownloadPdf() {}
}
