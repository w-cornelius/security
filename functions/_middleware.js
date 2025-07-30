// functions/_middleware.js

/**
 * This middleware function runs for every request that comes to your site.
 * @param {object} context The context object from Cloudflare.
 */
export async function onRequest(context) {
  const { request, next, env } = context;
  const url = new URL(request.url);

  // --- CONFIGURE YOUR SUBDOMAIN HERE ---
  // Replace this with the actual subdomain you want to use for the download.
  const downloadSubdomain = 'download.yourwebsite.com'; 

  // Check if the hostname of the incoming request matches your download subdomain.
  if (url.hostname === downloadSubdomain) {
    // If it matches, we call the /download function internally.
    // The `fetch` command within a Worker will be routed to the correct function.
    const downloadUrl = new URL('/download', request.url);
    return fetch(downloadUrl.toString(), request);
  }

  // If it's not the download subdomain, continue to the requested page as normal.
  return next();
}
