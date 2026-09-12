const groupUrl = "https://steamcommunity.com/groups/__OPN";

const templates = {
  wallhack: {
    report:
      "Suspected wallhack. The player repeatedly appeared to track opponents through walls and reacted to positions without clear visual or audible information. Please review the available match data and gameplay.",
    comment:
      `Suspicious awareness and possible wall tracking observed. Evidence has been reported for review. OPN documents suspected cheating and abusive behaviour without encouraging harassment or mass reporting. ${groupUrl}`,
  },
  aimhack: {
    report:
      "Suspected aim assistance. The player showed repeated unnatural target snaps and unusually precise reactions across multiple encounters. Please review the available match data and gameplay.",
    comment:
      `Possible aim assistance observed. Evidence has been reported for review. OPN documents suspected cheating and abusive behaviour without encouraging harassment or mass reporting. ${groupUrl}`,
  },
  otherHacks: {
    report:
      "Suspected use of other gameplay assistance or automation. The player displayed repeated behaviour that appeared inconsistent with normal input or game mechanics. Please review the available match data and gameplay.",
    comment:
      `Possible gameplay assistance or automation observed. Evidence has been reported for review. OPN documents suspected cheating and abusive behaviour without encouraging harassment or mass reporting. ${groupUrl}`,
  },
  abusiveCommunication: {
    report:
      "Abusive communication. The player used hostile, harassing or discriminatory language through in-game voice or text chat. Please review the relevant communications and take appropriate action.",
    comment:
      `Abusive communication observed and reported for review. OPN documents suspected cheating and abusive behaviour without encouraging harassment or mass reporting. ${groupUrl}`,
  },
  improperNickname: {
    report:
      "Improper profile name. The player's current nickname appears to contain offensive, discriminatory or otherwise inappropriate content. Please review the profile name under the Steam Community rules.",
    comment:
      `An improper nickname has been reported for review under the Steam Community rules. OPN documents suspected cheating and abusive behaviour without encouraging harassment or mass reporting. ${groupUrl}`,
  },
  improperImage: {
    report:
      "Improper profile image. The player's current avatar appears to contain offensive, discriminatory or otherwise inappropriate content. Please review the profile image under the Steam Community rules.",
    comment:
      `An improper profile image has been reported for review under the Steam Community rules. OPN documents suspected cheating and abusive behaviour without encouraging harassment or mass reporting. ${groupUrl}`,
  },
};

const reportText = document.querySelector("#reportText");
const commentText = document.querySelector("#commentText");
const categoryButtons = document.querySelectorAll(".category");
const copyCards = document.querySelectorAll(".copy-card");
const toast = document.querySelector(".toast");
let toastTimer;

function selectCategory(category) {
  const selected = templates[category];
  reportText.value = selected.report;
  commentText.value = selected.comment;

  categoryButtons.forEach((button) => {
    const isActive = button.dataset.category === category;
    button.classList.toggle("active", isActive);
    button.setAttribute("aria-checked", String(isActive));
  });
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
  button.addEventListener("click", () => selectCategory(button.dataset.category));
});

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

selectCategory("wallhack");
