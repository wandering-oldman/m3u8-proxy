export default {
  async fetch(request) {
    const urlObj = new URL(request.url);
    const target = urlObj.searchParams.get("url");
    const ua = urlObj.searchParams.get("ua") || "";
    const ref = urlObj.searchParams.get("ref") || "";

    if (!target) {
      return new Response("Missing 'url' parameter", { status: 400 });
    }

    const headers = new Headers();
    if (ua) headers.set("User-Agent", ua);
    if (ref) headers.set("Referer", ref);

    const resp = await fetch(target, { headers });
    return new Response(resp.body, {
      status: resp.status,
      headers: {
        "Content-Type": resp.headers.get("Content-Type") || "application/vnd.apple.mpegurl"
      }
    });
  }
};