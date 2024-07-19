import { FormGroup } from '@angular/forms';

export function clearInput(groupForm: FormGroup, fields: string[]): void {
  const resetFields = fields.reduce((acc, field) => ({ ...acc, [field]: '' }), {});
  groupForm.patchValue(resetFields);
}

export function extractLastSegment(url: string): string {
  const segments = url.split('/');
  return segments[segments.length - 1];
}

export function convertPathTableToIdString(folders: { id: number }[]): string {
  return folders.map(folder => folder.id).join('/');
}

export function handleDocumentFileResponse(response: any){
  const binaryString = window.atob(response.base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes.buffer;
  // Ajoutez ici la gestion de la réponse de l'API
}


export function isImageExtension(extension: string): boolean {
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.tiff', '.tif', '.webp', '.svg', '.raw'];
  const lowerCaseExtension = extension.toLowerCase();
  return imageExtensions.includes(lowerCaseExtension);
}

export function isVideoExtension(extension: string): boolean {
  const imageExtensions = ['.mp4', '.avi', '.webm'];
  const lowerCaseExtension = extension.toLowerCase();
  return imageExtensions.includes(lowerCaseExtension);
}


export function getFileIconSrc(extension: string): string {

  switch (extension.toLowerCase()) {
    case '.doc':
    case '.docx':
      return '/assets/images/logo-word.png'; // Chemin de l'icône Word
    case '.xls':
    case '.xlsx':
      return '/assets/images/logo-excel.png'; // Chemin de l'icône Excel
    case '.jpg':
    case '.jpeg':
    case '.png':
    case '.gif':
      return '/assets/images/logo-img.png'; // Chemin de l'icône Image
    case '.mp4':
    case '.avi':
    case '.mov':
      return '/assets/images/logo-video.png'; // Chemin de l'icône Vidéo
    case '.pdf':
      return '/assets/images/logo-pdf.png'; // Chemin de l'icône PDF
    default:
      return 'assets/images/default-icon.png'; // Chemin de l'icône par défaut
  }
}


export function sortFoldersAndDocumentsByDate(data: any[]): any[] {
  return data.sort((a, b) => {
    // Si a est un dossier et b n'en est pas un, a vient en premier
    if (a.is_folder && !b.is_folder) return -1;
    // Si b est un dossier et a n'en est pas un, b vient en premier
    if (!a.is_folder && b.is_folder) return 1;
    // Si les deux sont des dossiers ou les deux sont des documents, trier par date
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
  });
}