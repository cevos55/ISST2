import express from 'express';
import bodyParser from 'body-parser';
import fetch from 'node-fetch';
import { GoogleAuth } from 'google-auth-library';
import fs from 'fs';

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Middleware pour gérer les CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

// Chemin vers votre fichier d'identification JSON
const KEY_FILE_PATH = 'C:/Users/kenne/Desktop/Chatbot/kenne-mqcu-e488f34f412b.json';

app.post('/dialogflow', async (req, res) => {
    const projectId = 'kenne-mqcu'; // Remplacez par votre ID de projet
    const sessionId = 'quickstart-session-id';

    const requestBody = req.body;
    console.log("Request Body:", requestBody);

    try {
        // Charge les informations d'identification du fichier JSON
        const auth = new GoogleAuth({
            keyFile: KEY_FILE_PATH,
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
