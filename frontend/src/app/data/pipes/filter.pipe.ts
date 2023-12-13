import { Pipe, type PipeTransform } from '@angular/core';
import { Book } from '../models/book';

@Pipe({
  name: 'filter',
  standalone: true,
})
export class FilterPipe implements PipeTransform {
  transform(items: any[], searchTerm: string): Book[] {

    if (!searchTerm) {
      return items; // Si no hay término de búsqueda, devolver todos los elementos
    }

    searchTerm = searchTerm.toLowerCase(); // Convertir el término de búsqueda a minúsculas
    return items.filter(item => {
      // Filtrar los elementos que contienen el término de búsqueda en el nombre, email, etc.
      return (
        item.title.toLowerCase().includes(searchTerm) ||
        item.author.toLowerCase().includes(searchTerm) ||
        item.nameEditorial.toLowerCase().includes(searchTerm)
      );
    });
  }
}
