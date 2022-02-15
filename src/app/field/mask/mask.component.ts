import {Component, Input, OnInit} from '@angular/core';
import {IUserInfoInterface, IUserInfoInterfaceResponse} from "../../interface/user-info.interface";

@Component({
  selector: 'app-mask',
  templateUrl: './mask.component.html',
  styleUrls: ['./mask.component.css']
})
export class MaskComponent implements OnInit {

  @Input() mask!: IUserInfoInterface;
  public firstLetter!: string;

  constructor() {}

  ngOnInit(): void {
    const initials = {
      name: this.mask.name,
      username: this.mask?.surname,
      get firstLetter() {
        return `${this.name[0]} ${this.username[0]}`
      }
    }
    this.firstLetter = initials.firstLetter
  }


}
