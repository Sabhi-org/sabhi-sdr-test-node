const { agent } = require('./agent');
let anArr = [];
const vc = async (data) => {
    try {
        const { did } = data;
        delete data.did;
        delete data.uri;
        for (let p in data) {
            if (!data.hasOwnProperty(p)) {
                // The current property is not a direct property of p
                continue;
            }
            
            let obj = {
                [p]: data[p]
            }
            await vcGenerator(did, obj);

        }

        console.log(anArr);
        return anArr;

    } catch (error) {
        console.log(error);
    }
};

const vcGenerator = async (did, obj) => {
    let vc = await agent.createVerifiableCredential({
        credential: {
            issuer: { id: did },
            '@context': ['https://www.w3.org/2018/credentials/v1'],
            type: ['VerifiableCredential'],
            issuanceDate: new Date().toISOString(),
            credentialSubject: {
                id: did,
                ...obj
            },
        },
        proofFormat: 'jwt',
    });
    anArr.push(vc);
}

module.exports = {
    vc,
}