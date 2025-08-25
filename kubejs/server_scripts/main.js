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
    const mob = event.entity;
    const id = String(mob?.type) || "";

    // Skip Creeper Overhaul creepers
    if (id.startsWith("creeperoverhaul:")) return;

    if (!HEAD_MOBS.includes(id)) return;

    // --- Remove head/skull ---
    const head = mob.getEquipment('head') || mob.getArmor(3);
    if (head?.id && (head.id.includes('head') || head.id.includes('skull'))) {
        mob.setEquipment('head', Item.of('minecraft:air'));
        mob.setArmor(3, Item.of('minecraft:air'));
    }

    // --- Remove passengers ---
    const passengers = mob.getPassengers();
    if (passengers.length > 0) {
        passengers.forEach(passenger => {
            passenger.kill();
            console.log(`Removed passenger ${String(passenger?.type)} from ${id}`);
        });
    }
});

