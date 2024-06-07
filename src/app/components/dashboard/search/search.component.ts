import { Component, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {

  show:boolean = true;

  setShowadvanseSearch(){
    
    if(this.show == false){
      this.show = true
    }else{

      this.show = false 
    }
  }

}
