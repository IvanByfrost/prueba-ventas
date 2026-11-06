import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';

@Component({
    selector: 'app-vendedor',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    template: `
    <div style="padding: 20px;">
      <h2>Gestión de Vendedores</h2>

      <!-- Formulario de Registro -->
      <form [formGroup]="vendedorForm" (ngSubmit)="onSubmit()" style="margin-bottom: 20px;">
        <div>
          <label>Nombre del Vendedor:</label>
          <input type="text" formControlName="nombreVendedor" />
        </div>
        <div>
          <label>Comisión (%):</label>
          <input type="number" formControlName="comision" min="0" max="100" />
        </div>
        <button type="submit" [disabled]="vendedorForm.invalid">Guardar Vendedor</button>
      </form>

      <!-- Lista de Vendedores -->
      <h3>Lista de Vendedores</h3>
      <ul>
        <li *ngFor="let v of vendedores">
          {{ v.nombreVendedor }} - Comisión: {{ v.comision }}%
        </li>
      </ul>
    </div>
  `
})
export class VendedorComponent implements OnInit {
    private apiService = inject(ApiService);
    private fb = inject(FormBuilder);

    vendedores: any[] = [];
    vendedorForm: FormGroup;

    constructor() {
        this.vendedorForm = this.fb.group({
            nombreVendedor: ['', Validators.required],
            comision: [0, [Validators.required, Validators.min(0), Validators.max(100)]]
        });
    }

    ngOnInit(): void {
        this.cargarVendedores();
    }

    cargarVendedores() {
        this.apiService.getVendedores().subscribe({
            next: (data) => this.vendedores = data,
            error: (err) => console.error('Error al cargar vendedores', err)
        });
    }

    onSubmit() {
        if (this.vendedorForm.valid) {
            this.apiService.createVendedor(this.vendedorForm.value).subscribe({
                next: () => {
                    this.cargarVendedores();
                    this.vendedorForm.reset({ comision: 0 });
                },
                error: (err) => console.error('Error al crear vendedor', err)
            });
        }
    }
}