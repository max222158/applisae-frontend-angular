import { Component } from '@angular/core';
import { HistoryService } from '../../../services/api/history/history.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrl: './history.component.css'
})
export class HistoryComponent {
  constructor(private historyService: HistoryService) { }

  filterBy:string = ''
  histories:any = []
  perPage: number = 20
  totalItems: any = 0
  page: number = 1

  ngOnInit(): void {

    this.getHistory()

  }

  getHistory(){


    this.historyService.getHistory(this.filterBy, this.page).subscribe({
      next: (response: any) => {

        // Ajoutez ici la gestion de la réponse de l'API
        this.histories = response.results
        this.totalItems = response.count
      },
      error: (error: any) => {

        // Ajoutez ici la gestion des erreurs
      }
    });
      
  }

  
  pageChanged(event: any) {

    this.page = event;
    console.log(event)
    this.getHistory();
  }

}
