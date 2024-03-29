import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, NgForm, FormControl } from '@angular/forms';
import {EmpleadosServicesService} from '../Services/empleados-services.service'
import {EmpleadoModel} from '../Model/Modelo'
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-empleado',
  templateUrl: './empleado.component.html',
  styleUrls: ['./empleado.component.css']
})
export class EmpleadoComponent implements OnInit {
  forma: FormGroup;
  empleado:EmpleadoModel;
  var :Boolean;
  empleados2 : EmpleadoModel[]=[];
  indice : number;
  a :string;
  index:any;



  
  constructor(private fb: FormBuilder, private empleadosService: EmpleadosServicesService, private route: ActivatedRoute,
    private location:Location


  ) { }

  ngOnInit(): void {
    this.crearFormulario();
    this.cargarData();
    this.getEmpleados();
 
  }

  get nombreNoValido() {
    return this.forma.get('nombre').invalid && this.forma.get('nombre').touched
    
  }

  get apellidoNoValido() {
    return this.forma.get('apellido').invalid && this.forma.get('apellido').touched
  }

  get correoNoValido() {
    return this.forma.get('correo').invalid && this.forma.get('correo').touched && this.empleadosService.existeCorreo(this.forma.controls['correo'].value)
  }

  get cedulaNoValido() {
    return this.forma.get('cedula').invalid && this.forma.get('cedula').touched && this.empleadosService.existeCedula(this.forma.controls['cedula'].value)
  }

  //get cedulaExiste() {

    //return  this.forma.get('cedula').statusChanges
  //}

  get inssNoValido() {
    return this.forma.get('inss').invalid && this.forma.get('inss').touched && this.empleadosService.existeinss(this.forma.controls['inss'].value)
  }
  
 

  crearFormulario() {

    this.forma = this.fb.group({
      id  : ['',   ],
      nombre  : ['', [ Validators.required, Validators.minLength(5) ]  ],
      apellido  : ['', [ Validators.required, Validators.minLength(5) ]  ],
      correo  : ['', [ Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')],this.empleadosService.existeCorreo ],
      cedula : ['', , this.empleadosService.existeCedula ],
      inss   : ['', Validators.required, this.empleadosService.existeinss ],
    })

  }  

    cargarData(){
      const id = this.route.snapshot.paramMap.get('id');
      
      if ( id !== 'nuevo' ) {
        this.empleadosService.getEmpleado( id )
         .subscribe( (resp: EmpleadoModel) => {
           this.empleado = resp;
           this.empleado.id =id;
           this.forma.reset(this.empleado)
           this.var = false;
         });
        
       }else{
       this.var=true;
       
   

       }
   
    }

    ActualizarData(){
      
const id = this.empleados2.findIndex(el=> el.id ==this.route.snapshot.paramMap.get('id'));
console.log(this.forma.value)
this.empleadosService.updateEmpleado(id,this.forma.value)
      this.location.back();
    }

    GuardarData(){
      if ( this.forma.invalid ) {

        return Object.values( this.forma.controls ).forEach( control => {
          
          if ( control instanceof FormGroup ) {
            Object.values( control.controls ).forEach( control => control.markAsTouched() );
         
          } else {
            control.markAsTouched();
            
          }
           });
          
      
      } else {
        this.indice = this.empleadosService.getContador();
        this.forma.controls['id'].setValue(this.indice.toString());
        this.empleadosService.crearEmpleado(this.forma.value);
        this.location.back();

      }

     
     

    }

    getEmpleados(): void {
      this.empleadosService.getEmpleados()
      .subscribe(Empleados => this.empleados2 = Empleados);
      console.log(this.empleados2.length);
      this.indice = this.empleados2.length;
    }
    
    validar(){
      console.log(this.forma.controls['cedula'].value);
      const c=   this.empleadosService.validarCedula(this.forma.controls['cedula'].value);
      console.log(c);
   //   console.log(this.empleadosService.varcedula)
 }
    

}