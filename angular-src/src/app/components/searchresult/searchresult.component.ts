import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-searchresult',
  templateUrl: './searchresult.component.html',
  styleUrls: ['./searchresult.component.css']
})
export class SearchresultComponent implements OnInit {

  public item: any;
  public searchitems;
  public key: string;
  public imagepath: string;
  public images;
  constructor(private Api: ApiService, private router: Router) { }

  ngOnInit() {

    this.checkitem();

    this.Api.currentitem.subscribe(item => {
      this.item = item;
    });

    this.GetImage();
  }

  public checkitem() {
    if (this.item == undefined) {
      this.router.navigate(['/']);
    }
  }

  public GetImage() {
    if (this.item == '') {
      return false;
    }
    this.Api.getPastKeywordImage(this.item).subscribe(items => {
      this.key = items.Keys;
      this.imagepath = items.imagepath;
      this.images = items.images.map(x => '/' + items.imagepath + x);
    });
  }

}
