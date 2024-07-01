import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { AppState } from '../../../../../state/app.state';
import { getUsersResponse, getUsersState, isLoadingUsers, totalUsersItems } from '../../../../../state/selectors/users/users.selectors';
import { getUsers } from '../../../../../state/actions/users/users.actions';
import { FormControl } from '@angular/forms';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { UsersSelectionService } from '../../../../../services/shared/user/users-selection.service';
import { GroupesSelectionService } from '../../../../../services/shared/user/groupes-selection.service';
import {User} from '../../../../../models/user.interface'
import { FilemanagerService } from '../../../../../services/api/filemanager/filemanager.service';
import { ToastrService } from 'ngx-toastr';
import { getUserAndGroupPermissionById } from '../../../../../state/actions/numerical-deposit/numerical-deposite.actions';
import { getGroupPermissionByIdIdResponse, getUserAndGroupPermissionByIdIdSuccessState, getUserPermissionByIdIdResponse, isLoadinggetUserAndGroupPermissionByIdIdState } from '../../../../../state/selectors/numerical-deposit/numerical-deposite.selectors';
@Component({
  selector: 'app-folder-permissions',
  templateUrl: './folder-permissions.component.html',
  styleUrl: './folder-permissions.component.css'
})
export class FolderPermissionsComponent {
  private subscriptions: Subscription = new Subscription();
  folder_id: string | null;
  selectedUsers: any[]
  usersBlockVisible: boolean = false
  groupsBlockVisible: boolean = false

  selectedGroups$: Observable<any[]>;
  userInFolderpermission$: Observable<any[]>;
  groupInFolderpermission$: Observable<any[]>;
  private selectedUsersSubject = new BehaviorSubject<any[]>([]);
  selectedUsers$: Observable<any[]> ;
  isGetPermissionsLoading$: Observable<boolean>;
  isLoading:boolean = true
  folderPath:any[]

  detailsSingleFolder:any = {}

  constructor(private route: ActivatedRoute, private store: Store<AppState>, 
    private userSelectionService: UsersSelectionService, private toastr: ToastrService, private fileManagerService:FilemanagerService, private groupSelectionService: GroupesSelectionService) {

      this.userInFolderpermission$ = this.store.select(getUserPermissionByIdIdResponse);
      this.groupInFolderpermission$ = this.store.select(getGroupPermissionByIdIdResponse);
      this.isGetPermissionsLoading$ = this.store.select(isLoadinggetUserAndGroupPermissionByIdIdState);

  
    }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const folderId = params.get('folder');

      if (folderId) {
        this.folder_id = folderId;
        this.store.dispatch(getUserAndGroupPermissionById({ folderId: this.folder_id }));
      } else {
        console.error('Invalid folder ID');
      }
    });

    this.selectedUsers$ = this.userSelectionService.selectedUsers$;
    this.selectedGroups$ = this.groupSelectionService.selectedGroupes$;

    this.subscriptions.add(
      this.userInFolderpermission$.subscribe(users => {
        this.userSelectionService.initSelectedUsers(users);
        console.log('users change in ngOnInit ---- ', users);
      })
    );

    this.subscriptions.add(
      this.groupInFolderpermission$.subscribe(groups => {
        this.groupSelectionService.initSelectedGroup(groups);
        console.log('group change in ngOnInit ---- ', groups);
      })
    );

    this.subscriptions.add(
      this.isGetPermissionsLoading$.subscribe(isLoading => {
        this.isLoading = isLoading;
        console.log('success ---- ', isLoading);
      })
    );

    this.getSingleDetailsFolderById()

  }
  ngOnDestroy() {
    console.log('Component is being destroyed'); // Debugging purpose

    // Unsubscribe from all subscriptions
    this.subscriptions.unsubscribe();

    console.log('Resetting selected groups and users'); // Debugging purpose
    this.groupSelectionService.resetSelectedGroup();
    this.userSelectionService.resetSelectedUser();

    console.log('g1',this.groupSelectionService.getSelectedGroupes())

    // Uncomment if needed
    // this.store.dispatch(resetFolderAndFiles());
  }

  getSingleDetailsFolderById(){

    let formData = new FormData()
    if(this.folder_id){
      formData.append('folder_id',this.folder_id)
      this.fileManagerService.getSingleDetailsFolderById(formData).subscribe({
        next : (response)=>{

          this.detailsSingleFolder = response.folder
          this.folderPath = response.path

        },
        error: ()=>{

        }
      })
    }

  }
  updateUserPermission(userId: number, event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const permission = selectElement.value;
    this.userSelectionService.updateUserPermission(userId, permission);
  }



/**
 * Toggles the visibility of the users block.
 */
  setIsUsersBlockVisible(): void {
    
    this.usersBlockVisible = !this.usersBlockVisible;

    // Check if the groups block is visible and hide it
    if (this.groupsBlockVisible) {
      this.groupsBlockVisible = false;
    }
  }

  /**
   * Toggles the visibility of the groups block in the UI. If the groups block is made visible, it ensures that the users block is hidden.
   */
  setIsGroupsBlockVisible(): void {
    this.groupsBlockVisible = !this.groupsBlockVisible;
    if (this.usersBlockVisible) {
      this.usersBlockVisible = false;
    }
  }

  removeUser(user:any){

    this.userSelectionService.removeUser(user)

  }
  removeGroup(group:any){

    this.groupSelectionService.removeGroupe(group)

  }
  onRoleChange(event: any, user: User): void {
    user.role = event.target.value;
  }


  prepareDataForBackend() {
    const selectedUsers = this.userSelectionService.getSelectedUsers();
    const userWithRole = selectedUsers.map(user => ({
      id: user.id,
      permission: user.permission
    }));
    const selectedGroupsIds = this.groupSelectionService.getSelectedGroupes();
    const group = selectedUsers.map(group => ({
      id: group.id,
    }));
    console.log('Data to send:', { users_permission: userWithRole, groups: group, folder_id: this.folder_id  });
    return { users_permission: userWithRole, groups: selectedGroupsIds, folder_id: this.folder_id };
  }
  /**
   * Prepares user and group permission data and sends it to a backend service.
   * Handles response or error from the backend.
   */
  sendData(): void {
    const dataToSend = this.prepareDataForBackend();

    this.fileManagerService.sendPermissionListFilesAndFolder(dataToSend).subscribe({
      next: (data) => {
         this.toastr.success('Enregistrées avec succès!', 'Permissions');
        // Handle successful response if needed
      },
      error: (error) => {
        console.error('Error while making API request:', error);
        this.toastr.error('Erreur lors de l\'enregistrement!', 'Réessayer');
        // Add error handling logic here
      }
    });
  }

}
