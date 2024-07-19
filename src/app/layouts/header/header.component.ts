import { Component, Renderer2 } from '@angular/core';
import { ThemeService } from '../../services/core/theme/theme.service';
import { Media_url_public } from '../../constants/constants';
import { AuthService } from '../../services/api/auth/auth.service';
import {  debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { FormControl } from '@angular/forms';
import { FilemanagerService } from '../../services/api/filemanager/filemanager.service';
import { getFileIconSrc } from '../../helpers/helper';
import { Router } from '@angular/router';
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
  isLoading:boolean = true
  isSearchSectionVisible:boolean = false
  selectedOption:number = -1
  searchControl = new FormControl();
  searchText:string = ''
  page:number = 1
  perPage:number = 20 
  totalItems:number;
  documentId:number
  fileName:string = ''
  extension:string = ''
  isModalReadSingle:boolean = false
  filterBy:string = 'all'

  isFilesAndFolderLoading:boolean = false
  foldersFilesResponse:any[] = []
  ngOnInit() {

    this.userDetails = this.authService.getUser()
    this.onQueryTextChange()
  }

  onFilteredChange(filter:string,index:number){

    this.filterBy = filter
    this.selectedOption = index

    this.search()

  }
  /*   toggleMenu = () =>{
    const element = document.body as HTMLBodyElement
    element.classList.toggle("mini_sidebar");
  } */
  constructor(private themeService: ThemeService,private renderer: Renderer2, private router: Router,private authService: AuthService, private fileManagerService:FilemanagerService) {}

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

  search(){

    this.isFilesAndFolderLoading = true
      
      let formData = new FormData()
      formData.append('page',this.page.toString())
      formData.append('searchText',this.searchText)
      formData.append('filterBy',this.filterBy)
  
      this.fileManagerService.searchGlobal(formData).subscribe({
        next: (response: any) => {
          this.isLoading = false;
          this.foldersFilesResponse = response.results
          console.log('Réponse de l\'API:', response)
          this.isFilesAndFolderLoading = false
  
          // Ajoutez ici la gestion de la réponse de l'API
        },
        error: (error: any) => {
          this.isFilesAndFolderLoading = false
          console.error('Erreur lors de la requête vers l\'API:', error);
          // Ajoutez ici la gestion des erreurs
        }
      });
  

  
   
  

  }

  pageChanged(event:any){


  }

  fileIconSrc(extension:string){

    return getFileIconSrc(extension)

  }
     onQueryTextChange(): void {


      this.searchControl.valueChanges.pipe(
        debounceTime(500), // 300ms debounce time
        distinctUntilChanged(),
        switchMap(query => {
          this.searchText = query
          this.page = 1
           this.search()
          // Dispatch the action to the store
  
        console.log(query)
          // Return an observable that completes immediately since dispatch doesn't return an observable
          return [];
        })
      ).subscribe();
    }


    openFolderById(id:number,name:string,page:number){
      
      this.router.navigate(['/tableau-de-bord/fonds-numeriques/index/'+id]);
      this.isSearchSectionVisible = false

  


  
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
  setIsSearchSectionVisible(value:boolean){
    this.isSearchSectionVisible = value
  }
  gotoDetailsDocument(documentId:number){
    this.router.navigate(['/tableau-de-bord/fonds-numeriques/details-document/'+documentId]);
    this.isSearchSectionVisible = false  
  
  }


  closeModalReaderDocument(){
    this.isModalReadSingle = false
  }
}
