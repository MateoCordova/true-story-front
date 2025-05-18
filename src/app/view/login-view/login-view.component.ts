import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MiniKit, User } from '@worldcoin/minikit-js';
import { firstValueFrom } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { LocalStorageService } from '../../storage/local-storage.service';

@Component({
  selector: 'app-login-view',
  standalone: false,
  templateUrl: './login-view.component.html',
  styleUrl: './login-view.component.css'
})
export class LoginViewComponent implements OnInit {
  constructor(private localStorage: LocalStorageService, private authSer: AuthService, private router: Router) { }

  ngOnInit(): void {
    if (!MiniKit.isInstalled()) {
      this.navigateError()
    }
  }
  handleLogin() {
    this.getNonce().then((res: any) => {
      MiniKit.commandsAsync.walletAuth({
        nonce: res.nonce as string,
        expirationTime: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        notBefore: new Date(Date.now() - 24 * 60 * 60 * 1000),
        statement: `Authenticate (${crypto.randomUUID().replace(/-/g, '')}).`,
      }).then((res1) => {
        if (res1.finalPayload.status === 'success') {
          this.postUserVerify(MiniKit.user, res.nonce as string).then((jwt: any) => {
            this.localStorage.setItem("jwt", ("Bearer " + jwt.access_token) as string)
            sessionStorage.setItem('walletAddress', MiniKit.user.walletAddress || "")
            this.router.navigate(["/main"])
          }).catch(() => {
            this.navigateError()
          })

        } else {
          this.navigateError()
        }


      });
    }).catch(() => {
      this.navigateError()
    });
  }

  getNonce() {
    return firstValueFrom(this.authSer.getNonce())
  }
  postUserVerify(user: User, nonce: string) {
    return firstValueFrom(this.authSer.postUserVerify(user, nonce));
  }

  navigateError() {
    this.router.navigate(["/error"])
  }

}
