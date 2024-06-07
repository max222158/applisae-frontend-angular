import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../../../../services/api/user/user.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { clearInput } from '../../../../../helpers/helper';


interface User {
  id: number;
  role: string; // Nouvelle propriété pour stocker le rôle sélectionné
}
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})

export class CreateGroupComponent {
  constructor(private toastr: ToastrService, private userService: UserService, private fb: FormBuilder) { }

  users: any = []
  usersInGroup: any = []

  groupForm: FormGroup;
  userPost: any[] | undefined;
  isLoading: boolean = false;
  currentPage: number = 1;
  query: string = '';
  totalPages: number = 0;
  selectedRoles = {};
  isSpinnerLoading:boolean = false
  disabled:boolean = true
  ngOnInit() {
    this.groupForm = this.fb.group({
      name: [''],
      description:['']

      // Add other form controls as needed
    });
    this.groupForm.get('name')?.valueChanges.subscribe((value: string) => {
      this.disabled = value.trim() === ''; // Disable if name is empty or whitespace
    });
    this.getUsers()

  }

    

  filterUsers() {
    const usersInGroupIds = new Set(this.usersInGroup.map((user: { id: any; }) => user.id));
    this.users = this.users.filter((user: { id: any; }) => !usersInGroupIds.has(user.id));
  }

  getUsers(): void {
    this.userService.getUsersSearch(this.currentPage, this.query).subscribe({
      next: (data: any) => {
        this.users = data.results;  // Assumes the response includes a 'results' array
        
        this.totalPages = data.total_pages;
        console.log(this.users)
        this.filterUsers()

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
    this.currentPage = 1;  // Reset to first page on new search
    this.getUsers();
  }

  onInputChange(event: any): void {
    this.query = event.target.value;

  }

  onSubmit(){
    this.disabled = false
    this.isSpinnerLoading = true
    const selectElements = document.querySelectorAll<HTMLSelectElement>('select[name="role"]');
    let usersPost:any = []
      
    this.usersInGroup.forEach((item: any, index: number) => {

      const roleValue = selectElements[index]?.value || '';
      usersPost.push({'role':roleValue,'id':item.id});
    });

    const formData = new FormData();
    formData.append('user_role', JSON.stringify(usersPost));
    formData.append('name', this.groupForm.value.name);
    formData.append('description', this.groupForm.value.description);

    this.userService.createGroup(formData).subscribe({
      next: (data: any) => {

        this.disabled = true
        this.isSpinnerLoading = false
        this.toastr.success('Groupe créé', 'Succès');
        clearInput(this.groupForm, ['name', 'description']);
        

      },
      error: (error: any) => {
        console.error('Erreur lors de la requête vers l\'API:', error);
        this.toastr.error('Lors de l\'enregistrement! Veuillez réésayer', 'Erreur');

        // Ajoutez ici la gestion des erreurs
        this.disabled = true
        this.isSpinnerLoading = false
      }
    });
    console.log(usersPost)
  }

  addUserToGroup(userId: number) {
    const user = this.users.find((u: { id: number; }) => u.id === userId);
    if (user) {
      this.usersInGroup.push(user);
      this.users = this.users.filter((u: { id: number; }) => u.id !== userId);
    }
  }

  removeUserFromGroup(userId: number) {
    const user = this.usersInGroup.find((u: { id: number; }) => u.id === userId);
    if (user) {
      this.users.push(user);
      this.usersInGroup = this.usersInGroup.filter((u: { id: number; }) => u.id !== userId);
    }
  }
}
