import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { ProfileComponent } from './profile/profile.component';
import { SearchComponent } from './search/search.component';
import { CreateRideComponent } from './create-ride/create-ride.component';
import { CreateRideDriverComponent } from './create-ride-driver/create-ride-driver.component';
import { CreateRidePassengerComponent } from './create-ride-passenger/create-ride-passenger.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import {
  MatProgressSpinner,
  MatProgressSpinnerModule,
} from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';

const declarationComponents = [
  AppComponent,
  AboutusComponent,
  ProfileComponent,
  SearchComponent,
  CreateRideComponent,
  CreateRideDriverComponent,
  CreateRidePassengerComponent,
  HeaderComponent,
  RegistrationComponent,
  LoginComponent,
];

const importModules = [
  BrowserModule,
  AppRoutingModule,
  FormsModule,
  HttpClientModule,
  BrowserAnimationsModule,
  MaterialModule,
  MatToolbarModule,
  MatButtonModule,
  MatSidenavModule,
  MatIconModule,
  MatListModule,
  MatInputModule,
  MatSelectModule,
  MatRadioModule,
  MatCardModule,
  ReactiveFormsModule,
];
@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [declarationComponents],
  imports: [
    importModules,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
