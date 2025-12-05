import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MatchesPage } from './matches.page';

const routes: Routes = [
  {
    path: '',
    component: MatchesPage
  },
  {
    path: ':id',
    loadChildren: () => import('../match-detail/match-detail.module').then(m => m.MatchDetailPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MatchesPageRoutingModule {}
