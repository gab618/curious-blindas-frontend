import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SessionService } from 'src/app/shared/services/session.service';
import { validateAllFormFields } from 'src/app/shared/utils/form';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;

  constructor(
    private formBuilder: FormBuilder,
    private sessionService: SessionService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  showError(control: string): boolean {
    if (!this.loginForm.get(control)) {
      return false;
    }

    return (
      this.loginForm.get(control).invalid && this.loginForm.get(control).touched
    );
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      validateAllFormFields(this.loginForm);
      console.log('invalid');

      return;
    }
    this.login();
  }

  login() {
    this.loading = true;
    this.sessionService
      .login(this.loginForm.value)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe(
        (response) => this.onSuccess(response),
        (error) => this.onError(error)
      );
  }

  onSuccess(response) {
    console.log(response);
  }

  onError(error) {
    console.log(error);
  }
}
