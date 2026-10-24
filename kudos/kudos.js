const groupUrl = "https://steamcommunity.com/groups/OpenPlayNetwork";

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
  negativeAttitude: {
    name: "Negative attitude",
    comment: "Kept a negative attitude that made the match harder for others.",
    definition: "Persistent negativity that reduces cooperation or enjoyment beyond an understandable moment of frustration.",
    example: "Choose this when repeated complaining, defeatism or hostility affected the match rather than one isolated reaction.",
  },
  poorSportsmanship: {
    name: "Poor sportsmanship",
    comment: "Showed poor sportsmanship when rounds did not go their way.",
    definition: "Responding to competition, mistakes, victory or defeat without basic fairness and respect.",
    example: "Choose this for repeated taunting, gloating, rage quitting or hostility toward opponents after setbacks.",
  },
  givesUp: {
    name: "Gives up / AFK",
    comment: "Stopped participating or appeared to give up before the match was over.",
    definition: "Withdrawing from active play while the match is still ongoing, without an evident unavoidable reason.",
    example: "Choose this after repeated or prolonged inactivity, intentional idling or openly refusing to continue—not a brief technical interruption.",
  },
  blamesOthers: {
    name: "Blames others",
    comment: "Repeatedly blamed teammates instead of focusing on solutions.",
    definition: "Directing responsibility toward teammates in a repetitive or hostile way rather than helping the team recover.",
    example: "Choose this when blame continued across rounds and replaced useful information or constructive suggestions.",
  },
  disrespectful: {
    name: "Disrespectful",
    comment: "Communicated disrespectfully during the match.",
    definition: "Communication that belittles, humiliates or dismisses other players.",
    example: "Choose this for a repeated pattern of insults or contempt. Serious abuse should also be reported privately through Steam.",
  },
  selfishPlay: {
    name: "Selfish play",
    comment: "Prioritised personal statistics over useful team play.",
    definition: "Repeatedly choosing individual score or attention over decisions that would reasonably help the team.",
    example: "Choose this when stat chasing, baiting or unnecessary risk repeatedly harmed shared objectives.",
  },
  ignoresObjective: {
    name: "Ignores objective",
    comment: "Frequently ignored the objective and the team's immediate needs.",
    definition: "Failing to respond to the actual win condition despite having a reasonable opportunity to do so.",
    example: "Choose this for repeated disregard of plants, defuses, sites, time or survival—not one tactical disagreement.",
  },
  refusesToAdapt: {
    name: "Refuses to adapt",
    comment: "Did not adapt when the situation or team composition changed.",
    definition: "Persisting with an ineffective role or approach despite repeated evidence that the team needs something different.",
    example: "Choose this when the player repeatedly rejected reasonable adjustments, not merely because they preferred another strategy.",
  },
  poorCommunication: {
    name: "Poor communication",
    comment: "Important information was often missing or communicated too late.",
    definition: "Communication that repeatedly fails to provide relevant information the team could reasonably use.",
    example: "Choose this when avoidable omissions or very late information repeatedly affected coordination.",
  },
  floodsComms: {
    name: "Floods communications",
    comment: "Frequently talked over others or filled communications with unnecessary noise.",
    definition: "Using voice or text so heavily that useful information becomes difficult to hear or read.",
    example: "Choose this for a repeated pattern of talking over calls, playing noise or continuing unrelated discussion during key moments.",
  },
  misleadingCalls: {
    name: "Misleading calls",
    comment: "Made calls that were unclear, contradictory or unsupported by available information.",
    definition: "Repeated information or instructions that confuse teammates rather than helping them decide.",
    example: "Choose this for recurring inaccurate or contradictory calls—not one understandable mistake.",
  },
  noTeamPlay: {
    name: "No team play",
    comment: "Played separately from the team and rarely coordinated with others.",
    definition: "Repeatedly acting in isolation when coordination was reasonably possible and useful.",
    example: "Choose this when the player consistently ignored shared plans, spacing or timing rather than making an occasional solo play.",
  },
  refusesSupport: {
    name: "Does not support",
    comment: "Rarely supported teammates with trades, cover or positioning.",
    definition: "Repeatedly failing to provide reasonable support when positioned or equipped to do so.",
    example: "Choose this when avoidable distance, baiting or lack of cover repeatedly left teammates unsupported.",
  },
  economySelfish: {
    name: "Selfish economy",
    comment: "Managed money and equipment without considering the team's economy.",
    definition: "Treating shared economic decisions as purely individual despite clear team needs.",
    example: "Choose this for repeated refusal to coordinate buys, unnecessary force buys or withholding equipment when sharing was reasonable.",
  },
  controllingLeadership: {
    name: "Controlling leadership",
    comment: "Tried to direct the team in a way that became controlling or confrontational.",
    definition: "Attempting to lead without listening, while pressuring or blaming teammates who choose differently.",
    example: "Choose this when orders, interruptions or hostility repeatedly replaced collaborative decision-making.",
  },
  disruptivePlay: {
    name: "Disruptive play",
    comment: "Repeatedly disrupted teammates through blocking, team damage or other obstructive behaviour.",
    definition: "Conduct that interferes with teammates' ability to participate normally in the match.",
    example: "Choose this for a repeated pattern that appears deliberate. Serious griefing should also be reported privately through Steam.",
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
const toneButtons = document.querySelectorAll(".tone-chip");
const infoDialog = document.querySelector("#qualityInfoDialog");
const infoTitle = document.querySelector("#qualityInfoTitle");
const infoDefinition = document.querySelector("#qualityInfoDefinition");
const infoExample = document.querySelector("#qualityInfoExample");
const infoKicker = document.querySelector("#qualityInfoKicker");
const closeInfo = document.querySelector("#closeQualityInfo");
const toast = document.querySelector(".toast");
const selectedQualities = new Set();
let activeFilter = "all";
let activeTone = "positive";
let toastTimer;

qualityButtons.forEach((button) => {
  const quality = qualities[button.dataset.quality];
  const item = document.createElement("div");
  item.className = "category-item";
  item.dataset.area = button.dataset.area;
  item.dataset.tone = button.dataset.tone;
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
  const tones = new Set(selected.map((quality) => document.querySelector(`[data-quality="${quality}"]`).dataset.tone));
  const ending = tones.size > 1
    ? "There were good moments, but the match would have been better with more consistent teamwork and respect."
    : tones.has("negative")
      ? "I hope future matches are approached with more respect, cooperation and focus."
      : "GG — thanks for making the match better for everyone.";
  const promotion = includePromotion.checked
    ? `\n\nJoin OpenPlay Network — a community for fair play and better matches: ${groupUrl}`
    : "";
  return `${sentences} ${ending}${promotion}`;
}

function applyFilter(filter) {
  activeFilter = filter;
  qualityItems.forEach((item) => {
    const button = item.querySelector(".category");
    const matchesArea = filter === "all" || item.dataset.area === filter;
    const matchesSelection = filter === "selected" && selectedQualities.has(button.dataset.quality);
    const matchesTone = activeTone === "both" || item.dataset.tone === activeTone;
    item.hidden = filter === "selected" ? !matchesSelection : !(matchesArea && matchesTone);
  });

  filterButtons.forEach((button) => {
    const isActive = button.dataset.filter === filter;
    button.classList.toggle("active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });
}

function applyTone(tone) {
  activeTone = tone;
  toneButtons.forEach((button) => {
    const isActive = button.dataset.toneFilter === tone;
    button.classList.toggle("active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });
  applyFilter(activeFilter);
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
    toast.querySelector("span").textContent = "Feedback copied";
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
    showToast("Select at least one observation");
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
    showToast("Feedback copied");
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
  const button = document.querySelector(`[data-quality="${quality}"]`);
  infoKicker.textContent = button.dataset.tone === "negative" ? "NEGATIVE OBSERVATION" : "POSITIVE OBSERVATION";
  infoKicker.classList.toggle("negative", button.dataset.tone === "negative");
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

toneButtons.forEach((button) => {
  button.addEventListener("click", () => applyTone(button.dataset.toneFilter));
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
