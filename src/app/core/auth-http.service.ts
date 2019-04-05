import { Injectable } from '@angular/core';
import { TokenResponse } from '@openid/appauth';

import { RequestorService } from './cordova/requestor.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthHttpService {

  constructor(
    private requestor : RequestorService,
    private auth : AuthService
    ) {}

  public async request<T> (method: "GET" | "POST" | "PUT" | "DELETE", url: string, body?: any){
    let token : TokenResponse = await this.auth.getValidToken();
    return this.requestor.xhr<T>({
                                url: url,
                                method: method,
                                data: JSON.stringify(body),
                                headers: this.addHeaders(token)
                            });
  } 

  private addHeaders(token) {
      return (token) ? {
                  "Authorization": `${token.tokenType} ${token.accessToken}`,
                  "Content-Type": "application/json"
              } : {};

  }   
}
