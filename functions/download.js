// functions/download.js

// Import the static file from your assets folder.
// Make sure the path and filename match what you uploaded.
import fileToDownload from '../assets/My-Awesome-File.zip';

export async function onRequest(context) {
  // Create a response from the imported file data.
  const response = new Response(fileToDownload.stream());

  // Set the headers to tell the browser to download the file.
  response.headers.set('Content-Type', 'application/octet-stream');
  response.headers.set(
    'Content-Disposition',
    'attachment; filename="My-Awesome-File.zip"' // This is the name the user will see.
  );

  return response;
}
