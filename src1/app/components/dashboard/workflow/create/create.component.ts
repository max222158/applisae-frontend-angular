import { Component } from '@angular/core';
import { UserService } from '../../../../services/api/user/user.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { FormBuilder, FormGroup } from '@angular/forms';
import { WorkflowService } from '../../../../services/api/workflow/workflow.service';
import { ToastrService } from 'ngx-toastr';


interface User {
  id: number;
  identifiant: string | null;
  name: string;
  email: string;
  service: string;
  grade: string;
  task?: string; // Propriété supplémentaire pour stocker la valeur de la textarea
}

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateworkFlowComponent {
  constructor(private userService: UserService , private toastr: ToastrService,private fb: FormBuilder,public workflowService: WorkflowService) { }
  // Utilisation d'un tableau générique pour stocker les données
  userList: any[];
  workflow: User[] = [];
  rank: number[] = [] ;
  isLoading: boolean = false
  workflowForm: FormGroup;
  itemIndex: number = 0


  ngOnInit() {

    this.userService.getAllUsers().subscribe(data => {
      this.userList = data;
    });

    this.workflowForm = this.fb.group({
      name: [''],
      description:['']
 
       // Add other form controls as needed
     });
  }
  trackById(index: number, item: any): string {
    return item.id; // Assuming each item in workflow has an 'id' property
  }

  onSubmit() {
    this.updateWorkflow()
    const formData = {name: this.workflowForm.value.name, description: this.workflowForm.value.description, workflow: this.workflow}
    console.log(formData)
     this.workflowService.saveWorkFlow(formData).subscribe({
      next: (response: any) => {
        this.isLoading = false;

        this.toastr.success('Enregistré avec succès!','Modèle');
        console.log('Réponse de l\'API:', response);
        // Ajoutez ici la gestion de la réponse de l'API
      },
      error: (error: any) => {
        this.isLoading = false;
        this.toastr.error( 'Lors de l\'enregistrement! Veuillez réésayer','Erreur');
        console.error('Erreur lors de la requête vers l\'API:', error);
        // Ajoutez ici la gestion des erreurs
      }
    });
  }

  drop(event: CdkDragDrop<any[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

  addToWorkflow(user: User) {
    this.workflow.push(user);
    this.rank.push(this.rank.length + 1)

    console.log(this.workflow);
  }
  removeToWorkflow(user: any) {
    const index = this.workflow.indexOf(user);
    if (index !== -1) {
      this.workflow.splice(index, 1);
      this.rank.splice(index, 1);

    }
  }

  updateWorkflow() {
    const textareaElements = document.querySelectorAll<HTMLTextAreaElement>('textarea');
    const updatedWorkflow: User[] = [];
  
    this.workflow.forEach((item, index) => {
      const textarea = textareaElements[index];
      const updatedItem = { ...item, task: textarea?.value || '' };
      updatedWorkflow.push(updatedItem);
    });
  
    this.workflow = updatedWorkflow;
  }

}
