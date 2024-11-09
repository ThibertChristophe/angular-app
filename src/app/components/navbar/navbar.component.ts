import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.sass',
})
export class NavbarComponent {
  authService: AuthService = inject(AuthService);
  router: Router = inject(Router);
  isLogged: boolean = this.authService.isConnected();

  isActive(path: string) {
    return this.router.url === path;
  }

  logOff() {
    this.authService.logout();
    this.isLogged = false;
    window.location.reload();
  }
}
