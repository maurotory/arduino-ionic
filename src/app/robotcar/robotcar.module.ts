import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RobotcarPageRoutingModule } from './robotcar-routing.module';

import { RobotcarPage } from './robotcar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RobotcarPageRoutingModule
  ],
  declarations: [RobotcarPage]
})
export class RobotcarPageModule {}
