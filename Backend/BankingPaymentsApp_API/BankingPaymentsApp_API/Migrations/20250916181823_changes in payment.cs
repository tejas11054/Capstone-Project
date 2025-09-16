using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BankingPaymentsApp_API.Migrations
{
    /// <inheritdoc />
    public partial class changesinpayment : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Payments_Accounts_PayeeAccountId",
                table: "Payments");

            migrationBuilder.DropIndex(
                name: "IX_Payments_PayeeAccountId",
                table: "Payments");

            migrationBuilder.DropColumn(
                name: "PayeeAccountId",
                table: "Payments");

            migrationBuilder.AddColumn<string>(
                name: "PayeeAccountNumber",
                table: "Payments",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PayeeAccountNumber",
                table: "Payments");

            migrationBuilder.AddColumn<int>(
                name: "PayeeAccountId",
                table: "Payments",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Payments_PayeeAccountId",
                table: "Payments",
                column: "PayeeAccountId");

            migrationBuilder.AddForeignKey(
                name: "FK_Payments_Accounts_PayeeAccountId",
                table: "Payments",
                column: "PayeeAccountId",
                principalTable: "Accounts",
                principalColumn: "AccountId",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
