import { Component, OnInit } from '@angular/core';
import { LoaderService } from './services/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isLoaderOpen: boolean = false;

  constructor(private loader: LoaderService) { }

  ngOnInit(): void {
    this.loader.getLoaderStatus().subscribe((res: boolean) => {
      this.isLoaderOpen = res;
    })
  }

}
