import { Component } from '@angular/core';
import { AuthService } from '../../../services/api/auth/auth.service';
import { Media_url_public } from '../../../constants/constants';

@Component({
  selector: 'app-home-user',
  templateUrl: './home-user.component.html',
  styleUrl: './home-user.component.css'
})
export class HomeUserComponent {

  constructor(private authService: AuthService) {}


  userDetails:any = {};
  media_url_public:string = Media_url_public;
  ngOnInit() {

    this.userDetails = this.authService.getUser()

  }

}
