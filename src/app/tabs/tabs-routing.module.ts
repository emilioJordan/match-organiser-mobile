import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'matches',
        loadChildren: () => import('../pages/matches/matches.module').then(m => m.MatchesPageModule)
      },
      {
        path: 'my-matches',
        loadChildren: () => import('../pages/my-matches/my-matches.module').then(m => m.MyMatchesPageModule)
      },
      {
        path: 'create',
        loadChildren: () => import('../pages/create-match/create-match.module').then(m => m.CreateMatchPageModule)
      },
      {
        path: 'profile',
        loadChildren: () => import('../pages/profile/profile.module').then(m => m.ProfilePageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/matches',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/matches',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
