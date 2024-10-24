const admin = require("firebase-admin");
const fs = require("fs");
const path = require("path");

// Initialize Firebase Admin SDK
const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "gs://ucc-portal-2b7ba.appspot.com",
});

const bucket = admin.storage().bucket();

// Path to the local directory containing images
const directoryPath = path.join(__dirname, "url_8");

fs.readdir(directoryPath, (err, files) => {
  if (err) {
    return console.log("Unable to scan directory: " + err);
  }

  files.forEach((file) => {
    const filePath = path.join(directoryPath, file);
    const destination = `wooden/${file}`;

    bucket
      .upload(filePath, {
        destination: destination,
        metadata: {
          contentType: "image/jpeg", // Adjust based on your images' content type
        },
      })
      .then(() => {
        console.log(`${file} uploaded successfully to ${destination}`);
      })
      .catch((error) => {
        console.error("Error uploading file:", file, error);
      });
  });
});
