
const MikroNode = require('./mikronode');
const { DeviceConfig, AsyncMikronode } = require('./asyncMikronode')
module.exports.addHotspotUser = async function  (user = '22572872'){
        const Device = await DeviceConfig();
        let users = MikroNode.resultsToObj(await AsyncMikronode(Device, '/ip/hotspot/user/print'))
        let isRegister = false;
        let addResult = [];
        users.forEach(userlist => {
                if(userlist.name === user){
                        isRegister = true;
                        addResult[0] = userlist['.id'].replace('*', '')
                }       
        });
        if(!isRegister){
                addResult = await AsyncMikronode(Device, '/ip/hotspot/user/add', { 'server': 'hotspot1', 'name': user, 'profile': 'aDevice', 'limit-bytes-in': '2097152' })
        }
        Device.close()    
        return addResult[0].replace('*','');
}
module.exports.delHotspotUser = async function (id) {
        const Device = await DeviceConfig();
        await AsyncMikronode(Device, '/ip/hotspot/user/remove', { '.id': '*'+id },true)
        let isDelete = true;
        let addResult = [];
        let users = MikroNode.resultsToObj(await AsyncMikronode(Device, '/ip/hotspot/user/print'))
        users.forEach(userlist => {
                if (userlist['.id'] === '*'+id) {
                        isDelete = false;
                        addResult[0] = userlist['.id'].replace('*', '')
                }
        });
        Device.close()

        return isDelete;
}
module.exports.hotspotList = async function () {
        const Device = await DeviceConfig();
        let active = MikroNode.resultsToObj(await AsyncMikronode(Device, '/ip/hotspot/active/print'))
        let users = MikroNode.resultsToObj(await AsyncMikronode(Device, '/ip/hotspot/user/print'))
        let hosts = MikroNode.resultsToObj(await AsyncMikronode(Device, '/ip/hotspot/host/print'))
        Device.close()
        return { active, users, hosts };
}

module.exports.routes = async function () {
        const Device = await DeviceConfig();
        let routes = MikroNode.resultsToObj(await AsyncMikronode(Device, '/ip/route/print'))
        Device.close()
        return routes;
}

module.exports.dhcpServerLeases = async function () {
        const Device = await DeviceConfig();
        let routes = MikroNode.resultsToObj(await AsyncMikronode(Device, '/ip/dhcp-server/lease/print'))
        Device.close()
        return routes;
}
module.exports.rawCmd = async function (Cmd,Args = {}) {
        const Device = await DeviceConfig();
        let result = await AsyncMikronode(Device, Cmd, Args)
        Device.close()
        return result;
}
module.exports.rawToObject = function (obj) {
       let result =  MikroNode.resultsToObj(obj);
       return result;
}