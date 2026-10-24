# OPN Report Kit

A lightweight, dependency-free web tool for filtering, combining and copying neutral Steam report and profile-comment templates.

Steam group: https://steamcommunity.com/groups/OpenPlayNetwork

Selecting **Farming bot** reveals a daily, browser-local queue for Steam profile URLs. Duplicate profiles are merged, their selected report categories are retained, and one consolidated email can be copied at the end of the day for use outside Steam's browser.

The sharing section provides prepared Steam-comment and Discord messages, direct links for supported services, link copying, and the device's native share menu where available.

`/kudos/` contains **OPN Player Feedback**, an additive generator that rates each individual or teamwork quality independently on five levels: positive, neutral, negative, completely absent or severely negative. Participation and AFK behaviour are included as a separate quality. The generated comment can optionally invite the player to the OpenPlay Network Steam group.

## Use locally

Open `index.html` directly, or serve the directory with any static web server.

## Publish with GitHub Pages

In the repository settings, open **Pages**, select **Deploy from a branch**, and choose the `main` branch and `/ (root)` folder.
