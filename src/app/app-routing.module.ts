import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {EmpleadosComponent} from './Empleados/empleados.component'
import {EmpleadoComponent} from './Empleado/empleado.component'

const routes: Routes = [
{path:'empleados', component: EmpleadosComponent},
{path:'empleado/:id', component: EmpleadoComponent},
{path: '**' , pathMatch: 'full' , redirectTo: 'empleados'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
