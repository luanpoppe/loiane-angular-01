import { FormControl } from '@angular/forms';

export class FormValidations {
  static requiredMinCheckbox(min = 1): any {
    const validator = (formArray: any) => {
      const totalChecked = formArray.controls
        .map((v: any) => v.value)
        .reduce(
          (total: any, current: any) => (current ? total + current : total),
          0
        );
      return totalChecked >= min ? null : { required: true };
    };
    return validator;
  }

  static cepValidator(control: FormControl) {
    const cep = control.value;
    if (cep && cep !== '') {
      const validacep = /^[0-9]{8}$/;
      return validacep.test(cep) ? null : { cepInvalido: true };
    }

    return null;
  }
}
