import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrl: './document.component.css'
})
export class DocumentComponent implements  OnInit{
  folders:any[] = [
    { "name": "Dossier 1", "icon": "folder" },
    { "name": "Dossier 2", "icon": "folder" },
    { "name": "Dossier 3", "icon": "folder" },
    { "name": "Dossier 4", "icon": "folder" },
    { "name": "Fichier 1", "icon": "file" },
    { "name": "Fichier 2", "icon": "file" }
  ]
  constructor() {}

  ngOnInit() {}

}