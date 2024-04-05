import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './page/login/login.component';
import { DashbordComponent } from './page/dashbord/dashbord.component';
import { RouterLink, RouterLinkActive, RouterModule, RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
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
import { PdfPreviewComponent } from './components/dashboard/courrier/pdf-loader.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { MyCourrierComponent } from './components/dashboard/courrier/my-courrier/my-courrier.component';
import { UserComponent } from './components/dashboard/user/user/user.component';
import { RoleComponent } from './components/dashboard/user/role/role.component';
import { CreateUserComponent } from './components/dashboard/user/create-user/create-user.component';

@NgModule({
  declarations: [
    AppComponent,
    DashbordComponent, 
    LoginComponent, DashboardComponent, SearchComponent,
    PdfPreviewComponent, NumericalDepositComponent, HomeComponent, 
    DocumentComponent, HeaderComponent, FooterComponent, SidebarComponent
    , ModelComponent, CreateComponent, CustomfielsComponent, CourrierComponent, MyCourrierComponent, UserComponent, RoleComponent, CreateUserComponent 
  ],
  imports: [
    BrowserModule, PdfViewerModule,ReactiveFormsModule,
    AppRoutingModule,RouterOutlet,FormsModule,CdkDropList,CdkDrag,
    CommonModule,HttpClientModule,NgxDocViewerModule,NgxExtendedPdfViewerModule, RouterOutlet,RouterLink,RouterLinkActive,RouterModule, BrowserAnimationsModule],
  
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
