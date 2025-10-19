# 💼 Corporate Banking Payment Application

## 📘 Overview
The **Corporate Banking Payment Application** is a secure, web-based platform designed to streamline and automate banking operations for **corporate clients, banks, and super administrators**.  
It enables efficient **customer onboarding, client management, payment processing, salary disbursement, and report generation** — all through a role-based, user-friendly interface.

---

## 🧭 Table of Contents
- [🎯 Purpose](#-purpose)
- [🔍 Scope](#-scope)
- [🏗️ System Architecture](#-system-architecture)
- [👥 User Roles and Features](#-user-roles-and-features)
- [⚙️ Functional Requirements](#️-functional-requirements)
- [🧾 Non-Functional Requirements](#-non-functional-requirements)
- [🔐 Security](#-security)
- [🧰 Tech Stack](#-tech-stack)
- [🔄 System Flow](#-system-flow)
- [📊 Reports](#-reports)
- [✨ Developed With](#-developed-with)

---

## 🎯 Purpose
The main purpose of this project is to provide a **comprehensive corporate banking solution** that simplifies and automates the interaction between **banks, clients, and employees**.  
It ensures **security, scalability, and transparency** in all financial operations.

---

## 🔍 Scope
This application provides:
- Customer onboarding and verification  
- Bank and client management  
- Payment processing and approval  
- Salary disbursement (individual or batch)  
- Document upload and management  
- Report generation (transaction, payment, salary)

---

## 🏗️ System Architecture
**Architecture Type:** Web-based Client-Server Architecture  
**Frontend:** Angular  
**Backend:** .NET Core  
**Database:** SQL Server  
**Authentication:** OAuth 2.0 with JWT Tokens  

**Integration:** RESTful APIs  
**Browser Compatibility:** Chrome, Firefox, Edge, Safari

---

## 👥 User Roles and Features

### 🧑‍💼 Super Admin
- Manage Banks (CRUD operations)  
- Generate and view system and audit reports

### 🏦 Bank User
- Onboard new customers and verify them  
- Manage client records (CRUD operations)  
- Approve/Reject payment requests from clients  
- Upload and manage documents  
- Generate transaction reports

### 👨‍💻 Client User
- Manage beneficiaries and employees (CRUD operations)  
- Process payments and salary disbursements  
- Generate transaction, payment, and salary reports  
- Upload supporting documents

---

## ⚙️ Functional Requirements

| ID | Requirement Description |
|----|--------------------------|
| FR1 | Manage bank records (Super Admin) |
| FR2 | Customer onboarding and document uploads (Bank User) |
| FR3 | Client management and verification (Bank User) |
| FR4 | Approve/Reject payments (Bank User) |
| FR5 | Generate transaction reports (Bank User) |
| FR6 | Manage beneficiaries (Client User) |
| FR7 | Manage employee records (Client User) |
| FR8 | Process client payments (Client User) |
| FR9 | Salary disbursement – individual or batch (Client User) |
| FR10 | Generate payment and salary reports (Client User) |
| FR11 | Upload and manage documents (Bank/Client User) |
| FR12 | Batch processing for transactions |
| FR13 | Implement CAPTCHA for form submissions |

---

## 🧾 Non-Functional Requirements

| ID | Description |
|----|--------------|
| NFR1 | Ensure data security using encryption and HTTPS |
| NFR2 | Maintain uptime of 99.9% |
| NFR3 | Scalable to support high user traffic |
| NFR4 | Response time ≤ 2 seconds |
| NFR5 | Maintainable with modular architecture |

---

## 🔐 Security
- OAuth 2.0 with JWT Authentication  
- CAPTCHA for form submission protection  
- Encryption of sensitive data at rest and in transit  
- Audit Logs for access and modification tracking

---

## 🧰 Tech Stack

| Component | Technology |
|------------|-------------|
| Frontend | Angular |
| Backend | .NET Core |
| Database | SQL Server |
| Authentication | OAuth 2.0 (JWT) |
| Version Control | Git |
| APIs | RESTful |

---

## 🔄 System Flow

### 1. User Authentication
- User logs in using credentials.  
- System validates credentials via OAuth 2.0.  
- On success, JWT token is generated and user is redirected to the dashboard.

### 2. Customer Onboarding
- Bank User inputs customer details and uploads documents.  
- Documents are verified and stored securely.  
- Verification team reviews and approves/rejects onboarding.

### 3. Client Management
- Bank User performs CRUD operations on client data.  
- Verification status updated after review.

### 4. Payment Processing
- Client initiates payment → Bank reviews → Approval triggers processing.  
- System notifies users about the payment status.

### 5. Salary Disbursement
- Client manages employee records.  
- Disburse salary individually or in batch mode.  
- Notifications and receipts generated automatically.

### 6. Document Upload
- Bank or Client User uploads documents.  
- Files validated and stored securely.  
- Accessible based on user role and permissions.

### 7. Report Generation
- User selects report type (Transaction, Payment, Salary).  
- System generates and displays report.  
- Option to download in PDF or Excel formats.

---

## 📊 Reports
- Transaction Report  
- Payment Report  
- Salary Disbursement Report  
- System Usage Report (Admin)

---

## ✨ Developed With
💻 **.NET Core** | ⚡ **Angular** | 🗄️ **SQL Server** | 🔐 **OAuth 2.0 (JWT)**
