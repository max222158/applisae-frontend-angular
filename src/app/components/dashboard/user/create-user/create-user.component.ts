import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ApiService } from '../../../../services/api.service';
import { UserService } from '../../../../services/user/user.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.css'
})
export class CreateUserComponent {
  permissionList: any[] | undefined;
  constructor(private wordToPdfService: ApiService,private  permissionService:UserService,private fb: FormBuilder) { }
  userForm: FormGroup;
  ngOnInit() {

    this.userForm= this.fb.group({
      userImage: [''],
      identifiant: [''],
      name: [''],
      email: [''],
      gender: [''],
      service: [''],
      permission: [''],
      
       // Add other form controls as needed
     });
     this.permissionService.getPermissionList().subscribe(data => {
      this.permissionList = data;
    });

  }
  onFileChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;

    if (inputElement && inputElement.files && inputElement.files.length > 0) {
      const file = inputElement.files[0];
      this.userForm.patchValue({
        userImage: file
      });
    } else {
      // Handle the case when files are not available
      console.error("No files selected");
    }
  }

  getPreviewUrl() {
    const file = this.userForm.get('userImage')?.value;
    if (file) {
      return URL.createObjectURL(file);
    }
    return null;
  }
  onSubmit() {
    if (this.userForm.valid) {

     console.log(this.userForm.value);
   }
  }

}
