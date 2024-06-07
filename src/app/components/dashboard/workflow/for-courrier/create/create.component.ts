import { Component } from '@angular/core';
import { UserService } from '../../../../../services/api/user/user.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { FormBuilder, FormGroup } from '@angular/forms';
import { WorkflowService } from '../../../../../services/api/workflow/workflow.service';
import { ToastrService } from 'ngx-toastr';
import { clearInput } from '../../../../../helpers/helper';


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
  constructor(private userService: UserService, private toastr: ToastrService, private fb: FormBuilder, public workflowService: WorkflowService) { }
  // Utilisation d'un tableau générique pour stocker les données
  userList: any[];
  workflow: User[] = [];
  rank: number[] = [];
  isLoading: boolean = false
  workflowForm: FormGroup;
  itemIndex: number = 0
  isSpinnerLoading: boolean = false
  disabled: boolean = true


  ngOnInit() {

    this.userService.getAllUsers().subscribe(data => {
      this.userList = data;
    });

    this.workflowForm = this.fb.group({
      name: [''],
      description: ['']

      // Add other form controls as needed
    });

    this.workflowForm.valueChanges.subscribe(() => {
      const nameValue = this.workflowForm.get('name')?.value.trim();

      this.disabled = nameValue === ''; // Disable if any of them is empty
    });
  }
  trackById(index: number, item: any): string {
    return item.id; // Assuming each item in workflow has an 'id' property
  }

  onSubmit() {
    this.updateWorkflow()
    this.disabled = true
    this.isSpinnerLoading = true

    const formData = {
      name: this.workflowForm.value.name,
      description: this.workflowForm.value.description,
      workflow: this.workflow,
      user_workflow: this.workflow.map(user => ({
        id: user.id,
        task: user.task
      }))
    }
    console.log(formData)
    this.workflowService.saveModelWorkFlow(formData).subscribe({
      next: (response: any) => {
        this.isLoading = false;

        this.toastr.success('Enregistré avec succès!', 'Modèle');
        console.log('Réponse de l\'API:', response);
        this.disabled = true
        this.isSpinnerLoading = false
        clearInput(this.workflowForm, ['name', 'description']);
        this.workflow = []
        // Ajoutez ici la gestion de la réponse de l'API
      },
      error: (error: any) => {
        this.isLoading = false;
        this.toastr.error('Lors de l\'enregistrement! Veuillez réésayer', 'Erreur');
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
      const textarea = textareaElements[index + 1];
      const updatedItem = { ...item, task: textarea?.value || '' };
      updatedWorkflow.push(updatedItem);
    });

    this.workflow = updatedWorkflow;

    console.log(this.workflow)
  }

}
