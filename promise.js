
async function consultarGoogle() {
    var google = await fetch('https://example.com')
    console.log(google.status)
}

consultarGoogle()