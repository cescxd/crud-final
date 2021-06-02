//export interface Empleado {
  //  id:any;
     //nombre:string;
   // apellido:string;
     //correo:string;
     //cedula:string; 
    //inss:string;
  //}

  export class EmpleadoModel  {

    constructor(
     public   id:any,
     public  nombre:string,
     public  apellido:string,
     public  correo:string,
     public   cedula:string,
     public   inss:string
    ){
    }

}