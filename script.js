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

const reportText = document.querySelector("#reportText");
const commentText = document.querySelector("#commentText");
const categoryButtons = document.querySelectorAll(".category");
const filterButtons = document.querySelectorAll(".filter-chip");
const copyCards = document.querySelectorAll(".copy-card");
const clearButton = document.querySelector("#clearSelection");
const selectedCount = document.querySelector("#selectedCount");
const botRoute = document.querySelector("#botRoute");
const toast = document.querySelector(".toast");
const selectedCategories = new Set(["wallhack"]);
let activeFilter = "all";
let toastTimer;

function applyFilter(filter) {
  activeFilter = filter;

  categoryButtons.forEach((button) => {
    const matchesArea = filter === "all" || button.dataset.area === filter;
    const matchesSelection = filter === "selected" && selectedCategories.has(button.dataset.category);
    button.hidden = filter === "selected" ? !matchesSelection : !matchesArea;
  });

  filterButtons.forEach((button) => {
    const isActive = button.dataset.filter === filter;
    button.classList.toggle("active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });

  botRoute.hidden = !(filter === "automation" || selectedCategories.has("farmingBot"));
}

function updateOutput() {
  const selected = Array.from(categoryButtons)
    .map((button) => button.dataset.category)
    .filter((category) => selectedCategories.has(category));

  const hasSelection = selected.length > 0;

  reportText.value = hasSelection
    ? `${selected.map((category) => templates[category].report).join(" ")} Please review the available account, communication and match data as relevant.`
    : "";

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
    botRoute.hidden = !(activeFilter === "automation" || selectedCategories.has("farmingBot"));
  }
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

filterButtons.forEach((button) => {
  button.addEventListener("click", () => applyFilter(button.dataset.filter));
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
updateOutput();
