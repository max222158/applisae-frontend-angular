import { Component } from '@angular/core';
import { UserService } from '../../../../services/api/user/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {
  constructor(private  userService:UserService) { }
  // Utilisation d'un tableau générique pour stocker les données
  userList: any[] | undefined;
 
 
  ngOnInit() {

    this.userService.getAllUsers().subscribe(data => {
      this.userList = data;
    });
  }

}
