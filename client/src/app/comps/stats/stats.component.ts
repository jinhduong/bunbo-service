import { Component, OnInit, ElementRef } from '@angular/core';
import { SiteService } from '../../services/site.service';
import { ActivatedRoute } from '@angular/router';
import 'chart.js';
import { LogModel } from './logs-model';
declare var Chart;

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {

  constructor(
    private _siteService: SiteService,
    private activateRoute: ActivatedRoute,
    private elemRef: ElementRef
  ) { }

  ngOnInit() {
    const key = this.activateRoute.snapshot.params['key'];
    this._siteService.stats(key).subscribe((model: LogModel) => {
      model.logs = model.logs.slice(model.logs.length - 20);
      model.logs.map(x => {
        x.createdStr = new Date(x.created).toLocaleTimeString();
        return x;
      })
      this.chartRender(model);
    });
  }

  chartRender(source: LogModel) {
    const config = {
      type: 'line',
      data: {
        labels: source.logs.map(x => x.createdStr),
        datasets: [{
          label: 'Last 20 pings (ms)',
          fill: false,
          backgroundColor: 'green',
          borderColor: 'green',
          data: source.logs.map(x => parseInt(x.time)),
        }]
      },
      options: {
        responsive: true,
        title: {
          display: true,
          text: `${source.site} stats`
        },
        tooltips: {
          mode: 'index',
          intersect: false,
        },
        hover: {
          mode: 'nearest',
          intersect: true
        },
        scales: {
          xAxes: [{
            display: true,
            scaleLabel: {
              display: true,
              labelString: 'Time'
            }
          }],
          yAxes: [{
            display: true,
            scaleLabel: {
              display: true,
              labelString: 'ms'
            }
          }]
        }
      }
    };

    const ctx = this.elemRef.nativeElement.getElementsByTagName('canvas')[0].getContext('2d');
    const myChart = new Chart(ctx, config);
  }

}
