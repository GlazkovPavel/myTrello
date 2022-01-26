import {
  Component,
  ComponentFactory,
  ComponentFactoryResolver, ComponentRef, HostListener,
  OnInit,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {ModalService} from "./modal.service";
import {IModalDataInterface} from "../interface/modalData.interface";
import {takeUntil} from "rxjs/operators";
import { UnSubscriber } from "../shared/utils/unsubscriber";

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent extends UnSubscriber implements OnInit {

  @ViewChild('modalContent', {read: ViewContainerRef})
  public modal: ViewContainerRef;
  private componentFactory: ComponentFactory<any>;
  private componentRef: ComponentRef<any>;
  public isOpen: boolean = false;

  constructor(
    private readonly modalService: ModalService,
    private readonly cfr: ComponentFactoryResolver,
    ) {
    super();
  }

  ngOnInit(): void {
    this.modalService.modalSequence$
      .pipe(
        takeUntil(this.unSubscribe)
      )
      .subscribe((data: IModalDataInterface | null) => {
        if(!data) {
          this.close();
          return;
        }
        this.isOpen = true;
        this.componentFactory = this.cfr.resolveComponentFactory(data.component);
        this.componentRef = this.modal.createComponent(this.componentFactory);

        Object.keys(data.context)
          .forEach((propName: string) => {
            this.componentRef.instance[propName] = data.context[propName];
          })

      })
  }

  @HostListener('window:keyup', ['$event.keyCode'])
  public close(code: number = 27): void {
    if(code !== 27) {
      return;
    }
    if(this.componentRef){
      this.componentRef.destroy();
    }
    this.isOpen = false;
  }

}
