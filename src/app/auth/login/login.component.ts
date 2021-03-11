import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { validateAllFormFields } from 'src/app/shared/utils/form';

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
    alert(
      `implementar o login: ${this.loginForm.get('username').value} - ${
        this.loginForm.get('password').value
      }`
    );
  }
}
