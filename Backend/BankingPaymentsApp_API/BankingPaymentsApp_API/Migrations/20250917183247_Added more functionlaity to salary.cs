using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BankingPaymentsApp_API.Migrations
{
    /// <inheritdoc />
    public partial class Addedmorefunctionlaitytosalary : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "AllEmployees",
                table: "SalaryDisbursements",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<int>(
                name: "SalaryDisbursementId",
                table: "Employees",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Employees_SalaryDisbursementId",
                table: "Employees",
                column: "SalaryDisbursementId");

            migrationBuilder.AddForeignKey(
                name: "FK_Employees_SalaryDisbursements_SalaryDisbursementId",
                table: "Employees",
                column: "SalaryDisbursementId",
                principalTable: "SalaryDisbursements",
                principalColumn: "SalaryDisbursementId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Employees_SalaryDisbursements_SalaryDisbursementId",
                table: "Employees");

            migrationBuilder.DropIndex(
                name: "IX_Employees_SalaryDisbursementId",
                table: "Employees");

            migrationBuilder.DropColumn(
                name: "AllEmployees",
                table: "SalaryDisbursements");

            migrationBuilder.DropColumn(
                name: "SalaryDisbursementId",
                table: "Employees");
        }
    }
}
