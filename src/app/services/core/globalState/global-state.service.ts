import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GlobalStateService {
  private idDocumentSubject = new BehaviorSubject<string>(''); // Initialisez avec une valeur par défaut
  idDocument$ = this.idDocumentSubject.asObservable();

  constructor() {}

  setIdDocument(id: string) {
    this.idDocumentSubject.next(id);
  }

  getIdDocument(): string {
    return this.idDocumentSubject.value;
  }
}
