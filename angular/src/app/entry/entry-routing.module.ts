import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EntryComponent } from './entry/entry.component';
import { AllEntryComponent } from './all-entry/all-entry.component';


const routes: Routes = [
  { path: '', component: AllEntryComponent},
  { path: 'add_entry', component: EntryComponent },
  { path: ':id', component: EntryComponent },
  { path: 'error', redirectTo: '/home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EntryRoutingModule { }
