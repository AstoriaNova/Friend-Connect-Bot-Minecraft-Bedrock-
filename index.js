const { BedrockPortal, Joinability, Modules } = require('bedrock-portal')
const { Titles } = require('prismarine-auth')

const main = async () => {

    const portal = new BedrockPortal({

        joinability: Joinability.FriendsOnly,

        authflow: {
            username: 'Bots Username',
            cache: './auth',
            options: {
                flow: 'sisu',
                authTitle: Titles.MinecraftAndroid,
                deviceType: 'Android'
            }
        },

        world: {
            hostName: 'Hosts Name',
            name: 'Hosts World Name',
            version: '1.26.0',
            memberCount: 1,
            maxMemberCount: 100
        }
    })

    portal.use(Modules.AutoFriendAdd, {
        inviteOnAdd: true,
        checkInterval: 15000,
        addInterval: 2000,
    });

    portal.use(Modules.ServerFromList, {
        form: {
            title: 'Form Title',
            content: 'Form Body',
            buttons: [
                {
                    text: 'Form Button Text',
                    ip: 'Server Ip',
                    port: ServersPort
                }
                //Exmaple Of How To Add Another
                //,
                // {
                //     text: 'Form Button Text',
                //     ip: 'Server Ip',
                //     port: ServersPort
                // }
            ]
        },
        timeout: 60000,
        timeoutMessage: '§cYou took too long to select a server!'
    })

    portal.use(Modules.UpdateMemberCount, {
        updateInterval: 60000,
        updateMaxMemberCount: true
    })

    portal.on('playerJoin', (player) => {
        console.log(`[JOIN] ${player.profile.gamertag} joined the session`)
    })

    portal.on('playerLeave', (player) => {
        console.log(`[LEAVE] ${player.profile.gamertag} left the session`)
    })

    portal.on('sessionCreated', () => {
        console.log('[SESSION] Portal session created')
    })

    portal.on('sessionUpdated', () => {
        console.log('[SESSION] Portal session updated')
    })

    await portal.start()
    console.log('Saturn Portal Bot is online')
}

main()
