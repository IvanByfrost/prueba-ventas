import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';

@Component({
    selector: 'app-producto',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    template: `
    <div style="padding: 20px;">
      <h2>Gestión de Productos</h2>

      <!-- Formulario de Registro -->
      <form [formGroup]="productoForm" (ngSubmit)="onSubmit()" style="margin-bottom: 20px;">
        <div>
          <label>Nombre:</label>
          <input type="text" formControlName="nombreProducto" />
        </div>
        <div>
          <label>Valor Unitario:</label>
          <input type="number" formControlName="valorUnitario" />
        </div>
        <div>
          <label>Stock:</label>
          <input type="number" formControlName="stock" />
        </div>
        <button type="submit" [disabled]="productoForm.invalid">Guardar Producto</button>
      </form>

      <!-- Lista de Productos -->
      <h3>Lista de Productos</h3>
      <ul>
        <li *ngFor="let p of productos">
          {{ p.nombreProducto }} - $ {{ p.valorUnitario }} (Stock: {{ p.stock }})
        </li>
      </ul>
    </div>
  `
})
export class ProductoComponent implements OnInit {
    private apiService = inject(ApiService);
    private fb = inject(FormBuilder);

    productos: any[] = [];
    productoForm: FormGroup;

    constructor() {
        this.productoForm = this.fb.group({
            nombreProducto: ['', Validators.required],
            valorUnitario: [0, [Validators.required, Validators.min(0)]],
            stock: [0, [Validators.required, Validators.min(0)]]
        });
    }

    ngOnInit(): void {
        this.cargarProductos();
    }

    cargarProductos() {
        this.apiService.getProductos().subscribe({
            next: (data) => this.productos = data,
            error: (err) => console.error('Error al cargar productos', err)
        });
    }

    onSubmit() {
        if (this.productoForm.valid) {
            this.apiService.createProducto(this.productoForm.value).subscribe({
                next: () => {
                    this.cargarProductos();
                    this.productoForm.reset();
                },
                error: (err) => console.error('Error al crear producto', err)
            });
        }
    }
}