function cors() {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS"
  };
}

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      ...cors()
    }
  });
}

export default {
  async fetch(request, env) {
    if (request.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: cors()
      });
    }

    const url = new URL(request.url);

    if (url.pathname === "/" || url.pathname === "/health") {
      return json({
        ok: true,
        name: "MASHHOOR API",
        version: "1.0.0"
      });
    }

    if (url.pathname === "/api/config" && request.method === "GET") {
      if (!env.MASHHOOR_KV) {
        return json({ ok: true, config: {} });
      }

      const config =
        await env.MASHHOOR_KV.get("site:config", "json");

      return json({
        ok: true,
        config: config || {}
      });
    }

    if (url.pathname === "/api/announcement" && request.method === "GET") {
      if (!env.MASHHOOR_KV) {
        return json({
          ok: true,
          announcement: null
        });
      }

      const announcement =
        await env.MASHHOOR_KV.get(
          "announcement:current",
          "json"
        );

      return json({
        ok: true,
        announcement: announcement || null
      });
    }

    return json({
      ok: false,
      error: "NOT_FOUND"
    }, 404);
  }
};
