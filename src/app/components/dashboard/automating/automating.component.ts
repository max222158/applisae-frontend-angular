import { Component } from '@angular/core';

@Component({
  selector: 'app-automating',
  templateUrl: './automating.component.html',
  styleUrl: './automating.component.css'
})
export class AutomatingComponent {
  isSelected:number = -1


  setSelected(value:number){

    this.isSelected = value

  }
}
