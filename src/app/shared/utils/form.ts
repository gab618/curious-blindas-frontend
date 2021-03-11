import { FormControl, FormGroup } from '@angular/forms';

export function showError(control: string): boolean {
  if (!this.registerForm.get(control)) {
    return false;
  }

  return (
    this.registerForm.get(control).invalid &&
    this.registerForm.get(control).touched
  );
}

export function validateAllFormFields(form: FormGroup) {
  Object.keys(form.controls).forEach((field) => {
    const control = form.get(field);
    if (control instanceof FormControl) {
      control.markAsTouched();
    } else if (control instanceof FormGroup) {
      this.validateAllFormFields(control);
    }
  });
}
