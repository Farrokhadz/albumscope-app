function renderProfilePage() {
  return `
    <div class="profile-hero">
      <div class="profile-avatar-ring">
        <div class="profile-avatar">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <circle cx="12" cy="8" r="4"></circle>
            <path d="M4 20c0-4 4-6 8-6s8 2 8 6"></path>
          </svg>
        </div>
      </div>
      <h1 class="profile-name">Guest</h1>
      <p class="profile-tag">Music Explorer</p>
    </div>

    <div class="profile-stats-row">
      <div class="stat-card">
        <span class="stat-number" id="saved-count">0</span>
        <span class="stat-label">Saved</span>
      </div>
      <div class="stat-card">
        <span class="stat-number" id="member-days">1</span>
        <span class="stat-label">Days Active</span>
      </div>
    </div>

    <div class="profile-actions">
      <button class="profile-action-btn" id="edit-profile-btn">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <path d="M12 20h9"></path>
          <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"></path>
        </svg>
        <span>Edit Profile</span>
        <svg class="chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M9 18l6-6-6-6"></path>
        </svg>
      </button>

      <button class="profile-action-btn" id="settings-btn">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <circle cx="12" cy="12" r="3"></circle>
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
        </svg>
        <span>Settings</span>
        <svg class="chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M9 18l6-6-6-6"></path>
        </svg>
      </button>

      <button class="profile-action-btn danger" id="logout-btn">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
          <path d="M16 17l5-5-5-5"></path>
          <path d="M21 12H9"></path>
        </svg>
        <span>Logout</span>
      </button>
    </div>
  `;
}

function initProfilePage() {
  const savedAlbums = getSavedAlbums();
  document.getElementById("saved-count").textContent = savedAlbums.length;

  document.getElementById("edit-profile-btn").addEventListener("click", () => {
    alert("Edit Profile به‌زودی فعال می‌شه 🚧");
  });

  document.getElementById("settings-btn").addEventListener("click", () => {
    alert("Settings به‌زودی فعال می‌شه 🚧");
  });

  document.getElementById("logout-btn").addEventListener("click", () => {
    alert("سیستم لاگین واقعی هنوز وصل نیست 🚧");
  });
}
