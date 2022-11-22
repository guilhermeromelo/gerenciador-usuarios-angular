import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppService } from 'src/app/app-service';
import { ApiUrl } from 'src/app/constants';
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
    
    let body = {
      login: this.login,
      password: this.password
    }
    try{
      let response:any = await this.httpService.postRequest(ApiUrl + '/user/login', body);
      let user: IUser = response.data;
      //console.log(user);
      this.route.navigateByUrl('/account/' + user.id, {state: {userData: user}});
    } catch(err:any){
      if(err?.error?.message){
        this.errorMessage = err.error.message;
      } else if (err.error){
        this.errorMessage = err.error;
      } else
        this.errorMessage = "Erro inesperado com a API."
    }
    this.loading = false;
  }
}