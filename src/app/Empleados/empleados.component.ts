import { Component, OnInit } from '@angular/core';
import {EmpleadosServicesService} from '../Services/empleados-services.service'
import {EmpleadoModel} from '../Model/Modelo'
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.css']
})
export class EmpleadosComponent implements OnInit {
  empleados : EmpleadoModel[]=[];
  index:any;

  constructor( private empleadosService: EmpleadosServicesService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getEmpleados();
  }


  getEmpleados(): void {
    this.empleadosService.getEmpleados()
    
    .subscribe(Empleados => this.empleados = Empleados);
    console.log(this.empleados);
  }


  BorrarEmpleado(Empleados:EmpleadoModel,a:string){
     
    

    Swal.fire({
      title: '¿Está seguro?',
      text: `Está seguro que desea borrar a ${ Empleados.nombre }`,
      icon: 'question',
      showConfirmButton: true,
      showCancelButton: true
    }).then( resp => {

      if ( resp.value ) {
        this.index = this.empleados.findIndex(el=> el.id ==a);
    this.empleadosService.borrarEmpleado(parseInt(this.index));
      }

    });
  }

  
   
    

  enviarcedula(cedula:string){
    this.empleadosService.setdato(cedula);
  }

  fecha(Empleados:EmpleadoModel){
  
    const a = this.empleadosService.CalcularFecha(Empleados.cedula);
   //console.log(Empleados.cedula);
   const b = Date.parse(a);
  const fecha =new Date(b);
return fecha
  }
}
