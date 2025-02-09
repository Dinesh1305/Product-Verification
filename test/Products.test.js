const { expect } = require("chai");

describe("Products Smart Contract", function () {
    let Products, products;
    let owner, company, manufacturer, salesman, otherAccount;
    const productHash = "0x12345abcdef"; // Example product hash

    beforeEach(async function () {
        [owner, company, manufacturer, salesman, otherAccount] = await ethers.getSigners();

        // Deploy the contract
        Products = await ethers.getContractFactory("Products");
        products = await Products.deploy();
        await products.deployed();
    });

    it("Should allow the owner to register a company", async function () {
        await products.connect(owner).registerCompany(company.address);
        expect(await products.checkProduct(company.address, productHash)).to.equal(false);
    });

    it("Should allow a company to add a manufacturer", async function () {
        await products.connect(owner).registerCompany(company.address);
        await products.connect(company).addManufacturer(manufacturer.address);
        // No revert means success
    });

    it("Should allow a manufacturer to add a product", async function () {
        await products.connect(owner).registerCompany(company.address);
        await products.connect(company).addManufacturer(manufacturer.address);
        await products.connect(manufacturer).addProduct(productHash, company.address);
        expect(await products.checkProduct(company.address, productHash)).to.equal(true);
    });

    it("Should allow a company to add a salesman", async function () {
        await products.connect(owner).registerCompany(company.address);
        await products.connect(company).addSalesman(salesman.address);
        // No revert means success
    });

    it("Should allow a salesman to remove a product", async function () {
        await products.connect(owner).registerCompany(company.address);
        await products.connect(company).addManufacturer(manufacturer.address);
        await products.connect(manufacturer).addProduct(productHash, company.address);
        await products.connect(company).addSalesman(salesman.address);
        
        await products.connect(salesman).removeProduct(company.address, productHash);
        expect(await products.checkProduct(company.address, productHash)).to.equal(false);
    });

    it("Should not allow unauthorized accounts to remove a product", async function () {
        await products.connect(owner).registerCompany(company.address);
        await products.connect(company).addManufacturer(manufacturer.address);
        await products.connect(manufacturer).addProduct(productHash, company.address);

        await expect(
            products.connect(otherAccount).removeProduct(company.address, productHash)
        ).to.be.revertedWith("Only an authorized salesman can remove products");
    });

    it("Should not allow unauthorized users to add a manufacturer", async function () {
        await expect(
            products.connect(otherAccount).addManufacturer(manufacturer.address)
        ).to.be.revertedWith("Only a registered company can add manufacturers");
    });

    it("Should not allow unauthorized users to add a product", async function () {
        await expect(
            products.connect(otherAccount).addProduct(productHash, company.address)
        ).to.be.revertedWith("Only a manufacturing unit can add products");
    });

    it("Should not allow unauthorized users to add a salesman", async function () {
        await expect(
            products.connect(otherAccount).addSalesman(salesman.address)
        ).to.be.revertedWith("Only a company can add salesmen");
    });
});
