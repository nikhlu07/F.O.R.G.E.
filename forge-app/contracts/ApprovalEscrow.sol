// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

// Minimal on-chain approval registry for release gating.
// Server checks canRelease(invoiceId) before executing HTS transfer.
contract ApprovalEscrow {
    address public owner;

    struct Approval {
        bool central;
        bool state;
        bool district;
        uint256 amount;
        address vendor;
        bool released;
    }

    mapping(bytes32 => Approval) public approvals; // invoiceId => approvals

    event Approved(bytes32 indexed invoiceId, string role, uint256 amount, address vendor);
    event Released(bytes32 indexed invoiceId, uint256 amount, address vendor);

    modifier onlyOwner() {
        require(msg.sender == owner, "not owner");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function approveCentral(bytes32 invoiceId, uint256 amount, address vendor) external onlyOwner {
        Approval storage a = approvals[invoiceId];
        require(!a.released, "already released");
        a.central = true;
        a.amount = amount;
        a.vendor = vendor;
        emit Approved(invoiceId, "central", amount, vendor);
    }

    function approveState(bytes32 invoiceId) external onlyOwner {
        Approval storage a = approvals[invoiceId];
        require(!a.released, "already released");
        a.state = true;
        emit Approved(invoiceId, "state", a.amount, a.vendor);
    }

    function approveDistrict(bytes32 invoiceId) external onlyOwner {
        Approval storage a = approvals[invoiceId];
        require(!a.released, "already released");
        a.district = true;
        emit Approved(invoiceId, "district", a.amount, a.vendor);
    }

    function canRelease(bytes32 invoiceId) external view returns (bool) {
        Approval storage a = approvals[invoiceId];
        return a.central && a.state && a.district && !a.released && a.vendor != address(0) && a.amount > 0;
    }

    function markReleased(bytes32 invoiceId) external onlyOwner {
        Approval storage a = approvals[invoiceId];
        require(a.central && a.state && a.district, "not fully approved");
        require(!a.released, "already released");
        a.released = true;
        emit Released(invoiceId, a.amount, a.vendor);
    }
}