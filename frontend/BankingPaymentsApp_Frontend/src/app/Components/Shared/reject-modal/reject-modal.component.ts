import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Modal } from 'bootstrap';

@Component({
  selector: 'app-reject-modal',
  imports: [ReactiveFormsModule],
  templateUrl: './reject-modal.component.html',
  styleUrls: ['./reject-modal.component.css']
})
export class RejectModalComponent implements OnInit {
  @ViewChild('modalRef') modalElement!: ElementRef;
  private modal: Modal | null = null;

  title = "Reject";

  @Input() Parentid!: number;

  @Output() formSubmit = new EventEmitter<any>();

  rejectForm!: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.rejectForm = this.fb.group({
      id: this.Parentid,
      reason: ""
    })

    this.rejectForm.patchValue({id: this.Parentid});
  }

  ngAfterViewInit(): void {
    this.modal = new Modal(this.modalElement.nativeElement, { backdrop: 'static' });
  }

  open(paymentId:number) {
    this.rejectForm.reset();
    this.rejectForm.patchValue({ id: paymentId});
    this.modal?.show();
  }

  close() {
    this.modal?.hide();
  }
  reject() {
    if (this.rejectForm.valid) {
      this.formSubmit.emit(this.rejectForm.value);
      console.log(this.rejectForm.value)
      this.close();
    } else {
      this.rejectForm.markAllAsTouched();
    }
  }
  onSubmit() {
    
  }
}
