import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import 'rxjs/add/operator/filter';
import auth0 from 'auth0-js';

declare let jQuery:any;
declare let $:any;

@Injectable()
export class AuthService {

  userProfile: any;
  auth0 = new auth0.WebAuth({
    clientID: 'PptTn9IOD3dcXCd94QnTUzy4luqpeQpu',
    domain: 'quack.eu.auth0.com',
    responseType: 'token id_token',
    audience: 'https://quack.eu.auth0.com/userinfo',
    redirectUri:'http://localhost:4200/home',
    scope: 'openid profile email'
  });

  public handleAuthentication(): void {
  this.auth0.parseHash((err, authResult) => {
    if (authResult && authResult.accessToken && authResult.idToken) {
      window.location.hash = '';
      this.setSession(authResult);
      this.getProfile((err, profile) => {
        //this.router.navigate(['perfil',profile.sub]);
        localStorage.setItem('profile',JSON.stringify(profile))
        window.location.href = 'http://localhost:4200/perfil/'+profile.sub;//forzar a actualizar la pagina
      });


    } else if (err) {
      this.router.navigate(['/home']);
      console.log(err);
    }
  });
}
private setSession(authResult): void {
    // Set the time that the access token will expire at
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
  }

  public logout(): void {
    // Remove tokens and expiry time from localStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    // Go back to the home route
    localStorage.removeItem("profile");
    localStorage.removeItem("usuario");
  //  localStorage.removeItem("salir");

  //  this.router.navigate(['home']);
    window.location.href = 'http://localhost:4200/home';
  }

  public isAuthenticated(): boolean {
    // Check whether the current time is past the
    // access token's expiry time
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }
  public getProfile(cb): void {
  const accessToken = localStorage.getItem('access_token');
  if (!accessToken) {
    throw new Error('Access token must exist to fetch profile');
  }

  const self = this;
  this.auth0.client.userInfo(accessToken, (err, profile) => {
    if (profile) {
      self.userProfile = profile;
    }
    cb(err, profile);
  });
}

  constructor(public router: Router) {}

  public login(): void {
    this.auth0.authorize();
  }

}
