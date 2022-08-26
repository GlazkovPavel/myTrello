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
import {HttpChatService} from "../../services/http-chat.service";
import {ChatService} from "../../services/chat.service";

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

  constructor(
    private checkColumnsService: CheckColumnsService,
    private chatService: ChatService,
    private httpService: HttpChatService,
    ) {}

  ngOnInit() {
    this.tools = toolbarEditor;
  }

  placeholder: any;
  control = new FormControl('',
    [
      Validators.required,
      this.checkColumnsService.checkColumns
    ]

  );

  public submit(): void {
    if (this.control.value) {
      console.log(this.control.value)
      this.httpService.postMessage(this.control.value, this.chatService.getCurrentChat()).subscribe(
        () => {
          this.httpService.getMessageByRoomId(this.chatService.getCurrentChat()).subscribe();
        },
        () => {}
      );
      this.control.reset();
    }
  }
}
