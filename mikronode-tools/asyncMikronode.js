const MikroNode = require('./mikronode');
let _ = require('lodash');
require('dotenv').config()

function makeid(l) {let r='';const c='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';const cl=c.length;let ct=0;while(ct<l){r+=c.charAt(Math.floor(Math.random()*cl));ct+=1;}return r;}

module.exports.AsyncMikronode = async (Device,cmd,args = {},debug = false) =>{
    let fn = Device.openChannel(makeid(5), true);
    fn.write(cmd,args);
    let result = await new Promise(async function (resolve, reject) { try { fn.on('done', function (r) { if (debug) { resolve(r) }else{resolve(r.data)} }); } catch (e) { reject(MikroNode.resultsToObj(e)) } })
    fn.close();
    return result
}

module.exports.DeviceConfig = async (barco) => {
    let host,port,user,password;
    if(_.isEmpty(barco)){
        host = process.env.MK_HOST;
        port = process.env.MK_PORT; 
        user = process.env.MK_USER; 
        password = process.env.MK_PASS;
    } else {
        host = barco.host;
        port = barco.port;
        user = barco.user;
        password = barco.pass;
    }
    return new Promise(async function (resolve, reject) {
        try {
            new MikroNode(host, port).connect().then(([login]) => { resolve(login(user, password)) })
        } catch (e) {
            reject(MikroNode.resultsToObj(e))
        }
    })
}