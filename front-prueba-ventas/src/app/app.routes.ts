import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProductoComponent } from './components/producto/producto.component';
import { VendedorComponent } from './components/vendedor/vendedor.component';
import { VentaComponent } from './components/venta/venta.component';

export const routes: Routes = [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'productos', component: ProductoComponent },
    { path: 'vendedores', component: VendedorComponent },
    { path: 'ventas', component: VentaComponent },
    { path: '**', redirectTo: 'dashboard' }
];