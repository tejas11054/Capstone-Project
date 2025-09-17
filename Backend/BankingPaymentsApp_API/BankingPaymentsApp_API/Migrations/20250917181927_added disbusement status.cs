using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BankingPaymentsApp_API.Migrations
{
    /// <inheritdoc />
    public partial class addeddisbusementstatus : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "DisbursementStatusId",
                table: "SalaryDisbursements",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_SalaryDisbursements_DisbursementStatusId",
                table: "SalaryDisbursements",
                column: "DisbursementStatusId");

            migrationBuilder.AddForeignKey(
                name: "FK_SalaryDisbursements_PaymentStatuses_DisbursementStatusId",
                table: "SalaryDisbursements",
                column: "DisbursementStatusId",
                principalTable: "PaymentStatuses",
                principalColumn: "StatusId",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_SalaryDisbursements_PaymentStatuses_DisbursementStatusId",
                table: "SalaryDisbursements");

            migrationBuilder.DropIndex(
                name: "IX_SalaryDisbursements_DisbursementStatusId",
                table: "SalaryDisbursements");

            migrationBuilder.DropColumn(
                name: "DisbursementStatusId",
                table: "SalaryDisbursements");
        }
    }
}
