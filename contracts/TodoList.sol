// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract ToDoList {
    struct Task {
        uint id;
        uint date;
        string name;
        string description;
        bool isCompleted;
        bool isDeleted;
        address owner;
    }

    Task[] private tasks;

    event TaskCreated(uint id, address owner);

    event TaskCompleted(uint id, address owner);

    event TaskDeleted(uint id, address owner);

    function createTask(string memory name, string memory description) public {
        uint taskId = tasks.length;

        tasks.push(
            Task(
                taskId,
                block.timestamp,
                name,
                description,
                false,
                false,
                msg.sender
            )
        );
        emit TaskCompleted(taskId, msg.sender);
    }

    function getTask() public view returns (Task[] memory) {
        Task[] memory temporery = new Task[](tasks.length);
        uint counter = 0;
        for (uint i = 0; i < tasks.length; i++) {
            if (tasks[i].owner == msg.sender && tasks[i].isDeleted == false) {
                temporery[counter] = tasks[i];
                counter++;
            }
        }
        Task[] memory result = new Task[](counter);
        for (uint i = 0; i < counter; i++) {
            result[i] = temporery[i];
        }
        return result;
    }

    function markTaskCompleted(uint id) public {
        require(
            id < tasks.length || tasks[id].isDeleted == true,
            "Task ID does not exit"
        );
        Task storage task = tasks[id];
        require(task.owner == msg.sender, "Only Owner can complete this task");
        require(!task.isCompleted, "Task is aleady completed");
        task.isCompleted = true;
        emit TaskCompleted(id, msg.sender);
    }

    function deletedTask(uint id) public {
        require(
            id < tasks.length || tasks[id].isDeleted == true,
            "Task Id does not exit"
        );
        Task storage task = tasks[id];
        require(task.owner == msg.sender, "Only Owner can complete this task");
        tasks[id].isDeleted = true;
        emit TaskDeleted(id, msg.sender);
    }
}
