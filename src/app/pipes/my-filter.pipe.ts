import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'myFilter'
})
export class MyFilterPipe implements PipeTransform {

  transform(objs:any, term:string): any {
    if (term === undefined) {
    return objs;
    }
    return objs.filter((obj)=> {
    return (obj.nameAnn.toLowerCase().includes(term.toLowerCase()));
    })
    }

}
