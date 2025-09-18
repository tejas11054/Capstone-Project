using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BankingPaymentsApp_API.Migrations
{
    /// <inheritdoc />
    public partial class tweakedpayment : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Transactions_Payments_PaymentId",
                table: "Transactions");

            migrationBuilder.AlterColumn<int>(
                name: "PaymentId",
                table: "Transactions",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddColumn<int>(
                name: "SalaryDisbursementId",
                table: "Transactions",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Transactions_SalaryDisbursementId",
                table: "Transactions",
                column: "SalaryDisbursementId");

            migrationBuilder.AddForeignKey(
                name: "FK_Transactions_Payments_PaymentId",
                table: "Transactions",
                column: "PaymentId",
                principalTable: "Payments",
                principalColumn: "PaymentId");

            migrationBuilder.AddForeignKey(
                name: "FK_Transactions_SalaryDisbursements_SalaryDisbursementId",
                table: "Transactions",
                column: "SalaryDisbursementId",
                principalTable: "SalaryDisbursements",
                principalColumn: "SalaryDisbursementId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Transactions_Payments_PaymentId",
                table: "Transactions");

            migrationBuilder.DropForeignKey(
                name: "FK_Transactions_SalaryDisbursements_SalaryDisbursementId",
                table: "Transactions");

            migrationBuilder.DropIndex(
                name: "IX_Transactions_SalaryDisbursementId",
                table: "Transactions");

            migrationBuilder.DropColumn(
                name: "SalaryDisbursementId",
                table: "Transactions");

            migrationBuilder.AlterColumn<int>(
                name: "PaymentId",
                table: "Transactions",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Transactions_Payments_PaymentId",
                table: "Transactions",
                column: "PaymentId",
                principalTable: "Payments",
                principalColumn: "PaymentId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
