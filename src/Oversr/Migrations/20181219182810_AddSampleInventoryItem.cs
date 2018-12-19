using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Oversr.Migrations
{
    public partial class AddSampleInventoryItem : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "SampleInventoryItems",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false, defaultValueSql: "newid()"),
                    Created = table.Column<DateTime>(nullable: false, defaultValueSql: "getdate()"),
                    LastModified = table.Column<DateTime>(nullable: false, defaultValueSql: "getdate()"),
                    DesignerId = table.Column<Guid>(nullable: false),
                    StyleNumber = table.Column<string>(nullable: false),
                    StyleName = table.Column<string>(nullable: false),
                    Size = table.Column<string>(nullable: false),
                    Color = table.Column<string>(nullable: false),
                    WholesalePrice = table.Column<int>(nullable: false),
                    MsrpPrice = table.Column<int>(nullable: false),
                    DateOrdered = table.Column<DateTime>(nullable: false),
                    DateRecieved = table.Column<DateTime>(nullable: true),
                    InventoryStatusId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SampleInventoryItems", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SampleInventoryItems_Designers_DesignerId",
                        column: x => x.DesignerId,
                        principalTable: "Designers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_SampleInventoryItems_SampleInventoryStatuses_InventoryStatusId",
                        column: x => x.InventoryStatusId,
                        principalTable: "SampleInventoryStatuses",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_SampleInventoryItems_DesignerId",
                table: "SampleInventoryItems",
                column: "DesignerId");

            migrationBuilder.CreateIndex(
                name: "IX_SampleInventoryItems_InventoryStatusId",
                table: "SampleInventoryItems",
                column: "InventoryStatusId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "SampleInventoryItems");
        }
    }
}
