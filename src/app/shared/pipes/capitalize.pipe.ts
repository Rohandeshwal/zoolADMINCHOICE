import { Pipe, PipeTransform } from '@angular/core';
import { SharedService } from 'src/app/core/services/shared.service';

@Pipe({
  name: 'capitalize'
})
export class CapitalizePipe implements PipeTransform {

  constructor(private sharedService:SharedService)
  {

  }

  transform(value: string, ...args: unknown[]): unknown {
    return this.sharedService.capitalizeString(value);

  }


}
