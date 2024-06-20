const AsyncMikronode = require('./mikronode-tools/asyncMikrotik');
(async () => {
    try {
        let MikronodeObject = await AsyncMikronode.rawCmd('/ip/dhcp-server/lease/print');
        let MikronodeArray = AsyncMikronode.rawToObject(MikronodeObject)
        let users = []
       
        MikronodeArray.forEach((user,key) => {
            users[key] = {interface:'bridge1',address:user.address,'mac-address':user['mac-address']}
        });
        
        
        users.forEach(async user => {
            if (user['mac-address'] === 'B4:45:06:A1:A4:27'){
                await AsyncMikronode.rawCmd('/ip/arp/add', user)
            }
        })
    } catch (error) {
        console.error(error);
    }
})();
