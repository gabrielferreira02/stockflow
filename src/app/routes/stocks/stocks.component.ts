import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-stocks',
  imports: [],
  templateUrl: './stocks.component.html'
})
export class StocksComponent {
  public response: Array<any> = [];
  public currentPage: number = 1;
  public lastPage: number = 1;
  public hasNextPage: boolean = true;
  public itemsPerPage: number = 35;

  constructor(private apiService: ApiService) {
    this.apiService.getStocks(this.itemsPerPage, this.currentPage).subscribe(res => {
      console.log(res);
      this.response = res.stocks;
      this.lastPage = res.totalPages
      this.hasNextPage = res.hasNextPage
    })
  }

  getNextPage() {
    if(!this.hasNextPage) return;

    this.currentPage++;
    this.apiService.getStocks(this.itemsPerPage, this.currentPage).subscribe(res => {
      this.response = res.stocks;
      this.lastPage = res.totalPages
      this.hasNextPage = res.hasNextPage
    })
  }

  getPreviousPage() {
    if(this.currentPage <= 1) return;

    this.currentPage--;
    this.apiService.getStocks(this.itemsPerPage, this.currentPage).subscribe(res => {
      this.response = res.stocks;
      this.lastPage = res.totalPages
      this.hasNextPage = res.hasNextPage
    })
  }
}
