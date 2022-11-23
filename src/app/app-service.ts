import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import JwtAuth from './authentication/jwt-storage/jwt-storage';

@Injectable()
export class AppService {
    constructor(private http: HttpClient) {

    }

    async postRequest(url: any, body: any, config?:any) {
        return new Promise((resolve, reject) => {
            this.http.post(url, body, config).subscribe(res => {               
                resolve(res);
            }, err => {
                reject(err);
            });
        })
    }

    public async getRequest(url: any, config?:any) {
        return new Promise((resolve, reject) => {
            this.http.get(url,config).subscribe(res => {               
                resolve(res);
            }, err => {
                reject(err);
            });
        })
    }

    async putRequest(url: any, body: any, config?: any) {
        return new Promise((resolve, reject) => {
            this.http.put(url, body,config).subscribe(res => {               
                resolve(res);
            }, err => {
                reject(err);
            });
        })
    }

    async deleteRequest(url: any, config?: any) {
        return new Promise((resolve, reject) => {
            this.http.delete(url,JwtAuth.getAuthorizationConfig()).subscribe(res => {               
                resolve(res);
            }, err => {
                reject(err);
            });
        })
    }
}
