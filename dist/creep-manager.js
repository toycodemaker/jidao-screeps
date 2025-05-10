"use strict";
function create_screep(sname, name, constant) {
    Game.spawns[sname].createCreep(constant, name);
    let creep = Game.creeps[name];
    let room = Game.spawns[sname].room;
    //room.memory.creeps.push({creep.id,creep.name});
}
//当没有ID缓存的时候来重新生成一个缓存
function handle_screeps(room) {
    let creeps = Game.creeps;
    for (const name of creeps) {
        if (name.memory.role === "harv") {
            if (room.memory.harv === undefined)
                ;
        }
        class HarvestManager {
            constructor(room) {
                if (room.memory.harv === undefined) {
                    handle_screeps(room);
                }
            }
            work() { }
        }
        ;
    }
}
