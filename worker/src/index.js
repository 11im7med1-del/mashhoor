const KICK_UPSTREAM =
  "https://mashhoor-secure.11im7med1.workers.dev";

function cors(request) {
  const origin = request.headers.get("Origin") || "*";

  return {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Headers":
      "Content-Type, Authorization",
    "Access-Control-Allow-Methods":
      "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Credentials": "true",
    "Vary": "Origin"
  };
}

function json(request, data, status = 200) {
  return new Response(
    JSON.stringify(data),
    {
      status,
      headers: {
        "Content-Type":
          "application/json; charset=utf-8",
        "Cache-Control": "no-store",
        ...cors(request)
      }
    }
  );
}

async function hash(text) {
  const data =
    new TextEncoder().encode(text);

  const digest =
    await crypto.subtle.digest(
      "SHA-256",
      data
    );

  return Array.from(
    new Uint8Array(digest)
  )
    .map(v =>
      v.toString(16).padStart(2, "0")
    )
    .join("");
}

function token() {
  const bytes = new Uint8Array(32);
  crypto.getRandomValues(bytes);

  return Array.from(bytes)
    .map(v =>
      v.toString(16).padStart(2, "0")
    )
    .join("");
}

function bearer(request) {
  const value =
    request.headers.get("Authorization") || "";

  return value.startsWith("Bearer ")
    ? value.slice(7).trim()
    : "";
}

async function adminSession(request, env) {
  const value = bearer(request);

  if (!value || !env.MASHHOOR_KV)
    return null;

  return await env.MASHHOOR_KV.get(
    `admin:${value}`,
    "json"
  );
}

async function body(request) {
  try {
    return await request.json();
  } catch {
    return {};
  }
}

async function proxyKick(request, env) {
  const original =
    new URL(request.url);

  const target =
    new URL(
      original.pathname +
        original.search,
      KICK_UPSTREAM
    );

  const headers =
    new Headers(request.headers);

  headers.delete("host");

  const response =
    await fetch(
      target.toString(),
      {
        method: request.method,
        headers,
        body:
          request.method === "GET" ||
          request.method === "HEAD"
            ? undefined
            : request.body,
        redirect: "manual"
      }
    );

  const out =
    new Headers(response.headers);

  for (
    const [key, value]
    of Object.entries(cors(request))
  ) {
    out.set(key, value);
  }

  return new Response(
    response.body,
    {
      status: response.status,
      headers: out
    }
  );
}

export default {
  async fetch(request, env) {
    const url =
      new URL(request.url);

    const path =
      url.pathname;

    if (
      request.method === "OPTIONS"
    ) {
      return new Response(
        null,
        {
          status: 204,
          headers: cors(request)
        }
      );
    }

    /* =========================
       HEALTH
    ========================= */

    if (
      path === "/health"
    ) {
      return json(
        request,
        {
          ok: true,
          name: "MASHHOOR",
          version: "FINAL",
          kv: Boolean(env.MASHHOOR_KV),
          site: true
        }
      );
    }

    /* =========================
       KICK
       يمر مؤقتًا عبر السيرفر القديم
       حتى نحافظ على الربط الحالي
    ========================= */

    if (
      path.startsWith("/api/kick/") ||
      path.startsWith("/auth/kick/") ||
      path === "/webhook/kick"
    ) {
      return proxyKick(
        request,
        env
      );
    }

    /* =========================
       ADMIN LOGIN
    ========================= */

    if (
      path === "/api/admin/login" &&
      request.method === "POST"
    ) {
      if (!env.MASHHOOR_KV) {
        return json(
          request,
          {
            ok: false,
            error: "KV_NOT_READY"
          },
          500
        );
      }

      const data =
        await body(request);

      const entered =
        await hash(
          String(
            data.password || ""
          )
        );

      if (
        entered !==
        env.ADMIN_PASSWORD_HASH
      ) {
        return json(
          request,
          {
            ok: false,
            error: "WRONG_PASSWORD"
          },
          401
        );
      }

      const session =
        token();

      await env.MASHHOOR_KV.put(
        `admin:${session}`,
        JSON.stringify({
          createdAt: Date.now()
        }),
        {
          expirationTtl:
            60 * 60 * 12
        }
      );

      return json(
        request,
        {
          ok: true,
          token: session
        }
      );
    }

    /* =========================
       SITE CONFIG
    ========================= */

    if (
      path === "/api/config" &&
      request.method === "GET"
    ) {
      const config =
        env.MASHHOOR_KV
          ? await env.MASHHOOR_KV.get(
              "site:config",
              "json"
            )
          : null;

      return json(
        request,
        {
          ok: true,
          config: config || {}
        }
      );
    }

    if (
      path === "/api/admin/config" &&
      request.method === "PUT"
    ) {
      if (
        !await adminSession(
          request,
          env
        )
      ) {
        return json(
          request,
          {
            ok: false,
            error: "UNAUTHORIZED"
          },
          401
        );
      }

      const data =
        await body(request);

      await env.MASHHOOR_KV.put(
        "site:config",
        JSON.stringify(data)
      );

      return json(
        request,
        {
          ok: true
        }
      );
    }

    /* =========================
       QUESTION BANKS
    ========================= */

    if (
      path.startsWith("/api/bank/") &&
      request.method === "GET"
    ) {
      const name =
        path.split("/").pop();

      if (
        ![
          "letters",
          "fakkerha"
        ].includes(name)
      ) {
        return json(
          request,
          {
            ok: false
          },
          404
        );
      }

      const bank =
        env.MASHHOOR_KV
          ? await env.MASHHOOR_KV.get(
              `bank:${name}`,
              "json"
            )
          : null;

      return json(
        request,
        {
          ok: true,
          bank
        }
      );
    }

    if (
      path.startsWith("/api/admin/bank/") &&
      request.method === "PUT"
    ) {
      if (
        !await adminSession(
          request,
          env
        )
      ) {
        return json(
          request,
          {
            ok: false,
            error: "UNAUTHORIZED"
          },
          401
        );
      }

      const name =
        path.split("/").pop();

      if (
        ![
          "letters",
          "fakkerha"
        ].includes(name)
      ) {
        return json(
          request,
          {
            ok: false
          },
          404
        );
      }

      const data =
        await body(request);

      await env.MASHHOOR_KV.put(
        `bank:${name}`,
        JSON.stringify(
          data.bank ?? data
        )
      );

      return json(
        request,
        {
          ok: true
        }
      );
    }

    /* =========================
       GLOBAL ANNOUNCEMENT
    ========================= */

    if (
      path === "/api/announcement" &&
      request.method === "GET"
    ) {
      let announcement =
        env.MASHHOOR_KV
          ? await env.MASHHOOR_KV.get(
              "announcement:current",
              "json"
            )
          : null;

      if (
        announcement &&
        announcement.expiresAt <
          Date.now()
      ) {
        announcement = null;
      }

      return json(
        request,
        {
          ok: true,
          announcement
        }
      );
    }

    if (
      path === "/api/admin/announcement" &&
      request.method === "POST"
    ) {
      if (
        !await adminSession(
          request,
          env
        )
      ) {
        return json(
          request,
          {
            ok: false,
            error: "UNAUTHORIZED"
          },
          401
        );
      }

      const data =
        await body(request);

      const text =
        String(
          data.text || ""
        )
          .trim()
          .slice(0, 500);

      const duration =
        Math.min(
          60,
          Math.max(
            1,
            Number(
              data.duration || 7
            )
          )
        );

      if (!text) {
        return json(
          request,
          {
            ok: false,
            error: "EMPTY"
          },
          400
        );
      }

      const announcement = {
        id:
          crypto.randomUUID(),
        text,
        duration,
        createdAt:
          Date.now(),
        expiresAt:
          Date.now() +
          duration * 1000 +
          15000
      };

      await env.MASHHOOR_KV.put(
        "announcement:current",
        JSON.stringify(
          announcement
        ),
        {
          expirationTtl:
            Math.ceil(
              duration + 30
            )
        }
      );

      return json(
        request,
        {
          ok: true,
          announcement
        }
      );
    }

    /* =========================
       STREAMER PRESENCE
    ========================= */

    if (
      path === "/api/presence/heartbeat" &&
      request.method === "POST"
    ) {
      if (!env.MASHHOOR_KV) {
        return json(
          request,
          { ok: false },
          500
        );
      }

      const kickToken =
        bearer(request);

      if (!kickToken) {
        return json(
          request,
          {
            ok: false,
            error: "NO_KICK_SESSION"
          },
          401
        );
      }

      const statusRequest =
        new Request(
          KICK_UPSTREAM +
          "/api/kick/status",
          {
            headers: {
              Authorization:
                `Bearer ${kickToken}`
            }
          }
        );

      const status =
        await fetch(
          statusRequest
        );

      if (!status.ok) {
        return json(
          request,
          {
            ok: false,
            error: "INVALID_KICK_SESSION"
          },
          401
        );
      }

      const info =
        await status.json();

      const id =
        String(
          info?.user?.id ||
          info?.user?.user_id ||
          info?.broadcasterId ||
          kickToken.slice(0, 12)
        );

      await env.MASHHOOR_KV.put(
        `presence:${id}`,
        JSON.stringify({
          id,
          user:
            info.user || null,
          broadcasterId:
            info.broadcasterId ||
            null,
          lastSeen:
            Date.now()
        }),
        {
          expirationTtl: 90
        }
      );

      return json(
        request,
        {
          ok: true
        }
      );
    }

    if (
      path === "/api/admin/presence" &&
      request.method === "GET"
    ) {
      if (
        !await adminSession(
          request,
          env
        )
      ) {
        return json(
          request,
          {
            ok: false,
            error: "UNAUTHORIZED"
          },
          401
        );
      }

      const result =
        await env.MASHHOOR_KV.list({
          prefix: "presence:"
        });

      const streamers = [];

      for (
        const key
        of result.keys.slice(0, 100)
      ) {
        const item =
          await env.MASHHOOR_KV.get(
            key.name,
            "json"
          );

        if (item)
          streamers.push(item);
      }

      streamers.sort(
        (a, b) =>
          b.lastSeen -
          a.lastSeen
      );

      return json(
        request,
        {
          ok: true,
          streamers
        }
      );
    }

    /* =========================
       STATIC SITE
    ========================= */

    return env.ASSETS.fetch(
      request
    );
  }
};
