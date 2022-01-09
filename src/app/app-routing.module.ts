import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MainComponent} from "./main/main.component";
import {NotFoundComponent} from "./not-found/not-found.component";
import {CalendarComponent} from "./calendar/calendar.component";
import {HomeComponent} from "./home/home.component";
import {JournalComponent} from "./journal/journal.component";
import {AuthGuard} from "./shared/guard/auth.guard";
import {MainLayoutComponent} from "./shared/component/main-layout/main-layout.component";
import {SignUpComponent} from "./authorization/sign-up/sign-up.component";
import {SignInComponent} from "./authorization/sign-in/sign-in.component";

const routes: Routes = [
  {path: 'sign-up', component: SignUpComponent},
  {path: 'sign-in', component: SignInComponent},
  {path: '', component: MainLayoutComponent, children: [
      {path: '', redirectTo: '/', pathMatch: 'full'},
      {path: '', component: HomeComponent, canActivate: [AuthGuard]},
      {path: 'space', component: MainComponent, canActivate: [AuthGuard]},
      {path: 'calendar', component: CalendarComponent, canActivate: [AuthGuard]},
      {path: 'journal', component: JournalComponent, canActivate: [AuthGuard]},
    ]},

  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
