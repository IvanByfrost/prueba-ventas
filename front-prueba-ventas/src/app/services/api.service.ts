import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    private http = inject(HttpClient);
    private baseUrl = 'http://localhost:3000/api';

    // --- PRODUCTOS ---
    getProductos(): Observable<any> {
        return this.http.get(`${this.baseUrl}/productos`);
    }

    createProducto(data: any): Observable<any> {
        return this.http.post(`${this.baseUrl}/productos`, data);
    }

    updateProducto(id: string, data: any): Observable<any> {
        return this.http.put(`${this.baseUrl}/productos/${id}`, data);
    }

    deleteProducto(id: string): Observable<any> {
        return this.http.delete(`${this.baseUrl}/productos/${id}`);
    }

    // --- VENDEDORES ---
    getVendedores(): Observable<any> {
        return this.http.get(`${this.baseUrl}/vendedores`);
    }

    createVendedor(data: any): Observable<any> {
        return this.http.post(`${this.baseUrl}/vendedores`, data);
    }

    // --- VENTAS ---
    getVentas(): Observable<any> {
        return this.http.get(`${this.baseUrl}/ventas`);
    }

    createVenta(data: any): Observable<any> {
        return this.http.post(`${this.baseUrl}/ventas`, data);
    }
}