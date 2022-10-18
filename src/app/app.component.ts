import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  dash?:any

  constructor(private route: ActivatedRoute){
    this.dash = this.route.snapshot.queryParamMap.get('dash');
    
    
    this.route.queryParams
      .subscribe(params => {
        if(params["dash"]){
            this.dash='true'
        }
      }
    );
  }
}
