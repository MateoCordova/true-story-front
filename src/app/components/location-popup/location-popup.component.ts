import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NearbyPostService } from '../../services/nearby-post.service';
import { firstValueFrom } from 'rxjs';
import { User } from '@worldcoin/minikit-js';

@Component({
  selector: 'app-location-popup',
  standalone: false,
  templateUrl: './location-popup.component.html',
  styleUrl: './location-popup.component.css'
})
export class LocationPopupComponent implements OnInit {

  @Input() title: string = '';
  show: boolean = false
  loadingFlag: boolean = true
  @Input() description: string = '';
  @Input() imageUrl: string = '';
  @Output() buyOpen = new EventEmitter();
  @Output() close = new EventEmitter<void>();
  @Input() post: {
    id: string,
    position: { lat: number, lng: number },
    title: string,
    infoText: string,
    photoUrl: string,
    infoOpen: boolean,
    destacado: boolean,
    username: string
  } = {
      id: "",
      position: { lat: 0, lng: 0 },
      title: "",
      infoText: "",
      photoUrl: "",
      infoOpen: false,
      destacado: false,
      username: ""
    }

  constructor(private postService: NearbyPostService) {

  }

  ngOnInit(): void {
    const user = JSON.parse(sessionStorage.getItem('user') || "{}")
    this.show = (user!.username === this.post.username && !this.post.destacado)

    firstValueFrom(this.postService.getMediaPosts(this.post.id)).then((res: any) => {
      this.post.photoUrl = "data:image/jpeg;base64," + res.media.data_base64

    }).finally(() => {
      this.loadingFlag = false
    })
    //  + obj.media.data_base64,
  }
  onOpenBuy() {
    this.buyOpen.emit();
  }
  onClose() {
    this.close.emit();
  }
}
