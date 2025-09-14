using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BankingPaymentsApp_API.Migrations
{
    /// <inheritdoc />
    public partial class updatedtransaction : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Transactions_Payments_PayementId",
                table: "Transactions");

            migrationBuilder.RenameColumn(
                name: "PayementId",
                table: "Transactions",
                newName: "PaymentId");

            migrationBuilder.RenameIndex(
                name: "IX_Transactions_PayementId",
                table: "Transactions",
                newName: "IX_Transactions_PaymentId");

            migrationBuilder.AlterColumn<double>(
                name: "Amount",
                table: "Transactions",
                type: "float",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddForeignKey(
                name: "FK_Transactions_Payments_PaymentId",
                table: "Transactions",
                column: "PaymentId",
                principalTable: "Payments",
                principalColumn: "PaymentId",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Transactions_Payments_PaymentId",
                table: "Transactions");

            migrationBuilder.RenameColumn(
                name: "PaymentId",
                table: "Transactions",
                newName: "PayementId");

            migrationBuilder.RenameIndex(
                name: "IX_Transactions_PaymentId",
                table: "Transactions",
                newName: "IX_Transactions_PayementId");

            migrationBuilder.AlterColumn<int>(
                name: "Amount",
                table: "Transactions",
                type: "int",
                nullable: false,
                oldClrType: typeof(double),
                oldType: "float");

            migrationBuilder.AddForeignKey(
                name: "FK_Transactions_Payments_PayementId",
                table: "Transactions",
                column: "PayementId",
                principalTable: "Payments",
                principalColumn: "PaymentId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
