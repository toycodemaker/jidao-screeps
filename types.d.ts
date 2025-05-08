interface CreepStorage{
	id:Id<Creep>;
	name:string;
}

interface RoomMemory{
	con_creep:CreepStorage[];
}
