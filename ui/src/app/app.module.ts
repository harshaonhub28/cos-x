import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";


import { environment } from "../environments/environment";

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FlexLayoutModule } from "@angular/flex-layout";

// services
import { AuthService } from "./services/auth.service";
import { AuthGuard } from "./services/auth-guard.service";


// angular material compnents
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";
import { MatButtonModule } from "@angular/material/button";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatMenuModule } from "@angular/material/menu";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatSelectModule } from "@angular/material/select";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatInputModule } from "@angular/material/input";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatCardModule } from "@angular/material/card";
import { MatTabsModule } from "@angular/material/tabs";
import { MatRadioModule } from "@angular/material/radio";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatProgressBarModule } from "@angular/material/progress-bar";


//components
import { AppComponent } from './app.component';
import { LayoutComponent } from "./components/layout/layout.component";
import { LoginComponent } from "./components/login/login.component";
import { SignupComponent } from "./components/signup/signup.component";


const appRoutes: Routes = [
  { path: "login", component: LoginComponent, pathMatch: "full" },
  { path: "signup", component: SignupComponent, pathMatch: "full" }
]

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    LoginComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    FlexLayoutModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    MatGridListModule,
    MatMenuModule,
    MatCheckboxModule,
    MatSelectModule,
    MatFormFieldModule,
    MatExpansionModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatTabsModule,
    MatRadioModule,
    MatSnackBarModule,
    MatProgressBarModule
  ],
  providers: [AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
