import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '@worldcoin/minikit-js';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpService: HttpClient) { }

  postVerify(body: {
    merkle_root: string,
    nullifier_hash: string,
    proof: string,
    credential_type: string,
    action: string,
    signal: string
  }) {
    console.log(body)
    return this.httpService.post("https://back-hackathon-azf0cafnh4fqchcc.canadacentral-01.azurewebsites.net/verify-world-id", body)
  }

  getNonce() {
    return this.httpService.get("https://back-hackathon-azf0cafnh4fqchcc.canadacentral-01.azurewebsites.net/nonce")
  }

  postUserVerify(user: User, nonce: string) {
    const body = { ...user, nonce: nonce }
    return this.httpService.post("https://back-hackathon-azf0cafnh4fqchcc.canadacentral-01.azurewebsites.net/auth", body)
  }
}
