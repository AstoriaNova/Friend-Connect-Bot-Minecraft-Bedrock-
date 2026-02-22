const { BedrockPortal, Joinability, Modules } = require('bedrock-portal')
const { Titles } = require('prismarine-auth')

const main = async () => {

    const portal = new BedrockPortal({
        joinability: Joinability.FriendsOfFriends,

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
            hostName: 'Host Name',
            name: 'Worlds Name',
            version: '1.26.0',
            memberCount: 1,
            maxMemberCount: 100
        }
    })

    portal.use(Modules.AutoFriendAdd, {
        acceptRequests: true,
        followBack: true,
        inviteOnAdd: false
    })

    portal.use(Modules.ServerFromList, {
        form: {
            title: '§8Form Title',
            content: '',
            buttons: [
                {
                    text: '§8Button name\n§8Button Description!',
                    ip: 'serverip',
                    port: serverport
                }
            ]
        },
        timeout: 60000,
        timeoutMessage: '§cYou took too long to select a server!'
    })

    portal.use(Modules.UpdateMemberCount, {
        updateInterval: 5000,
        updateMaxMemberCount: true
    })

    portal.on('sessionCreated', async () => {
        console.log('[SESSION] Created')
        await forceFollowAll(portal)
    })

    portal.on('playerJoin', (player) => {
        console.log(`[JOIN] ${player.profile.gamertag} joined`)
    })

    portal.on('playerLeave', (player) => {
        console.log(`[LEAVE] ${player.profile.gamertag} left`)
    })

    await portal.start()
    console.log('Saturn Portal Bot is online')
}

async function forceFollowAll(portal) {
    try {
        const xbox = portal.xbox

        console.log('[SYNC] Fetching followers...')

        const followers = await xbox.people.getFollowers()

        if (!Array.isArray(followers)) {
            console.log('[SYNC] Unexpected response:', followers)
            return
        }

        let count = 0

        for (const user of followers) {
            try {
                await xbox.people.addFriend(user.xuid)
                console.log(`[FOLLOWED BACK] ${user.gamertag}`)
                count++

                await new Promise(r => setTimeout(r, 700))

            } catch {
            }
        }

        console.log(`[SYNC COMPLETE] Followed ${count} users.`)

    } catch (err) {
        console.error('[SYNC ERROR]', err)
    }
}

main().catch(console.error)