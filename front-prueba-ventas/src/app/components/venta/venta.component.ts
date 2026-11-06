import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';

@Component({
    selector: 'app-venta',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    template: `
    <div style="padding: 20px;">
      <h2>Registrar Venta</h2>

      <!-- Formulario Reactivo -->
      <form [formGroup]="ventaForm" (ngSubmit)="onSubmit()" style="margin-bottom: 20px;">
        <div>
          <label>Vendedor:</label>
          <select formControlName="vendedorId">
            <option value="">Seleccione un vendedor</option>
            <option *ngFor="let v of vendedores" [value]="v.vendedorId">
              {{ v.nombreVendedor }}
            </option>
          </select>
        </div>

        <div>
          <label>Producto:</label>
          <select formControlName="productoId">
            <option value="">Seleccione un producto</option>
            <option *ngFor="let p of productos" [value]="p.productoId">
              {{ p.nombreProducto }} ($ {{ p.valorUnitario }} - Stock: {{ p.stock }})
            </option>
          </select>
        </div>

        <div>
          <label>Cantidad:</label>
          <input type="number" formControlName="cantidad" min="1" />
        </div>

        <button type="submit" [disabled]="ventaForm.invalid">Registrar Venta</button>
      </form>

      <!-- Historial de Ventas -->
      <h3>Historial de Ventas</h3>
      <ul>
        <li *ngFor="let v of ventas">
          Vendedor: {{ v.vendedor?.nombreVendedor }} | Producto: {{ v.producto?.nombreProducto }} | Cantidad: {{ v.cantidad }} | Total: $ {{ v.valorTotal }}
        </li>
      </ul>
    </div>
  `
})
export class VentaComponent implements OnInit {
    private apiService = inject(ApiService);
    private fb = inject(FormBuilder);

    vendedores: any[] = [];
    productos: any[] = [];
    ventas: any[] = [];
    ventaForm: FormGroup;

    constructor() {
        this.ventaForm = this.fb.group({
            vendedorId: ['', Validators.required],
            productoId: ['', Validators.required],
            cantidad: [1, [Validators.required, Validators.min(1)]]
        });
    }

    ngOnInit(): void {
        this.cargarDatos();
    }

    cargarDatos() {
        this.apiService.getVendedores().subscribe({
            next: (data) => this.vendedores = data,
            error: (err) => console.error('Error al cargar vendedores', err)
        });

        this.apiService.getProductos().subscribe({
            next: (data) => this.productos = data,
            error: (err) => console.error('Error al cargar productos', err)
        });

        this.apiService.getVentas().subscribe({
            next: (data) => this.ventas = data,
            error: (err) => console.error('Error al cargar ventas', err)
        });
    }

    onSubmit() {
        if (this.ventaForm.valid) {
            this.apiService.createVenta(this.ventaForm.value).subscribe({
                next: () => {
                    alert('Venta registrada con éxito');
                    this.cargarDatos(); // Recarga las ventas y el stock actualizado
                    this.ventaForm.reset({ cantidad: 1 });
                },
                error: (err) => {
                    alert(err.error?.error || 'Error al registrar la venta');
                    console.error(err);
                }
            });
        }
    }
}