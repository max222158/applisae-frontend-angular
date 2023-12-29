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

@NgModule({
  declarations: [
    AppComponent,
    DashbordComponent, 
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,RouterOutlet,FormsModule,
    CommonModule,HttpClientModule, RouterOutlet,RouterLink,RouterLinkActive,RouterModule],
  
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
