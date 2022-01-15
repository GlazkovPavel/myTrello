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
import {UserInfoResolver} from "./user-info/user-info.resolver";

const routes: Routes = [
  {path: 'sign-up', component: SignUpComponent,  canActivate: [AuthGuard]},
  {path: 'sign-in', component: SignInComponent,  canActivate: [AuthGuard]},
  {path: '', component: MainLayoutComponent},
  {path: '', redirectTo: '/', pathMatch: 'full'},
  {path: 'home', component: HomeComponent,resolve: {userInfo: UserInfoResolver}, canActivate: [AuthGuard]},
  {path: 'space', component: MainComponent, canActivate: [AuthGuard]},
  {path: 'calendar', component: CalendarComponent, canActivate: [AuthGuard]},
  {path: 'journal', component: JournalComponent, canActivate: [AuthGuard]},
  {path: '404', component: NotFoundComponent},

  {path: '**', redirectTo: '404'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
