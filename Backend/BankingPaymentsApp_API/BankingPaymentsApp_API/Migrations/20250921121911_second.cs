using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BankingPaymentsApp_API.Migrations
{
    /// <inheritdoc />
    public partial class second : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "BeneficiaryIds",
                table: "Users");

            migrationBuilder.AddColumn<int>(
                name: "ClientUserUserId",
                table: "Beneficiaries",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Beneficiaries_ClientUserUserId",
                table: "Beneficiaries",
                column: "ClientUserUserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Beneficiaries_Users_ClientUserUserId",
                table: "Beneficiaries",
                column: "ClientUserUserId",
                principalTable: "Users",
                principalColumn: "UserId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Beneficiaries_Users_ClientUserUserId",
                table: "Beneficiaries");

            migrationBuilder.DropIndex(
                name: "IX_Beneficiaries_ClientUserUserId",
                table: "Beneficiaries");

            migrationBuilder.DropColumn(
                name: "ClientUserUserId",
                table: "Beneficiaries");

            migrationBuilder.AddColumn<string>(
                name: "BeneficiaryIds",
                table: "Users",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
