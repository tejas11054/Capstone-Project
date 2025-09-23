using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BankingPaymentsApp_API.Migrations
{
    /// <inheritdoc />
    public partial class changesinBankUsermodel : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "BankUser_AccountId",
                table: "Users",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "BankUser_KycVierified",
                table: "Users",
                type: "bit",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "BankUser_AccountId",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "BankUser_KycVierified",
                table: "Users");
        }
    }
}
