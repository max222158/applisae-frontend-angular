import { Component, AfterViewInit, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-model-courrier-html',
  templateUrl: './model-courrier-html.component.html',
  styleUrl: './model-courrier-html.component.css'
})
export class ModelCourrierHtmlComponent implements AfterViewInit, OnChanges {
  @Input() htmlContent: string = '';

  constructor() { }

  ngAfterViewInit(): void {
    this.injectHtmlContent();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['htmlContent']) {
      this.injectHtmlContent();
    }
  }

  injectHtmlContent(): void {
    const iframe = document.getElementById('courrier-iframe') as HTMLIFrameElement;
    const doc = iframe.contentDocument || iframe.contentWindow!.document;
    doc.open();
    doc.write(this.htmlContent);
    doc.close();
  }
}
