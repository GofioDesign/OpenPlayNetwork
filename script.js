const groupUrl = "https://steamcommunity.com/groups/__OPN";

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
const copyCards = document.querySelectorAll(".copy-card");
const clearButton = document.querySelector("#clearSelection");
const toast = document.querySelector(".toast");
const selectedCategories = new Set(["wallhack"]);
let toastTimer;

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
  copyCards.forEach((card) => card.setAttribute("aria-disabled", String(!hasSelection)));
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

updateOutput();
