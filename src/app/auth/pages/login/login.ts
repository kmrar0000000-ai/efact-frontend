import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login  {

  form: FormGroup;
  loading = false;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });

    // (Opcional) Prefijar credenciales de prueba
    this.form.patchValue({
      username: '',
      password:
        '',
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.errorMessage = null;
    this.loading = true;

    const { username, password } = this.form.value;

    this.authService.login(username, password).subscribe({
      next: () => {
        this.loading = false;
        // Si todo fue bien, vamos a la vista de documentos
        this.router.navigate(['/documents']);
      },
      error: (error) => {
        console.error('Error en login:', error);
        this.loading = false;
        this.errorMessage =
          'Error de autenticación. Verifique sus credenciales o intente nuevamente.';
      },
    });
  }

}
