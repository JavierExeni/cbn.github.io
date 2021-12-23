import { Component } from '@angular/core';
import { WebcamImage, WebcamInitError } from 'ngx-webcam';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'cbn';

  public webcamImage: WebcamImage | undefined;;

  lat: number = 0;
  long: number = 0;

  private trigger: Subject<void> = new Subject<void>();

  triggerSnapshot(): void {
    this.trigger.next();
  }
  handleImage(webcamImage: WebcamImage): void {
    console.info('received webcam image', webcamImage);
    this.webcamImage = webcamImage;
  }

  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

  public handleInitError(error: WebcamInitError): void {
    console.log(error);

    if (error.mediaStreamError && error.mediaStreamError.name === "NotAllowedError") {
      console.warn("Camera access was not allowed by user!");
      alert('Denegaste el acceso a la camara wachin!')
    }

    if (error.mediaStreamError && error.mediaStreamError.message === "Requested device not found") {
      console.warn("No se encontrarón dispositivos copnectados!");
      alert('No se encontrarón dispositivos conectados!');
    }
  }

  constructor() {
    if (navigator.geolocation) {
      console.log('Geolocation es compatible');

      navigator.geolocation.getCurrentPosition((pos: any) => {
        console.log(pos);
        this.lat = pos['coords']['latitude'];
        this.long = pos['coords']['longitude'];
      });
    } else {
      console.warn('Geolocation No Es Compatible');
    }
  }
}
