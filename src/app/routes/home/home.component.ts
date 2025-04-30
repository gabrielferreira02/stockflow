import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html'
})
export class HomeComponent {
  response: any[] = [];
  constructor(private apiService: ApiService) {
    apiService.getCurrency().subscribe(res => {
      console.log(res);
      this.response = res.stocks?.slice(0, 8);
    })
  }
}
