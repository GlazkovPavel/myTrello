import {Component, Input, OnInit} from '@angular/core';
import {IUserInterfaceBoardHeader} from "../interface/user.interface";

@Component({
  selector: 'app-mask',
  templateUrl: './mask.component.html',
  styleUrls: ['./mask.component.css']
})
export class MaskComponent implements OnInit {

  @Input() mask!: IUserInterfaceBoardHeader;
  public firstLetter!: string;

  constructor() {}

  ngOnInit(): void {
    const initials = {
      name: this.mask.name,
      username: this.mask.surname,
      get firstLetter() {
        return `${this.name[0]} ${this.username[0]}`
      }
    }
    this.firstLetter = initials.firstLetter
  }


}
