// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

error ErrorTitle();
error ErrorDescription();
error ErrorImage();
error ErrorStartsAt();
error ErrorEndsAt();


contract DappVotes {

    struct Poll {
        uint id;
        string image;
        string title;
        string description;
        uint votes;
        uint contestants;
        bool deleted;
        address director;
        uint startsAt;
        uint endsAt;
        uint timestamp;
        address[] voters;
        string[] avatars;
    }

    struct Contestant {
        uint id;
        string image;
        string name;
        address voter;
        uint votes;
        address[] voters;
    }

    uint public totalPolls = 0;
    uint public totalContestants = 0;
    mapping(uint => bool) public pollExist;
    mapping(uint => Poll) public polls;
    mapping(uint => mapping(address => bool)) public voted; 
    mapping(uint => mapping(address => bool)) public contested; 
    mapping(uint => mapping(uint => Contestant)) public contestants; 

    function createPoll(string calldata _image, string calldata _title, string calldata _description, uint _startsAt, uint _endsAt) public returns (uint) {
        if (bytes(_title).length == 0) {
            revert ErrorTitle();
        }

        if (bytes(_description).length == 0) {
            revert ErrorDescription();
        }

        if (bytes(_image).length == 0) {
            revert ErrorImage();
        }

        if (_startsAt <= block.timestamp) {
            revert ErrorStartsAt();
        }
        if (_endsAt <= _startsAt) {
            revert ErrorEndsAt();
        }

        Poll storage poll = polls[totalPolls];
        poll.id = totalPolls;
        poll.title = _title;
        poll.description = _description;
        poll.image = _image;
        poll.startsAt = _startsAt;
        poll.endsAt = _endsAt;
        poll.director = msg.sender;
        poll.timestamp = block.timestamp;

        pollExist[totalPolls] = true;
        totalPolls++;
        return totalPolls - 1;
    }

   function updatePoll( uint _id,string calldata _image,string calldata _title,string calldata _description,uint _startsAt, uint _endsAt) public {
        Poll storage poll = polls[_id];
        poll.image = _image;
        poll.title = _title;
        poll.description = _description;
        poll.startsAt = _startsAt;
        poll.endsAt = _endsAt;
    }

    function deletePoll(uint id) public {
        polls[id].deleted = true;
    }

    function getPoll(uint id) public view returns (Poll memory) {
        return polls[id];
    }

    
    function getPolls() public view returns (Poll[] memory) {
        uint availableCount = 0;

        for (uint i = 0; i < totalPolls; i++) {
            if (!polls[i].deleted) {
                availableCount++;
            }
        }

        Poll[] memory availablePolls = new Poll[](availableCount);
        uint index = 0;

        for (uint i = 0; i < totalPolls; i++) {
            if (!polls[i].deleted) {
                availablePolls[index] = polls[i];
                index++;
            }
        }

        return availablePolls;
    }

    function contest(uint id, string calldata _name, string calldata _image) public {
        
        Contestant memory contestant;
        contestant.id = totalContestants;
        contestant.name = _name;
        contestant.image = _image;
        contestant.voter = msg.sender;

        contestants[id][contestant.id] = contestant;
        contested[id][msg.sender] = true;
        polls[id].avatars.push(_image);
        polls[id].contestants++;
        totalContestants++;
    }

    function getContestant(uint id, uint cid) public view returns (Contestant memory) {
        return contestants[id][cid];
    }

    function getContestants(uint id) public view returns (Contestant[] memory) {
       
        uint availableCount = 0;

        for (uint i = 0; i < totalContestants; i++) {
            if (contestants[id][i].id == i) {
                availableCount++;
            }
        }

        Contestant[] memory availableContestants = new Contestant[](availableCount);
        uint index = 0;

        for (uint i = 0; i < totalContestants; i++) {
            if (contestants[id][i].id == i) {
                availableContestants[index] = contestants[id][i];
                index++;
            }
        }

        return availableContestants;
    }

    function vote(uint id, uint cid) public {
        polls[id].votes++;
        polls[id].voters.push(msg.sender);
        contestants[id][cid].votes++;
        contestants[id][cid].voters.push(msg.sender);
        voted[id][msg.sender] = true;
    }


    function currentTime() internal view returns(uint256){
        return (block.timestamp * 1000) + 1000;
    }
}
