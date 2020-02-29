import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Tab2Page } from './tab2.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import { FormPageModule } from '../form/form.module';
import { FormPage } from '../form/form.page';
import { PipeFilterPipe } from '../pipe/pipe-filter.pipe';

@NgModule({
  entryComponents: [],
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    RouterModule.forChild([{ path: '', component: Tab2Page }])
  ],
  declarations: [Tab2Page, PipeFilterPipe]
})
export class Tab2PageModule {}
