import { Component } from '@angular/core';

import { Router } from '@angular/router';
import { GroupService } from '../../../services/api/group/group.service';

@Component({
  selector: 'app-my-groups',
  templateUrl: './my-groups.component.html',
  styleUrl: './my-groups.component.css'
})
export class MyGroupsComponent {

  constructor(private myGroupService: GroupService,private router:Router,){

  }

  myGroups:any[] = []
  page:number = 1

  ngOnInit(){
    this.getMyGroups()
  }
  getMyGroups(){

    let formData =  new FormData()
    formData.append('page',this.page.toString())
    this.myGroupService.getMyGroups(formData).subscribe({
      next: (response)=>{
        this.myGroups = response.results

      },error:(error)=>{
        console.error(error)
      }
    })

  }

  gotoDetailsGroup(groupId: number) {



    this.router.navigate(['/utilisateur/mes-groupes/groupe', groupId]);

  }
  
}
