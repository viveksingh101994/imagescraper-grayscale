import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public searchimg: string;
  public isLoader: boolean;
  public key: string;
  public imagepath: string;
  public images;
  constructor(private Api: ApiService) { }

  ngOnInit() {
    this.isLoader = false;
  }

  public Search(e) {
    if (this.searchimg == '')
    {
      return false;
    }
    this.isLoader = true;
    this.Api.SaveSearchResult(this.searchimg).subscribe(res => {
        this.key = res.Images;
        this.imagepath = res.imagepath;
        this.images = res.Keys.map(x => res.imagepath + x);
        this.searchimg = '';
        this.isLoader = false;
    });
  }

}
