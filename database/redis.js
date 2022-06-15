const redis = require('redis');

const client = redis.createClient({
        url: "redis://localhost:6379"
    });
    
module.exports = {
    
    async inserirPessoa(pessoa) {
    
        await client.connect();
        try {
            const resultado = await client.set(pessoa.email, JSON.stringify(pessoa), {
                EX: 3600
            });
            console.log(resultado);
        } catch(e) {
            console.log(`Error: ${e}`);
        };
    
    },
    
    async recuperarPessoa(email) {
        try {
            await client.connect();
            const resultado = await client.get(email);
            return resultado;
        } catch(e) {
            console.log(`Error: ${e}`);
        }
    }
}


