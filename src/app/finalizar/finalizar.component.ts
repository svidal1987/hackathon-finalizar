import { Component,ElementRef,Input, OnInit, Renderer2,ViewChild } from '@angular/core';
import { environment } from 'src/environments/environment';
import * as confetti from 'canvas-confetti';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-finalizar',
  templateUrl: './finalizar.component.html',
  styleUrls: ['./finalizar.component.css']
})
export class InicialComponent implements OnInit {

  //Actualizar estas variables
  passwordVerdadero:string[]=environment.primero_password
  pdf1=environment.primero_pdf1
  pdf2=environment.primero_pdf2
  error_gif=environment.errors_gif[Math.floor(Math.random() * 10)]
  grupo?:string
  categoria?:string


  pregunta1?:string
  pregunta2?:string
  pregunta3?:string
  pregunta4?:string
  pregunta5?:string
  pregunta6?:string

  verificacion1?:boolean=undefined;
  verificacion2?:boolean=undefined;
  constructor(    
    private renderer2: Renderer2,
    private elementRef: ElementRef,
    private http: HttpClient
  ) { }

  public surprise(): void {
    const canvas = this.renderer2.createElement('canvas');
    this.renderer2.appendChild(this.elementRef.nativeElement, canvas);
    const myConfetti = confetti.create(canvas, { 
      resize: true, // will fit all screen sizes
    });
    myConfetti({
        particleCount: 200,
        spread: 300,
        origin: { x: 0.3,y:0.45 },
      })
    myConfetti({
        particleCount: 150,
        spread: 300,
        origin: { x: 0.75,y:0.70 },
      })
    myConfetti({
        particleCount: 350,
        spread: 300,
        origin: { x: 0.45,y:0.45 },
      })
    new Promise( resolve => setTimeout(()=>{this.renderer2.setStyle( canvas, 'visibility','hidden');}, 4000) )
  }


  ngOnInit(): void {
  }


  verificar1(){
    var body = {'grupo':this.grupo,'categoria':this.categoria,'fecha':new Date().toJSON()}
    this.http.post('https://hackaton-end.vercel.app/save',body).subscribe(ok =>{
      if(ok=='Insertados 1 registro'){
        this.verificacion1 = true;
        this.surprise();
      }else{
        this.verificacion1 = false;  
      }
    },error=>{
      this.verificacion1 = false;
    });
    
  }
  verificar2(){
    if(this.pregunta1=='F'
      && this.pregunta2=='F'
      && this.pregunta3=='V'
      && this.pregunta4=='F'
      && this.pregunta5=='V'
      && this.pregunta6=='V'
    ){
      this.verificacion2=true
      this.surprise();
    }else{
      this.verificacion2=false
      new Promise( resolve => setTimeout(()=>{window.location.reload();}, 10000) )
    }
  }




}
