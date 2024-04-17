import { Component } from '@angular/core';
import { WorkflowService } from '../../../../services/api/workflow/workflow.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListWorkflowComponent {

  workFlowList: any[] | undefined; // Utilisation d'un tableau générique pour stocker les données

  // Method to check if divsData is not empty

  constructor(private workflowService: WorkflowService) { }

  ngOnInit(): void {
    this.workflowService.getWorkFlow().subscribe(data => {
      this.workFlowList = data;
    });
  }

}
