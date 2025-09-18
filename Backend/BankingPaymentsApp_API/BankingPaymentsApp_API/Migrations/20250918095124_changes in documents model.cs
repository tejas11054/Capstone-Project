using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BankingPaymentsApp_API.Migrations
{
    /// <inheritdoc />
    public partial class changesindocumentsmodel : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Documents_Users_UserId",
                table: "Documents");

            migrationBuilder.DropIndex(
                name: "IX_Documents_UserId",
                table: "Documents");

            migrationBuilder.DropColumn(
                name: "DocumentIds",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "Documents");

            migrationBuilder.RenameColumn(
                name: "ClientId",
                table: "Documents",
                newName: "ClientUserId");

            migrationBuilder.CreateIndex(
                name: "IX_Documents_ClientUserId",
                table: "Documents",
                column: "ClientUserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Documents_Users_ClientUserId",
                table: "Documents",
                column: "ClientUserId",
                principalTable: "Users",
                principalColumn: "UserId",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Documents_Users_ClientUserId",
                table: "Documents");

            migrationBuilder.DropIndex(
                name: "IX_Documents_ClientUserId",
                table: "Documents");

            migrationBuilder.RenameColumn(
                name: "ClientUserId",
                table: "Documents",
                newName: "ClientId");

            migrationBuilder.AddColumn<string>(
                name: "DocumentIds",
                table: "Users",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "UserId",
                table: "Documents",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Documents_UserId",
                table: "Documents",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Documents_Users_UserId",
                table: "Documents",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "UserId");
        }
    }
}
