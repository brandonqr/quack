import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
declare let jQuery:any;
declare let $:any;
@Component({
  selector: 'app-quedada-form',
  templateUrl: './quedada-form.component.html',
  styles: []
})
export class QuedadaFormComponent implements OnInit {
  imagen : File;
  fecha : Date;



  evento:Object={
    nombre:"",
    descripcion:"",
    imagen:this.imagen,
    fecha:this.fecha,
    categoria:[{}]
  };
    forma:FormGroup;
  constructor() {
  //  console.log(this.evento)
    this.forma=new FormGroup({
      'nombre': new FormControl('', [Validators.required, Validators.minLength(5)]),
      'descripcion': new FormControl('', Validators.required),
      'imagen': new FormControl(this.imagen, Validators.required),
      'fecha': new FormControl(this.fecha, Validators.required),
      'categoria': new FormControl(this.fecha, Validators.required)
    })

  this.forma.reset({
    nombre:"",
    descripcion:""
  })
}
  ngOnInit() {
  }
  guardarCambios(){
    console.log(this.forma.value)
    console.log(this.forma)
    console.log(this.imagen)
    console.log(this.evento)
  }

  getFiles(event){
      this.imagen = event.target.files[0]
      //cambiar el texto del input text por el nombre de la imagen
      $("#spanFile").toggleClass('.custom-file-control').text(this.imagen.name);
    }
    getDate(event){
      console.log(event.target.value)
    }

}
