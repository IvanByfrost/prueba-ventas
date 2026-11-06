import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <nav class="navbar">
      <div class="nav-brand">Sistema de Ventas</div>
      <div class="nav-links">
        <a routerLink="/dashboard" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">Dashboard</a>
        <a routerLink="/productos" routerLinkActive="active">Productos</a>
        <a routerLink="/vendedores" routerLinkActive="active">Vendedores</a>
        <a routerLink="/ventas" routerLinkActive="active">Ventas</a>
      </div>
    </nav>

    <main class="view-container">
      <router-outlet />
    </main>
  `,
  styles: [`
    .navbar {
      background: #ffffff;
      border-bottom: 1px solid #e2e8f0;
      padding: 0 40px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 70px;
      box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.05);

      .nav-brand {
        font-weight: 700;
        font-size: 1.25rem;
        color: #4f46e5;
      }

      .nav-links {
        display: flex;
        gap: 30px;

        a {
          text-decoration: none;
          color: #64748b;
          font-weight: 600;
          font-size: 0.95rem;
          padding: 8px 0;
          position: relative;
          transition: color 0.2s;

          &:hover, &.active {
            color: #4f46e5;
          }

          &.active::after {
            content: '';
            position: absolute;
            bottom: -23px;
            left: 0;
            right: 0;
            height: 3px;
            background-color: #4f46e5;
            border-radius: 3px 3px 0 0;
          }
        }
      }
    }
  `]
})
export class AppComponent {
  title = 'frontend-ventas';
}