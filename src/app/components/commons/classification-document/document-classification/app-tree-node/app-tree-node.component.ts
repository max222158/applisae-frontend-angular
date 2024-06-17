import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-app-tree-node',
  templateUrl: './app-tree-node.component.html',
  styleUrl: './app-tree-node.component.css'
})
export class AppTreeNodeComponent {
  @Input() node: any;
  @Output() toggle = new EventEmitter<any>();
  @Input() selectedNodeId: number | null = null;
  @Output() selectNode = new EventEmitter<any>();
  
  onToggle() {
    this.toggle.emit(this.node);
  }

  onSelect() {


    this.selectNode.emit(this.node);
  }

}
