import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pipeFilter'
})
export class PipeFilterPipe implements PipeTransform {

  transform(array: any[], searchText: string): any[] {
    if(searchText===''){
      return array;
    }
    return array.filter(valor => {
      return valor.marca.includes(searchText);
    })
    
  }

}
