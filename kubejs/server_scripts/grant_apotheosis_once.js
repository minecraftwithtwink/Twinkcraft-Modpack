PlayerEvents.loggedIn(event => {
    const player = event.player

    // Only run for players joining the server for the first time
    if (!player.persistentData.apotheosisGranted) {
        player.persistentData.apotheosisGranted = true

        // Grant the advancement using the raw command
        player.runCommandSilent('advancement grant @s only apotheosis:progression/haven')
    }
})
