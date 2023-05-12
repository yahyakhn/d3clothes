// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract d3clothes {
    string public name;
    //owner of store
    address public owner;

    struct Item {
        uint256 id;
        string name;
        string category;
        string image;
        uint256 cost;
        uint256 rating;
        uint256 stock;
    }

    struct order {
        uint256 time;
        Item item;

    }

    mapping(uint256 => Item) public items;
    mapping(address =>uint256) public orderCount;
    mapping(address => mapping(uint256 => order)) public orders;

    event Buy(address buyer, uint256 orderId, uint256 itemId);
    event List(string name,uint256 cost,uint256 quantity); 

    modifier onlyOwner(){
        require(msg.sender == owner);
        _;
    }
    constructor(){
        name = "d3clothes";
        owner = msg.sender;
        
    }

    //list products
    function list(
        uint256 _id, 
        string memory _name, 
        string memory _category,
        string memory _image,
        uint256 _cost,
        uint256 _rating,
        uint256 _stock
        ) public onlyOwner{
            
            //create item struct
            Item memory item = Item(_id,
             _name, 
             _category, 
             _image, 
             _cost, 
             _rating, 
             _stock
             );


            //save item struct to blockchain
            items[_id] = item;

            //emit on event
            emit List(_name, _cost, _stock);





    }

    //buy products
    function buy(uint256 _id
    ) public payable{
        //fetch item
        Item memory item = items[_id];

        //require enough ether to buy item
        require(msg.value >= item.cost);
        //item in stock
        require(item.stock > 0);
        //create an order
        order memory Order = order(block.timestamp, item);
        //save order to chain
        orderCount[msg.sender]++;
        orders[msg.sender][orderCount[msg.sender]] = Order;

        //subtract stock
        items[_id].stock =  item.stock -1;


        //emit event
        emit Buy(msg.sender, orderCount[msg.sender], item.id);

    }

    //withdraw funds
    function withdraw() public onlyOwner {
        (bool success, ) = owner.call{value: address(this).balance}("");
        require(success);
    }

}
