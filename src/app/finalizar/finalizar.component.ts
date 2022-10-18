import { Component,ElementRef,Input, OnInit, Renderer2,ViewChild } from '@angular/core';
import { environment } from 'src/environments/environment';
import * as confetti from 'canvas-confetti';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-finalizar',
  templateUrl: './finalizar.component.html',
  styleUrls: ['./finalizar.component.css']
})
export class FinalizarComponent implements OnInit {

  //Actualizar estas variables

  susses_gif=environment.susses_gif[Math.floor(Math.random() * 10)]
  grupo?:string
  categoria?:string

  verificacion?:boolean=undefined;
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
    this.http.post<any>('https://hackaton-end.vercel.app/save',body).subscribe(ok =>{
      console.log(ok);
      
      if(ok=='Insertados 1 registro'){
        this.verificacion = true;
        this.surprise();
      }else{
        this.verificacion = false;  
      }
    },error=>{
      if(error.error.text=='Insertados 1 registro'){
        this.verificacion = true;
        this.surprise();
      }else{
        this.verificacion = false;  
      }
    });
    
  }
}
