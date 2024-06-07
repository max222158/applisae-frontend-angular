import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(private router: Router) {}


  isImageExtension(extension: string): boolean {
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.tiff', '.tif', '.webp', '.svg', '.raw'];
    const lowerCaseExtension = extension.toLowerCase();
    return imageExtensions.includes(lowerCaseExtension);
  }

  isVideoExtension(extension: string): boolean {
    const imageExtensions = ['.mp4', '.avi',  '.webm'];
    const lowerCaseExtension = extension.toLowerCase();
    return imageExtensions.includes(lowerCaseExtension);
  }


  modifyUrlSegment(newSegment: string): void {
    // Obtenir l'URL actuelle
    const currentUrl = this.router.url;
    // Séparer les segments de l'URL
    const segments = currentUrl.split('/');
    // Modifier le dernier segment
    segments[segments.length - 1] = newSegment;
    // Construire la nouvelle URL
    const newUrl = segments.join('/');
    // Naviguer vers la nouvelle URL
    this.router.navigateByUrl(newUrl);
  }


  calculateValidationPercentage(table:any) {
    if (!Array.isArray(table)) {
      throw new Error('The input must be an array');
    }
  
    const totalElements = table.length;
    if (totalElements === 0) {
      return 0; // Avoid division by zero
    }
  
    const validatedElements = table.filter(item => item.is_validate === true).length;
    const percentage = (validatedElements / totalElements) * 100;
  
    return percentage.toFixed(0); // Returning the percentage rounded to 2 decimal places
  }

  calculatePercentage(table:any) {
    if (!Array.isArray(table)) {
      throw new Error('The input must be an array');
    }
  
    const totalElements = table.length;
    if (totalElements === 0) {
      return 0; // Avoid division by zero
    }
  
    const elements = table.filter(item => item.is_validate !== null).length;
    const percentage = (elements / totalElements) * 100;
    return percentage.toFixed(0); // Returning the percentage rounded to 2 decimal places
  }

}
