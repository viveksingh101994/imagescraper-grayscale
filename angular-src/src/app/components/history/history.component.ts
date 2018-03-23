import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  public items: Array<String>;
  constructor(private Api: ApiService, private router: Router) { }

  ngOnInit() {
      this.Api.getAllKeywords().subscribe(x => {
        this.items = x.KeyList;
      });
  }

  public GetSelectedItem(item) {
      this.Api.ChangeItem(item);
      this.router.navigate(['/searchresult']);
  }

}
