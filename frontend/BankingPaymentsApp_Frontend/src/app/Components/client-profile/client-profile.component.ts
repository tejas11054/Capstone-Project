import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ClientRegisterService } from '../../Services/client.service';
import { ClientUser } from '../../Models/ClientUser';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-client-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './client-profile.component.html',
  styleUrls: ['./client-profile.component.css']
})
export class ClientProfileComponent implements OnInit {
  profileForm!: FormGroup;
  userId!: number;
  userData!: ClientUser;
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private clientSvc: ClientRegisterService
  ) {}

  ngOnInit(): void {
    this.userId = Number(this.route.snapshot.paramMap.get('id'));

    this.clientSvc.getClientById(this.userId).subscribe({
      next: (res: ClientUser) => {
        this.userData = res;
        this.initForm(res);
        this.loading = false;
      },
      error: (err: any) => {
        console.error("Error fetching client user:", err);
        this.loading = false;
      }
    });
  }

  initForm(user: ClientUser) {
    this.profileForm = this.fb.group({
      userFullName: [user.userFullName, Validators.required],
      userName: [user.userName, Validators.required],
      userEmail: [user.userEmail, [Validators.required, Validators.email]],
      userPhone: [user.userPhone, Validators.required],
      dateOfBirth: [user.dateOfBirth ? new Date(user.dateOfBirth).toISOString().substring(0, 10) : ''],
      address: [user.address || ''],
      accountNumber: [user.account?.accountNumber || '', Validators.required]
    });
  }

  saveChanges() {
    if (this.profileForm.valid) {
      const updatedUser: ClientUser = {
        ...this.userData,
        ...this.profileForm.value,
        account: {
          ...this.userData.account,
          accountNumber: this.profileForm.value.accountNumber
        }
      };

      this.clientSvc.updateClientUser(this.userId, updatedUser).subscribe({
        next: (res) => {
          alert("Profile updated successfully!");
          this.userData = res;
        },
        error: (err) => {
          console.error("Error updating profile:", err);
          alert("Failed to update profile.");
        }
      });
    } else {
      alert("Please fill all required fields.");
    }
  }

  goBack(): void {
    this.router.navigate(["/ClientUser/" + this.userId]);  // navigates to previous page
  }

}