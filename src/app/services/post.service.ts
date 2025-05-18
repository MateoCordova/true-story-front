import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private httpService: HttpClient) { }
  postNewPost(body: any, jwt: string, wallet: string) {
    return this.httpService.post("https://back-hackathon-azf0cafnh4fqchcc.canadacentral-01.azurewebsites.net//post/crear/" + wallet, body, { headers: { "Authorization": jwt } })
  }

}
