import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

interface JwtPayload {
  username: string;
  walletAddress: string;
  profilepic: string;
  exp: number;
}

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  static isTokenExpired(token: string): boolean {
    try {
      const decoded: JwtPayload = jwtDecode(token);
      const now = Math.floor(Date.now() / 1000); // current time in seconds
      return decoded.exp < now;
    } catch (e) {
      console.error('Invalid token:', e);
      return true;
    }
  }
}
