using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BankingPaymentsApp_API.Migrations
{
    /// <inheritdoc />
    public partial class changesinBankUsermodelagain : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_Users_BankUser_AccountId",
                table: "Users",
                column: "BankUser_AccountId");

            migrationBuilder.AddForeignKey(
                name: "FK_Users_Accounts_BankUser_AccountId",
                table: "Users",
                column: "BankUser_AccountId",
                principalTable: "Accounts",
                principalColumn: "AccountId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Users_Accounts_BankUser_AccountId",
                table: "Users");

            migrationBuilder.DropIndex(
                name: "IX_Users_BankUser_AccountId",
                table: "Users");
        }
    }
}
