import { Component, OnInit, ViewChild } from '@angular/core';
import { NearbyPostService } from '../../services/nearby-post.service';
import { firstValueFrom } from 'rxjs';
import { MapInfoWindow } from '@angular/google-maps';
import { MiniKit } from '@worldcoin/minikit-js';
import { LocalStorageService } from '../../storage/local-storage.service';

@Component({
  selector: 'app-world-map',
  standalone: false,
  templateUrl: './world-map.component.html',
  styleUrl: './world-map.component.css'
})
export class WorldMapComponent implements OnInit {
  @ViewChild(MapInfoWindow) infoWindow!: MapInfoWindow;
  center: google.maps.LatLngLiteral = { lat: 0, lng: 0 };
  wallet = ""
  userMarker: any = null;
  objSelected!: {
    id: string,
    position: { lat: number, lng: number },
    title: string,
    infoText: string,
    photoUrl: string,
    infoOpen: boolean
  } | undefined
  showBuy: boolean = false
  locations: {
    id: string
    position: { lat: number, lng: number },
    title: string,
    infoText: string,
    photoUrl: string,
    infoOpen: boolean
  }[] = []

  constructor(private servicePosts: NearbyPostService, private storage: LocalStorageService) {

  }
  text: string = ""
  ngOnInit() {
    this.getUserLocation();
    this.wallet = JSON.stringify(MiniKit.user.walletAddress)
  }
  anim = google.maps.Animation.DROP

  getUserLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.center = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };


          this.userMarker = {
            position: this.center,
            label: 'U',
            title: 'Your Location',
            options: { animation: google.maps.Animation.DROP, icon: { url: 'assets/logo.png', scaledSize: new google.maps.Size(30, 30) } }
          };
          this.getPost(position.coords.latitude, position.coords.longitude).then(res => {
            this.text = JSON.stringify(res)
            this.locations = (res as []).map((obj: any) => {
              console.log(obj)
              return {
                id: obj._id,
                position: { lat: obj.georeference.coordinates[0], lng: obj.georeference.coordinates[1] },
                title: obj.titulo,
                infoText: obj.categoria,
                photoUrl: "data:image/jpeg;base64," + obj.media.data_base64,
                infoOpen: false
              }
            })
          }).catch((error) => {
            this.text = JSON.stringify(error)
          })


        },
        (error) => {
          console.error('Geolocation error:', error);
        }
      );
    } else {
      console.error('Geolocation not supported');
    }
  }
  getPost(lat: number, lng: number) {
    const querry: string = "lat=" + lat.toString() + "&lon=" + lng.toString()
    return firstValueFrom(this.servicePosts.getPosts(querry));

  }
  toggleInfo(index: number) {

    this.locations.forEach((_, i) => {
      if (i === index) {
        this.objSelected = this.locations[i] as {
          id: string,
          position: { lat: number, lng: number },
          title: string,
          infoText: string,
          photoUrl: string,
          infoOpen: boolean
        }
        this.storage.setItem("postId", this.locations[i].id)
      }
    });
  }

  openBuy() {
    this.showBuy = true;
  }
  close() {
    this.objSelected = undefined
    this.storage.removeItem("postId")
  }
  closeBuy() {
    this.showBuy = false
  }
}

