import { Component, ElementRef, EventEmitter, Inject, Input, Output, QueryList, ViewChildren } from '@angular/core';
import mammoth from 'mammoth';
import { ApiService } from '../../../services/api.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { distinctUntilChanged } from 'rxjs';
import { CourrierService } from '../../../services/api/courrier/courrier/courrier.service';
import { CourrierModeleService } from '../../../services/api/courrier/modele-courrier/courriermodel.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { WorkflowService } from '../../../services/api/workflow/workflow.service';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../services/api/user/user.service';

interface ModeleValue {
  label: string;
  type: string;
}

@Component({
  selector: 'app-courrier',
  templateUrl: './courrier.component.html',
  styleUrl: './courrier.component.css'
})
export class CourrierComponent {
  
}
