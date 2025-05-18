import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private httpService: HttpClient) { }


  getUuid() {
    return this.httpService.get("https://back-hackathon-azf0cafnh4fqchcc.canadacentral-01.azurewebsites.net/uuid")
  }

  postValidate(body: any, id: string) {
    return this.httpService.post("https://back-hackathon-azf0cafnh4fqchcc.canadacentral-01.azurewebsites.net/post/destacar/" + id, body)
  }
}
