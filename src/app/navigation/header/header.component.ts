import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  loggedInUser: Boolean;
  loginSubscription: Subscription;

  @Output() sidenavToggler = new EventEmitter<void>();

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.loginSubscription = this.authService.authLoggedin.subscribe(result => {
      console.log('login');
      this.loggedInUser = result.status === this.authService.USER_LOGGED_IN;
    });
  }

  ngOnDestroy () {
    this.loginSubscription.unsubscribe();
  }

  onToggleSidenav() {
    this.sidenavToggler.emit();
  }

  logoutUser () {
    this.authService.logout();
  }

}
