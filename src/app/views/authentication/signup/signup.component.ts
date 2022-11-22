import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppService } from 'src/app/app-service';
import { ToastrService } from 'ngx-toastr';
import { ApiUrl } from 'src/app/constants';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html'
})
export class SignupComponent {

  clientForm: FormGroup;
  //addressForm: FormGroup;
  termsAccepted:boolean = false;
  invalidPasswordError:boolean = false;
  errorMessage = "";

  constructor(private toastr: ToastrService, private service: AppService, private router: Router) {
    this.clientForm = new FormGroup({
      nome: new FormControl(null, [Validators.required]),
      login: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required]),
      senha: new FormControl(null, [Validators.required]),
      confirmarSenha: new FormControl(null, [Validators.required]),
    });
  }

  async signUp(){
    if(this.validateForms()){
      this.errorMessage = "";
      let requestBody = JSON.parse(JSON.stringify(this.clientForm.value));
      delete requestBody.confirmarSenha;
      try{
        let response = await this.service.postRequest(ApiUrl + '/user/new', requestBody);
        this.toastr.success('Usuário cadastrado com sucesso!');
        console.log(response)
        this.router.navigateByUrl(`/`);
      } catch (err:any){
        this.errorMessage = err.error.message;
        console.log(this.errorMessage)
        this.toastr.error('Ocorreu um erro ao salvar o usuário!');
      }
    }
  }

  validateForms(){
    if(this.clientForm.invalid /*|| this.addressForm.invalid*/){
      this.toastr.error("Preencha todos os campos obrigatórios!!!");
      this.clientForm.markAllAsTouched();
      return false;
    } else if(this.clientForm.value.senha != this.clientForm.value.confirmarSenha){
      this.toastr.error("A senha e confirmação da senha devem ser iguais!");
      this.invalidPasswordError = true;
    } else if(this.termsAccepted == false){
      this.toastr.error("Você deve aceitar os termos de uso para se cadastrar!!!");
      return false;
    } else {
      return true;
    }
  }

}
