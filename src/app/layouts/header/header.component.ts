import { Component, Renderer2 } from '@angular/core';
import { ThemeService } from '../../services/core/theme/theme.service';
import { Media_url_public } from '../../constants/constants';
import { AuthService } from '../../services/api/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  isMiniSidebar:boolean = false
  show:boolean = false

  userDetails:any = {};
  media_url_public:string = Media_url_public;
  ngOnInit() {

    this.userDetails = this.authService.getUser()

  }
  /*   toggleMenu = () =>{
    const element = document.body as HTMLBodyElement
    element.classList.toggle("mini_sidebar");
  } */
  constructor(private themeService: ThemeService,private renderer: Renderer2,private authService: AuthService) {}

  toggleSidebar() {
    if(this.isMiniSidebar){
      this.renderer.addClass(document.body, 'sidebar-enable');
      this.renderer.addClass(document.body, 'vertical-collpsed');  
      this.isMiniSidebar = false
    }else{

      this.renderer.removeClass(document.body, 'sidebar-enable');
      this.renderer.removeClass(document.body, 'vertical-collpsed');  
      this.isMiniSidebar = true

    }

    
  }

  setShowParameter(){

    if(this.show == true){
      this.show = false
    }else{

      this.show = true
    }
  }

  toggleDarkMode() {
    this.themeService.toggleDarkMode();
  }

  isDarkMode() {
    return this.themeService.isDarkMode();
  }

  logout(){

    this.authService.logout()


  }

}
