import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {EmpleadosComponent} from './Empleados/empleados.component'
import {EmpleadoComponent} from './Empleado/empleado.component'

const routes: Routes = [
{path:'', component: EmpleadosComponent},
{path:':id', component: EmpleadoComponent},
{path:':id/editar', component: EmpleadoComponent},
{path:'nuevo', component: EmpleadoComponent},
{path: '**' , pathMatch: 'full' , redirectTo: ''}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
