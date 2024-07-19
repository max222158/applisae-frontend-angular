import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GroupService } from '../../../../services/api/group/group.service';
import { getFileIconSrc } from '../../../../helpers/helper';
import { GlobalStateService } from '../../../../services/core/globalState/global-state.service';

@Component({
  selector: 'app-details-my-group',
  templateUrl: './details-my-group.component.html',
  styleUrl: './details-my-group.component.css'
})
export class DetailsMyGroupComponent {

  constructor(private globalStateService: GlobalStateService, private myGroupService: GroupService,private router:Router, private route: ActivatedRoute,){

  }
  isModalReadSingle:boolean = false
  groupId:number
  selectFilterGroup:number = 1
  selectMenu:number = 1
  documentId:number 
  extension:string = ''
  fileName:string = ''
  documents:any[]=[]
  isLoading:boolean = true
  isLoadingWorkflow:boolean = true
  workflows:any[] = []
  group:any = {}
  ngOnInit(){

    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (idParam !== null) {
        const id = +idParam;
        this.groupId = id;
        console.log('ID récupéré de l\'URL :', id);
        this.getDetailsGroup(id)
        this.getWorkflowInGroup()



      }
    });
  }

  getDetailsGroup(id:number){
    this.isLoading = true
    this.myGroupService.getDetailsGroup(id).subscribe({
      next: (response: any) => {
        //this.handleDocumentDetailsResponse(response);
        this.group = response.group_details
        this.documents = response.documents
        this.isLoading = false
      },
      error: (error: any) => {
        console.error('Erreur lors de la requête vers l\'API:', error);
        this.isLoading = false
        // Ajoutez ici la gestion des erreurs
      }
    });
  }

  onMenuChange(selectedIndex:number){

    this.selectMenu = selectedIndex

  }
  openModalReadSingle(extension:string,id:number,name:string){
     this.extension = extension
    this.documentId = id
    this.isModalReadSingle = true
    this.fileName = name 
  }


  closeModalReaderDocument(){
    this.isModalReadSingle = false
  }
  getFileIconSrc(extension:string){

    return getFileIconSrc(extension)
     alert(getFileIconSrc(extension))
  }

  createWorkflow(id:number){
    this.globalStateService.setIdDocument(id.toString());
    this.router.navigate(['/utilisateur/document/creer-un-workflow']);
  }

  getWorkflowInGroup(){
    let formData = new FormData()
    if(this.group){
      formData.append('group_id', this.groupId.toString())
    }

    this.isLoadingWorkflow = true
    this.myGroupService.getWorkflowInGroup(formData).subscribe({
      next:(response)=>{

        this.workflows = response.results
        this.isLoadingWorkflow = false

      },
      error:()=>{
        this.isLoadingWorkflow = false
      }
    })
  }

}
