import { User } from '../models/user.model';
import { AuthData } from '../models/auth-data.model';
import { Subject } from 'rxjs/Subject';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {
    private user: User;
    public USER_LOGGED_IN = 'login';
    public USER_LOGGED_OUT = 'logout';

    public authLoggedin: Subject<any> = new Subject();

    constructor (private router: Router) {

    }

    registerUser (authData: AuthData): User {
        this.user = {
            email: authData.email,
            userId: Math.round(Math.random() * 10000).toString()
        };
        this.isLoggedIn();
        return this.user;
    }

    login (authData: AuthData): User {
        this.user = {
            email: authData.email,
            userId: Math.round(Math.random() * 10000).toString()
        };
        this.isLoggedIn();
        return this.user;
    }

    private isLoggedIn (): void  {
        this.authLoggedin.next({status: this.USER_LOGGED_IN});
        this.router.navigate(['/training']);
    }

    logout (): void {
        this.user = null;
        this.authLoggedin.next({status: this.USER_LOGGED_OUT});
        this.router.navigate(['/']);
    }

    get (): User {
        return {...this.user};
    }

    isAuth (): Boolean {
        return this.user != null;
    }
}
