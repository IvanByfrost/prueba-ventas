import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';

@Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div style="padding: 20px;">
      <h2>Panel de Control (Dashboard)</h2>

      <!-- Tarjetas de Métricas -->
      <div style="display: flex; gap: 20px; margin-bottom: 30px;">
        <div style="background: #f4f4f4; padding: 20px; border-radius: 8px; flex: 1; text-align: center;">
          <h3>Total Ventas</h3>
          <p style="font-size: 24px; font-weight: bold;">{{ ventas.length }}</p>
        </div>
        <div style="background: #f4f4f4; padding: 20px; border-radius: 8px; flex: 1; text-align: center;">
          <h3>Ingresos Totales</h3>
          <p style="font-size: 24px; font-weight: bold;">$ {{ totalIngresos }}</p>
        </div>
        <div style="background: #f4f4f4; padding: 20px; border-radius: 8px; flex: 1; text-align: center;">
          <h3>Productos Activos</h3>
          <p style="font-size: 24px; font-weight: bold;">{{ productos.length }}</p>
        </div>
        <div style="background: #f4f4f4; padding: 20px; border-radius: 8px; flex: 1; text-align: center;">
          <h3>Vendedores</h3>
          <p style="font-size: 24px; font-weight: bold;">{{ vendedores.length }}</p>
        </div>
      </div>

      <!-- Últimas Ventas Registradas -->
      <h3>Últimas Ventas Realizadas</h3>
      <table border="1" cellpadding="8" style="width: 100%; border-collapse: collapse;">
        <thead>
          <tr style="background: #eee;">
            <th>Vendedor</th>
            <th>Producto</th>
            <th>Cantidad</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let v of ventas.slice(-5).reverse()">
            <td>{{ v.vendedor?.nombreVendedor }}</td>
            <td>{{ v.producto?.nombreProducto }}</td>
            <td>{{ v.cantidad }}</td>
            <td>$ {{ v.valorTotal }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  `
})
export class DashboardComponent implements OnInit {
    private apiService = inject(ApiService);

    productos: any[] = [];
    vendedores: any[] = [];
    ventas: any[] = [];
    totalIngresos: number = 0;

    ngOnInit(): void {
        this.cargarDatosDashboard();
    }

    cargarDatosDashboard() {
        this.apiService.getProductos().subscribe(data => this.productos = data);
        this.apiService.getVendedores().subscribe(data => this.vendedores = data);
        this.apiService.getVentas().subscribe(data => {
            this.ventas = data;
            this.totalIngresos = this.ventas.reduce((acc, curr) => acc + Number(curr.valorTotal || 0), 0);
        });
    }
}