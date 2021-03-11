import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      name: [''],
      username: [''],
      email: [''],
      password: [''],
      confirmPassword: [''],
    });
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

  validateAllFormFields() {
    Object.keys(this.registerForm.controls).forEach((field) => {
      const control = this.registerForm.get(field);
      control.markAsTouched();
    });
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      this.validateAllFormFields();
      return;
    }
    //implementar o register
  }
}
