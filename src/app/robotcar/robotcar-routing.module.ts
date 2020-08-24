import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RobotcarPage } from './robotcar.page';

const routes: Routes = [
  {
    path: '',
    component: RobotcarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RobotcarPageRoutingModule {}
