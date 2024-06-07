import { ChangeDetectorRef, Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../../../../services/api/user/user.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { clearInput } from '../../../../../helpers/helper';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class EditComponent {
  constructor(private toastr: ToastrService, private userService: UserService, private fb: FormBuilder,private route: ActivatedRoute, private router: Router, private cdr: ChangeDetectorRef) { }
  

  users: any = []
  usersInGroup: any = []
  userInGroupNoChange:any =[]
  groupDetails: any = {}
  groupForm: FormGroup;
  userPost: any[] | undefined;
  isLoading: boolean = false;
  currentPage: number = 1;
  query: string = '';
  totalPages: number = 0;
  selectedRoles = {};
  isSpinnerLoading:boolean = false
  disabled:boolean = false
  groupId: string | null
  ngOnInit() {
    this.groupForm = this.fb.group({
      name: [''],
      description:['']

      // Add other form controls as needed
    });
    this.groupForm.get('name')?.valueChanges.subscribe((value: string) => {
      this.disabled = value.trim() === ''; // Disable if name is empty or whitespace
    });
    
    this.route.queryParams.subscribe(params => {
      const groupIdParam = this.route.snapshot.paramMap.get('id');
      
      if (groupIdParam !== null) {
        this.groupId = groupIdParam;
        console.log(this.groupId);
        this.userService.getGroupId(parseInt(this.groupId)).subscribe((data: any) => {
          console.log(data);
          const dataUserNochange = data.users;
          this.usersInGroup = data.users;
          this.filterUsers();
          this.groupDetails = data;
          this.userInGroupNoChange = JSON.parse(JSON.stringify(dataUserNochange)); // Crée une copie profonde
        });
      } else {
        console.error('groupId is null');
        // Handle the null case appropriately
        this.groupId = ''; // or some other fallback value
      }
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

    console.log('init ---- ',this.userInGroupNoChange)  

    const addedUsers = this.usersInGroup.filter((user: { id: any; }) => !this.userInGroupNoChange.some((u: { id: any; }) => u.id === user.id));
    const removedUsers = this.userInGroupNoChange.filter((user: { id: any; }) => !this.usersInGroup.some((u: { id: any; }) => u.id === user.id));

    console.log('Ajouté ---- ', addedUsers);
    console.log('Retiré ----', removedUsers);

/*     let addedIds = [];
    let removedIds = [];
  
    const initialIds = this.userInGroupNoChange.map((obj: { id: any; }) => obj);
    console.log('init2 ---- ',initialIds)  
    const newIds = this.usersInGroup.map((obj: { id: any; }) => obj.id);

    addedIds = newIds.filter((id: any) => !initialIds.includes(id));
    removedIds = initialIds.filter((id: any) => !newIds.includes(id));
    console.log('Ajouté ---- ',addedIds)
    console.log('retiré ----',removedIds) */
    return 0;
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

        this.disabled = false
        this.isSpinnerLoading = false
        this.toastr.success('Groupe créé', 'Succès');
        clearInput(this.groupForm, ['name', 'description']);
        

      },
      error: (error: any) => {
        console.error('Erreur lors de la requête vers l\'API:', error);
        this.toastr.error('Lors de l\'enregistrement! Veuillez réésayer', 'Erreur');

        // Ajoutez ici la gestion des erreurs
        this.disabled = false
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
