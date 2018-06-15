import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit, OnDestroy {

  @Output() sidenavToggler = new EventEmitter<void>();

  loggedInUser: Boolean = false;
  loginSubscription: Subscription;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.loginSubscription = this.authService.authLoggedin.subscribe(result => {
      setTimeout(() => {
        this.loggedInUser = result.status === this.authService.USER_LOGGED_IN;
      }, 1000);
    });
  }

  onSidenavToggle () {
    this.sidenavToggler.emit();
  }

  ngOnDestroy () {
    this.loginSubscription.unsubscribe();
  }

  logoutUser () {
    this.onSidenavToggle();
    this.authService.logout();
  }

}
