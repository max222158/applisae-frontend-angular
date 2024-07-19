import { Component } from '@angular/core';
import { CourrierService } from '../../../../services/api/courrier/courrier/courrier.service';
import { NavigationExtras, Router } from '@angular/router';


@Component({
  selector: 'app-my-courrier',
  templateUrl: './my-courrier.component.html',
  styleUrl: './my-courrier.component.css'
})
export class MyCourrierComponent {
  [x: string]: any;
  selectedOption: string = '';
  courriers: any[] = [];
  perPage: number = 10
  totalItems: any = 0
  page: number = 1
  filterCourrier:string = ''
  selectFilterCourrier:number = 1

  selectedFile: File | null = null;
  document: Document | null = null;
  isLoading: boolean = true
  constructor(private courrierService: CourrierService, private router: Router) { }
  // Utilisation d'un tableau générique pour stocker les données

  fetchCourrier() {
    this.isLoading = true
    this.courrierService.getCourrierList(this.page, this.filterCourrier)
    .subscribe({
      next:(data:any)=>{
        this.isLoading = false
        console.log(data);
        this.courriers = data.results;
        this.totalItems = data.count
      },
      error:()=>{
        this.isLoading = false
      }
    });
  }
  ngOnInit(): void {
    this.fetchCourrier()
  }
  pageChanged(event: any) {
    this.page = event;
    console.log(event)
    this.onPaginationCourrierChange(this.filterCourrier)
  }


  onFilteredCourrierChange(value:string,selectedIndex:number){
    this.isLoading = true
    this.selectFilterCourrier = selectedIndex
    this.filterCourrier = value
    this.page = 1

    this.courrierService.getCourrierList(this.page, value).subscribe({next:(data:any)=>{
      console.log(data);
      this.courriers = data.results;
      this.totalItems = data.count
      this.isLoading = false
    },
    error: (error: any) => {

      this.isLoading = false

    }
  
  })
  }

  onPaginationCourrierChange(value:string){

    this.filterCourrier = value
    this.isLoading = true

    this.courrierService.getCourrierList(this.page, value).subscribe(
      {
        next:(data:any)=>{
      console.log(data);
      this.courriers = data.results;
      this.totalItems = data.count
      this.isLoading = false
    },
    error: (error: any) => {

      this.isLoading = false
    }
  
  })
  }
  gotoDetailsCourrierPage(courrierId: number, subject: string, annotation: string, email: string, name: string,date:string) {


    const navigationExtras: NavigationExtras = {
      state: {
        // Ajoutez vos paramètres ici
        subject: subject,
        annotation: annotation,
        email: email,
        name:name,
        date:date
      }
    };

    this.router.navigate(['/tableau-de-bord/courriers/details-courrier', courrierId], navigationExtras);
  }
}
