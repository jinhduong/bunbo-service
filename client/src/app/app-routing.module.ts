import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './comps/index/index.component';

const routes: Routes = [
    { path: '', component: IndexComponent },
    { path: 'stats', loadChildren: './comps/stats/stats.module#StatsModule' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)]
})
export class AppRoutingModule { }
