import { PipeTransform, Pipe } from '@angular/core';

@Pipe({ name: "split" })
export class SplitPipe implements PipeTransform {
  transform(input: string, separator: string, index: number): string {
    if (index == 1) {
      return input.split(separator)[(input.split(separator).length) - 1];
    }
    if (input.split(separator).length > 2) {
      let name = input.split(separator);
      name.splice(name.length - 1, 1);
      return name.join(".");

    }
    return input.split(separator)[index];
  }
}
