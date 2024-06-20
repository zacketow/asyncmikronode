const donnasib = {
    host:"172.30.10.68",
    port:"8728",
    user:"admin",
    pass:"m0ch1m@2019..",
}

const caciqueiii = {
    host: "172.30.10.68",
    port: "8728",
    user: "admin",
    pass: "m0ch1m@2019..",
}
module.exports.get = (barco) => {
    let config
    switch (barco) {
        case 3:
            config = caciqueiii;
            break;
        case 5:
            config = donnasib;
            break;
    }
    return config;
}