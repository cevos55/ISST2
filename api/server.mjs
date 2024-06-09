import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import bodyParser from 'body-parser';
import fetch from 'node-fetch';
import { GoogleAuth } from 'google-auth-library';
import fs from 'fs';

// Chemin vers votre fichier de clés JSON
const credentialsPath = './credentials.json';

// Charger le contenu du fichier JSON
const credentials = JSON.parse(fs.readFileSync(credentialsPath, 'utf8'));

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

// Middleware pour gérer les CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

// Route pour renvoyer une réponse de test à la route /api/server
app.get('/api/server', (req, res) => {
    res.send('Hello from server!');
});

app.post('/dialogflow', async (req, res) => {
    const projectId = 'kenne-mqcu'; // Remplacez par votre ID de projet
    const sessionId = 'quickstart-session-id';

    const requestBody = req.body;
    console.log("Request Body:", requestBody);

    try {
        // Utiliser les informations d'identification à partir du fichier de clés JSON
        const auth = new GoogleAuth({
            credentials: credentials,
            scopes: 'https://www.googleapis.com/auth/cloud-platform'
        });

        const client = await auth.getClient();

        // Obtient le jeton d'accès OAuth2
        const token = await client.getAccessToken();

        const url = `https://dialogflow.googleapis.com/v2/projects/${projectId}/agent/sessions/${sessionId}:detectIntent`;

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token.token}`
            },
            body: JSON.stringify(requestBody)
        });

        console.log("Response Status:", response.status);
        console.log("Response Headers:", response.headers);

        if (!response.ok) {
            const errorText = await response.text();
            console.error("Error Response:", errorText);
            throw new Error('Erreur réseau');
        }

        const data = await response.json();
        console.log("Response Data:", data);
        res.json(data);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Erreur serveur' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

export default app;
