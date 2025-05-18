import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PostService } from '../../services/post.service';
import { firstValueFrom } from 'rxjs';
import { LocalStorageService } from '../../storage/local-storage.service';

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
  showSuccessPopup = false;
  options = { animation: google.maps.Animation.DROP, icon: { url: 'assets/logo.png', scaledSize: new google.maps.Size(30, 30) } }
  constructor(private fb: FormBuilder, private postService: PostService, private localService: LocalStorageService) { }

  ngOnInit(): void {
    this.postForm = this.fb.group({
      titulo: ['', Validators.required],
      categoria: ['Academico', Validators.required],
      image: [null]
    });

    this.getCurrentLocation();
    this.setCurrentLocation();
  }

  getCurrentLocation() {
    navigator.geolocation.getCurrentPosition(pos => {
      this.coordinates = [pos.coords.longitude, pos.coords.latitude];
    });
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

    let auxs = { ...payload }
    auxs.media = {
      filename: "",
      mime_type: "",
      data_base64: ""
    }
    // this.test = JSON.stringify(auxs)
    this.test = JSON.stringify(sessionStorage.getItem("walletAddress"))
    firstValueFrom(this.postService.postNewPost(payload, this.localService.getItem("jwt") || "", sessionStorage.getItem("walletAddress") || "")).then((res) => {
      this.test = JSON.stringify(res)
    }).catch((error) => {
      this.test = JSON.stringify(error)
    })

  }
  cleanForm() {
    this.postForm.reset()
  }
}
