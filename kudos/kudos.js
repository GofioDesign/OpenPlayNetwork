const kudosUrl = "https://gofiodesign.github.io/OpenPlayNetwork/kudos/";

const qualities = {
  positiveAttitude: {
    name: "Positive attitude",
    comment: "Kept a positive attitude throughout the match.",
    definition: "A player who contributes optimism and constructive energy, including when the match becomes difficult.",
    example: "Choose this when the player stayed encouraging, avoided blame and helped the lobby remain enjoyable.",
  },
  skilledPlay: {
    name: "Skilled play",
    comment: "Showed excellent individual skill and mechanics.",
    definition: "Strong execution of the game's mechanical skills without losing respect for other players.",
    example: "Choose this for consistently impressive aim, movement, timing or other clearly observed mechanics.",
  },
  smartDecisions: {
    name: "Smart decisions",
    comment: "Made smart decisions and showed strong game sense.",
    definition: "Good reading of situations, risks and available information during play.",
    example: "Choose this when positioning, rotations, timing or restraint repeatedly helped produce good outcomes.",
  },
  consistent: {
    name: "Consistent",
    comment: "Played consistently and could be relied on round after round.",
    definition: "Reliable performance and decision-making across the match rather than only one outstanding moment.",
    example: "Choose this when the player repeatedly fulfilled their role and remained dependable as conditions changed.",
  },
  calmUnderPressure: {
    name: "Calm under pressure",
    comment: "Stayed calm and effective under pressure.",
    definition: "Maintaining composure and useful decision-making in tense or disadvantageous situations.",
    example: "Choose this after difficult retakes, clutches, close rounds or setbacks handled without panic or hostility.",
  },
  fairPlay: {
    name: "Fair play",
    comment: "Played fairly and showed good sportsmanship.",
    definition: "Respect for the rules, the match and the people on both teams.",
    example: "Choose this when the player accepted outcomes, avoided exploitation and behaved well in victory or defeat.",
  },
  helpful: {
    name: "Helpful",
    comment: "Was helpful and encouraging to other players.",
    definition: "Offering useful assistance without belittling less experienced players.",
    example: "Choose this when the player answered questions, explained something clearly or supported someone struggling.",
  },
  respectful: {
    name: "Respectful",
    comment: "Communicated respectfully, even in difficult moments.",
    definition: "Treating teammates and opponents as people, without abuse, humiliation or discriminatory language.",
    example: "Choose this when the player maintained respectful communication despite mistakes, conflict or a loss.",
  },
  teamPlayer: {
    name: "Team player",
    comment: "Put the group ahead of personal statistics and showed genuine team spirit.",
    definition: "Prioritising the team's shared result rather than individual score, attention or rewards.",
    example: "Choose this when the player made choices that benefited the group even without personal credit.",
  },
  clearCommunication: {
    name: "Clear communication",
    comment: "Shared clear, useful information without flooding communications.",
    definition: "Concise, relevant information delivered at a useful moment and with space for others to speak.",
    example: "Choose this for accurate locations, plans and updates communicated clearly without unnecessary noise.",
  },
  usefulCalls: {
    name: "Useful calls",
    comment: "Made timely calls that helped the team make decisions.",
    definition: "Suggestions or tactical calls that turn available information into a coordinated plan.",
    example: "Choose this when calls were timely, understandable and helped teammates act together.",
  },
  supportivePlay: {
    name: "Supportive play",
    comment: "Supported teammates well with trades, positioning and cover.",
    definition: "Playing close enough and attentively enough to make teammates' actions safer or more effective.",
    example: "Choose this for good trading, crossfires, cover, refrags or positioning that enabled someone else's play.",
  },
  utilityUse: {
    name: "Thoughtful utility",
    comment: "Used utility thoughtfully to create opportunities for the team.",
    definition: "Using grenades or support resources with purpose, timing and awareness of teammates.",
    example: "Choose this for useful flashes, smokes, mollies or other utility that enabled entries, holds or retakes.",
  },
  economySharing: {
    name: "Shared economy",
    comment: "Shared weapons and helped manage the team's economy.",
    definition: "Treating money and equipment as team resources rather than purely individual possessions.",
    example: "Choose this when the player bought for others, requested sensible saves or aligned purchases with the team.",
  },
  objectiveFocused: {
    name: "Objective focused",
    comment: "Stayed focused on the objective and what the team needed.",
    definition: "Making decisions around the actual win condition instead of chasing personal statistics.",
    example: "Choose this when the player prioritised plants, defuses, sites, time or survival as the situation required.",
  },
  positiveLeadership: {
    name: "Positive leadership",
    comment: "Helped organise the team in a calm and constructive way.",
    definition: "Helping a group coordinate while listening to others and avoiding domination or blame.",
    example: "Choose this when the player proposed plans, adapted them and kept the team working together respectfully.",
  },
  adaptability: {
    name: "Adaptable",
    comment: "Adapted well to teammates and changing situations.",
    definition: "Adjusting role, position or approach when the match or the team's needs change.",
    example: "Choose this when the player filled gaps, responded to opponents and worked effectively with different styles.",
  },
  respectfulOpponent: {
    name: "Respectful opponent",
    comment: "Was a respectful opponent and helped make the match enjoyable.",
    definition: "Competing seriously while respecting the opposing team and the shared experience.",
    example: "Choose this for good sportsmanship, friendly interaction and dignity in either victory or defeat.",
  },
};

const qualityButtons = document.querySelectorAll(".category");
const kudosText = document.querySelector("#kudosText");
const kudosCopyCard = document.querySelector("#kudosCopyCard");
const copyKudosButton = document.querySelector("#copyKudos");
const clearButton = document.querySelector("#clearSelection");
const selectedCount = document.querySelector("#selectedCount");
const includePromotion = document.querySelector("#includePromotion");
const filterButtons = document.querySelectorAll(".filter-chip");
const infoDialog = document.querySelector("#qualityInfoDialog");
const infoTitle = document.querySelector("#qualityInfoTitle");
const infoDefinition = document.querySelector("#qualityInfoDefinition");
const infoExample = document.querySelector("#qualityInfoExample");
const closeInfo = document.querySelector("#closeQualityInfo");
const toast = document.querySelector(".toast");
const selectedQualities = new Set();
let activeFilter = "all";
let toastTimer;

qualityButtons.forEach((button) => {
  const quality = qualities[button.dataset.quality];
  const item = document.createElement("div");
  item.className = "category-item";
  item.dataset.area = button.dataset.area;
  button.parentNode.insertBefore(item, button);
  item.appendChild(button);

  const infoButton = document.createElement("button");
  infoButton.type = "button";
  infoButton.className = "category-info-button";
  infoButton.textContent = "i";
  infoButton.setAttribute("aria-label", `About ${quality.name}`);
  infoButton.dataset.infoQuality = button.dataset.quality;
  item.appendChild(infoButton);
});

const qualityItems = document.querySelectorAll(".category-item");

function orderedSelection() {
  return Array.from(qualityButtons)
    .map((button) => button.dataset.quality)
    .filter((quality) => selectedQualities.has(quality));
}

function composeComment() {
  const selected = orderedSelection();
  if (!selected.length) return "";

  const sentences = selected.map((quality) => qualities[quality].comment).join(" ");
  const ending = "GG — thanks for making the match better for everyone.";
  const promotion = includePromotion.checked
    ? ` Recognise good players with OPN Player Kudos: ${kudosUrl}`
    : "";
  return `${sentences} ${ending}${promotion}`;
}

function applyFilter(filter) {
  activeFilter = filter;
  qualityItems.forEach((item) => {
    const button = item.querySelector(".category");
    const matchesArea = filter === "all" || item.dataset.area === filter;
    const matchesSelection = filter === "selected" && selectedQualities.has(button.dataset.quality);
    item.hidden = filter === "selected" ? !matchesSelection : !matchesArea;
  });

  filterButtons.forEach((button) => {
    const isActive = button.dataset.filter === filter;
    button.classList.toggle("active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });
}

function updateOutput() {
  const count = selectedQualities.size;
  kudosText.value = composeComment();
  kudosText.classList.toggle("empty", count === 0);
  clearButton.disabled = count === 0;
  selectedCount.textContent = String(count);
  kudosCopyCard.setAttribute("aria-disabled", String(count === 0));

  if (activeFilter === "selected") applyFilter("selected");
}

function toggleQuality(quality) {
  if (selectedQualities.has(quality)) selectedQualities.delete(quality);
  else selectedQualities.add(quality);

  qualityButtons.forEach((button) => {
    const isActive = selectedQualities.has(button.dataset.quality);
    button.classList.toggle("active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });
  updateOutput();
}

function clearSelection() {
  selectedQualities.clear();
  qualityButtons.forEach((button) => {
    button.classList.remove("active");
    button.setAttribute("aria-pressed", "false");
  });
  updateOutput();
}

function showToast(message, duration = 1800) {
  toast.querySelector("span").textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.classList.remove("show");
    toast.querySelector("span").textContent = "Compliment copied";
  }, duration);
}

function legacyCopy(field) {
  field.focus();
  field.select();
  field.setSelectionRange(0, field.value.length);
  return document.execCommand("copy");
}

async function copyComment() {
  if (!kudosText.value) {
    showToast("Select at least one quality");
    return;
  }

  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(kudosText.value);
    } else if (!legacyCopy(kudosText)) {
      throw new Error("Copy command failed");
    }

    kudosCopyCard.classList.add("copied");
    copyKudosButton.querySelector("span").textContent = "Copied";
    showToast("Compliment copied");
    setTimeout(() => {
      kudosCopyCard.classList.remove("copied");
      copyKudosButton.querySelector("span").textContent = "Copy";
    }, 1800);
  } catch {
    legacyCopy(kudosText);
    showToast("Select the text and copy it manually", 2600);
  }
}

function openInfo(quality) {
  const content = qualities[quality];
  infoTitle.textContent = content.name;
  infoDefinition.textContent = content.definition;
  infoExample.textContent = content.example;
  infoDialog.showModal();
}

qualityButtons.forEach((button) => {
  button.addEventListener("click", () => toggleQuality(button.dataset.quality));
});

document.querySelectorAll(".category-info-button").forEach((button) => {
  button.addEventListener("click", () => openInfo(button.dataset.infoQuality));
});

filterButtons.forEach((button) => {
  button.addEventListener("click", () => applyFilter(button.dataset.filter));
});

clearButton.addEventListener("click", clearSelection);
includePromotion.addEventListener("change", updateOutput);
copyKudosButton.addEventListener("click", (event) => {
  event.stopPropagation();
  copyComment();
});
kudosCopyCard.addEventListener("click", copyComment);
kudosCopyCard.addEventListener("keydown", (event) => {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    copyComment();
  }
});
closeInfo.addEventListener("click", () => infoDialog.close());
infoDialog.addEventListener("click", (event) => {
  if (event.target === infoDialog) infoDialog.close();
});

applyFilter("all");
updateOutput();
