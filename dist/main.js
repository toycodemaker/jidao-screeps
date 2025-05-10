"use strict";
//这是用来测试能否使用ts来开发screeps的
//现在看起来是可以的
function save_creep(room, creep) {
    let id = creep.id;
    let name = creep.name;
    if (!room.memory.con_creep) {
        room.memory.con_creep = {};
    }
    room.memory.con_creep[name] = id;
}
function get_creep(room, name) {
    let gcreep;
    if (room.memory.con_creep === undefined) {
        gcreep = null;
    }
    else {
        let id = room.memory.con_creep[name];
        gcreep = Game.getObjectById(id);
    }
    let creep;
    if (gcreep === null) {
        let spawn = Game.spawns["s1"];
        spawn.spawnCreep([WORK, CARRY, MOVE], 'harv1');
        console.log("creat a harvester at ", Game.time);
        creep = Game.creeps["harv1"];
        save_creep(spawn.room, creep);
    }
    else
        creep = gcreep;
    return creep;
}
module.exports.loop = function () {
    let spawn = Game.spawns["s1"];
    let creep = get_creep(spawn.room, "harv1");
    //升级控制器
    if (creep.memory.srcp === undefined) {
        console.log("shit");
        var sources = creep.room.find(FIND_SOURCES);
        creep.memory.srcp = sources[0].id;
    }
    let gsource = Game.getObjectById(creep.memory.srcp);
    let source;
    if (gsource === null) {
        console.log("no");
        var sources = creep.room.find(FIND_SOURCES);
        source = sources[0];
    }
    else
        source = gsource;
    if (creep.memory.status === undefined)
        creep.memory.status = 1;
    if (creep.memory.status === 1) {
        //console.log(source.pos);
        if (creep.harvest(source) === ERR_NOT_IN_RANGE) {
            creep.moveTo(source, { visualizePathStyle: { stroke: '#ffffff' } });
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
