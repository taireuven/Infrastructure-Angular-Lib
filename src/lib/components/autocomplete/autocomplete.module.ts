import { NgModule } from '@angular/core';
import { AutocompleteComponent } from './autocomplete.component';
import { SharedModule } from '../../shared/shared.module';
import { SelectBaseModule } from '../select/base/select.base.module';
import { MohHighlightPipe } from './highlight.pipe';

@NgModule({
  declarations: [AutocompleteComponent, MohHighlightPipe],
  imports: [
    SharedModule,
    SelectBaseModule
  ],
  exports:[AutocompleteComponent]
})
export class AutocompleteModule { }
