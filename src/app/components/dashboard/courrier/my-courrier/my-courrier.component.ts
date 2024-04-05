import { Component } from '@angular/core';
import { CourrierService } from '../../../../services/courrier/courrier.service';

@Component({
  selector: 'app-my-courrier',
  templateUrl: './my-courrier.component.html',
  styleUrl: './my-courrier.component.css'
})
export class MyCourrierComponent {
  [x: string]: any;
  selectedOption: string = '';
  courriers: any[] | undefined;


  selectedFile: File | null = null;
  document: Document | null = null;

  constructor(private courrierService: CourrierService) { }
 // Utilisation d'un tableau générique pour stocker les données


 ngOnInit(): void {
  this.courrierService.getCourrierList().subscribe(data => {
    this.courriers = data;
  });
}

}
