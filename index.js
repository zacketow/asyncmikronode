const AsyncMikronode = require('./mikronode-tools/asyncMikrotik');
(async () => {
    try {
        let MikronodeObject = await AsyncMikronode.rawCmd('/ip/route/print');
        let MikronodeArray = AsyncMikronode.rawToObject(MikronodeObject)
        console.log(MikronodeArray);
    } catch (error) {
        console.error(error);
    }
})();
