import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'starRating',
})
export class StarRatingPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  transform(rating: number): SafeHtml {
    const roundedRating = Math.round(rating); // Round the rating to the nearest integer
    let stars = '';
    for (let i = 0; i < 5; i++) {
      if (i < roundedRating) {
        stars += '<i class="fa fa-star"></i>'; // Assuming you're using Font Awesome for star icons
      } else {
        stars += '<i class="far fa-star"></i>'; // Use empty star icon for remaining stars
      }
    }
    return this.sanitizer.bypassSecurityTrustHtml(stars);
  }
}
