import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StatsRoutingModule } from './stats-routing.module';
import { SiteService } from '../../services/site.service';
import { StatsComponent } from './stats.component';

@NgModule({
  imports: [
    CommonModule,
    StatsRoutingModule
  ],
  declarations: [StatsComponent],
  providers: [SiteService]
})
export class StatsModule { }
