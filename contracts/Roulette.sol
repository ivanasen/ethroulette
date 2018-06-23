pragma solidity ^0.4.24;

import "../node_modules/openzeppelin-solidity/contracts/ownership/Ownable.sol";
import "../node_modules/openzeppelin-solidity/contracts/math/SafeMath.sol";

contract Roulette is Ownable {
    using SafeMath for uint256;
    
    event BetFinished(uint number, uint nextRoundTimestamp);
    event NewBet(uint bet, address player, BetType betType, uint value, uint betAmount);
    
    uint public MIN_ADDED_HEIGHT = 1;
    uint public PLAYING_NUMBERS_COUNT = 37;
    uint public PAYOUT_SINGLE = 35;
    uint public PAYOUT_COLOR = 2;
    uint public PAYOUT_EVEN_ODD = 2;
    
    uint public addedBlockHeight;

    enum BetType { Single, Odd, Even, Red, Black }
    struct Bet {
        BetType betType;
        address player;
        uint number;
        uint value;
        uint requiredBlockHeight;
        bool passed;
    }
    Bet[] public bets;
    
    address lastPlayer;
    
    modifier transactionHasEther() {
        require(msg.value != 0);
        _;
    }

    modifier ableToPayout(uint _value, BetType _betType) {
        require(isAbleToPayout(_value, _betType));
        _;
    }
    
    constructor(uint _addedHeight) public payable {
	    addedBlockHeight = _addedHeight >= MIN_ADDED_HEIGHT ? _addedHeight : MIN_ADDED_HEIGHT;
    }

    function getBetsCountAndValue() public constant returns(uint, uint) {
        uint value = 0;
        for (uint i = 0; i < bets.length; i++) {
            value = value.add(bets[i].value);
        }
        return (bets.length, value);
    }

    function betSingle(uint _number) public payable transactionHasEther() ableToPayout(msg.value, BetType.Single) {
        require(_number < PLAYING_NUMBERS_COUNT);
        
        lastPlayer = msg.sender;
        bets.push(Bet(
            BetType.Single,
            msg.sender,
            _number,
            msg.value,
            block.number.add(addedBlockHeight),
            false
        ));
        emit NewBet(bets.length, msg.sender, BetType.Single, _number, msg.value);
    }

    function betEven() payable public transactionHasEther() ableToPayout(msg.value, BetType.Even) {
        bets.push(Bet(
            BetType.Even,
            msg.sender,
            0,
            msg.value,
            block.number.add(addedBlockHeight),
            false
        ));
        emit NewBet(bets.length, msg.sender, BetType.Even, 0, msg.value);
    }

    function betOdd() payable public transactionHasEther() ableToPayout(msg.value, BetType.Even) {
        bets.push(Bet(
            BetType.Odd,
            msg.sender,
            0,
            msg.value,
            block.number.add(addedBlockHeight),
            false
        ));
        emit NewBet(bets.length, msg.sender, BetType.Odd, 0, msg.value);
    }
    
    function getWinningNumber(uint _betId) public view returns(uint) {
        Bet storage bet = bets[_betId];
        require(bet.player != address(0));
        require(bet.requiredBlockHeight <= block.number);
        
        bytes32 hashedBlock = blockhash(bet.requiredBlockHeight);
        bytes32 numberHash = keccak256(abi.encodePacked(
            hashedBlock,
            bet.player,
            lastPlayer,
            _betId,
            address(this)
        ));
        uint number = uint8(numberHash) % PLAYING_NUMBERS_COUNT;
        
        return number;
    }
    
    function payoutWinningBet(uint _betId) public {
        Bet storage bet = bets[_betId];
        require(bet.player != address(0));
        require(isAbleToPayout(bet.value, bet.betType));
        require(!bet.passed);
        
        uint winningNumber = getWinningNumber(_betId);
        bet.passed = true;
        
        uint payout = getPayoutForType(bet.betType);
        if (bet.betType == BetType.Single) {
            require(bet.number == winningNumber);
            bet.player.transfer(bet.value.mul(payout));
        } else if (bet.betType == BetType.Odd) {
            require(winningNumber % 2 != 0);
            bet.player.transfer(bet.value.mul(payout));
        } else if (bet.betType == BetType.Even) {
            require(winningNumber % 2 == 0);
            bet.player.transfer(bet.value.mul(payout));
        }
    }
    
    function() public payable {
    }
    
    function isAbleToPayout(uint _value, BetType _betType) public view returns(bool) {
        uint payout = getPayoutForType(_betType);
        return address(this).balance >= _value.mul(payout);
    }

    function getPayoutForType(BetType _betType) public view returns(uint) {
        if (_betType == BetType.Single) { 
            return PAYOUT_SINGLE;
        } else if (_betType == BetType.Even || _betType == BetType.Odd) {
            return PAYOUT_EVEN_ODD;
        } else if (_betType == BetType.Red || _betType == BetType.Black) {
            return PAYOUT_COLOR;
        } else {
            return 0;
        }
    }
}