import { createConnection } from 'typeorm';

createConnection().then(() => {
    console.log('Conexão criada com sucesso');
}).catch(reason => {
    console.log('Não foi possivel conectar com o bancoo');
    console.error(reason);

    process.exit(1);
});