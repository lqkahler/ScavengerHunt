using Microsoft.EntityFrameworkCore.Migrations;

namespace ScavengerHunt.Migrations
{
    public partial class CheckPointImage : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Image",
                table: "CheckPoints",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Image",
                table: "CheckPoints");
        }
    }
}
