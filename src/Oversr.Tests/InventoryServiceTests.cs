using Moq;
using NUnit.Framework;
using Oversr.Services;

namespace Tests
{
    public class Tests
    {
        Mock<InventoryService> _inventoryService;

        [SetUp]
        public void Setup()
        {
            _inventoryService = new Mock<InventoryService>();
        }

        [Test]
        public void Test1()
        {
            _inventoryService.Object.AddDesigner("test designer 1");
            Assert.True(_inventoryService.Object.GetAllDesigners().Count == 1);
        }
    }
}