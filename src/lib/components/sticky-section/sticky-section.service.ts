import { Injectable, ElementRef } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
/**
 * @ignore
 */
@Injectable()
export class StickySectionService {
    public elements: Array<{elementRef: ElementRef, active: boolean, order: number, height: number}> = [];
    // This is a nasty workaround to trigger change detection properly.
    // At some point, look into refactoring it out of an observable.
    public lastElement$: BehaviorSubject<ElementRef> = new BehaviorSubject(null);

    addItem(item: {elementRef: ElementRef, active: boolean, order: number, height: number}){
      this.elements.push({
        elementRef: item.elementRef,
        active: item.active,
        order: item.order,
        height: item.height
      });
      this.elements.sort((a, b) => a.order - b.order);
      this.updateLastItem();
    }
    removeItem(element: ElementRef){
      this.elements =  this.elements.filter((item) => {
        return element !== item.elementRef;
      });
      this.updateLastItem();
    }

    /**
     * This calculates how much offset an element needs in order to
     * not overlap with the other fixed elements.
     */
    getPreviousItemsOffset(element: ElementRef): number{
      let offset = 0;
      let currentItemIndex = this.elements.findIndex((item) => { return item.elementRef === element});
      let previtems = this.elements.slice(0,currentItemIndex);
      
      previtems.forEach((item) => {
        if (item.active){
          offset += item.height;
        }
      });
  
      return offset;
    }
    setActive(element: ElementRef, status: boolean) {
      const index = this.elements.findIndex(item =>item.elementRef == element);
      this.elements[index].active = status;
      this.updateLastItem();
    }
    setNewHeight(element: ElementRef, height: number) {
      const index = this.elements.findIndex(item =>item.elementRef == element);
      this.elements[index].height = height;
    }
    updateLastItem(){
      const lastItem = this.elements.filter((item) => {
        return item.active;
      }).pop();
      if (lastItem && lastItem.elementRef !== this.lastElement$.value){
        this.lastElement$.next(lastItem.elementRef);
      }
    }    
}
