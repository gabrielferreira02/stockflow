import { Routes } from '@angular/router';
import { HomeComponent } from './routes/home/home.component';
import { StockComponent } from './routes/stock/stock.component';

export const routes: Routes = [
    {path: "", component: HomeComponent},
    {path: "stocks/:id", component: StockComponent}
];
