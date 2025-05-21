import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
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
  center: google.maps.LatLngLiteral = { lat: -0.223307, lng: -78.514063 };
  wallet = ""
  showFilers: boolean = false
  filters: string[] = []
  userMarker: any = null;
  objSelected!: {
    id: string,
    position: { lat: number, lng: number },
    title: string,
    infoText: string,
    photoUrl: string,
    infoOpen: boolean,
    destacado: boolean,
    username: string
  } | undefined
  showBuy: boolean = false
  locations: {
    id: string
    position: { lat: number, lng: number },
    title: string,
    infoText: string,
    photoUrl: string,
    infoOpen: boolean,
    destacado: boolean,
    username: string
  }[] = []

  locationsToShow: {
    id: string
    position: { lat: number, lng: number },
    title: string,
    infoText: string,
    photoUrl: string,
    infoOpen: boolean,
    destacado: boolean,
    username: string
  }[] = []

  icons: Record<string, any> = {
    social: {
      path: google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
      scale: 5,
      fillColor: '#ff0000',
      fillOpacity: 1,
      strokeWeight: 1,
      strokeColor: '#ffffff'
    },

    cultural: {
      path: google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
      scale: 5,
      fillColor: '#0c51eb',
      fillOpacity: 1,
      strokeWeight: 1,
      strokeColor: '#ffffff'
    },

    movilidad: {
      path: google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
      scale: 5,
      fillColor: '#ebe40c',
      fillOpacity: 1,
      strokeWeight: 1,
      strokeColor: '#ffffff'
    },

    seguridad: {
      path: google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
      scale: 5,
      fillColor: '#10bd36',
      fillOpacity: 1,
      strokeWeight: 1,
      strokeColor: '#ffffff'
    },

    'tecnología': {
      path: google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
      scale: 5,
      fillColor: '#bd8010',
      fillOpacity: 1,
      strokeWeight: 1,
      strokeColor: '#ffffff'
    },

    'académico': {
      path: google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
      scale: 5,
      fillColor: '#c000ff',
      fillOpacity: 1,
      strokeWeight: 1,
      strokeColor: '#ffffff'
    },
  }

  constructor(private servicePosts: NearbyPostService, private storage: LocalStorageService) {

  }
  text: string = ""
  ngOnInit() {
    this.getUserLocation();
    this.storage.removeItem("postId");
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
          this.setLocationsToShow(this.center)
        },
        (error) => {
          console.error('Geolocation error:', error);
        }
        , {
          enableHighAccuracy: false,
          timeout: 5000,
          maximumAge: 10000
        });
    } else {
      console.error('Geolocation not supported');
    }
  }
  getPost(lat: number, lng: number) {
    const querry: string = "lat=" + lat.toString() + "&lon=" + lng.toString()
    return firstValueFrom(this.servicePosts.getPosts(querry));

  }
  setLocationsToShow(position: {
    lat: number,
    lng: number
  }) {
    this.getPost(position.lat, position.lng).then(res => {
      this.text = JSON.stringify(res)
      this.locations = (res as []).map((obj: any) => {
        return {
          id: obj._id,
          position: { lat: obj.georeference.coordinates[0], lng: obj.georeference.coordinates[1] },
          title: obj.titulo,
          infoText: obj.categoria,
          photoUrl: "",
          infoOpen: false,
          destacado: obj.destacado,
          username: obj.created_by.username
        }
      })
      this.locationsToShow = [...this.locations]
    }).catch((error) => {
      this.text = JSON.stringify(error)
    })
  }
  toggleInfo(index: number) {

    this.locationsToShow.forEach((_, i) => {
      if (i === index) {
        this.objSelected = this.locationsToShow[i] as {
          id: string,
          position: { lat: number, lng: number },
          title: string,
          infoText: string,
          photoUrl: string,
          infoOpen: boolean,
          destacado: boolean,
          username: string
        }
        this.storage.setItem("postId", this.locationsToShow[i].id)
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
  closeAll() {
    this.showBuy = false
    this.close()
    this.setLocationsToShow(this.center)
  }
  changeShowFilters() {
    this.showFilers = !this.showFilers
  }
  closeFilers() {
    this.showFilers = false
  }
  onFiltersChange(event: any) {
    this.filters = event
    console.log(this.filters)
    console.log(this.locationsToShow)
    if (this.filters.length === 0) {
      this.locationsToShow = [...this.locations]
    } else {
      console.log(this.filters.includes('académico'))
      this.locationsToShow = this.locations.filter((l) => {
        console.log(l.infoText.toLowerCase())

        return this.filters.includes(l.infoText.toLowerCase());
      })
      console.log(this.locationsToShow)
    }

  }
  getIcon(flag: string, des: boolean) {
    let aux = { ... this.icons[flag.toLowerCase()] }
    aux.path = des ? google.maps.SymbolPath.CIRCLE : aux.path
    aux.scale = des ? 15 : aux.scale
    return aux
  }
}

