// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract NonTransferableERC721 is ERC721URIStorage {
    constructor(string memory name, string memory symbol) ERC721(name, symbol) {}

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId,
        uint256 batchSize
    ) internal override {
        require(from == address(0) || to == address(0), "This token is non-transferable");
        super._beforeTokenTransfer(from, to, tokenId, batchSize);
    }
}

contract DonorNFT is NonTransferableERC721, Ownable {
    uint256 private _tokenIds;

    constructor() NonTransferableERC721("DonorNFT", "DNT") {}

    function mintNFT(address recipient, string memory tokenURI) external onlyOwner {
        _tokenIds++;
        uint256 newItemId = _tokenIds;
        _mint(recipient, newItemId);
        _setTokenURI(newItemId, tokenURI);
    }
}

contract ProjectNFT is NonTransferableERC721, Ownable {
    uint256 private _tokenIds;

    constructor() NonTransferableERC721("ProjectNFT", "PNT") {}

    function mintNFT(address recipient, string memory tokenURI) external onlyOwner {
        _tokenIds++;
        uint256 newItemId = _tokenIds;
        _mint(recipient, newItemId);
        _setTokenURI(newItemId, tokenURI);
    }
}
