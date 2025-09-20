using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BankingPaymentsApp_API.Migrations
{
    /// <inheritdoc />
    public partial class initial3 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_SalaryDisbursementDetails_Employees_EmployeeId1",
                table: "SalaryDisbursementDetails");

            migrationBuilder.DropIndex(
                name: "IX_SalaryDisbursementDetails_EmployeeId1",
                table: "SalaryDisbursementDetails");

            migrationBuilder.DropColumn(
                name: "EmployeeId1",
                table: "SalaryDisbursementDetails");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "EmployeeId1",
                table: "SalaryDisbursementDetails",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_SalaryDisbursementDetails_EmployeeId1",
                table: "SalaryDisbursementDetails",
                column: "EmployeeId1");

            migrationBuilder.AddForeignKey(
                name: "FK_SalaryDisbursementDetails_Employees_EmployeeId1",
                table: "SalaryDisbursementDetails",
                column: "EmployeeId1",
                principalTable: "Employees",
                principalColumn: "EmployeeId");
        }
    }
}
