import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppService } from 'src/app/app-service';
import JwtAuth from 'src/app/authentication/jwt-storage/jwt-storage';
import { AuthorizationServerAPI, ResourceAccountAPI } from 'src/app/constants';
import { IUser } from 'src/app/interfaces/IUser.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {

  //VARIAVEIS
  loading:boolean = false;
  errorMessage:string = "";
  login:string = "";
  password:string = "";

  constructor(private route: Router, private httpService: AppService) {
  }

  ngOnInit(): void {

  }

  async realizarLogin() {
    this.loading = true;
    this.errorMessage = '';

    try{
      const tokenResponse: string = await this.signInAndGetCCToken();
      let user: IUser = await this.getLoggedUserData(tokenResponse);
      console.log(user);
      this.route.navigateByUrl('/account/' + user.id, {state: {userData: user}});
    } catch(err:any){
      console.log(err)
      if(err?.status == 401){
        this.errorMessage = "Não foi encontrado nenhum usuário com esta combinação de login e senha!"
      } else
        this.errorMessage = "Erro inesperado com a API."
    }
    this.loading = false;
  }

  private async signInAndGetCCToken(){
    const basicAuth = "Basic " + btoa(this.login + ":" + this.password);
    const config = {
        headers:{
          "Content-Type": "application/x-www-form-urlencoded",
          "Authorization": basicAuth
      }
    }
    const body =  "grant_type=client_credentials";

    let tokenResponse:any = await this.httpService
    .postRequest(AuthorizationServerAPI + '/oauth2/token',body,config);
    JwtAuth.saveToken(tokenResponse);

    return tokenResponse.access_token;
  }

  private async getLoggedUserData(token:string): Promise<IUser> {

    let userDataResponse : any = await this.httpService
      .getRequest(ResourceAccountAPI + '/private/user/getOwnUserData',JwtAuth.getAuthorizationConfig());

    return userDataResponse.data as IUser;  
  }
}