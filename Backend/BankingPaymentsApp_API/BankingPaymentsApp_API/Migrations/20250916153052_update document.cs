using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BankingPaymentsApp_API.Migrations
{
    /// <inheritdoc />
    public partial class updatedocument : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "AccountId",
                table: "Documents",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "PublicId",
                table: "Documents",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateIndex(
                name: "IX_Documents_AccountId",
                table: "Documents",
                column: "AccountId");

            migrationBuilder.AddForeignKey(
                name: "FK_Documents_Accounts_AccountId",
                table: "Documents",
                column: "AccountId",
                principalTable: "Accounts",
                principalColumn: "AccountId",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Documents_Accounts_AccountId",
                table: "Documents");

            migrationBuilder.DropIndex(
                name: "IX_Documents_AccountId",
                table: "Documents");

            migrationBuilder.DropColumn(
                name: "AccountId",
                table: "Documents");

            migrationBuilder.DropColumn(
                name: "PublicId",
                table: "Documents");
        }
    }
}
