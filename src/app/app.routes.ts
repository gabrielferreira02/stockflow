import { Routes } from '@angular/router';
import { HomeComponent } from './routes/home/home.component';
import { StockComponent } from './routes/stock/stock.component';
import { StocksComponent } from './routes/stocks/stocks.component';

export const routes: Routes = [
    {path: "", component: HomeComponent},
    {path: "stocks", component: StocksComponent},
    {path: "stocks/:id", component: StockComponent}
];
