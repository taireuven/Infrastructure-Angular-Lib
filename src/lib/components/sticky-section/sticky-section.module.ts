import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { StickySectionComponent } from './sticky-section.component';
import { StickySectionService } from './sticky-section.service';

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  providers: [StickySectionService],
  declarations: [StickySectionComponent],
  exports: [StickySectionComponent]
})
export class StickySectionModule { }
