import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../../../services/api/user/user.service';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrl: './group.component.css'
})
export class GroupComponent {

  groupeList: any = []

  constructor(private toastr: ToastrService, private userService: UserService) { }

  users: any = []
  usersInGroup: any = []


  userPost: any[] | undefined;
  isLoading: boolean = false;
  query: string = '';
  totalPages: number = 0;
  selectedRoles = {};
  isSpinnerLoading:boolean = false
  disabled:boolean = true
  perPage: number = 20
  totalItems: any = 0
  page: number = 1

  ngOnInit() {

    this.getGroup()

  }

    



  getGroup(): void {
    this.userService.getGroupsSearch(this.page, this.query).subscribe({
      next: (data: any) => {
        this.groupeList = data.results;  // Assumes the response includes a 'results' array
        
        this.totalPages = data.total_pages;
        this.totalItems = data.count

        // Ajoutez ici la gestion de la réponse de l'API
      },
      error: (error: any) => {
        console.error('Erreur lors de la requête vers l\'API:', error);
        this.toastr.error('Lors de l\'enregistrement! Veuillez réésayer', 'Erreur');
        this.isLoading = false
        // Ajoutez ici la gestion des erreurs
      }
    });
  }

  onSearch(): void {
    this.page = 1;  // Reset to first page on new search
    this.getGroup();
  }

  onInputChange(event: any): void {
    this.query = event.target.value;

  }

  pageChanged(event: any) {
    this.page = event;
    console.log(event)
    this.getGroup();
  }



}
