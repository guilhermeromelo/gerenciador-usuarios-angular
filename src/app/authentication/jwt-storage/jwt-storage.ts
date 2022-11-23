import { HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";
import LoggedUserToken from "./logged-user.interface";


export default class JwtAuth {
  constructor() {}

  public static getLoggedUser() {
    const localInfo = localStorage.getItem("loggedUserToken");
    if (localInfo && localInfo != "null") {
      let localStorageUser: any = JSON.parse(<string>localInfo);
      if (localStorageUser.accessToken) {
        let loggedUser: LoggedUserToken = <LoggedUserToken>{};
        loggedUser.accessToken = localStorageUser.accessToken;
        return loggedUser;
      }
      return null;
    }
    return null;
  }

  public static getAuthorizationConfig(){
    return {
      headers:{
        "Authorization": `Bearer ${JwtAuth.getLoggedUser()?.accessToken}`
      }
    };
  }

  public static isLogged(): boolean {
    let loggedUser = this.getLoggedUser();
    if (loggedUser && loggedUser.accessToken)
      return true;
    else return false;
  }

  public static saveToken(response: any) {
    let loggedUser: LoggedUserToken = <LoggedUserToken>(
      this.getLoggedUser()
    );
    if (loggedUser) {
      localStorage.setItem(
        "loggedUserToken",
        JSON.stringify({
          accessToken: response.access_token,
        })
      );
    } else {
      localStorage.setItem(
        "loggedUserToken",
        JSON.stringify({
          accessToken: response.access_token,
        })
      );
    }
  }

  public static logout() {
    localStorage.setItem("loggedUserToken", "null");
  }
}

