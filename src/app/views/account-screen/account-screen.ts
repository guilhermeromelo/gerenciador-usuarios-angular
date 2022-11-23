import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AppService } from 'src/app/app-service';
import JwtAuth from 'src/app/authentication/jwt-storage/jwt-storage';
import { ResourceAccountAPI } from 'src/app/constants';
import { IUser } from 'src/app/interfaces/IUser.interface';

@Component({
  selector: 'app-account-screen',
  templateUrl: './account-screen.html',
  styleUrls: ['./account-screen.css']
})
export class AccountComponent {

  //VARIAVEIS
  userId:number = 0;
  userData: IUser = {};
  newEmail:string = "";

  constructor(private routerService: Router, private route: ActivatedRoute, 
    private modalService: NgbModal, private httpService: AppService,
    private toastr: ToastrService) {
      if(this.routerService.getCurrentNavigation()?.extras?.state?.userData)
        this.userData = this.routerService.getCurrentNavigation()?.extras?.state?.userData; 
      else
        this.routerService.navigateByUrl('/login')
  }

  async ngOnInit(): Promise<void> {
    let id = this.route.snapshot.paramMap.get("id");
    this.userId = parseInt(<string>id);
  }

  async confirmDelete(){
    try{
      let response:any = await this.httpService
      .deleteRequest(ResourceAccountAPI + `/private/user/delete/${this.userData.id}`,JwtAuth.getAuthorizationConfig());
      this.routerService.navigateByUrl('/login');
      this.toastr.success(response.message);
    } catch(err:any){
      if(err?.error?.message){
        this.toastr.error(err.error.message);
      } else if (err.error){
        this.toastr.error(err.error);
      } else{
        this.toastr.error("Erro inesperado com a API.");
      }
    }
    this.closeBtnClick();
  }
  
  async saveNewEmail(){
    if(this.newEmail!= "" && this.newEmail.includes("@")){

      let requestBody = {
        id: this.userData.id,
        email: this.newEmail
      }
      try{
        let response:any = await this.httpService
        .putRequest(ResourceAccountAPI + `/private/user/update-email`,requestBody,JwtAuth.getAuthorizationConfig());
        this.userData = response.data;
        this.toastr.success(response.message);
      } catch(err:any){
        if(err?.error?.message){
          this.toastr.error(err.error.message);
        } else if (err.error){
          this.toastr.error(err.error);
        } else{
          this.toastr.error("Erro inesperado com a API.");
        }
      }
      this.closeBtnClick();
    } else {
      this.toastr.error("Digite um email válido!");
    }
  }

  openModal(targetModal: any) {
    this.newEmail = "";
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static',
    });
  }

  closeBtnClick(){
    this.modalService.dismissAll();
  }

  goToLoginPage(){
    JwtAuth.logout();
    this.routerService.navigateByUrl('/login');
  }
}
