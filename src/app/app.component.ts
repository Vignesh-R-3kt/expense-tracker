import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { LoaderService } from './services/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isLoaderOpen: boolean = false;

  constructor(private loader: LoaderService, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.loader.getLoaderStatus().subscribe((res: boolean) => {
      this.isLoaderOpen = res;
      this.cdr.detectChanges();
    })
  }

}
