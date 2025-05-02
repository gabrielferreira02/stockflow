import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { ActivatedRoute } from '@angular/router';
import { BaseChartDirective } from "ng2-charts"
import { ChartConfiguration, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-stock',
  imports: [BaseChartDirective],
  templateUrl: './stock.component.html'
})
export class StockComponent implements OnInit {
  public stockId: string | null = null;
  public response: any;
  public chartData: Array<any> = [];
  public chartLabels: Array<any> = [];
  public barChartData: ChartConfiguration<'bar'>['data'] | null = null;
  public barChartOptions: ChartOptions<'bar'> | null = null;
  public barChartLegend = true;
  public barChartPlugins = [];

  constructor(private apiService: ApiService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.stockId = this.route.snapshot.paramMap.get("id");

    if(this.stockId) {
      this.apiService.getStock(this.stockId.toLowerCase()).subscribe(res => {
        console.log(res.results[0]);
        this.response = res.results[0];
        if(this.response != null) {
          this.chartData = this.response.historicalDataPrice.map((item: { close: any; }) => item.close);
          this.chartLabels = this.response.historicalDataPrice.map((item: { date: any}) => new Date(item.date * 1000).toLocaleDateString());
          this.barChartData = {
            labels: this.chartLabels,
            datasets: [
              { 
                data: this.chartData, 
                label: 'Valor da cotação',
                backgroundColor: 'rgb(124, 58, 237)',
                borderColor: 'rgb(124, 58, 237)',
                borderWidth: 1,
                borderRadius: 6
              }
            ]
          };
          this.barChartOptions = {
            responsive: true,
            scales: {
              x: {
                display: false,
                grid: {
                  display: false
                }
              },
              y: {
                beginAtZero: false, 
                min: Math.min(...this.chartData) * 0.95,
                max: Math.max(...this.chartData) * 1.05,
                ticks: {
                  callback: (value) => {
                    const num = Number(value);
                    return num.toFixed(2) + (this.response?.currency ? ' ' + this.response.currency : '');
                  }
                },
                grid: {
                  color: 'rgba(0, 0, 0, 0.05)'
                }
              }
            },
            plugins: {
              legend: {
                position: 'top',
              },
              tooltip: {
                enabled: true
              }
            }
          };
        }

      })
    }
  }

}
