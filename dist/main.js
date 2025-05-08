"use strict";
function save_creep(room, creep) {
    let id = creep.id;
    let name = creep.name;
    if (!room.memory.con_creep) {
        room.memory.con_creep = {};
    }
    room.memory.con_creep[name] = id;
}
function get_creep(room, name) {
    if (!room.memory.con_creep)
        return null;
    let id = room.memory.con_creep[name];
    let creep = Game.getObjectById(id);
    if (creep === null) {
        let spawn = Game.spawns["s1"];
        spawn.spawnCreep([WORK, CARRY, MOVE], 'harv1');
        console.log("creat a harvester at ", Game.time);
        creep = Game.creeps["harv1"];
        save_creep(spawn.room, creep);
    }
    return creep;
}
module.exports.loop = function () {
    let spawn = Game.spawns["s1"];
    var gcreep = get_creep(spawn.room, "harv1");
    let creep;
    if (gcreep === null) {
        spawn.spawnCreep([WORK, CARRY, MOVE], 'harv1');
        console.log("creat a harvester at ", Game.time);
        creep = Game.creeps["harv1"];
        save_creep(spawn.room, creep);
    }
    else
        creep = gcreep;
    //升级控制器
    if (creep.memory.status === undefined)
        creep.memory.status = 1;
    if (creep.memory.status === 1) {
        var sources = creep.room.find(FIND_SOURCES);
        if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
            creep.moveTo(sources[0], { visualizePathStyle: { stroke: '#ffffff' } });
        }
        if (creep.store.getFreeCapacity() === 0)
            creep.memory.status = 0;
    }
    else if (creep.memory.status === 0) {
        if (spawn.room.controller &&
            creep.upgradeController(spawn.room.controller) === ERR_NOT_IN_RANGE)
            creep.moveTo(spawn.room.controller, { visualizePathStyle: { stroke: '#ffffff' } });
        if (creep.store.getUsedCapacity() === 0)
            creep.memory.status = 1;
    }
};
