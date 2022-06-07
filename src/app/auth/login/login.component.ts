import {ChangeDetectorRef, Component} from '@angular/core';
import {NbLoginComponent} from '@nebular/auth';
import {NbAuthService} from '@nebular/auth/services/auth.service';
import {Router} from '@angular/router';
import {NbAuthSocialLink} from '@nebular/auth/auth.options';
import * as ɵngcc0 from '@angular/core';

@Component({
   selector: 'ngx-login',
   templateUrl: './login.component.html',

})
export class LoginComponent extends NbLoginComponent {
   /*axios.post(API_SERVER + '/login', { email, password }, { withCredentials: true })*/
}
