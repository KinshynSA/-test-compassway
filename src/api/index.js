export async function getTorExitNodeList({
    batchSize,
    offset
}){
    let res;

    const key = 'bdc_644da0305f5d4e648245fba7e7fc19c2';
    await fetch(`https://api.bigdatacloud.net/data/tor-exit-nodes-list?key=${key}&batchSize=${batchSize}&offset=${offset}`, {
        method: 'GET',
    })
    .then(response => response.json())
    .then(result => {
        res = result;
    })
    .catch(error => console.log('error',error))

    return res;
}

export async function getVisitopIp(){
    let res;
    await fetch('https://ipapi.co/json/')
    .then(response => response.json())
    .then(result => res = result)
    .catch(error => console.log('error',error))

    return res.ip;
}