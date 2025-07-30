// functions/_middleware.js

/**
 * This middleware function runs for every request that comes to your site.
 * @param {object} context The context object from Cloudflare.
 */
export async function onRequest(context) {
  const { request, next } = context;
  const url = new URL(request.url);

  // --- CONFIGURE YOUR SUBDOMAIN HERE ---
  const downloadSubdomain = 'pgp.yourwebsite.com'; 

  // Check if the hostname of the incoming request matches your download subdomain.
  if (url.hostname === downloadSubdomain) {
    // If it matches, internally fetch the result of the /download function
    // and return it to the user. This makes visiting the subdomain
    // trigger the download immediately.
    return context.env.ASSETS.fetch(new URL('/download', request.url));
  }

  // If it's not the download subdomain, continue to the requested page as normal.
  return next();
}
