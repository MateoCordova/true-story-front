import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MiniAppVerifyActionSuccessPayload, MiniKit, VerificationLevel } from '@worldcoin/minikit-js';
import { AuthService } from '../../services/auth.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-validate-view',
  standalone: false,
  templateUrl: './validate-view.component.html',
  styleUrl: './validate-view.component.css'
})
export class ValidateViewComponent implements OnInit {
  message: any
  loadingFlag: boolean = false
  constructor(private router: Router, private authSer: AuthService) {

  }
  ngOnInit(): void {
    // if (!MiniKit.isInstalled()) {
    //   this.navigateError();
    // }
  }

  async handleVerify() {
    this.loadingFlag = true
    await MiniKit.commandsAsync.verify({
      action: 'test',
      verification_level: VerificationLevel.Device
    }).then((result) => {
      console.log(JSON.stringify(result));
      this.postVerify({
        merkle_root: (result.finalPayload as MiniAppVerifyActionSuccessPayload).merkle_root,
        nullifier_hash: (result.finalPayload as MiniAppVerifyActionSuccessPayload).nullifier_hash,
        proof: (result.finalPayload as MiniAppVerifyActionSuccessPayload).proof,
        credential_type: (result.finalPayload as MiniAppVerifyActionSuccessPayload).verification_level,
        action: result.commandPayload?.action as string,
        signal: result.commandPayload?.signal as string
      }).then(responsePostVerify => {
        if (responsePostVerify) {
          this.message = JSON.stringify(responsePostVerify)
          this.router.navigateByUrl("login")
          this.loadingFlag = false
        }
      }).catch(() => {
        this.navigateError()
      })
    }).catch(() => {
      this.navigateError()
    })

  }

  postVerify(body: {
    merkle_root: string,
    nullifier_hash: string,
    proof: string,
    credential_type: string,
    action: string,
    signal: string
  }) {
    return firstValueFrom(this.authSer.postVerify(body))
  }

  navigateError() {
    this.router.navigate(["/error"])
  }
}
