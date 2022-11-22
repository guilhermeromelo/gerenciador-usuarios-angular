import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class AppService {
    constructor(private http: HttpClient) {

    }

    async postRequest(url: any, body: any) {
        return new Promise((resolve, reject) => {
            this.http.post(url, body).subscribe(res => {               
                resolve(res);
            }, err => {
                reject(err);
            });
        })
    }

    public async getRequest(url: any) {
        return new Promise((resolve, reject) => {
            this.http.get(url).subscribe(res => {               
                resolve(res);
            }, err => {
                reject(err);
            });
        })
    }

    async putRequest(url: any, body: any) {
        return new Promise((resolve, reject) => {
            this.http.put(url, body).subscribe(res => {               
                resolve(res);
            }, err => {
                reject(err);
            });
        })
    }

    async deleteRequest(url: any, body: any) {
        return new Promise((resolve, reject) => {
            this.http.delete(url, body).subscribe(res => {               
                resolve(res);
            }, err => {
                reject(err);
            });
        })
    }
}
