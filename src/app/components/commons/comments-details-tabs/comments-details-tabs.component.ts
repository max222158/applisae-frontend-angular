import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

import {
	ClassicEditor,
	AccessibilityHelp,
	Autoformat,
	Autosave,
	Bold,
	Essentials,
	FindAndReplace,
	FontBackgroundColor,
	FontColor,
	FontFamily,
	FontSize,
	FullPage,
	GeneralHtmlSupport,
	Heading,
	HtmlComment,
	HtmlEmbed,
	Italic,
	Mention,
	Paragraph,
	SelectAll,
	ShowBlocks,
	SourceEditing,
	SpecialCharacters,
	SpecialCharactersArrows,
	SpecialCharactersCurrency,
	SpecialCharactersEssentials,
	SpecialCharactersLatin,
	SpecialCharactersMathematical,
	SpecialCharactersText,
	Table,
	TableCaption,
	TableCellProperties,
	TableColumnResize,
	TableProperties,
	TableToolbar,
	TextPartLanguage,
	TextTransformation,
	Undo,
	type EditorConfig
} from 'ckeditor5';



import 'ckeditor5/ckeditor5.css';
import { Store } from '@ngrx/store';
import { AppState } from '../../../state/app.state';
import { getCommentsResponse, saveCommentsResponse, saveCommentsSuccess } from '../../../state/selectors/comments/comments.selectors';
import { Observable, Subscription } from 'rxjs';
import { getCommentsAction, saveCommentsAction } from '../../../state/actions/comments/comments.actions';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { clearInput } from '../../../helpers/helper';

@Component({
  selector: 'app-comments-details-tabs',
  templateUrl: './comments-details-tabs.component.html',
  styleUrl: './comments-details-tabs.component.css'
})
export class CommentsDetailsTabsComponent {
	constructor(private changeDetector: ChangeDetectorRef ,private fb: FormBuilder,private sanitizer: DomSanitizer, private store: Store<AppState>) {

		this.comments$ = this.store.select(getCommentsResponse);
		this.isSaveCommentsSuccess$ = this.store.select(saveCommentsSuccess);
		this.saveComment$ = this.store.select(saveCommentsResponse);
	}
	private subscriptions: Subscription = new Subscription();
	public isLayoutReady = false;
	public Editor = ClassicEditor;
	public config: EditorConfig = {}; // CKEditor needs the DOM tree before calculating the configuration.
	commentForm: FormGroup;
	totalItems:number = 20
	perPage:number = 10
	comments:any[]
	disabled:boolean = true
	comments$: Observable<any[]>;
	saveComment$: Observable<any>;
	isSaveCommentsSuccess$: Observable<boolean>;
	page:number =  1
	_document_id:number 
	sanitizedComment: { [key: string]: SafeHtml } = {};
	@Input()
	set document_id(value: number) {
	  this._document_id = value;
	  this.onDocumentIdChange(value);
	}
	
	onDocumentIdChange(value:number){
		
		this.getComments(value)
	}
	ngOnInit(){

		this.subscriptions.add(
			this.comments$.subscribe((comments:any)=>{
				this.comments = comments.results
				console.log(comments.results)
				this.totalItems = comments.count

				this.sanitizeComments()
			})
		)

		this.subscriptions.add(
			this.isSaveCommentsSuccess$.subscribe((success)=>{
				
				console.log(success)

				if(success){

					clearInput(this.commentForm, ['commentText']);

				}
	

			})
		)


		this.subscriptions.add(
			this.saveComment$.subscribe((success)=>{
				
				console.log("-- saveComment$ --",success)

				if(success.status == 200){

					let commentsCopy = [...this.comments];
					commentsCopy.unshift(success.comment);
					this.comments = commentsCopy;
					this.sanitizeComments()


				}
	

			})
		)


	    this.init()


	}

	init(){
		
		this.commentForm = this.fb.group({
			commentText: [''],
		
	  
			// Add other form controls as needed
		  });

		  this.commentForm.valueChanges.subscribe(() => {
			const nameValue = this.commentForm.get('commentText')?.value.trim();
			if(nameValue == '' || nameValue == "<p>&nbsp;</p>" || nameValue == "<p></p>"){
				this.disabled = true; // Disable if any of them is empty

			}else{

				this.disabled = false;

			}
		  });
	}
  
  
  
	getComments(value:number){

		let formData = new FormData()
		formData.append('page',this.page.toString())
		formData.append('document_id', value.toString())
		this.store.dispatch(getCommentsAction({'formData':formData}));	



	}


	saveComment(){

		let comment = this.commentForm.value.commentText

		if(comment == '' || comment == "<p>&nbsp;</p>"){

			alert("Ajouter un texte dans le champ commentaire");
			return
		}


 		let formData = new FormData()
		formData.append('comment',comment)
		formData.append('document_id', this._document_id.toString())
		this.store.dispatch(saveCommentsAction({'formData':formData}));	 


	}

	pageChanged(event:any){
		this.sanitizeComments()

	}
  
  
  
    sanitizeComments() {
		this.sanitizedComment = {};
		this.comments.forEach(details => {
		  this.sanitizedComment[details.id] = this.sanitizer.bypassSecurityTrustHtml(details.comment);
		});
	  }
  
  
  
  
  
  
  
  
  
  
  
  
  public ngAfterViewInit(): void {
		this.config = {
			toolbar: {
				items: [
					'undo',
					'redo',
          '|',
					'heading',
          '|',


					'fontSize',
					'fontFamily',
					'fontColor',
					'fontBackgroundColor',
          '|',
					'bold',
					'italic',
					'|',
					'findAndReplace',
					'selectAll',
					'textPartLanguage',



					'|',
					'specialCharacters',
					'insertTable',
					'htmlEmbed',
					'|',
					'accessibilityHelp'
				],
				shouldNotGroupWhenFull: false
			},
			plugins: [
				AccessibilityHelp,
				Autoformat,
				Autosave,
				Bold,
				Essentials,
				FindAndReplace,
				FontBackgroundColor,
				FontColor,
				FontFamily,
				FontSize,
				FullPage,
				GeneralHtmlSupport,
				Heading,
				HtmlComment,
				HtmlEmbed,
				Italic,
				Mention,
				Paragraph,
				SelectAll,
				SourceEditing,
				SpecialCharacters,
				SpecialCharactersArrows,
				SpecialCharactersCurrency,
				SpecialCharactersEssentials,
				SpecialCharactersLatin,
				SpecialCharactersMathematical,
				SpecialCharactersText,
				Table,
				TableCaption,
				TableCellProperties,
				TableColumnResize,
				TableProperties,
				TableToolbar,
				TextPartLanguage,
				TextTransformation,
				Undo
			],
			fontFamily: {
				supportAllValues: true
			},
			fontSize: {
				options: [10, 12, 14, 'default', 18, 20, 22],
				supportAllValues: true
			},
			heading: {
				options: [
					{
						model: 'paragraph',
						title: 'Paragraph',
						class: 'ck-heading_paragraph'
					},
					{
						model: 'heading1',
						view: 'h1',
						title: 'Heading 1',
						class: 'ck-heading_heading1'
					},
					{
						model: 'heading2',
						view: 'h2',
						title: 'Heading 2',
						class: 'ck-heading_heading2'
					},
					{
						model: 'heading3',
						view: 'h3',
						title: 'Heading 3',
						class: 'ck-heading_heading3'
					},
					{
						model: 'heading4',
						view: 'h4',
						title: 'Heading 4',
						class: 'ck-heading_heading4'
					},
					{
						model: 'heading5',
						view: 'h5',
						title: 'Heading 5',
						class: 'ck-heading_heading5'
					},
					{
						model: 'heading6',
						view: 'h6',
						title: 'Heading 6',
						class: 'ck-heading_heading6'
					}
				]
			},
			htmlSupport: {
				allow: [
					{
						name: /^.*$/,
						styles: true,
						attributes: true,
						classes: true
					}
				]
			},
			initialData:

      '',
			language: 'fr',
			mention: {
				feeds: [
					{
						marker: '@',
						feed: [
							/* See: https://ckeditor.com/docs/ckeditor5/latest/features/mentions.html */
						]
					}
				]
			},
			placeholder: 'Ajouter un commentaire ici',
			table: {
				contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells', 'tableProperties', 'tableCellProperties']
			}
		};

		this.isLayoutReady = true;
		this.changeDetector.detectChanges();
	}
}
