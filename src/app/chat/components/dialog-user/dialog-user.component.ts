import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  ViewContainerRef,
  ViewRef
} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {
  defaultEditorExtensions,
  tiptapEditorStyles,
  TUI_EDITOR_CONTENT_PROCESSOR,
  TUI_EDITOR_EXTENSIONS,
  TUI_EDITOR_STYLES, TuiEditorNewComponent,
  TuiEditorTool,
  tuiLegacyEditorConverter,
} from '@taiga-ui/addon-editor';
import {toolbarEditor} from "../../utils/toolbar-editor";
import {TuiToolbarNewComponent} from "@taiga-ui/addon-editor/components/toolbar-new/toolbar-new.component";
import {CheckColumnsService} from "../../services/check-columns.service";

//import {TuiEditorTool} from "@taiga-ui/addon-editor/enums/editor-tool";

@Component({
  selector: 'app-dialog-user',
  templateUrl: './dialog-user.component.html',
  styleUrls: ['./dialog-user.component.scss'],
  providers: [
    {
      provide: TUI_EDITOR_EXTENSIONS,
      useValue: defaultEditorExtensions,
    },
    {
      provide: TUI_EDITOR_STYLES,
      useValue: tiptapEditorStyles,
    },
    {
      provide: TUI_EDITOR_CONTENT_PROCESSOR,
      useValue: tuiLegacyEditorConverter,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogUserComponent implements OnInit {
  @ViewChild('editorNewComponent') editorNewComponent: TuiEditorNewComponent;
  public form: FormGroup;
  public tools: TuiEditorTool[];

  constructor(private checkColumnsService: CheckColumnsService) {
  }
  ngOnInit() {
    this.tools = toolbarEditor;
    setTimeout(() => {
      this.editorNewComponent.editorService.focus()
    }, 100)
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
  control = new FormControl('',
    [
      Validators.required,
      this.checkColumnsService.checkColumns
    ]

  );


  public submit(): void {
    console.log('submit')
  }
}
