const groupUrl = "https://steamcommunity.com/groups/OpenPlayNetwork";

const qualities = {
  attitude: {
    name: "Attitude", icon: "ATT", area: "individual",
    definition: "The player's general disposition and its effect on the match.",
    ratings: {
      positive: { label: "Positive", comment: "Maintained a positive, constructive attitude throughout the match." },
      neutral: { label: "Neutral", comment: "Had a neutral attitude that did not noticeably affect the match." },
      negative: { label: "Negative", comment: "Maintained a negative attitude that made the match harder for others." },
      zero: { label: "Absent", comment: "Showed no constructive attitude or engagement during the match." },
      extreme: { label: "Toxic", comment: "Used insults or intense hostility that seriously damaged the team's experience." },
    },
  },
  skilledPlay: {
    name: "Skilled play", icon: "SKL", area: "individual",
    definition: "The level of mechanical execution visibly demonstrated during the match.",
    ratings: {
      positive: { label: "Highly skilled", comment: "Showed excellent individual skill and mechanics." },
      neutral: { label: "Regular", comment: "Showed an ordinary level of mechanical skill for the match." },
      negative: { label: "Lacks skill", comment: "Struggled with the basic mechanics needed in several situations." },
      zero: { label: "No skill shown", comment: "Showed no effective use of the basic mechanics during the observed match." },
      extreme: { label: "Team-harming", comment: "The repeated mechanical failures had a severely negative effect on the team's ability to compete." },
    },
  },
  decisions: {
    name: "Decision-making", icon: "IQ", area: "individual",
    definition: "How well the player read situations, risks and available information.",
    ratings: {
      positive: { label: "Smart", comment: "Made smart decisions and showed strong game sense." },
      neutral: { label: "Mixed", comment: "Made a mixture of effective and questionable decisions." },
      negative: { label: "Poor", comment: "Repeatedly made decisions that put the player or team at a disadvantage." },
      zero: { label: "Absent", comment: "Showed no meaningful decision-making contribution during the match." },
      extreme: { label: "Severely harmful", comment: "Repeated decisions caused severe and recurring harm to the team's chances." },
    },
  },
  consistency: {
    name: "Consistency", icon: "CON", area: "individual",
    definition: "How reliably the player maintained their performance and role across the match.",
    ratings: {
      positive: { label: "Consistent", comment: "Played consistently and could be relied on round after round." },
      neutral: { label: "Uneven", comment: "Performance varied between effective and ineffective moments." },
      negative: { label: "Inconsistent", comment: "Performance was repeatedly inconsistent across the match." },
      zero: { label: "Absent", comment: "Showed no sustained level of consistent performance during the match." },
      extreme: { label: "Unreliable", comment: "The player was so unreliable that team coordination was seriously affected." },
    },
  },
  composure: {
    name: "Composure", icon: "CLM", area: "individual",
    definition: "The player's response to pressure, setbacks and tense situations.",
    ratings: {
      positive: { label: "Calm", comment: "Stayed calm and effective under pressure." },
      neutral: { label: "Variable", comment: "Handled some pressured situations well but struggled in others." },
      negative: { label: "Loses composure", comment: "Frequently lost composure when the match became difficult." },
      zero: { label: "Absent", comment: "Showed no composure in the pressured situations observed." },
      extreme: { label: "Hostile", comment: "Reacted to pressure with severe hostility or abuse that disrupted the team." },
    },
  },
  fairPlay: {
    name: "Fair play", icon: "FAIR", area: "individual",
    definition: "Respect for the rules, the match and the people taking part.",
    ratings: {
      positive: { label: "Fair", comment: "Played fairly and showed good sportsmanship." },
      neutral: { label: "Unremarkable", comment: "Showed neither notably positive nor negative sportsmanship." },
      negative: { label: "Poor sportsmanship", comment: "Showed poor sportsmanship when situations did not go their way." },
      zero: { label: "Absent", comment: "Showed no recognisable signs of fair play or sportsmanship." },
      extreme: { label: "Severe misconduct", comment: "Displayed severe unsporting conduct that substantially harmed the match." },
    },
  },
  helpfulness: {
    name: "Helpfulness", icon: "HELP", area: "individual",
    definition: "Whether the player helped others understand, improve or recover during the match.",
    ratings: {
      positive: { label: "Helpful", comment: "Was helpful and encouraging to other players." },
      neutral: { label: "Limited", comment: "Offered little direct help but did not obstruct others." },
      negative: { label: "Unhelpful", comment: "Was unhelpful when teammates reasonably needed assistance." },
      zero: { label: "No help", comment: "Provided no help or encouragement to other players." },
      extreme: { label: "Obstructive", comment: "Actively obstructed or attacked teammates instead of helping them." },
    },
  },
  respect: {
    name: "Respect", icon: "RES", area: "individual",
    definition: "How the player treated teammates and opponents in voice, text and conduct.",
    ratings: {
      positive: { label: "Respectful", comment: "Communicated respectfully, even in difficult moments." },
      neutral: { label: "Neutral", comment: "Communication was neutral, with no notable positive or negative conduct." },
      negative: { label: "Disrespectful", comment: "Communicated disrespectfully during the match." },
      zero: { label: "Absent", comment: "Showed no recognisable respect toward other players during the match." },
      extreme: { label: "Abusive", comment: "Used serious insults or abusive conduct toward other players." },
    },
  },
  teamPlay: {
    name: "Team play", icon: "TEAM", area: "teamwork",
    definition: "Whether the player prioritised coordination and the shared result over personal statistics.",
    ratings: {
      positive: { label: "Team player", comment: "Put the group ahead of personal statistics and showed genuine team spirit." },
      neutral: { label: "Occasional", comment: "Cooperated with the team at times but often played independently." },
      negative: { label: "Plays alone", comment: "Repeatedly played separately from the team and rarely coordinated with others." },
      zero: { label: "No team play", comment: "Made no observable effort to play as part of the team." },
      extreme: { label: "Disruptive", comment: "Behaved in ways that severely disrupted the team's ability to play together." },
    },
  },
  communication: {
    name: "Communication", icon: "COM", area: "teamwork",
    definition: "The clarity, relevance and timing of information shared with the team.",
    ratings: {
      positive: { label: "Clear", comment: "Shared clear, useful information without flooding communications." },
      neutral: { label: "Limited", comment: "Communication was limited but generally understandable." },
      negative: { label: "Poor", comment: "Important information was often missing, unclear or communicated too late." },
      zero: { label: "None", comment: "Provided no communication to the team during the observed match." },
      extreme: { label: "Abusive", comment: "Used communications for insults, harassment or disruption that seriously affected the team." },
    },
  },
  calls: {
    name: "Tactical calls", icon: "CALL", area: "teamwork",
    definition: "How useful the player's suggestions and tactical calls were to collective decisions.",
    ratings: {
      positive: { label: "Useful", comment: "Made timely calls that helped the team make decisions." },
      neutral: { label: "Mixed", comment: "Made calls of mixed usefulness and accuracy." },
      negative: { label: "Misleading", comment: "Repeatedly made calls that were unclear, contradictory or unsupported." },
      zero: { label: "No calls", comment: "Made no tactical calls during the observed match." },
      extreme: { label: "Severely disruptive", comment: "Repeated calls seriously disrupted coordination and repeatedly harmed team decisions." },
    },
  },
  support: {
    name: "Supportive play", icon: "SUP", area: "teamwork",
    definition: "Support provided through trades, cover, spacing and positioning.",
    ratings: {
      positive: { label: "Supportive", comment: "Supported teammates well with trades, positioning and cover." },
      neutral: { label: "Occasional", comment: "Provided support in some situations but was often too distant or late." },
      negative: { label: "No support", comment: "Rarely supported teammates despite having opportunities to do so." },
      zero: { label: "Absent", comment: "Provided no observable support through trades, cover or positioning." },
      extreme: { label: "Obstructive", comment: "Repeatedly obstructed teammates or left them exposed in ways that severely harmed the team." },
    },
  },
  utility: {
    name: "Utility use", icon: "UTIL", area: "teamwork",
    definition: "How purposefully support resources or grenades were used for the team.",
    ratings: {
      positive: { label: "Thoughtful", comment: "Used utility thoughtfully to create opportunities for the team." },
      neutral: { label: "Basic", comment: "Used utility at a basic level with limited team impact." },
      negative: { label: "Ineffective", comment: "Utility was repeatedly mistimed, wasted or disruptive to teammates." },
      zero: { label: "None", comment: "Made no observable use of utility to support the team." },
      extreme: { label: "Team-harming", comment: "Utility use repeatedly and severely harmed teammates or prevented effective team play." },
    },
  },
  economy: {
    name: "Team economy", icon: "ECO", area: "teamwork",
    definition: "How the player managed purchases and equipment in relation to team needs.",
    ratings: {
      positive: { label: "Shares", comment: "Shared weapons and helped manage the team's economy." },
      neutral: { label: "Adequate", comment: "Managed purchases adequately without notably helping or harming the team economy." },
      negative: { label: "Selfish", comment: "Managed money and equipment without considering the team's economy." },
      zero: { label: "No contribution", comment: "Made no observable contribution to managing or sharing the team economy." },
      extreme: { label: "Severely selfish", comment: "Repeated economic choices seriously damaged the team's ability to buy and compete together." },
    },
  },
  objective: {
    name: "Objective focus", icon: "OBJ", area: "teamwork",
    definition: "How consistently decisions served the actual win condition.",
    ratings: {
      positive: { label: "Focused", comment: "Stayed focused on the objective and what the team needed." },
      neutral: { label: "Inconsistent", comment: "Considered the objective in some moments but overlooked it in others." },
      negative: { label: "Ignores it", comment: "Frequently ignored the objective and the team's immediate needs." },
      zero: { label: "Absent", comment: "Showed no observable focus on the objective during the match." },
      extreme: { label: "Team-harming", comment: "Repeatedly acted against the objective in ways that severely harmed the team's chances." },
    },
  },
  leadership: {
    name: "Leadership", icon: "LEAD", area: "teamwork",
    definition: "How the player influenced coordination, participation and decision-making.",
    ratings: {
      positive: { label: "Constructive", comment: "Helped organise the team in a calm and constructive way." },
      neutral: { label: "No influence", comment: "Did not take a notable leadership role during the match." },
      negative: { label: "Controlling", comment: "Tried to direct the team in a controlling or confrontational way." },
      zero: { label: "Absent", comment: "Provided no leadership or organisational contribution during the match." },
      extreme: { label: "Abusive", comment: "Used insults, pressure or intimidation while trying to control the team." },
    },
  },
  adaptability: {
    name: "Adaptability", icon: "ADP", area: "teamwork",
    definition: "How well the player adjusted role, position or approach as circumstances changed.",
    ratings: {
      positive: { label: "Adaptable", comment: "Adapted well to teammates and changing situations." },
      neutral: { label: "Somewhat", comment: "Made some adjustments but generally kept the same approach." },
      negative: { label: "Rigid", comment: "Repeatedly refused to adapt when the situation or team needed a change." },
      zero: { label: "Absent", comment: "Showed no observable adaptation to changing situations or team needs." },
      extreme: { label: "Severely disruptive", comment: "The refusal to adapt repeatedly and severely disrupted the team's play." },
    },
  },
  opponentConduct: {
    name: "Conduct toward opponents", icon: "GG", area: "teamwork",
    definition: "The respect shown to opponents in competition, victory and defeat.",
    ratings: {
      positive: { label: "Respectful", comment: "Was a respectful opponent and helped make the match enjoyable." },
      neutral: { label: "Neutral", comment: "Had no notable positive or negative interaction with opponents." },
      negative: { label: "Hostile", comment: "Behaved disrespectfully toward opponents during the match." },
      zero: { label: "Absent", comment: "Showed no recognisable respect toward opponents during the match." },
      extreme: { label: "Abusive", comment: "Used serious insults, harassment or abusive conduct toward opponents." },
    },
  },
};

const qualityGrid = document.querySelector("#qualityGrid");
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
const infoKicker = document.querySelector("#qualityInfoKicker");
const closeInfo = document.querySelector("#closeQualityInfo");
const toast = document.querySelector(".toast");
const selectedRatings = new Map();
let activeFilter = "all";
let toastTimer;

function renderQualities() {
  Object.entries(qualities).forEach(([qualityId, quality]) => {
    const item = document.createElement("article");
    item.className = "category-item rating-card";
    item.dataset.quality = qualityId;
    item.dataset.area = quality.area;

    const heading = document.createElement("div");
    heading.className = "rating-card-heading";
    heading.innerHTML = `<span class="category-icon">${quality.icon}</span><h3>${quality.name}</h3>`;

    const infoButton = document.createElement("button");
    infoButton.type = "button";
    infoButton.className = "category-info-button";
    infoButton.textContent = "i";
    infoButton.setAttribute("aria-label", `About ${quality.name}`);
    infoButton.addEventListener("click", () => openInfo(qualityId));
    heading.appendChild(infoButton);
    item.appendChild(heading);

    const controls = document.createElement("div");
    controls.className = "rating-control";
    controls.setAttribute("role", "group");
    controls.setAttribute("aria-label", `Rate ${quality.name}`);

    ["positive", "neutral", "negative", "zero", "extreme"].forEach((rating) => {
      const option = quality.ratings[rating];
      const button = document.createElement("button");
      button.type = "button";
      button.className = `rating-button ${rating}`;
      button.dataset.rating = rating;
      button.setAttribute("aria-pressed", "false");
      const symbol = { positive: "+", neutral: "=", negative: "−", zero: "0", extreme: "−−" }[rating];
      button.innerHTML = `<strong>${symbol}</strong><span>${option.label}</span>`;
      button.addEventListener("click", () => setRating(qualityId, rating));
      controls.appendChild(button);
    });

    item.appendChild(controls);
    qualityGrid.appendChild(item);
  });
}

function orderedSelection() {
  return Object.keys(qualities)
    .filter((qualityId) => selectedRatings.has(qualityId))
    .map((qualityId) => ({ qualityId, rating: selectedRatings.get(qualityId) }));
}

function composeComment() {
  const selected = orderedSelection();
  if (!selected.length) return "";

  const sentences = selected
    .map(({ qualityId, rating }) => qualities[qualityId].ratings[rating].comment)
    .join(" ");
  const counts = selected.reduce((result, { rating }) => {
    result[rating] += 1;
    return result;
  }, { positive: 0, neutral: 0, negative: 0, zero: 0, extreme: 0 });

  let ending = "This was a mixed experience based on the qualities observed.";
  if (counts.positive > 0 && counts.negative === 0 && counts.neutral === 0 && counts.zero === 0 && counts.extreme === 0) {
    ending = "GG — thanks for making the match better for everyone.";
  } else if (counts.negative > 0 && counts.positive === 0 && counts.neutral === 0 && counts.zero === 0 && counts.extreme === 0) {
    ending = "I hope future matches are approached with more cooperation and respect.";
  } else if (counts.neutral > 0 && counts.positive === 0 && counts.negative === 0 && counts.zero === 0 && counts.extreme === 0) {
    ending = "Overall, the match experience was fairly neutral.";
  } else if (counts.zero > 0 && counts.positive === 0 && counts.neutral === 0 && counts.negative === 0 && counts.extreme === 0) {
    ending = "These qualities were entirely absent in the observed match.";
  } else if (counts.extreme > 0 && counts.positive === 0 && counts.neutral === 0 && counts.negative === 0 && counts.zero === 0) {
    ending = "This conduct had a severely negative effect on the match. Serious abuse or disruption should also be reported privately through Steam.";
  }

  const promotion = includePromotion.checked
    ? `\n\nJoin OpenPlay Network — a community for fair play and better matches: ${groupUrl}`
    : "";
  return `${sentences} ${ending}${promotion}`;
}

function applyFilter(filter) {
  activeFilter = filter;
  document.querySelectorAll(".rating-card").forEach((item) => {
    const matchesArea = filter === "all" || item.dataset.area === filter;
    const matchesSelection = filter === "selected" && selectedRatings.has(item.dataset.quality);
    item.hidden = filter === "selected" ? !matchesSelection : !matchesArea;
  });

  filterButtons.forEach((button) => {
    const isActive = button.dataset.filter === filter;
    button.classList.toggle("active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });
}

function updateOutput() {
  const count = selectedRatings.size;
  kudosText.value = composeComment();
  kudosText.classList.toggle("empty", count === 0);
  clearButton.disabled = count === 0;
  selectedCount.textContent = String(count);
  kudosCopyCard.setAttribute("aria-disabled", String(count === 0));

  document.querySelectorAll(".rating-card").forEach((item) => {
    const selected = selectedRatings.get(item.dataset.quality);
    item.dataset.selectedRating = selected || "";
    item.querySelectorAll(".rating-button").forEach((button) => {
      const isActive = button.dataset.rating === selected;
      button.classList.toggle("active", isActive);
      button.setAttribute("aria-pressed", String(isActive));
    });
  });

  if (activeFilter === "selected") applyFilter("selected");
}

function setRating(qualityId, rating) {
  if (selectedRatings.get(qualityId) === rating) selectedRatings.delete(qualityId);
  else selectedRatings.set(qualityId, rating);
  updateOutput();
}

function clearSelection() {
  selectedRatings.clear();
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
    showToast("Rate at least one quality");
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

function openInfo(qualityId) {
  const quality = qualities[qualityId];
  infoKicker.textContent = "QUALITY RATING";
  infoTitle.textContent = quality.name;
  infoDefinition.textContent = quality.definition;
  infoExample.textContent = ["positive", "neutral", "negative", "zero", "extreme"]
    .map((rating) => `${{ positive: "+", neutral: "=", negative: "−", zero: "0", extreme: "−−" }[rating]} ${quality.ratings[rating].label}`)
    .join(" · ");
  infoDialog.showModal();
}

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

renderQualities();
applyFilter("all");
updateOutput();
