import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, Validators } from '@angular/forms';
import {StoreUserService} from "../../services/store-user-service";
import {AngularEditorConfig} from "@kolkov/angular-editor";

@Component({
  selector: 'app-dialog-user',
  templateUrl: './dialog-user.component.html',
  styleUrls: ['./dialog-user.component.scss']
})
export class DialogUserComponent implements OnInit {
  public editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: 'auto',
    minHeight: '0',
    maxHeight: 'auto',
    width: 'auto',
    minWidth: '0',
    translate: 'yes',
    enableToolbar: true,
    showToolbar: true,
    placeholder: 'Enter text here...',
    defaultParagraphSeparator: '',
    defaultFontName: '',
    defaultFontSize: '',
    fonts: [
      {class: 'arial', name: 'Arial'},
      {class: 'times-new-roman', name: 'Times New Roman'},
      {class: 'calibri', name: 'Calibri'},
      {class: 'comic-sans-ms', name: 'Comic Sans MS'}
    ],
    customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
    uploadUrl: 'v1/image',
    //upload: (file: File) => { ... }
    uploadWithCredentials: false,
    sanitize: true,
    toolbarPosition: 'bottom',
    toolbarHiddenButtons: [
      ['bold', 'italic'],
      ['fontSize']
    ]
  };
  // usernameFormControl = new FormControl('', [Validators.required]);
  // previousUsername: string;
  //
  // constructor(public dialogRef: MatDialogRef<DialogUserComponent>,
  //             @Inject(MAT_DIALOG_DATA) public params: any,
  //             private storedUser: StoreUserService) {
  //   this.previousUsername = storedUser.getStoredUser() ? storedUser.getStoredUser() : (params.username ? params.username : undefined);
  //   this.usernameFormControl.setValue(storedUser.getStoredUser() ? storedUser.getStoredUser() : (params.username ? params.username : ""));
  // }
  //
  ngOnInit() {
  }
  //
  // public onSave(): void {
  //   this.dialogRef.close({
  //     username: this.usernameFormControl.value,
  //     dialogType: this.params.dialogType,
  //     previousUsername: this.previousUsername
  //   });
  // }
  htmlContent: any;
  placeholder: any;

}
