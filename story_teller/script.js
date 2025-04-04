// Function to fetch Bible verses from text files
async function fetchBibleVerse(filePath) {
    const response = await fetch(filePath);
    const text = await response.text();
    return text;
}

// Function to pick a specified number of random Bible verses
async function displayRandomVerses() {
    // Get the number of verses from the user's selection
    const verseCount = parseInt(document.getElementById('verse-count').value);

    // Load the catalog (list of Bible verse references)
    const response = await fetch('catalog.json');
    const catalog = await response.json();

    // Randomly pick the specified number of Bible verses
    const selectedVerses = [];
    while (selectedVerses.length < verseCount) {
        const randomIndex = Math.floor(Math.random() * catalog.length);
        const verse = catalog[randomIndex];
        if (!selectedVerses.includes(verse)) {
            selectedVerses.push(verse);
        }
    }

    // Fetch the content of the selected Bible verses and display them
    const bibleVersesList = document.getElementById('bible-verses');
    bibleVersesList.innerHTML = '';  // Clear any existing verses

    for (const verse of selectedVerses) {
        const verseContent = await fetchBibleVerse(verse.file);
        const listItem = document.createElement('li');
        listItem.innerHTML = `<strong>${verse.reference}</strong><br>${verseContent}`;
        bibleVersesList.appendChild(listItem);
    }
}

// Call the function when the page loads or when the button is clicked
document.getElementById('load-verses').addEventListener('click', displayRandomVerses);

// Load default verses when the page is loaded
window.onload = displayRandomVerses;
