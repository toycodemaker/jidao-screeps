interface RoomMemory{
	con_creep?:{[name:string]:Id<Creep>};
    creeps:Array<{id:Id<Creep>|null,name:string}>;
    harv:Array<{id:Id<Creep>,name:string}>;
}

interface CreepMemory{
	status:number;
	srcp:Id<Source>
    role:string;
}

interface Manager{
    work():void;
}

