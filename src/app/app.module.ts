import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './page/login/login.component';
import { DashbordComponent } from './page/dashbord/dashbord.component';
import { RouterLink, RouterLinkActive, RouterModule, RouterOutlet } from '@angular/router';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SearchComponent } from './components/dashboard/search/search.component';
import { NumericalDepositComponent } from './components/dashboard/numerical-deposit/numerical-deposit.component';
import { HomeComponent } from './components/dashboard/home/home.component';
import { DocumentComponent } from './components/dashboard/document/document.component';
import { HeaderComponent } from './layouts/header/header.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { SidebarComponent } from './layouts/sidebar/sidebar.component';
import { ModelComponent } from './components/dashboard/model/model.component';
import { CreateComponent } from './components/dashboard/model/create/create.component';
import { CustomfielsComponent } from './components/dashboard/model/customfiels/customfiels.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {CdkDragDrop, CdkDropList, CdkDrag, moveItemInArray} from '@angular/cdk/drag-drop';
import { CourrierComponent } from './components/dashboard/courrier/courrier.component';
import { NgxDocViewerModule } from 'ngx-doc-viewer';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { MyCourrierComponent } from './components/dashboard/courrier/my-courrier/my-courrier.component';
import { UserComponent } from './components/dashboard/user/user/user.component';
import { RoleComponent } from './components/dashboard/user/role/role.component';
import { CreateUserComponent } from './components/dashboard/user/create-user/create-user.component';
import { MdbAccordionModule } from 'mdb-angular-ui-kit/accordion';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { ToastrModule } from 'ngx-toastr';
import { ButtonSpinnerComponent } from './components/commons/button-with-spinner/button-with-spinner/button-spinner.component';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ListWorkflowComponent } from './components/dashboard/workflow/for-courrier/list/list.component';
import { CreateworkFlowComponent } from './components/dashboard/workflow/for-courrier/create/create.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CustomDateFormatPipe } from './services/core/utils/customize-date.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { CourrierDetailsComponent } from './components/dashboard/courrier/courrier-details/courrier-details.component';
import { CreateCourrierComponent } from './components/dashboard/courrier/create-courrier/create-courrier.component';
import { PdfPreviewComponent } from './components/dashboard/courrier/create-courrier/pdf-loader.component';
import { MatIconModule } from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import { MatChipsModule } from '@angular/material/chips';
import { Interceptor } from './interceptor/interceptor';
import { DetailsFileComponent } from './components/dashboard/numerical-deposit/details-file/details-file.component';
import { ModalCopyComponent } from './components/dashboard/numerical-deposit/action/modal/modal-copy/modal-copy.component';
import { ModalDeleteComponent } from './components/commons/modal/modal-delete/modal-delete.component';
import { GroupComponent } from './components/dashboard/user/group/group.component';
import { CreateGroupComponent } from './components/dashboard/user/group/create/create.component';
import { EditComponent } from './components/dashboard/user/group/edit/edit.component';
import { ModalUsersComponent } from './components/commons/modal/modal-users/modal-users.component';
import { ModalGroupUsersComponent } from './components/commons/modal/modal-group-users/modal-group-users.component';
import { HomeUserComponent } from './components/dashboard/home-user/home-user.component';
import { UserDispositionComponent } from './components/dashboard/numerical-deposit/user-disposition/user-disposition.component';
import { AdminDispositionComponent } from './components/dashboard/numerical-deposit/admin-disposition/admin-disposition.component';
import { EmptyfolderComponent } from './components/dashboard/numerical-deposit/emptyfolder/emptyfolder.component';
import { IndexUserComponent } from './components/dashboard/numerical-deposit/user-disposition/index-user/index-user.component';
import { CreateWorkflowDocumentComponent } from './components/dashboard/workflow/for-document/create-workflow-document/create-workflow-document.component';
import { DetailsWorkflowComponent } from './components/dashboard/workflow/for-document/details-workflow/details-workflow.component';
import {MatExpansionModule} from '@angular/material/expansion';
import { AttachmentFilesComponent } from './components/dashboard/attachment-files/attachment-files.component';
import { MyTaskComponent } from './components/dashboard/workflow/for-document/tasks/my-task/my-task.component';
import { DetailsTaskComponent } from './components/dashboard/workflow/for-document/tasks/details-task/details-task.component';
import { ModalAlertComponent } from './components/commons/modal/modal-alert/modal-alert.component';
import { ModalViewDocumentComponent } from './components/commons/modal/modal-view-document/modal-view-document.component';
import { CustomerFieldsComponent } from './components/dashboard/courrier/create-courrier/customer-fields/customer-fields.component';
import { ModelCourrierHtmlComponent } from './components/dashboard/courrier/create-courrier/model-courrier-html/model-courrier-html.component';
import { ModalAnnotationsComponent } from './components/commons/modal/modal-annotations/modal-annotations.component';

@NgModule({
  declarations: [
    AppComponent,
    DashbordComponent, 
    LoginComponent, DashboardComponent, SearchComponent,
    PdfPreviewComponent, NumericalDepositComponent, HomeComponent, 
    DocumentComponent, HeaderComponent, FooterComponent, SidebarComponent
    , ModelComponent, ButtonSpinnerComponent, CreateComponent,CreateGroupComponent,
     CustomfielsComponent, CourrierComponent, MyCourrierComponent, 
     UserComponent, RoleComponent, CreateUserComponent,ModalUsersComponent,ModalGroupUsersComponent,
      ListWorkflowComponent, CreateworkFlowComponent,CustomDateFormatPipe, CourrierDetailsComponent, CreateCourrierComponent, DetailsFileComponent, ModalCopyComponent, ModalDeleteComponent, GroupComponent, EditComponent, HomeUserComponent, UserDispositionComponent, AdminDispositionComponent, EmptyfolderComponent, IndexUserComponent, CreateWorkflowDocumentComponent, DetailsWorkflowComponent, AttachmentFilesComponent, MyTaskComponent, DetailsTaskComponent, ModalAlertComponent, ModalViewDocumentComponent, CustomerFieldsComponent, ModelCourrierHtmlComponent, ModalAnnotationsComponent
  ],

  imports: [
    BrowserModule,NgxPaginationModule,MatSelectModule,MatFormFieldModule,MatCheckboxModule,MatExpansionModule
    , PdfViewerModule,ReactiveFormsModule,ToastrModule.forRoot(),NgxMatSelectSearchModule,MatProgressBarModule,
    AppRoutingModule,RouterOutlet,FormsModule,CdkDropList,CdkDrag,
    CommonModule, HttpClientModule,MatSlideToggleModule,
    NgxDocViewerModule,MdbAccordionModule, NgxExtendedPdfViewerModule,
     RouterOutlet,RouterLink,RouterLinkActive,RouterModule,MatIconModule,MatTooltipModule,MatChipsModule,
      BrowserAnimationsModule],
  
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
