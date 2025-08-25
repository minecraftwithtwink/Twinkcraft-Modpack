// mob_gear_assigner.js

// List of mobs you want to give invisible markers to
const markerMobIds = [
    'illagerinvasion:necromancer',
    'illagerinvasion:archivist',
    'illagerinvasion:surrendered',
    // Add more mobs here
];

EntityEvents.spawned(event => {
    const entity = event.entity;

    if (!entity.isLiving()) return;

    const id = entity.type.toString();

    if (markerMobIds.includes(id)) {
        const mobName = id.split(':')[1]; // Get 'necromancer' or 'archivist'
        const markerItemId = `kubejs:invisible_marker_${mobName}`;
        const markerItem = Item.of(markerItemId);

        entity.setItemInHand('main_hand', markerItem);
        entity.getHandDropChance('main_hand', 0.0); // Prevent dropping

        console.log(`[MobGearAssigner] Gave ${markerItemId} to ${id}`);
    }
});
