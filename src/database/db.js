const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');
dotenv.config();
const uri = process.env.MONGODB_URI; // Assurez-vous que cette variable d'environnement est définie dans votre .env
const client = new MongoClient(uri);

async function connectDB() {
  try {
    await client.connect();
    console.log("✅ Connecté à MongoDB local");

    const db = client.db("Hina"); // ta base locale

    return db;
  } catch (err) {
    console.error("❌ Erreur MongoDB :", err);
  }
}

module.exports = { client, connectDB };