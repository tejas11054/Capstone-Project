using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BankingPaymentsApp_API.Migrations
{
    /// <inheritdoc />
    public partial class querymodelchanges : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Response",
                table: "Queries",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Response",
                table: "Queries");
        }
    }
}
