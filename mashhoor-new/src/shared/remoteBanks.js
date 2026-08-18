import {
  LETTERS_BANK
} from "../games/letters/lettersBank.js";

import {
  FAKKERHA_BANK
} from "../games/fakkerha/fakkerhaBank.js";

const API =
  "https://mashhoor-api.11im7med1.workers.dev";

function clone(value) {
  return JSON.parse(
    JSON.stringify(value)
  );
}

function clean(value) {
  if (Array.isArray(value)) {
    return value
      .filter(item =>
        !(
          item &&
          typeof item === "object" &&
          item.__disabled
        )
      )
      .map(clean);
  }

  if (
    value &&
    typeof value === "object"
  ) {
    const result = {};

    for (
      const [key, item]
      of Object.entries(value)
    ) {
      if (
        key === "__disabled"
      ) continue;

      result[key] =
        clean(item);
    }

    return result;
  }

  return value;
}

function replace(target, source) {
  if (
    Array.isArray(target) &&
    Array.isArray(source)
  ) {
    target.splice(
      0,
      target.length,
      ...clone(
        clean(source)
      )
    );

    return;
  }

  if (
    target &&
    source &&
    typeof target === "object" &&
    typeof source === "object"
  ) {
    for (
      const key
      of Object.keys(target)
    ) {
      delete target[key];
    }

    Object.assign(
      target,
      clone(
        clean(source)
      )
    );
  }
}

async function load(name, target) {
  try {
    const response =
      await fetch(
        `${API}/api/bank/${name}`,
        {
          cache:"no-store"
        }
      );

    if (!response.ok) return;

    const data =
      await response.json();

    if (data.bank) {
      replace(
        target,
        data.bank
      );
    }
  } catch {}
}

load("letters", LETTERS_BANK);
load("fakkerha", FAKKERHA_BANK);
