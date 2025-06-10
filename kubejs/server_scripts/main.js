const HEAD_MOBS = [
    'minecraft:zombie',
    'minecraft:skeleton',
    'minecraft:piglin',
    'minecraft:piglin_brute',
    'minecraft:stray',
    'minecraft:husk',
    'minecraft:drowned'
];

// Remove skull/head items from specific mobs on spawn
EntityEvents.spawned(event => {
    const entity = event.entity;
    if (!HEAD_MOBS.includes(entity.type)) return;

    const head = entity.getEquipment('head') || entity.getArmor(3);
    if (!head || !head.id) return;

    if (head.id.includes('head') || head.id.includes('skull')) {
        entity.setEquipment('head', Item.of('minecraft:air'));
        entity.setArmor(3, Item.of('minecraft:air'));
    }
});

// Remove any passengers riding specific mobs
EntityEvents.spawned(event => {
    const mob = event.entity;

    if (!HEAD_MOBS.includes(mob.type)) return;
    const passengers = mob.getPassengers();
    if (passengers.length === 0) return;

    passengers.forEach(passenger => {
        passenger.kill();
        console.log(`Removed passenger ${passenger.type} from ${mob.type}`);
    });
});