import { Component, OnInit } from '@angular/core';
import { MiniAppVerifyActionSuccessPayload, MiniKit, User, VerificationLevel } from '@worldcoin/minikit-js';
import { AuthService } from '../../services/auth.service';
import { firstValueFrom } from 'rxjs';
import { MiniKitProvider } from '@worldcoin/minikit-js/minikit-provider';

@Component({
  selector: 'app-card',
  standalone: false,
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent implements OnInit {
  message: string | any = "Inicio"
  testA: any
  constructor(private authSer: AuthService) {

  }
  ngOnInit(): void {

    if (MiniKit.isInstalled()) {
      console.log('MiniKit está instalado');
      this.testA = "ok"
    } else {
      let flag = MiniKit.install("app_160be036f2c85ab313ad497cb5e4e79d")
      console.log('no instalado');

      this.testA = flag.success
      // MiniKit.install("app_ece482fa04e3118c523d9e7815570fe9")
      // console.log("Instalado", MiniKit.install("app_ece482fa04e3118c523d9e7815570fe9"))
    }
  }

  async handleVerify() {
    // verifyCloudProof()
    // MiniKit.subscribe()
    await MiniKit.commandsAsync.verify({
      action: 'test',
      verification_level: VerificationLevel.Device
    }).then((result) => {
      console.log(JSON.stringify(result));
      this.message = "ok"
      this.testA = JSON.stringify(result)

      MiniKit.getUserInfo().then((userInfo) => {
        this.testA = JSON.stringify(userInfo)
        this.postVerify({
          merkle_root: (result.finalPayload as MiniAppVerifyActionSuccessPayload).merkle_root,
          nullifier_hash: (result.finalPayload as MiniAppVerifyActionSuccessPayload).nullifier_hash,
          proof: (result.finalPayload as MiniAppVerifyActionSuccessPayload).proof,
          credential_type: (result.finalPayload as MiniAppVerifyActionSuccessPayload).verification_level,
          action: result.commandPayload?.action as string,
          signal: result.commandPayload?.signal as string,
          usr: userInfo.username ? userInfo.username : ""
        }).then(res => {
          this.message = "ok2"
          this.getNonce().then((res: any) => {
            this.message = JSON.stringify(res)
            MiniKit.commandsAsync.walletAuth({
              nonce: res.nonce as string,
              expirationTime: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
              notBefore: new Date(Date.now() - 24 * 60 * 60 * 1000),
              statement: `Authenticate (${crypto.randomUUID().replace(/-/g, '')}).`,
            }).then((res1) => {
              this.message = JSON.stringify(MiniKit.user)
              this.testA = JSON.stringify(res1)
              this.postUserVerify(MiniKit.user, res.nonce as string).then(jwt => {
                this.testA = JSON.stringify(jwt)

              }).catch((error) => {
                this.testA = JSON.stringify(error)
              })

            });
          }).catch((error) => {
            this.testA = JSON.stringify(error)
            this.message = "error"
          });
        }).catch((error) => {
          this.testA = JSON.stringify(error)
          this.message = "error"
        }).finally(() => {

        })
        // this.testA = JSON.stringify({ ...result, usr: JSON.stringify(userInfo), otro: MiniKit.user.username })


      })


    }).catch((error) => {
      console.log(typeof error)
      this.testA = error
      this.message = "error";
    })

  }
  postVerify(body: {
    merkle_root: string,
    nullifier_hash: string,
    proof: string,
    credential_type: string,
    action: string,
    signal: string,
    usr: string
  }) {
    return firstValueFrom(this.authSer.postVerify(body))
  }
  getNonce() {
    return firstValueFrom(this.authSer.getNonce())
  }
  postUserVerify(user: User, nonce: string) {
    return firstValueFrom(this.authSer.postUserVerify(user, nonce));
  }
}
