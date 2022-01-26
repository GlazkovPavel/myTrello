import {Component, Injectable, OnInit} from '@angular/core';
import {IListInterface} from "../interface/list.interface";
import {ISpaceInterface} from "../interface/space.interface";
import {WorkSpaceService} from "../shared/services/work-space.service";
import {tap} from "rxjs/operators";

@Component({
  selector: 'app-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.scss']
})
@Injectable({
  providedIn: 'root'
})
export class FieldComponent implements OnInit {

  public spaces: ISpaceInterface[] = [];
  public currentSpace: ISpaceInterface;
  private idSpace: string;

  constructor(private readonly workSpaceService: WorkSpaceService) {

    const v = "Консультативно-диагностическое отделение\"],\"наименование_филиала\":[\"ГБУЗ ДГП № 12 ДЗМ филиал № 1 (ДГП № 107)\"],\"наименование_юридического_лица\":[\"ГБУЗ г. Москвы \\\"Детская городская поликлиника № 12 ДЗМ\\\"\"]}],\"структура_медицинской_организации\":[{\"ид_объекта\":[{\"|id\":\"10000249\",\"|type\":\"type\",\"|issuer\":\"issuer\",\"|assigner\":\"assigner\"}],\"наименование\":[\"ГБУЗ г. Москвы \\\"Детская городская поликлиника № 12 ДЗМ\\\"\"],\"тип_объекта\":[{\"|code\":\"at0019\"}]},{\"ид_объекта\":[{\"|id\":\"10000308\",\"|type\":\"type\",\"|issuer\":\"issuer\",\"|assigner\":\"assigner\"}],\"наименование\":[\"ДГП 12 Ф 1 (ДГП 107)\"],\"тип_объекта\":[{\"|code\":\"at0020\"}],\"родительский_ид\":[{\"|id\":\"10000249\",\"|type\":\"type\",\"|issuer\":\"issuer\",\"|assigner\":\"assigner\"}]}]}],\"_health_care_facility\":[{\"|id\":\"1027700424058\",\"|id_namespace\":\"Сервис РМР/РМУ\",\"|name\":\"ГБУЗ ДГП № 12 ДЗМ филиал № 1 (ДГП № 107)\",\"|id_scheme\":\"undefined\"}],\"_participation\":[{\"|id\":\"17382059126\",\"|name\":\"Винниченко Лениза Миргасимовна\",\"|function\":\"Врач-рентгенолог\"}]}],\"category\":[{\"|code\":\"433\",\"|value\":\"event\",\"|terminology\":\"openehr\"}],\"composer\":[{\"|name\":\"Винниченко Лениза Миргасимовна\",\"|id\":\"13722556757\",\"|id_namespace\":\"Парус\",\"|id_scheme\":\"undefined\"}],\"описание_снимков_и_заключение\":[{\"лучевая_диагностика\":[{\"костная_ткань\":[{\"травматические_изменения\":[{\"изменения\":[{\"|code\":\"at0008\",\"|value\":\"не выявлены\"}]}],\"деструктивные_изменения\":[{\"изменения\":[{\"|code\":\"at0008\",\"|value\":\"не выявлены\"}]}]}],\"лобные_пазухи\":[{\"лобные_пазухи\":[\"развиты нормально\"],\"воздушность\":[{\"|code\":\"at0011\",\"|value\":\"сохранена\"}]}],\"правая_верхнечелюстная_пазуха\":[{\"правая_верхнечелюстная_пазуха\":[\"развита нормально\"],\"воздушность\":[{\"|code\":\"at0012\",\"|value\":\"нарушена\"}],\"описание_воздушности\":[\"Пневматизация верхнечелюстной пазухи снижена за счет неравномерного пристеночного утолщения слизистой. Горизонтальный уровень жидкости не визуализируется.\\n\\n\"]}],\"левая_верхнечелюстная_пазуха\":[{\"левая_верхнечелюстная_пазуха\":[\"развита нормально\"],\"воздушность\":[{\"|code\":\"at0012\",\"|value\":\"нарушена\"}],\"описание_воздушности\":[\"Пневматизация верхнечелюстной пазухи снижена за счет неравномерного пристеночного утолщения слизистой. Горизонтальный уровень жидкости не визуализируется.\\n\\u0000\"]}],\"носовая_перегородка\":[{\"носовая_перегородка\":[{\"перегородка\":[\"не искривлена\"]}]}],\"слизистая_носовых_ходов\":[{\"толщина\":[{\"толщина\":[{\"утолщена\":[{\"|code\":\"at0079\",\"|value\":\"нет\"}]}]}]}],\"ячейка_лаборанта_радиологического_исследования\":[{\"особенности_исследования\":[{\"проекции\":[\"прямая\"]}]}],\"контрастирование\":[null],\"информация_об_оборудовании\":[null],\"доза_облучения\":[{\"доза\":[{\"|magnitude\":0.006,\"|unit\":\"mSv\"}]}],\"название\":[\"Рентгенография околоносовых пазух\"],\"метод\":[\"Лучевые методы исследования\"],\"подраздел_метода\":[\"Рентгенографические методы исследования\"],\"подробности_запроса_на_исследование\":[{\"полученное_изображение\":[{\"номер_исследования\":[{\"|id\":\"2867\"}]}]}]}]}],\"заключение\":[{\"заключение_инструментального_исследования\":[{\"заключение\":[\"Рентгенологические признаки двустороннего верхнечелюстного синусита\\u0000\"]}]}],\"сведения_о_выполнении\":[{\"инструментальное_исследование\":[{\"_instruction_details\":[{\"|composition_uid\":\"2e9d805c-1b2f-4b34-a7e6-a4ce8c61b1f9::default::1\",\"|instruction_uid\":\"6de15cfd-63c0-4774-8819-ad4fa3827218\",\"|activity_id\":\"activities[at0001]\",\"|path\":\"/content[openEHR-EHR-SECTION.adhoc.v1"
    const regex = /\\u0000/g;

    console.log(v.replace(regex, ''))
  }

  ngOnInit(): void {

    this.workSpaceService.getWorkSave().pipe(
      tap((value: ISpaceInterface[]) => {
        this.spaces = value;
        this.currentSpace = this.spaces[0];
      } )).subscribe();
  }

  onAddList($event: IListInterface) {
     this.currentSpace.list.push($event)
    this.spacesAdd();
  }

  handleDeleteList($eventId: string | undefined) {
    this.currentSpace.list = this.currentSpace.list.filter(item => item._id !== $eventId);
    this.spacesAdd();
  }

  handleSpaceItem($event: ISpaceInterface) {
    this.spaces.push($event)
    this.spacesAdd();
  }

  spaceShow(id: string) {
    this.idSpace = '';
    this.currentSpace = this.spaces.find(item => item._id === id);
    this.idSpace = id;
    this.spacesAdd();
  }

  spacesAdd() {
    const space: ISpaceInterface = {
      _id: this.currentSpace?._id,
      title: this.currentSpace?.title,
      list: this.currentSpace?.list
    }

    this.workSpaceService.saveWorkSpace(space);
  }

  handleDeleteSpaceId(id: string) {
    this.workSpaceService.deleteWorkSpace(id).subscribe(
      () => {
        this.spaces = this.spaces.filter(item => item._id !== id);
      }
    )
  }
}
