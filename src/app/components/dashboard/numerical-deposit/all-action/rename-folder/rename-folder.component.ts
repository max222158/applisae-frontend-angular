import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FilemanagerService } from '../../../../../services/api/filemanager/filemanager.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-rename-folder',
  templateUrl: './rename-folder.component.html',
  styleUrl: './rename-folder.component.css'
})
export class RenameFolderComponent {

  constructor(private fileManagerService: FilemanagerService, private toastr: ToastrService) {
    
  }

  @Input() isOpenModal: boolean = false;
  @Input() folderId:number;
  @Input() folderName:any;
  @Output() closeModalEvent = new EventEmitter<void>();


  renameFolder(){
    let formData  = new FormData();

    formData.append('folder_id', this.folderId.toString());
    formData.append('name', this.folderName);
    this.fileManagerService.renameFolder(formData).subscribe(
      {
        next: () => {
          this.closeModal();
          this.toastr.success('Le dossier a bien été renommé', 'Success');
        },error: () => {
          this.toastr.error('Une erreur est survenue', 'Error');
        }
      }
      
    )
  }

  closeModal() {
    this.closeModalEvent.emit();
  }



}
