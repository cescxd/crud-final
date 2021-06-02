import { Injectable } from '@angular/core';
import {EmpleadoModel} from '../Model/Modelo'
import {EMPLEADOS} from '../Model/Mock'
import { Observable, of } from 'rxjs';

import { FormControl, FormGroup } from '@angular/forms';

interface ErrorValidate {
  [s:string]: boolean
}


@Injectable({
  providedIn: 'root'
})
export class EmpleadosServicesService {
contador : number;
var :Boolean;


dato : string;
  constructor() {
    
    this.contador = EMPLEADOS.length;

   }


  getEmpleados(): Observable<EmpleadoModel[]> {
    
    const empleados = of(EMPLEADOS);
     
     return empleados;
   }

   getEmpleado(id: any): Observable<EmpleadoModel> {
    

    return of(EMPLEADOS.find(empleados => empleados.id === id));
    
  }

  setdato(Cedula:string){
this.dato=Cedula;
  }

  getDato(){
    return this.dato;
  }


   borrarEmpleado(c:number){

  EMPLEADOS.splice(c,1);

}

updateEmpleado(id,empleado){

//EMPLEADOS[id-1]=empleado;
EMPLEADOS.splice(id,1,empleado);
    
return EMPLEADOS;
}

crearEmpleado(Empleados){
  return of(EMPLEADOS.push(Empleados));

}

getContador(){
  this.contador = this.contador+1;
  return this.contador;
}

CalcularFecha(a:string){
//const a='001-030194-0058h';
const dia = a.slice(4,6);
const mes = a.slice(6,8);
const ano = a.slice(8,10);
const b = ano+'-'+mes+'-'+dia;
  return b
}

validarCedula(a:string) {



if(EMPLEADOS.find( empleado => empleado.cedula === a)){
const variable = false;


}else {

 const variable = true;
}

//return variable
}

existeCedula( control: FormControl ): Promise<ErrorValidate> | Observable<ErrorValidate> {

  if( !control.value ) {
    return Promise.resolve(null);
  }

  return new Promise( (resolve, reject) => {

    setTimeout(() => {
      
      if (  EMPLEADOS.find( empleado => empleado.cedula === control.value )) {
        resolve({ existe: true });
        console.log('cedula existe')
      } else {
        resolve( null );
        console.log('cedula no existe')
      }

    }, 1000);


  });

}

}
