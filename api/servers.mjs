import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const apiKey = process.env.GOOGLE_MAPS_API_KEY;

app.use(express.static('public'));

app.get('/map', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="fr">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Google Maps</title>
      <script src="https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initMap" async defer></script>
      <script>
        function initMap() {
          const mapOptions = {
            zoom: 10 // Niveau de zoom initial
          };
          const map = new google.maps.Map(document.getElementById('map'), mapOptions);

          // Définir les limites de la zone (bounds) autour de Bangangté
          const bounds = new google.maps.LatLngBounds(
            { lat: 5.118, lng: 10.458 }, // Coordonnées sud-ouest
            { lat: 5.488, lng: 10.818 }  // Coordonnées nord-est
          );

          // Adapter la carte aux limites définies
          map.fitBounds(bounds);

          console.log('Google Maps initialized with bounds', bounds);
        }
      </script>
    </head>
    <body>
      <div id="map" style="height: 500px; width: 100%;"></div>
    </body>
    </html>
  `);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
