import { PipeTransform, Pipe } from "@angular/core";
import { SelectGroup } from "./SelectGroup";

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(items: any[], term: any, propertyForSearch: string | string[], minLength: number): any[] {
    if (term && term.length >= minLength) {

      items = items || [];

      if (propertyForSearch) {
        let properties: string[] = propertyForSearch instanceof Array ? propertyForSearch : [propertyForSearch];

        return items.filter(function (item) {
          let res: boolean = false;

          properties.forEach((property) => {
            if (item[property]) {

              if (typeof term === 'string' || term instanceof String) {
                if (item[property].toString().toLowerCase().includes(term.toLowerCase())) {
                  res = true;
                  return true;
                }
              }

              else if (item[property].toString().toLowerCase().includes(term[property].toLowerCase())) {
                return true;
              }
            }
          });

          return res;
        });
      }
      else {

        return items.filter(function (item) {

          if (typeof item === 'string' || item instanceof String) {

            if (item.toLowerCase().includes(term.toLowerCase())) {
              return true;
            }
            return false;
          }
          else {
            for (let property in item) {

              if (item[property] === null) {
                continue;
              }
              else if (item[property].toString().toLowerCase().includes(term.toLowerCase())) {
                return true;
              }
              return false;
            }
          }
        });
      }
    }
    else {
      if (items)
        return items.slice(0, 50);
      return items;
    }
  }
}

@Pipe({
  name: 'filterGroup'
})
export class FilterGroupPipe implements PipeTransform {

  transform(groups: SelectGroup[], term: any, propertyForSearch: string | string[], minLength: number): any[] {
    if (term && term.length >= minLength) {

      return (groups || []).map(group => {
        return { title: group.title, options: new FilterPipe().transform(group.options, term, propertyForSearch, minLength) }
      }).filter(group => group.options.length > 0);

    }
    else {
      if (groups)
        return groups.slice(0, 10);
      return groups;
    }
  }
}
