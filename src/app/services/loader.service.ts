import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  private loaderStatus: Subject<boolean> = new Subject<boolean>();

  constructor() { }

  getLoaderStatus() {
    return this.loaderStatus.asObservable();
  }

  show() {
    this.loaderStatus.next(true);
  }

  hide() {
    this.loaderStatus.next(false);
  }
}
