import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs/operators';
import { UserService } from 'src/app/shared/services/user.service';
import { MustMatch } from 'src/app/shared/validators/must-match.validator';

import { validateAllFormFields } from '../../shared/utils/form';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group(
      {
        name: ['', Validators.required],
        username: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required],
      },
      { validator: MustMatch('password', 'confirmPassword') }
    );
  }

  showError(control: string): boolean {
    if (!this.registerForm.get(control)) {
      return false;
    }

    return (
      this.registerForm.get(control).invalid &&
      this.registerForm.get(control).touched
    );
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      validateAllFormFields(this.registerForm);
      console.log('invalid');

      return;
    }
    this.register();
  }

  register() {
    this.loading = true;
    this.userService
      .register(this.registerForm.value)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe(
        (response) => this.onSuccess(response),
        (error) => this.onError(error)
      );
  }

  onSuccess(response) {
    this.toastr.success(
      `Seja bem vindo, ${this.registerForm.value.name}`,
      'Usuário criado ✅'
    );
    this.router.navigate(['login']);
  }

  onError(error) {
    this.toastr.error(error.error.error, 'Deu ruim 😬');
  }
}
