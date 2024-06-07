import { Component } from '@angular/core';
import { WorkflowService } from '../../../../../../services/api/workflow/workflow.service';
import { Router, NavigationExtras, NavigationEnd, ActivatedRoute } from '@angular/router';
import { extractLastSegment } from '../../../../../../helpers/helper';
import { Subscription, filter } from 'rxjs';

@Component({
  selector: 'app-my-task',
  templateUrl: './my-task.component.html',
  styleUrl: './my-task.component.css'
})
export class MyTaskComponent {

  constructor(private workflowService: WorkflowService, private route: ActivatedRoute, private router: Router){

  }
  private routerSubscription: Subscription;
  page:number = 1
  filterBy: string
  tasks: any[] = []

  perPage: number = 5
  totalItems: any = 0
  menuSelect:number = -1
  uri:string = ''

  ngOnInit(): void {
    // Subscribing to route parameters
    this.route.params.subscribe(params => {
      this.page = 1
      this.filterBy = params['filter'];
      this.handlefilterByChange();
    });


  }

  
  handlefilterByChange(): void {

    this.getTaskWorkflowByUser()
    console.log('Task Type Changed:', this.filterBy);
    // Implement logic based on the new filterBy
  }
  getTaskWorkflowByUser(){
    
    this.workflowService.getTaskWorkflowByUser(this.page,this.filterBy).subscribe({
      next: (response: any) => {
        
        console.log(response)
        this.tasks = response.results
        this.totalItems = response.count
        // Ajoutez ici la gestion de la réponse de l'API
      },
      error: (error: any) => {

        // Ajoutez ici la gestion des erreurs
      }
    });


  }

  pageChanged(event: any) {
    this.page = event;
    console.log(event)
    this.getTaskWorkflowByUser();
  }

  selectMenu(index:number){

    this.menuSelect = index

  }
  gotoDetailsTask(courrierId: number, taskId:number) {


    const navigationExtras: NavigationExtras = {
      state: {
        // Ajoutez vos paramètres ici
        taskId:taskId

      }
    };

    this.router.navigate(['/utilisateur/mes-taches/details', courrierId, 'tache', taskId]);
  }
}
  function ngOnDestroy() {
    throw new Error('Function not implemented.');
  }

