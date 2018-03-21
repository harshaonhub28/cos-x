import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { environment } from '../../../environments/environment';
import { Router, NavigationEnd, RouterStateSnapshot } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
// import { RouterState } from '@angular/router/src/router_state';


@Component({
  selector: 'layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  projectName = 'Cos-X';
  currentUrl;
  state;
  currentApp;
  constructor(public auth: AuthService,
    private route: ActivatedRoute,
    private router: Router) {
 
   }

  ngOnInit() {
  }

  logoutUser = () => {
    this.auth.logout();
    this.router.navigate(['']);
  }

}
