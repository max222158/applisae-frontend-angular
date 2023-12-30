import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './page/login/login.component';
import { DashbordComponent } from './page/dashbord/dashbord.component';
import { RouterLink, RouterLinkActive, RouterModule, RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SearchComponent } from './components/dashboard/search/search.component';
import { NumericalDepositComponent } from './components/dashboard/numerical-deposit/numerical-deposit.component';
import { HomeComponent } from './components/dashboard/home/home.component';
import { DocumentComponent } from './components/dashboard/document/document.component';
import { HeaderComponent } from './layouts/header/header.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { SidebarComponent } from './layouts/sidebar/sidebar.component';

@NgModule({
  declarations: [
    AppComponent,
    DashbordComponent, 
    LoginComponent, DashboardComponent, SearchComponent, NumericalDepositComponent, HomeComponent, DocumentComponent, HeaderComponent, FooterComponent, SidebarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,RouterOutlet,FormsModule,
    CommonModule,HttpClientModule, RouterOutlet,RouterLink,RouterLinkActive,RouterModule],
  
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
