import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PostService } from '../../services/post.service';
import { firstValueFrom } from 'rxjs';
import { LocalStorageService } from '../../storage/local-storage.service';
import { User } from '@worldcoin/minikit-js';

@Component({
  selector: 'app-create-post',
  standalone: false,
  templateUrl: './create-post.component.html',
  styleUrl: './create-post.component.css'
})
export class CreatePostComponent implements OnInit {
  postForm!: FormGroup;
  coordinates: [number, number] = [0, 0];
  imageBase64: string = '';
  filename: string = '';
  mimeType: string = '';
  imagePreview: string = '';
  markerPosition: google.maps.LatLngLiteral | null = null;
  mapCenter: google.maps.LatLngLiteral = { lat: 0, lng: 0 };
  test: string = ""
  loadingFlag: boolean = false
  showSuccessPopup = false;
  categories = [{ label: 'Académico', value: 'academico' },
  { label: 'Social', value: 'social' },
  { label: 'Cultural', value: 'cultural' },
  { label: 'Movilidad', value: 'movilidad' },
  { label: 'Seguridad', value: 'seguridad' },
  { label: 'Tecnología', value: 'tecnologia' },]
  options = { animation: google.maps.Animation.DROP, icon: { url: 'assets/logo.png', scaledSize: new google.maps.Size(30, 30) } }
  constructor(private fb: FormBuilder, private postService: PostService, private localService: LocalStorageService) { }

  ngOnInit(): void {
    this.postForm = this.fb.group({
      titulo: ['', Validators.required],
      categoria: ['Académico', Validators.required],
      image: [null]
    });
    this.setCurrentLocation();
  }

  onFileChange(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.filename = file.name;
      this.mimeType = file.type;
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        this.imageBase64 = result.split(',')[1];
        this.imagePreview = result;
      };
      reader.readAsDataURL(file);
    }
  }
  setCurrentLocation() {
    navigator.geolocation.getCurrentPosition(pos => {
      this.mapCenter = {
        lat: pos.coords.latitude,
        lng: pos.coords.longitude
      };
      this.markerPosition = { ...this.mapCenter };
    }, (error) => {
      console.error('Geolocation error:', error);
    }, {
      enableHighAccuracy: false,
      timeout: 5000,
      maximumAge: 10000
    });
  }
  onMapClick(event: google.maps.MapMouseEvent) {
    if (event.latLng) {
      this.markerPosition = {
        lat: event.latLng.lat(),
        lng: event.latLng.lng()
      };
    }
  }

  onSubmit() {
    if (this.postForm.invalid) return;

    const { titulo, categoria } = this.postForm.value;
    this.loadingFlag = true

    const payload = {
      media: {
        filename: this.filename,
        mime_type: this.mimeType,
        data_base64: this.imageBase64
      },
      etiquetas: null,
      georeference: {
        type: 'Point',
        coordinates: [this.markerPosition!.lat, this.markerPosition!.lng]
      },
      titulo,
      categoria
    };
    const user: User = JSON.parse(sessionStorage.getItem("user")!)
    this.test = JSON.stringify(user)
    firstValueFrom(this.postService.postNewPost(payload, this.localService.getItem("jwt") || "", user.walletAddress || "")).then((res) => {
      this.test = JSON.stringify(res)
      if (res) {
        this.showSuccessPopup = true;
        this.cleanForm();
        setTimeout(() => {
          this.showSuccessPopup = false;
        }, 2000)
      }
    }).catch((error) => {
      this.test = JSON.stringify(error)
    }).finally(() => {
      this.loadingFlag = false
    })

  }
  cleanForm() {
    this.postForm.reset()
    this.imagePreview = ''
    this.setCurrentLocation()
  }
}
