// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.2 <0.9.0;

contract Products {
    // Address of the contract deployer (owner)
    address private owner;

    constructor() {
        owner = msg.sender;
    }

    // Mapping to store registered companies
    mapping(address => bool) private companies;
    
    // Mapping to store manufacturing units under each company
    mapping(address => mapping(address => bool)) private manufacturingUnits;
    
    // Mapping to store products (company address -> product hash -> existence flag)
    mapping(address => mapping(string => bool)) private products;
    
    // Mapping to store salesmen under each company
    mapping(address => mapping(address => bool)) private salesmen;

    /**
     * @dev Checks if a product exists in the blockchain.
     * @param company The address of the company.
     * @param productHash The hash of the product.
     * @return bool True if the product exists, false otherwise.
     */
    function checkProduct(address company, string memory productHash) external view returns (bool) {
        return products[company][productHash];
    }

    /**
     * @dev Registers a company. Only the contract owner can add companies.
     * @param company The address of the company to register.
     */
    function registerCompany(address company) external {
        require(msg.sender == owner, "Only the owner can add companies");
        companies[company] = true;
    }

    /**
     * @dev Adds a manufacturing unit under the caller's company.
     * @param unit The address of the manufacturing unit.
     */
    function addManufacturer(address unit) external {
        require(companies[msg.sender] == true, "Only a registered company can add manufacturers");
        manufacturingUnits[msg.sender][unit] = true;
    }

    /**
     * @dev Adds a product to the blockchain. Only a registered manufacturing unit can add products.
     * @param productHash The hash of the product.
     * @param company The address of the company under which the product is registered.
     */
    function addProduct(string memory productHash, address company) external {
        require(manufacturingUnits[company][msg.sender] == true, "Only a manufacturing unit can add products");
        products[company][productHash] = true;
    }

    /**
     * @dev Adds a salesman under the caller's company.
     * @param salesmanAddress The address of the salesman.
     */
    function addSalesman(address salesmanAddress) external {
        require(companies[msg.sender] == true, "Only a company can add salesmen");
        salesmen[msg.sender][salesmanAddress] = true;
    }

    /**
     * @dev Removes a salesman from the caller's company.
     * @param salesmanAddress The address of the salesman to remove.
     */
    function removeSalesman(address salesmanAddress) external {
        require(salesmen[msg.sender][salesmanAddress] == true, "Only the company can remove its salesmen");
        delete salesmen[msg.sender][salesmanAddress];
    }

    /**
     * @dev Removes a product from the blockchain. Only an authorized salesman can remove a product.
     * @param company The address of the company the product belongs to.
     * @param productHash The hash of the product to be removed.
     */
     
    function removeProduct(address company, string memory productHash) external {
        require(salesmen[company][msg.sender] == true, "Only an authorized salesman can remove products");
        delete products[company][productHash];
    }
}
