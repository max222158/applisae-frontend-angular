import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatProgressBarModule } from '@angular/material/progress-bar';
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
import { CdkDragDrop, CdkDropList, CdkDrag, moveItemInArray } from '@angular/cdk/drag-drop';
import { CourrierComponent } from './components/dashboard/courrier/courrier.component';
import { NgxDocViewerModule } from 'ngx-doc-viewer';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { PdfViewerModule } from 'ng2-pdf-viewer';

import { UserComponent } from './components/dashboard/user/user/user.component';
import { RoleComponent } from './components/dashboard/user/role/role.component';
import { CreateUserComponent } from './components/dashboard/user/create-user/create-user.component';
import { MdbAccordionModule } from 'mdb-angular-ui-kit/accordion';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ToastrModule } from 'ngx-toastr';
import { ButtonSpinnerComponent } from './components/commons/button-with-spinner/button-with-spinner/button-spinner.component';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ListWorkflowComponent } from './components/dashboard/workflow/for-courrier/list/list.component';
import { CreateworkFlowComponent } from './components/dashboard/workflow/for-courrier/create/create.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CustomDateFormatPipe } from './services/core/utils/customize-date.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { CourrierDetailsComponent } from './components/dashboard/courrier/courrier-details/courrier-details.component';
import { CreateCourrierComponent } from './components/dashboard/courrier/create-courrier/create-courrier.component';
import { PdfPreviewComponent } from './components/dashboard/courrier/create-courrier/pdf-loader.component';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatChipsModule } from '@angular/material/chips';
import { Interceptor } from './core/interceptor/interceptor';
import { DetailsFileComponent } from './components/dashboard/numerical-deposit/details-file/details-file.component';
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
import { MatExpansionModule } from '@angular/material/expansion';
import { AttachmentFilesComponent } from './components/dashboard/attachment-files/attachment-files.component';
import { MyTaskComponent } from './components/dashboard/workflow/for-document/tasks/my-task/my-task.component';
import { DetailsTaskComponent } from './components/dashboard/workflow/for-document/tasks/details-task/details-task.component';
import { ModalAlertComponent } from './components/commons/modal/modal-alert/modal-alert.component';
import { ModalViewDocumentComponent } from './components/commons/modal/modal-view-document/modal-view-document.component';
import { CustomerFieldsComponent } from './components/dashboard/courrier/create-courrier/customer-fields/customer-fields.component';
import { ModelCourrierHtmlComponent } from './components/dashboard/courrier/create-courrier/model-courrier-html/model-courrier-html.component';
import { ModalAnnotationsComponent } from './components/commons/modal/modal-annotations/modal-annotations.component';
import { HistoryComponent } from './components/dashboard/history/history.component';
import { CustomerFieldsModalComponent } from './components/commons/customer-fields-modal/customer-fields-modal.component';
import { AllDetailsComponent } from './components/dashboard/numerical-deposit/details-file/actions/all-details/all-details.component';
import { EditMetadataComponent } from './components/dashboard/numerical-deposit/details-file/actions/edit-metadata/edit-metadata.component';
import { DocumentInWorkflowComponent } from './components/dashboard/numerical-deposit/details-file/actions/document-in-workflow/document-in-workflow.component';
import { AddNewVersionDocumentComponent } from './components/commons/modal/add-new-version-document/add-new-version-document.component';
import { DocumentHistoryComponent } from './components/dashboard/numerical-deposit/details-file/actions/document-history/document-history.component';
import { NgxEditorModule } from 'ngx-editor';
import { SafeHtmlPipe } from './pipes/safe-html.pipe';
import { CircleNameComponentComponent } from './components/commons/CircleComponent/circle-name-component/circle-name-component.component';
import { DocumentClassificationComponent } from './components/commons/classification-document/document-classification/document-classification.component';
import { MatTreeModule } from '@angular/material/tree';
import { AppTreeNodeComponent } from './components/commons/classification-document/document-classification/app-tree-node/app-tree-node.component';
import { ContextMenuComponent } from './components/commons/context-menu/context-menu/context-menu.component';
import { StoreModule } from '@ngrx/store';
import { copyFolderAndFilesReducer, getFolderAndFilesReducer, getUserAndGroupPermissionByIdReducer, getVersionDocumentByIdReducer, moveFolderAndFilesReducer, sendFileFolderSelectReducer } from './state/reducers/numerical-deposit/numerical-deposite.reducers';
import { EffectsModule } from '@ngrx/effects';
import { FileFolderEffects } from './state/effects/numerical-deposit/numerical-deposite.effect';
import { AllActionComponent } from './components/dashboard/numerical-deposit/all-action/all-action.component';
import { AutomatingComponent } from './components/dashboard/automating/automating.component';
import {MatMenuModule} from '@angular/material/menu';
import { MetaDataComponent } from './components/commons/modal/add-new-version-document/meta-data/meta-data.component';
import { ByteConverterPipe } from './pipes/byte-converter.pipe';
import { FolderPermissionsComponent } from './components/dashboard/permissions/folder-permissions/folder-permissions/folder-permissions.component';

import { getGroupsReducer, getUsersReducer } from './state/reducers/users/users.reducers';
import { UsersEffects } from './state/effects/users/users.effect';
import { UsersDropdownSearchComponent } from './components/commons/users-dropdown-search/users-dropdown-search.component';
import { GroupDropdownSearchComponent } from './components/commons/group-dropdown-search/group-dropdown-search.component';
import { SingleGroupCardDisplayComponent } from './components/commons/single-group-card-display/single-group-card-display.component';
import { SingleUserComponent } from './components/commons/single-user-card-display/single-user.component';
import { CustomerFieldsDropdownComponent } from './components/commons/customer-fields-dropdown/customer-fields-dropdown.component';
import { getCustomersFields } from './state/reducers/customers-fields/customers-fields.reducers';
import { CustomersFieldsEffects } from './state/effects/customers-fields/customers-fields.effect';
import { SingleCustomerFieldCardDisplayComponent } from './components/commons/single-customer-field-card-display/single-customer-field-card-display.component';
import { InputTextComponent } from './components/commons/inputs/input-text/input-text.component';
import { PlanClassificationGeneralComponent } from './components/dashboard/numerical-deposit/plan-classification-general/plan-classification-general.component';
import { CreateFolderComponent } from './components/commons/create-folder/create-folder.component';
import { ReaderDocumentComponent } from './components/commons/reader-document/reader-document.component';
import { MyGroupsComponent } from './components/dashboard/my-groups/my-groups.component';
import { DetailsMyGroupComponent } from './components/dashboard/my-groups/details-my-group/details-my-group.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { CommentsDetailsTabsComponent } from './components/commons/comments-details-tabs/comments-details-tabs.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { getCommentsReducer, saveCommentsReducer } from './state/reducers/comments/comments.reducers';
import { CommentsEffects } from './state/effects/comments/comments.effect';
import { MyCourrierComponent } from './components/dashboard/courrier/my-courrier/my-courrier.component';
import { ModalInformationDetailsCourrierComponent } from './components/commons/modal/modal-information-details-courrier/modal-information-details-courrier.component';
import { StatisticComponent } from './components/dashboard/statistic/statistic.component';
import { ShareComponent } from './components/dashboard/numerical-deposit/details-file/actions/share/share.component';

@NgModule({
  declarations: [

    AppComponent, SafeHtmlPipe,
    DashbordComponent, ByteConverterPipe,
    LoginComponent, DashboardComponent, SearchComponent,
    PdfPreviewComponent, NumericalDepositComponent, HomeComponent,
    DocumentComponent, HeaderComponent, FooterComponent, SidebarComponent
    , ModelComponent, ButtonSpinnerComponent, CreateComponent, CreateGroupComponent,
    CustomfielsComponent, CourrierComponent, MyCourrierComponent,
    UserComponent, RoleComponent, CreateUserComponent, ModalUsersComponent, ModalGroupUsersComponent,
    ListWorkflowComponent, CreateworkFlowComponent, CustomDateFormatPipe, CourrierDetailsComponent, CreateCourrierComponent, DetailsFileComponent,  ModalDeleteComponent, GroupComponent, EditComponent, HomeUserComponent, UserDispositionComponent, AdminDispositionComponent,
     EmptyfolderComponent, IndexUserComponent, CreateWorkflowDocumentComponent, DetailsWorkflowComponent,
      AttachmentFilesComponent, MyTaskComponent, DetailsTaskComponent, ModalAlertComponent, 
      ModalViewDocumentComponent, CustomerFieldsComponent, ModelCourrierHtmlComponent, ModalAnnotationsComponent, HistoryComponent, CustomerFieldsModalComponent, AllDetailsComponent, EditMetadataComponent, DocumentInWorkflowComponent, AddNewVersionDocumentComponent, DocumentHistoryComponent, CircleNameComponentComponent, DocumentClassificationComponent, AppTreeNodeComponent, ContextMenuComponent, AllActionComponent, AutomatingComponent, MetaDataComponent, FolderPermissionsComponent, 
      SingleUserComponent, UsersDropdownSearchComponent, GroupDropdownSearchComponent, 
      SingleGroupCardDisplayComponent, CustomerFieldsDropdownComponent, SingleCustomerFieldCardDisplayComponent, InputTextComponent, PlanClassificationGeneralComponent, CreateFolderComponent, ReaderDocumentComponent, MyGroupsComponent, DetailsMyGroupComponent,  CommentsDetailsTabsComponent, ModalInformationDetailsCourrierComponent, StatisticComponent, ShareComponent
  ],

  imports: [StoreModule.forRoot({
    file_folder_select: sendFileFolderSelectReducer,
    get_files_folders: getFolderAndFilesReducer,
    move_files_folders: moveFolderAndFilesReducer,

    copy_files_folders: copyFolderAndFilesReducer,
    get_version_document: getVersionDocumentByIdReducer,
    get_users: getUsersReducer,
    get_groups: getGroupsReducer,
    get_group_user_permission_folder:getUserAndGroupPermissionByIdReducer,
    get_customer_fields:getCustomersFields,
    get_comment:getCommentsReducer,
    save_comment: saveCommentsReducer,
    
  }),
  EffectsModule.forRoot([FileFolderEffects,UsersEffects,CustomersFieldsEffects,CommentsEffects]),
    NgxEditorModule, MatTreeModule,MatMenuModule,
    BrowserModule,  NgxPaginationModule, MatSelectModule, MatFormFieldModule, MatCheckboxModule, MatExpansionModule
    , PdfViewerModule, ReactiveFormsModule, ToastrModule.forRoot(), NgxMatSelectSearchModule, MatProgressBarModule,
    AppRoutingModule, RouterOutlet, FormsModule, CdkDropList, CdkDrag,
    CommonModule, HttpClientModule, MatSlideToggleModule,
    NgxDocViewerModule, MdbAccordionModule, NgxExtendedPdfViewerModule,CKEditorModule,
    RouterOutlet, RouterLink, RouterLinkActive, RouterModule, MatIconModule, MatTooltipModule, MatChipsModule,
    BrowserAnimationsModule,NgxSkeletonLoaderModule],

  providers: [{ provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
