# Async Mikronode Tools

An unofficial Async Tools from Mikronode

```javascript
const AsyncMikronode = require('./mikronode-tools/commandsMikrotik');
(async () => {
    try {
        let MikronodeObject = await AsyncMikronode.rawCmd('/ip/route/print');
        let MikronodeArray = AsyncMikronode.rawToObject(MikronodeObject)
        console.log(MikronodeArray);
    } catch (error) {
        console.error(error);
    }
})();
```


Official Repository
https://github.com/Trakkasure/mikronode
Thanks @Trakkasure
