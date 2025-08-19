
StartupEvents.registry('item', event => {
    // Hardcoded list for now (better: dynamically load from tag later if needed)
    const mobs = [
        'illagerinvasion:necromancer',
        'illagerinvasion:archivist',
        'illagerinvasion:surrendered'
        // Add more manually here if needed
    ];

    const registered = new Set();

    mobs.forEach(mobId => {
        const mobName = mobId.split(':')[1];
        const itemId = `invisible_marker_${mobName}`;

        if (registered.has(itemId)) {
            console.warn(`[InvisibleModelMarkers] Skipping duplicate: ${itemId}`);
            return;
        }

        registered.add(itemId);

        event.create(itemId)
            .displayName(`Invisible Marker - ${mobName}`) // Only visible in creative/debug
            .texture('kubejs:item/invisible_item.png');   // Make sure this texture exists!
    });
});
