
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract Helpi {
    struct Project {
        string name;
        address owner;
        uint256 requestedAmount;
        uint256 raisedAmount;
        bool approved;
        bool completed;
    }

    address public aiAgent;
    Project[] public projects;
    mapping(address => uint256) public donations;

    event ProjectCreated(uint256 id, string name, address owner);
    event ProjectApproved(uint256 id);
    event DonationReceived(uint256 id, address donor, uint256 amount);
    event ProjectCompleted(uint256 id, address owner);

    modifier onlyAIAgent() {
        require(msg.sender == aiAgent, "Only AI agent can approve");
        _;
    }

    constructor(address _aiAgent) {
        aiAgent = _aiAgent;
    }

    function createProject(string memory _name, uint256 _requestedAmount) public {
        projects.push(Project(_name, msg.sender, _requestedAmount, 0, false, false));
        emit ProjectCreated(projects.length - 1, _name, msg.sender);
    }

    function approveProject(uint256 _id) public onlyAIAgent {
        require(_id < projects.length, "Project does not exist");
        projects[_id].approved = true;
        emit ProjectApproved(_id);
    }

    function donate(uint256 _id) public payable {
        require(_id < projects.length, "Project does not exist");
        require(projects[_id].approved, "Project not approved");
        require(msg.value > 0, "Donation must be greater than 0");

        projects[_id].raisedAmount += msg.value;
        donations[msg.sender] += msg.value;

        emit DonationReceived(_id, msg.sender, msg.value);
    }

    function withdrawFunds(uint256 _id) public {
        require(_id < projects.length, "Project does not exist");
        require(msg.sender == projects[_id].owner, "Not authorized");
        require(projects[_id].raisedAmount >= projects[_id].requestedAmount, "Funding goal not met");
        require(!projects[_id].completed, "Funds already withdrawn");

        payable(msg.sender).transfer(projects[_id].raisedAmount);
        projects[_id].completed = true;
        emit ProjectCompleted(_id, msg.sender);
    }
}
