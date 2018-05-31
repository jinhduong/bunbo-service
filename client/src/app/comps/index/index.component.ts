import { Component, OnInit } from '@angular/core';
import { SiteService } from '../../services/site.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  site;
  email;
  result: { key, site };

  constructor(
    private _siteService: SiteService
  ) { }

  ngOnInit() {
  }

  add() {
    this._siteService.add(this.site, this.email).subscribe(x => {
      this.result = x as any;
    })
  }

}
