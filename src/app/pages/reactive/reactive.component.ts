import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.css']
})
export class ReactiveComponent implements OnInit {

  public forma: FormGroup;

  // FormBuilder es un servicio que nos ayuda a crear formularios reactivos mas facilmente 
  constructor( private formBuilder: FormBuilder ) {

    this.createForm();

  }

  ngOnInit() {
  }

  public createForm() {

    // La primera posicion es el valor por defecto, la segunda es para las validaciones sincronas y la tercera paras las validaciones asincronas 
    this.forma = this.formBuilder.group({

      name: [ '', [ Validators.required, Validators.minLength(5) ] ],
      lastName: [ '', [ Validators.required, Validators.minLength(5) ] ],
      email: [ '', [ Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$') ] ],
      address : this.formBuilder.group({

        district: [ '', Validators.required ],
        city: [ '', Validators.required ]


      })

    });


  }

  public save() {

    console.log( this.forma ); 

     // Esto es para que al dar clic al botón de Enviar y mientras algun campo no sea valido aparezcan los mensajes de error poniendo los controls de la forma como Touched ( es decir, como si hubiesen sido tocados por el usuario )
     if( this.forma.invalid ) {

      return Object.values( this.forma.controls ).forEach( control =>{

        //console.log( control );

        control.markAllAsTouched();

      } );


    }

  }

  public get notValidName() {

    return this.forma.get('name').invalid && this.forma.get('name').touched;

  }

  public get notValidLastName() {

    return this.forma.get('lastName').invalid && this.forma.get('lastName').touched;

  }

  public get notValidEmail() {

    return this.forma.get('email').invalid && this.forma.get('email').touched;

  }



}
