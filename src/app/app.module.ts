import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CardComponent } from './components/card/card.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { MainViewComponent } from './view/main-view/main-view.component';
import { LoginViewComponent } from './view/login-view/login-view.component';
import { NewPostViewComponent } from './view/new-post-view/new-post-view.component';
import { ButtonComponent } from './components/button/button.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { ValidateViewComponent } from './view/validate-view/validate-view.component';
import { SplashComponent } from './components/splash/splash.component';
import { ErrorComponent } from './components/error/error.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { WorldMapComponent } from './components/world-map/world-map.component';
import { LocationPopupComponent } from './components/location-popup/location-popup.component';
import { CreatePostComponent } from './components/create-post/create-post.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PopUpBuyComponent } from './components/pop-up-buy/pop-up-buy.component';
import { SuccessPopupComponent } from './components/success-popup/success-popup.component';

@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    MainViewComponent,
    LoginViewComponent,
    NewPostViewComponent,
    ButtonComponent,
    LoadingSpinnerComponent,
    ValidateViewComponent,
    SplashComponent,
    ErrorComponent,
    WorldMapComponent,
    LocationPopupComponent,
    CreatePostComponent,
    PopUpBuyComponent,
    SuccessPopupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GoogleMapsModule,
    ReactiveFormsModule

  ],
  providers: [provideHttpClient(withInterceptorsFromDi())],
  bootstrap: [AppComponent]
})
export class AppModule { }
