const MASHHOOR_API =
  "https://mashhoor-api.11im7med1.workers.dev";

let lastAnnouncement = "";

function showAnnouncement(item) {
  if (
    !item ||
    !item.id ||
    item.id === lastAnnouncement
  ) return;

  lastAnnouncement = item.id;

  const old =
    document.getElementById(
      "mashhoor-global-announcement"
    );

  if (old) old.remove();

  const overlay =
    document.createElement("div");

  overlay.id =
    "mashhoor-global-announcement";

  Object.assign(
    overlay.style,
    {
      position:"fixed",
      inset:"0",
      zIndex:"9999999",
      display:"grid",
      placeItems:"center",
      background:"rgba(0,0,0,.48)",
      backdropFilter:"blur(5px)",
      pointerEvents:"none"
    }
  );

  const card =
    document.createElement("div");

  Object.assign(
    card.style,
    {
      width:"min(760px,88vw)",
      padding:"32px",
      border:"1px solid rgba(164,255,57,.4)",
      borderRadius:"20px",
      background:"#080c08",
      color:"#fff",
      textAlign:"center",
      fontSize:"clamp(22px,4vw,48px)",
      lineHeight:"1.5",
      boxShadow:"0 35px 120px rgba(0,0,0,.85)"
    }
  );

  card.textContent =
    item.text || "";

  overlay.appendChild(card);
  document.body.appendChild(overlay);

  setTimeout(
    () => overlay.remove(),
    Math.max(
      1,
      Number(item.duration || 7)
    ) * 1000
  );
}

async function poll() {
  try {
    const response =
      await fetch(
        MASHHOOR_API +
        "/api/announcement",
        {
          cache:"no-store"
        }
      );

    if (!response.ok) return;

    const data =
      await response.json();

    showAnnouncement(
      data.announcement
    );
  } catch {}
}

poll();
setInterval(poll, 1800);
