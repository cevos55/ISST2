import dotenv from 'dotenv';
dotenv.config();
import { GoogleAuth } from 'google-auth-library';
import dialogflow from '@google-cloud/dialogflow';

const KEY_FILE_PATH = process.env.GOOGLE_APPLICATION_CREDENTIALS;
const projectId = 'kenne-mqcu'; // Remplacez par votre ID de projet

async function updateIntent(intentData) {
    const auth = new GoogleAuth({
        keyFile: KEY_FILE_PATH,
        scopes: 'https://www.googleapis.com/auth/cloud-platform'
    });

    const client = await auth.getClient();

    const dialogflowClient = new dialogflow.v2.IntentsClient({
        auth: client
    });

    const request = {
        parent: `projects/${projectId}/agent`,
        intent: intentData
    };

    try {
        const [response] = await dialogflowClient.createIntent(request);
        console.log('Intent updated successfully:', response);
        return response;
    } catch (error) {
        console.error('Error updating intent:', error);
    }
}

// Exemple d'utilisation pour mettre à jour un intent
const newIntent = {
    displayName: 'New Intent',
    trainingPhrases: [{
        type: 'EXAMPLE',
        parts: [{ text: 'Hello' }]
    }],
    messages: [{ text: { text: ['Hello! How can I assist you?'] } }]
};

updateIntent(newIntent);
