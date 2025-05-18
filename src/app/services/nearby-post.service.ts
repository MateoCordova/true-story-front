import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NearbyPostService {

  constructor(private httpService: HttpClient) { }


  getPosts(location: string) {
    return this.httpService.get("https://back-hackathon-azf0cafnh4fqchcc.canadacentral-01.azurewebsites.net/posts/cercanos?" + location)
  }
}
