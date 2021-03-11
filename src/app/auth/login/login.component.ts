import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: [''],
      password: [''],
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

  validateAllFormFields() {
    Object.keys(this.loginForm.controls).forEach((field) => {
      const control = this.loginForm.get(field);
      control.markAsTouched();
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      this.validateAllFormFields();
      return;
    }
    alert(
      `implementar o login: ${this.loginForm.get('username').value} - ${
        this.loginForm.get('password').value
      }`
    );
  }
}
