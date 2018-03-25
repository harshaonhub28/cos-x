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
import { StudentService } from "./services/student.service";
import { TeacherService } from "./services/teacher.service";
import { StandardService } from "./services/standard.service";
import { ReportService } from "./services/report.service";

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
import { MatDividerModule } from "@angular/material/divider";
import { MatTableModule } from "@angular/material/table";

//components
import { AppComponent } from "./app.component";
import { LayoutComponent } from "./components/layout/layout.component";
import { LoginComponent } from "./components/login/login.component";
import { SignupComponent } from "./components/signup/signup.component";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { ReportUploadComponent } from "./components/report-upload/report-upload.component";
import { ViewReportComponent } from "./components/view-report/view-report.component";
import { StudentUploadComponent } from "./components/student-upload/student-upload.component";
import { TeacherUploadComponent } from "./components/teacher-upload/teacher-upload.component";
import { AssignTeacherComponent } from "./components/assign-teacher/assign-teacher.component";
import { StandardUploadComponent } from "./components/standard-upload/standard-upload.component";

const appRoutes: Routes = [
  { path: "login", component: LoginComponent, pathMatch: "full" },
  { path: "signup", component: SignupComponent, pathMatch: "full" },
  {
    path: "dashboard",
    component: DashboardComponent,
    pathMatch: "full",
    canActivate: [AuthGuard]
  },
  {
    path: "upload-report",
    component: ReportUploadComponent,
    pathMatch: "full",
    canActivate: [AuthGuard]
  },
  {
    path: "view-report",
    component: ViewReportComponent,
    pathMatch: "full",
    canActivate: [AuthGuard]
  },
  {
    path: "upload-students",
    component: StudentUploadComponent,
    pathMatch: "full",
    canActivate: [AuthGuard]
  },
  {
    path: "upload-teachers",
    component: TeacherUploadComponent,
    pathMatch: "full",
    canActivate: [AuthGuard]
  },
  {
    path: "assign-teacher",
    component: AssignTeacherComponent,
    pathMatch: "full",
    canActivate: [AuthGuard]
  },
  {
    path: "upload-standards",
    component: StandardUploadComponent,
    pathMatch: "full",
    canActivate: [AuthGuard]
  }
];

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    LoginComponent,
    SignupComponent,
    DashboardComponent,
    ReportUploadComponent,
    ViewReportComponent,
    StudentUploadComponent,
    TeacherUploadComponent,
    AssignTeacherComponent,
    StandardUploadComponent
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
    MatProgressBarModule,
    MatDividerModule,
    MatTableModule
  ],
  providers: [
    AuthService,
    AuthGuard,
    StudentService,
    TeacherService,
    StandardService,
    ReportService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
