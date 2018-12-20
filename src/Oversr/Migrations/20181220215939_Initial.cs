using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Oversr.Migrations
{
    public partial class Initial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Designers",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false, defaultValueSql: "newid()"),
                    Created = table.Column<DateTime>(nullable: false, defaultValueSql: "getdate()"),
                    Deleted = table.Column<bool>(nullable: false, defaultValueSql: "0"),
                    LastModified = table.Column<DateTime>(nullable: false, defaultValueSql: "getdate()"),
                    Name = table.Column<string>(maxLength: 200, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Designers", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "SampleInventoryStatuses",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(maxLength: 100, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SampleInventoryStatuses", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false, defaultValueSql: "newid()"),
                    Created = table.Column<DateTime>(nullable: false, defaultValueSql: "getdate()"),
                    FirstName = table.Column<string>(maxLength: 100, nullable: false),
                    LastName = table.Column<string>(maxLength: 100, nullable: false),
                    Username = table.Column<string>(maxLength: 100, nullable: false),
                    PasswordHash = table.Column<string>(maxLength: 300, nullable: false),
                    PasswordSalt = table.Column<string>(maxLength: 200, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Styles",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false, defaultValueSql: "newid()"),
                    Created = table.Column<DateTime>(nullable: false, defaultValueSql: "getdate()"),
                    Deleted = table.Column<bool>(nullable: false, defaultValueSql: "0"),
                    DesignerId = table.Column<Guid>(nullable: false),
                    LastModified = table.Column<DateTime>(nullable: false, defaultValueSql: "getdate()"),
                    Number = table.Column<string>(maxLength: 100, nullable: false),
                    Name = table.Column<string>(maxLength: 100, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Styles", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Styles_Designers_DesignerId",
                        column: x => x.DesignerId,
                        principalTable: "Designers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "SampleInventoryItems",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false, defaultValueSql: "newid()"),
                    Created = table.Column<DateTime>(nullable: false, defaultValueSql: "getdate()"),
                    Deleted = table.Column<bool>(nullable: false),
                    LastModified = table.Column<DateTime>(nullable: false, defaultValueSql: "getdate()"),
                    StyleId = table.Column<Guid>(nullable: false),
                    InventoryStatusId = table.Column<int>(nullable: false),
                    Size = table.Column<string>(nullable: false),
                    Color = table.Column<string>(nullable: false),
                    WholesalePrice = table.Column<int>(nullable: false),
                    MsrpPrice = table.Column<int>(nullable: false),
                    DateOrdered = table.Column<DateTime>(nullable: false),
                    DateRecieved = table.Column<DateTime>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SampleInventoryItems", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SampleInventoryItems_SampleInventoryStatuses_InventoryStatusId",
                        column: x => x.InventoryStatusId,
                        principalTable: "SampleInventoryStatuses",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_SampleInventoryItems_Styles_StyleId",
                        column: x => x.StyleId,
                        principalTable: "Styles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "SampleInventoryStatuses",
                columns: new[] { "Id", "Name" },
                values: new object[,]
                {
                    { 1, "Discontinued" },
                    { 2, "Active" },
                    { 3, "InTransit" },
                    { 4, "Sold" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_SampleInventoryItems_InventoryStatusId",
                table: "SampleInventoryItems",
                column: "InventoryStatusId");

            migrationBuilder.CreateIndex(
                name: "IX_SampleInventoryItems_StyleId",
                table: "SampleInventoryItems",
                column: "StyleId");

            migrationBuilder.CreateIndex(
                name: "IX_Styles_DesignerId",
                table: "Styles",
                column: "DesignerId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "SampleInventoryItems");

            migrationBuilder.DropTable(
                name: "Users");

            migrationBuilder.DropTable(
                name: "SampleInventoryStatuses");

            migrationBuilder.DropTable(
                name: "Styles");

            migrationBuilder.DropTable(
                name: "Designers");
        }
    }
}
