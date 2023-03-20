import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListPageComponent } from './list-page/list-page.component';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';
import { SearchAddressComponent } from './search-address/search-address.component';

const routes: Routes = [
  { path:'' , component : ListPageComponent},
  {path:'search-address', component : SearchAddressComponent},
  { path:'**',component:NotFoundPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
