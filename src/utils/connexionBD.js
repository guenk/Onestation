const { Client } = require('ssh2');
const mysql = require('mysql2/promise');
require('dotenv').config();

const sshConfig = {
    host: process.env.SSH_HOST,
    port: process.env.SSH_PORT,
    username: process.env.SSH_USER,
    password: process.env.SSH_PASSWORD
};

const dbConfig = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
};

const sshClient = new Client();

exports.connect = () => {
    return new Promise(async (resolve, reject) => {
        try {
            sshClient.on('ready', () => {
                console.log('Connexion SSH établie.');

                sshClient.forwardOut('127.0.0.1', 12345, dbConfig.host, dbConfig.port, async (err, stream) => {
                    if (err) {
                        reject(err);
                        return;
                    }

                    dbConfig.stream = stream;

                    try {
                        const connection = await mysql.createConnection(dbConfig);
                        resolve(connection);

                        await connection.end();
                    } catch (error) {
                        console.error('Erreur lors de la récupération des données :', error);
                        reject({ error: 'Erreur lors de la récupération des données' });
                    }
                });
            }).connect(sshConfig);
        } catch (error) {
            console.error('Erreur lors de la connexion SSH:', error);
            reject({ error: 'Erreur lors de la connexion SSH' });
        }
    });
}