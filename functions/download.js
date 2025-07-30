// functions/download.js

export async function onRequest(context) {
  // This is the path to your file within your project's output directory.
  // Since your file is in the 'assets' folder at the root, the URL path is '/assets/...'
  const fileUrl = new URL('/assets/dubc_io-email-pgp-pubkey.asc', context.request.url);

  // Use context.env.ASSETS.fetch() to get the static file from your deployment.
  const asset = await context.env.ASSETS.fetch(fileUrl);

  // Create a new response from the asset's body.
  // We clone the original headers to preserve things like ETag for caching.
  const response = new Response(asset.body, asset);

  // Set the headers to tell the browser to download the file instead of displaying it.
  response.headers.set('Content-Type', 'application/octet-stream');
  response.headers.set(
    'Content-Disposition',
    'attachment; filename="dubc_io-email-pgp-pubkey.asc"'
  );

  return response;
}
