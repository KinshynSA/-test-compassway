function checkForError(response){
    if(!response.ok) throw new Error(response.status);
    return response;
}


export async function getTorExitNodes({
    batchSize,
    offset
}){
    const key = 'bdc_1a0680a123f74345be1037241793fcc1';
    return await fetch(`https://api.bigdatacloud.net/data/tor-exit-nodes-list?key=${key}&batchSize=${batchSize}&offset=${offset}`, {
        method: 'GET',
    })
    .then(checkForError)
    .then(response => response.json())
    .then(result => {
        return [null, result]
    })
    .catch(error => {
        console.log('error',error)
        return [error, null]
    })
}

export async function getMyIp(){
    return await fetch('https://api.ipify.org?format=json')
    .then(checkForError)
    .then(response => response.json())
    .then(result => {
        return [null, result.ip]
    })
    .catch(error => {
        console.log('error',error)
        return [error, null]
    })
}