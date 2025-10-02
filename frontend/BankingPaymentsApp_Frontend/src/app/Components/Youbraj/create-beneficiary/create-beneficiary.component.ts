import { Component } from '@angular/core';
import { BeneficiaryRegisterComponent } from '../../beneficiary-register/beneficiary-register.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-create-beneficiary',
  imports: [BeneficiaryRegisterComponent,RouterLink],
  templateUrl: './create-beneficiary.component.html',
  styleUrl: './create-beneficiary.component.css'
})
export class CreateBeneficiaryComponent {

}
