import { Component } from '@angular/core';
import { AuthService } from '../../../services/api/auth/auth.service';
import { Media_url_public } from '../../../constants/constants';
import { DashboardService } from '../../../services/api/dashboard/dashboard.service';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-home-user',
  templateUrl: './home-user.component.html',
  styleUrl: './home-user.component.css'
})
export class HomeUserComponent {

  constructor(private authService: AuthService, private dashboardService: DashboardService, private router: Router) { }


  userDetails: any = {};
  dashboardData: any[] = []
  taskInProgress: any[] = []

  consultation: any[] = []
  numberOfTaskInProgress: number = 0
  courrierUrgent: any[] = []
  numberOfCourrierUrgent: number = 0;
  userInitiatedWorkflow: any[] = []
  isLoading:boolean = true
  error:boolean = false

  media_url_public: string = Media_url_public;
  ngOnInit() {

    this.userDetails = this.authService.getUser()
    this.getDataForDashboard()

  }



  getDataForDashboard() {
    this.isLoading = true
    let formData = new FormData()
    formData.append('app', '123')
    this.dashboardService.getDataForDashboard(formData).subscribe({
      next: (data) => {


        this.dashboardData = data;
        this.numberOfCourrierUrgent = data.courrier_count
        this.courrierUrgent = data.urgent_courriers
        this.taskInProgress = data.ongoing_tasks
        this.userInitiatedWorkflow = data.user_initiated_workflows
        this.numberOfTaskInProgress = data.ongoing_task_count
        this.isLoading = false
        this.consultation = data.consultations
        // Ajoutez ici la gestion de la réponse de l'API
      },
      error: (error) => {
        console.error('Erreur lors de la requête vers l\'API:', error);
        this.error = true
        // Ajoutez ici la gestion des erreurs
      }
    })
  }

  gotoDetailsCourrierPage(courrierId: number, subject: string, annotation: string, email: string, name: string, date: string) {


    const navigationExtras: NavigationExtras = {
      state: {
        // Ajoutez vos paramètres ici
        subject: subject,
        annotation: annotation,
        email: email,
        name: name,
        date: date
      }
    };

    this.router.navigate(['/tableau-de-bord/courriers/details-courrier', courrierId], navigationExtras);
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
