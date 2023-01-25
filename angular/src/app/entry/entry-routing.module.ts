import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EntryComponent } from './entry/entry.component';
import { AllEntryComponent } from './all-entry/all-entry.component';


const routes: Routes = [
  { path: 'add_entry', component: EntryComponent },
  { path: 'all_entry', component: AllEntryComponent },
  { path: ':id', component: EntryComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EntryRoutingModule { }
