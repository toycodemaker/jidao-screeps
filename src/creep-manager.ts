function create_screep(sname:string, name:string, constant:BodyPartConstant[])
{
    Game.spawns[sname].createCreep(constant,name);
    let creep:Creep = Game.creeps[name];
    let room = Game.spawns[sname].room;
    room.memory.creeps.push({id:null,name:creep.name});
}

//当没有ID缓存的时候来重新生成一个缓存
function handle_screeps(room:Room):void
{
    let creeps = Game.creeps;
    if (room.memory.harv === undefined){
        room.memory.harv = Array<{id:Id<Creep>,name:string}>();
    }
    for (var cname in creeps){
        let creep = creeps[cname];
        if (creep.memory.role === "harv"){
            room.memory.harv.push({id:creep.id,name:cname});
        }
    }

//end of handle_screeps
}

class HarvestManager implements Manager
{
    constructor(spawn:string,creep_num:number,constant:BodyPartConstant[]){
        let room = Game.spawns[spawn].room;
        if (room.memory.harv === undefined){
            handle_screeps(room);
        }
        if (room.memory.harv.length < creep_num){
            create_screep(spawn,"harv"+Game.time.toString(),constant);
        }
    }

    work():void{}
};
