const groupUrl = "https://steamcommunity.com/groups/OpenPlayNetwork";

const templates = {
  wallhack: {
    report:
      "Suspected wallhack: the player repeatedly appeared to track opponents through walls and reacted to positions without clear visual or audible information.",
    comment:
      "Suspicious awareness and possible wall tracking observed.",
  },
  aimhack: {
    report:
      "Suspected aim assistance: the player showed repeated unnatural target snaps and unusually precise reactions across multiple encounters.",
    comment:
      "Possible aim assistance observed.",
  },
  softAim: {
    report:
      "Suspected low-FOV or soft aim assistance: the crosshair made repeated subtle corrections toward targets, producing unusually consistent precision without obvious full snaps.",
    comment:
      "Possible soft aim or low-FOV aim assistance observed.",
  },
  triggerbot: {
    report:
      "Suspected triggerbot: shots repeatedly fired at the exact moment an opponent crossed the player's crosshair, with reaction timing that appeared automated.",
    comment:
      "Possible automated trigger behaviour observed.",
  },
  radarHack: {
    report:
      "Suspected radar assistance: the player repeatedly reacted to unseen opponents and repositioned around their locations without clear visual or audible information.",
    comment:
      "Possible radar assistance observed.",
  },
  noRecoil: {
    report:
      "Suspected recoil or spray-control script: repeated weapon sprays showed absent or unnaturally consistent recoil correction.",
    comment:
      "Possible recoil or spray-control automation observed.",
  },
  bhopScript: {
    report:
      "Suspected bunny-hop script: the player sustained repeated, precisely timed jumps and movement that appeared automated.",
    comment:
      "Possible bunny-hop automation observed.",
  },
  antiAim: {
    report:
      "Suspected anti-aim or spinbot: the player's model, orientation or movement displayed repeated unnatural spinning or false-angle behaviour.",
    comment:
      "Possible anti-aim or spinbot behaviour observed.",
  },
  movementExploit: {
    report:
      "Suspected movement or lag exploit: the player repeatedly displayed teleport-like, desynchronised or otherwise unnatural movement inconsistent with normal gameplay.",
    comment:
      "Possible movement or lag exploitation observed.",
  },
  toggling: {
    report:
      "Possible toggle use: the suspicious behaviour appeared and disappeared abruptly at different points in the match, consistent with assistance being switched on and off.",
    comment:
      "Possible intermittent or toggled assistance observed.",
  },
  otherHacks: {
    report:
      "Suspected use of other gameplay assistance or automation: the player displayed repeated behaviour that appeared inconsistent with normal input or game mechanics.",
    comment:
      "Possible gameplay assistance or automation observed.",
  },
  farmingBot: {
    report:
      "Suspected farming bot: the player displayed repetitive, automated-looking movement or actions and did not participate normally in the match.",
    comment:
      "Possible farming-bot behaviour observed.",
  },
  botServerTakeover: {
    report:
      "Suspected coordinated bot-server takeover: multiple automated-looking accounts appeared to occupy or control the server and used vote-kicks to remove human players.",
    comment:
      "Possible coordinated bot-server takeover and vote-kick abuse against human players observed.",
  },
  macroAutomation: {
    report:
      "Suspected macro or automated input: the player repeated identical, precisely timed movements or actions that appeared inconsistent with normal manual input.",
    comment:
      "Possible macro or automated input observed.",
  },
  abusiveCommunication: {
    report:
      "Abusive communication: the player used hostile, harassing or discriminatory language through in-game voice or text chat.",
    comment:
      "Abusive communication observed.",
  },
  harassment: {
    report:
      "Harassment: the player repeatedly targeted another person with unwanted hostile conduct intended to intimidate, humiliate or disrupt their participation.",
    comment:
      "Repeated targeted harassment observed.",
  },
  improperNickname: {
    report:
      "Improper profile name: the player's current nickname appears to contain offensive, discriminatory or otherwise inappropriate content.",
    comment:
      "A potentially improper nickname was observed.",
  },
  improperImage: {
    report:
      "Improper profile image: the player's current avatar appears to contain offensive, discriminatory or otherwise inappropriate content.",
    comment:
      "A potentially improper profile image was observed.",
  },
};

const categoryHelp = {
  wallhack: {
    name: "Wallhack / ESP",
    definition: "Visual assistance that reveals players, outlines or position cues through walls, smoke or other obstructing geometry.",
    detection: "Look for repeated tracking through solid cover, pre-aiming unseen positions and reactions without visual, sound or teammate information. A wallbang or smoke kill by itself is not proof.",
  },
  aimhack: {
    name: "Aimbot / Aimlock",
    definition: "Aim assistance that moves or locks the crosshair onto an opponent automatically.",
    detection: "Look for repeated unnatural snaps, instant target switching and highly consistent locking onto the same body point. A high headshot percentage alone is not proof.",
  },
  softAim: {
    name: "Soft aim / Low FOV",
    definition: "Subtle aim assistance that only corrects the crosshair when a target is already close to it, making the movement look more human.",
    detection: "Look for repeated small magnetic-looking corrections, unusually consistent micro-adjustments and the crosshair being pulled onto targets at the last moment across many encounters.",
  },
  triggerbot: {
    name: "Triggerbot",
    definition: "Automation that fires the weapon when an opponent enters the crosshair, without needing the player to press fire at that moment.",
    detection: "Look for repeated shots at almost identical zero-delay timing when enemies cross a held angle. One fast reaction is not enough; the pattern should repeat.",
  },
  radarHack: {
    name: "Radar hack",
    definition: "Assistance that exposes enemy locations on a radar or separate overlay even when the game should not reveal them.",
    detection: "Look for repeated rotations, counters and positioning around unseen opponents without sound, teammate calls or legitimate radar information, especially across several rounds.",
  },
  noRecoil: {
    name: "No recoil / Spray script",
    definition: "A script or assistance that removes recoil or automates the mouse movement needed to control a weapon spray.",
    detection: "Look for repeated sprays with absent or nearly identical recoil correction over many bursts. Skilled recoil control or one clean spray is not proof by itself.",
  },
  bhopScript: {
    name: "Bunny-hop script",
    definition: "Automation that times jumps or strafing inputs to maintain bunny-hop movement with minimal manual error.",
    detection: "Look for long, repeated sequences of near-perfect jump timing and speed retention. A short successful sequence can happen legitimately.",
  },
  antiAim: {
    name: "Anti-aim / Spinbot",
    definition: "Manipulation of the player model or viewing angles intended to make the real orientation or hit position difficult to read.",
    detection: "Look for repeated impossible-looking angles, rapid spinning, severe model desynchronisation or orientation that does not match the player's movement and shots.",
  },
  movementExploit: {
    name: "Movement / Lag exploit",
    definition: "Assistance or exploitation that creates controlled teleport-like, desynchronised or otherwise abnormal movement.",
    detection: "Look for the abnormal movement recurring in the player's favour while other players and the server remain stable. General network lag affecting everyone is not the same thing.",
  },
  toggling: {
    name: "Toggle use",
    definition: "Switching cheating assistance on and off during a match, often to make suspicious moments appear intermittent.",
    detection: "Look for repeated abrupt changes in awareness, accuracy or automation followed by equally abrupt returns to normal play. Ordinary performance variation is not enough.",
  },
  otherHacks: {
    name: "Other hacks",
    definition: "Suspicious gameplay assistance that does not fit one of the more specific categories.",
    detection: "Describe the exact repeated behaviour, when it occurred and why normal game information or mechanics do not explain it. Prefer a specific category whenever possible.",
  },
  farmingBot: {
    name: "Farming bot",
    definition: "An automated account that remains in matches to obtain XP, drops or other rewards without normal human participation.",
    detection: "Look for fixed routes, repetitive actions, identical reaction timing, failure to respond normally and accounts that freeze or leave when spectated. Check for a pattern, not just one AFK player.",
  },
  botServerTakeover: {
    name: "Server takeover / Kick abuse",
    definition: "A coordinated group of automated accounts that fills or controls a server and removes human players through vote-kicks.",
    detection: "Look for many accounts behaving similarly, coordinated or immediate votes, repeated removal of human players and the server returning to automated activity afterwards.",
  },
  macroAutomation: {
    name: "Macro / Automated input",
    definition: "Software or hardware automation that repeats movement, firing or other inputs with preset timing.",
    detection: "Look for identical input sequences, timing and pauses repeated many times, particularly when the pattern continues without adapting to what happens in the match.",
  },
  abusiveCommunication: {
    name: "Abusive communication",
    definition: "Hostile, threatening, discriminatory or otherwise abusive language sent through voice or text chat.",
    detection: "Record the words or conduct accurately, along with the approximate round or time and whether it occurred in voice or text. Avoid paraphrasing more strongly than the evidence supports.",
  },
  harassment: {
    name: "Harassment",
    definition: "Repeated or targeted unwanted conduct intended to intimidate, humiliate or drive another person out of participation.",
    detection: "Look for repeated targeting of the same person, threats, following across interactions or coordinated abuse. Preserve context and distinguish it from a single disagreement.",
  },
  improperNickname: {
    name: "Improper nickname",
    definition: "A profile or display name containing offensive, discriminatory, impersonating or otherwise prohibited content.",
    detection: "Check the current visible name and profile context. Save the profile URL or a screenshot because names can be changed after a report.",
  },
  improperImage: {
    name: "Improper image",
    definition: "An avatar or profile image containing hateful, explicit, threatening or otherwise prohibited material.",
    detection: "Check the image in its actual profile context and preserve a screenshot or profile URL because avatars can be replaced after a report.",
  },
};

const reportText = document.querySelector("#reportText");
const commentText = document.querySelector("#commentText");
const categoryButtons = document.querySelectorAll(".category");

categoryButtons.forEach((button) => {
  const help = categoryHelp[button.dataset.category];
  const item = document.createElement("div");
  item.className = "category-item";
  item.dataset.area = button.dataset.area;
  button.parentNode.insertBefore(item, button);
  item.appendChild(button);

  const infoButton = document.createElement("button");
  infoButton.type = "button";
  infoButton.className = "category-info-button";
  infoButton.textContent = "i";
  infoButton.setAttribute("aria-label", `About ${help.name}`);
  infoButton.dataset.infoCategory = button.dataset.category;
  item.appendChild(infoButton);
});

const categoryItems = document.querySelectorAll(".category-item");
const filterButtons = document.querySelectorAll(".filter-chip");
const copyCards = document.querySelectorAll(".copy-card");
const clearButton = document.querySelector("#clearSelection");
const selectedCount = document.querySelector("#selectedCount");
const botRoute = document.querySelector("#botRoute");
const botProfileUrl = document.querySelector("#botProfileUrl");
const botEmailBody = document.querySelector("#botEmailBody");
const copyBotEmail = document.querySelector("#copyBotEmail");
const botUrlStatus = document.querySelector("#botUrlStatus");
const addBotToDailyList = document.querySelector("#addBotToDailyList");
const botDailyList = document.querySelector("#botDailyList");
const botDailyEmpty = document.querySelector("#botDailyEmpty");
const botDailyCount = document.querySelector("#botDailyCount");
const clearBotDailyList = document.querySelector("#clearBotDailyList");
const categoryInfoDialog = document.querySelector("#categoryInfoDialog");
const categoryInfoTitle = document.querySelector("#categoryInfoTitle");
const categoryInfoDefinition = document.querySelector("#categoryInfoDefinition");
const categoryInfoDetection = document.querySelector("#categoryInfoDetection");
const closeCategoryInfo = document.querySelector("#closeCategoryInfo");
const toast = document.querySelector(".toast");
const selectedCategories = new Set();
const botQueueStoragePrefix = "opnBotReports:";
let activeFilter = "all";
let toastTimer;

function localDateStamp(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function botQueueStorageKey() {
  return `${botQueueStoragePrefix}${localDateStamp()}`;
}

function isSteamProfileUrl(value) {
  try {
    const url = new URL(value);
    const validHost = url.hostname === "steamcommunity.com" || url.hostname === "www.steamcommunity.com";
    const validPath = /^\/(id|profiles)\/[^/]+\/?$/.test(url.pathname);
    return url.protocol === "https:" && validHost && validPath;
  } catch {
    return false;
  }
}

function normalizeSteamProfileUrl(value) {
  const url = new URL(value);
  url.search = "";
  url.hash = "";
  url.pathname = `${url.pathname.replace(/\/+$/, "")}/`;
  return url.toString();
}

function orderedCategories(categories) {
  return Array.from(categoryButtons)
    .map((button) => button.dataset.category)
    .filter((category) => categories.includes(category));
}

function composePrivateReport(categories) {
  const ordered = orderedCategories(categories);
  return ordered.length
    ? `${ordered.map((category) => templates[category].report).join(" ")} Please review the available account, communication and match data as relevant.`
    : "";
}

function loadBotDailyEntries() {
  try {
    const parsed = JSON.parse(localStorage.getItem(botQueueStorageKey()) || "[]");
    if (!Array.isArray(parsed)) return [];

    return parsed.filter((entry) => entry && isSteamProfileUrl(entry.url)).map((entry) => ({
      url: normalizeSteamProfileUrl(entry.url),
      categories: orderedCategories(Array.isArray(entry.categories) ? entry.categories : ["farmingBot"]),
      addedAt: entry.addedAt || new Date().toISOString(),
    }));
  } catch {
    return [];
  }
}

let botQueueDate = localDateStamp();
let botDailyEntries = loadBotDailyEntries();

function ensureCurrentBotQueueDate() {
  const today = localDateStamp();
  if (today === botQueueDate) return;

  botQueueDate = today;
  botDailyEntries = loadBotDailyEntries();
  renderBotDailyEntries();
}

function saveBotDailyEntries() {
  try {
    localStorage.setItem(botQueueStorageKey(), JSON.stringify(botDailyEntries));
    return true;
  } catch {
    botUrlStatus.textContent = "This browser could not save the list. Check its storage settings.";
    botUrlStatus.classList.remove("valid");
    botUrlStatus.classList.add("invalid");
    return false;
  }
}

function composeDailyBotEmail() {
  if (!botDailyEntries.length) return "";

  const entries = botDailyEntries.flatMap((entry, index) => [
    `${index + 1}. Steam profile: ${entry.url}`,
    "Observed behaviour:",
    composePrivateReport(entry.categories),
    "",
  ]);

  return [
    "Hello Counter-Strike Team,",
    "",
    `I would like to report the following suspected farming bot accounts observed on ${localDateStamp()}:`,
    "",
    ...entries,
    "Thank you.",
  ].join("\n");
}

function renderBotDailyEntries() {
  botDailyList.replaceChildren();

  botDailyEntries.forEach((entry) => {
    const item = document.createElement("div");
    item.className = "bot-daily-entry";

    const url = document.createElement("span");
    url.className = "bot-daily-url";
    url.textContent = entry.url;
    url.title = entry.url;

    const categories = document.createElement("span");
    categories.className = "bot-daily-categories";
    categories.textContent = entry.categories.map((category) => categoryHelp[category].name).join(" · ");

    const remove = document.createElement("button");
    remove.type = "button";
    remove.className = "bot-daily-remove";
    remove.textContent = "Remove";
    remove.addEventListener("click", () => {
      botDailyEntries = botDailyEntries.filter((candidate) => candidate.url !== entry.url);
      saveBotDailyEntries();
      renderBotDailyEntries();
    });

    item.append(url, categories, remove);
    botDailyList.appendChild(item);
  });

  const count = botDailyEntries.length;
  botDailyCount.textContent = `${count} ${count === 1 ? "profile" : "profiles"}`;
  botDailyEmpty.hidden = count > 0;
  clearBotDailyList.disabled = count === 0;
  botEmailBody.value = composeDailyBotEmail();
  copyBotEmail.disabled = count === 0;
}

function updateBotProfileInput() {
  ensureCurrentBotQueueDate();
  const profileUrl = botProfileUrl.value.trim();
  const hasValue = profileUrl.length > 0;
  const isValid = isSteamProfileUrl(profileUrl);

  botProfileUrl.classList.toggle("invalid", hasValue && !isValid);
  botUrlStatus.classList.toggle("valid", isValid);
  botUrlStatus.classList.toggle("invalid", hasValue && !isValid);
  addBotToDailyList.disabled = !isValid;

  if (!isValid) {
    botUrlStatus.textContent = hasValue
      ? "Enter a valid Steam Community profile URL."
      : "Paste a Steam profile URL to add it to today's list.";
    return;
  }

  botUrlStatus.textContent = "Valid profile URL. Add it to today's list.";
}

function addCurrentBotToDailyList() {
  ensureCurrentBotQueueDate();
  const rawUrl = botProfileUrl.value.trim();
  if (!isSteamProfileUrl(rawUrl)) return;

  const url = normalizeSteamProfileUrl(rawUrl);
  const categories = orderedCategories(Array.from(selectedCategories));
  const existing = botDailyEntries.find((entry) => entry.url === url);

  if (existing) {
    existing.categories = orderedCategories([...new Set([...existing.categories, ...categories])]);
  } else {
    botDailyEntries.push({ url, categories, addedAt: new Date().toISOString() });
  }

  if (!saveBotDailyEntries()) return;

  botProfileUrl.value = "";
  renderBotDailyEntries();
  updateBotProfileInput();
  botUrlStatus.textContent = existing
    ? "Profile already saved; its selected categories were merged."
    : "Profile added to today's list.";
  botUrlStatus.classList.add("valid");
}

function applyFilter(filter) {
  activeFilter = filter;

  categoryItems.forEach((item) => {
    const button = item.querySelector(".category");
    const matchesArea = filter === "all" || item.dataset.area === filter;
    const matchesSelection = filter === "selected" && selectedCategories.has(button.dataset.category);
    item.hidden = filter === "selected" ? !matchesSelection : !matchesArea;
  });

  filterButtons.forEach((button) => {
    const isActive = button.dataset.filter === filter;
    button.classList.toggle("active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });

  botRoute.hidden = !selectedCategories.has("farmingBot");
}

function openCategoryInfo(category) {
  const help = categoryHelp[category];
  categoryInfoTitle.textContent = help.name;
  categoryInfoDefinition.textContent = help.definition;
  categoryInfoDetection.textContent = help.detection;
  categoryInfoDialog.showModal();
}

function updateOutput() {
  const selected = Array.from(categoryButtons)
    .map((button) => button.dataset.category)
    .filter((category) => selectedCategories.has(category));

  const hasSelection = selected.length > 0;

  reportText.value = composePrivateReport(selected);

  commentText.value = hasSelection
    ? `${selected.map((category) => templates[category].comment).join(" ")} Evidence has been reported for review. OPN documents suspected cheating, farming bots and abusive behaviour without encouraging harassment or mass reporting. ${groupUrl}`
    : "";

  reportText.classList.toggle("empty", !hasSelection);
  commentText.classList.toggle("empty", !hasSelection);
  clearButton.disabled = !hasSelection;
  selectedCount.textContent = String(selected.length);
  copyCards.forEach((card) => card.setAttribute("aria-disabled", String(!hasSelection)));

  if (activeFilter === "selected") {
    applyFilter("selected");
  } else {
    botRoute.hidden = !selectedCategories.has("farmingBot");
  }

  updateBotProfileInput();
}

function toggleCategory(category) {
  if (selectedCategories.has(category)) {
    selectedCategories.delete(category);
  } else {
    selectedCategories.add(category);
  }

  categoryButtons.forEach((button) => {
    const isActive = selectedCategories.has(button.dataset.category);
    button.classList.toggle("active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });

  updateOutput();
}

function clearSelection() {
  selectedCategories.clear();
  botProfileUrl.value = "";
  categoryButtons.forEach((button) => {
    button.classList.remove("active");
    button.setAttribute("aria-pressed", "false");
  });
  updateOutput();
}

function legacyCopy(textarea) {
  textarea.focus();
  textarea.select();
  textarea.setSelectionRange(0, textarea.value.length);
  return document.execCommand("copy");
}

async function copyContent(targetId) {
  const textarea = document.querySelector(`#${targetId}`);
  const card = textarea.closest(".copy-card");

  if (!textarea.value) {
    toast.querySelector("span").textContent = "Select at least one category";
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove("show");
      toast.querySelector("span").textContent = "Copied to clipboard";
    }, 1800);
    return;
  }

  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(textarea.value);
    } else if (!legacyCopy(textarea)) {
      throw new Error("Copy command failed");
    }

    card.classList.add("copied");
    card.querySelector(".copy-button span").textContent = "Copied";
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove("show");
      card.classList.remove("copied");
      card.querySelector(".copy-button span").textContent = "Copy";
    }, 1800);
  } catch {
    textarea.focus();
    textarea.select();
    toast.querySelector("span").textContent = "Select the text and copy it manually";
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove("show");
      toast.querySelector("span").textContent = "Copied to clipboard";
    }, 2600);
  }
}

categoryButtons.forEach((button) => {
  button.addEventListener("click", () => toggleCategory(button.dataset.category));
});

document.querySelectorAll(".category-info-button").forEach((button) => {
  button.addEventListener("click", () => openCategoryInfo(button.dataset.infoCategory));
});

closeCategoryInfo.addEventListener("click", () => categoryInfoDialog.close());

categoryInfoDialog.addEventListener("click", (event) => {
  if (event.target === categoryInfoDialog) {
    categoryInfoDialog.close();
  }
});

filterButtons.forEach((button) => {
  button.addEventListener("click", () => applyFilter(button.dataset.filter));
});

botProfileUrl.addEventListener("input", updateBotProfileInput);
botProfileUrl.addEventListener("keydown", (event) => {
  if (event.key === "Enter" && !addBotToDailyList.disabled) {
    event.preventDefault();
    addCurrentBotToDailyList();
  }
});
addBotToDailyList.addEventListener("click", addCurrentBotToDailyList);

clearBotDailyList.addEventListener("click", () => {
  if (!window.confirm("Clear today's saved bot list after sending the email?")) return;
  botDailyEntries = [];
  saveBotDailyEntries();
  renderBotDailyEntries();
  botUrlStatus.textContent = "Today's sent list was cleared.";
  botUrlStatus.classList.remove("invalid");
  botUrlStatus.classList.add("valid");
});

document.querySelectorAll("[data-bot-copy]").forEach((button) => {
  button.addEventListener("click", async () => {
    const field = document.querySelector(`#${button.dataset.botCopy}`);
    if (!field.value) return;

    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(field.value);
      } else if (!legacyCopy(field)) {
        throw new Error("Copy command failed");
      }

      toast.querySelector("span").textContent = "Email field copied";
      toast.classList.add("show");
      clearTimeout(toastTimer);
      toastTimer = setTimeout(() => {
        toast.classList.remove("show");
        toast.querySelector("span").textContent = "Copied to clipboard";
      }, 1800);
    } catch {
      field.focus();
      field.select();
      toast.querySelector("span").textContent = "Select the field and copy it manually";
      toast.classList.add("show");
    }
  });
});

clearButton.addEventListener("click", clearSelection);

copyCards.forEach((card) => {
  card.addEventListener("click", () => copyContent(card.dataset.copyTarget));
  card.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      copyContent(card.dataset.copyTarget);
    }
  });
});

document.querySelectorAll(".copy-button").forEach((button) => {
  button.addEventListener("click", (event) => {
    event.stopPropagation();
    copyContent(button.dataset.copyButton);
  });
});

applyFilter("all");
renderBotDailyEntries();
updateOutput();
