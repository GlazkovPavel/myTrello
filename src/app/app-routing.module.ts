import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MainComponent} from "./main/main.component";
import {NotFoundComponent} from "./not-found/not-found.component";
import {CalendarComponent} from "./calendar/calendar.component";
import {HomeComponent} from "./home/home.component";
import {JournalComponent} from "./journal/journal.component";
import {AuthGuard} from "./shared/guard/auth.guard";

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'space', component: MainComponent, canActivate: [AuthGuard]},
  {path: 'calendar', component: CalendarComponent},
  {path: 'journal', component: JournalComponent},
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
