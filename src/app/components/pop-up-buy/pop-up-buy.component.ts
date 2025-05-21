import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PaymentService } from '../../services/payment.service';
import { firstValueFrom } from 'rxjs';
import { MiniKit, PayCommandInput, Tokens, tokenToDecimals } from '@worldcoin/minikit-js';
import { LocalStorageService } from '../../storage/local-storage.service';

@Component({
  selector: 'app-pop-up-buy',
  standalone: false,
  templateUrl: './pop-up-buy.component.html',
  styleUrl: './pop-up-buy.component.css'
})
export class PopUpBuyComponent {
  @Input() price: number = 0;
  @Input() serviceName: string = 'Servicio';
  @Output() close = new EventEmitter<void>();
  @Output() closeAll = new EventEmitter<void>();
  showSuccessPopup = false;

  test = ""

  constructor(private paymentService: PaymentService, private storage: LocalStorageService) { }
  onClose() {
    this.close.emit();
  }
  onAccept() {
    // this.accepted.emit();
    firstValueFrom(this.paymentService.getUuid()).then((async (res: any) => {
      this.test = JSON.stringify(res)
      const payload: PayCommandInput = {
        reference: res.id,
        to: '0x007c084304015ba0241e898d49bc897f5a4ae96b', // Test address
        tokens: [
          {
            symbol: Tokens.WLD,
            token_amount: tokenToDecimals(0.1, Tokens.WLD).toString(),
          }
        ],
        description: 'Destacar Post',
      }
      if (!MiniKit.isInstalled()) {
        return
      }


      const { finalPayload } = await MiniKit.commandsAsync.pay(payload)

      if (finalPayload.status == 'success') {
        firstValueFrom(this.paymentService.postValidate(finalPayload, this.storage.getItem("postId") || "")).then((res) => {
          if (res) {
            this.showSuccessPopup = true;
            setTimeout(() => {
              this.showSuccessPopup = false
              this.closeAll.emit()
            }, 2000)
          }
        })
      }
    }))



  }
}
