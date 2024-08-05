import { Component } from '@angular/core';
import { Chart, registerables } from 'chart.js';
@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrl: './statistic.component.css'
})
export class StatisticComponent {

  ngOnInit(){
    this.RenderBubblechart()
  }

  RenderBubblechart(){

    new Chart("document_chart", {
      type: 'doughnut',
      data: {
        labels: [
          'Documents classés',
          'Documents non classés'
        ],
        datasets: [{
          label: 'Documents',
          data: [300, 50],
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)'
          ],
          hoverOffset: 4
        }]
      }
    });

    new Chart("courrier_chart", {
      type: 'doughnut',
      data: {
        labels: [
          'Courriers classés',
          'Documents non classés',
          'Documents dans workflows'

        ],
        datasets: [{
          label: 'Courriers',
          data: [100, 50,200],
          backgroundColor: [
            'rgb(100, 99, 132)',
            'rgb(154, 162, 235)'
            ,'rgb(254, 164, 220)'
          ],
          hoverOffset: 4
        }]
      }
    });


    new Chart("workflow_chart", {
      type: 'doughnut',
      data: {
        labels: [
          'workflows en cours',
          'Worflows terminés',
          

        ],
        datasets: [{
          label: 'Worklows',
          data: [200, 450],
          backgroundColor: [
            'rgb(80, 99, 132)',
            'rgb(84, 162, 235)'
      
          ],
          hoverOffset: 4
        }]
      }
    });
  }
}
