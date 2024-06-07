import { Component } from '@angular/core';
import { UserService } from '../../../../services/api/user/user.service';
import { Media_url_public } from '../../../../constants/constants';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {
  constructor(private  userService:UserService) { }
  // Utilisation d'un tableau générique pour stocker les données
  userList: any[] | undefined;
  media_url_public:string = Media_url_public;
 
  ngOnInit() {

    this.userService.getAllUsers().subscribe(data => {
      this.userList = data;
    });
  }

}
