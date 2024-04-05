import { Component } from '@angular/core';
import { CustomfieldService } from '../../../../services/customfield/customfield.service';
import {CdkDragDrop, CdkDropList, CdkDrag, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateComponent {

  fields: any[] = []; // Utilisation d'un tableau générique pour stocker les données
  custom: any[] = [];
  todo: any[] = [];

  done : any[] = [];
  constructor(private apiService: CustomfieldService) { }

  ngOnInit(): void {
    this.apiService.getFieldCustom().subscribe(data => {
      this.done = data;
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

}
