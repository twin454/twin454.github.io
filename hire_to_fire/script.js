// UI

function switchTab(clickedTab, targetId) {
    const tabs = document.querySelectorAll("#tabs li");
    const contents = document.querySelectorAll(".content-tab");

    // Remove 'is-active' from all tabs
    tabs.forEach(tab => tab.classList.remove("is-active"));

    // Add 'is-active' to clicked tab
    clickedTab.classList.add("is-active");

    // Hide all tab contents
    contents.forEach(content => content.classList.add("is-hidden"));

    // Show selected tab content
    const targetContent = document.getElementById(targetId);
    if (targetContent) {
        targetContent.classList.remove("is-hidden");
    }
}

// Game
// productivity:  focus * times * energy * skill / distractions




