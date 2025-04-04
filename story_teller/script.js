let catalog = {};  // Variable to store the catalog (now a nested dictionary)

// Function to load the catalog and store it in a variable
async function loadCatalog() {
    const response = await fetch('https://twin454.github.io/story_teller/data/catalog.json');
    catalog = await response.json();  // Store the catalog in the variable
}

// Function to load the Bible verse and store it in a variable
async function loadBibleVerse(book, chapter, verse) {
    const response = await fetch('https://twin454.github.io/story_teller/data/' + book + '/' + chapter + '.json');
    const bible_chapter = await response.json();
    return bible_chapter[verse]; 
}

// Function to pick a specified number of random Bible verses
async function displayRandomVerses() {
    // Ensure the catalog is loaded
    if (Object.keys(catalog).length === 0) {
        console.error("Catalog not loaded yet.");
        return;
    }

    // Get the number of verses from the user's selection
    const verseCount = parseInt(document.getElementById('verse-count').value);

    // Validate the number of verses
    if (verseCount < 1 || isNaN(verseCount)) {
        alert("Please enter a valid number greater than 0.");
        return;
    }

    // Randomly pick the specified number of Bible verses
    const selectedVerses = [];
    let verse = "";
    while (selectedVerses.length < verseCount) {
        const book_list = Object.keys(catalog); 
        const random_book_index = Math.floor(Math.random() * book_list.length);
        const random_book = book_list[random_book_index];

        const chapter_list = Object.keys(catalog[random_book]); 
        const random_chapter_index = Math.floor(Math.random() * chapter_list.length);
        const random_chapter = chapter_list[random_chapter_index];

        const random_verse = Math.floor(Math.random() * catalog[random_book][random_chapter]).toString();
        verse = await loadBibleVerse(random_book, random_chapter, random_verse);
        if (!selectedVerses.includes(verse)) {
            selectedVerses.push(verse);
        }
    }

    // Fetch the content of the selected Bible verses and display them
    const bibleVersesList = document.getElementById('bible-verses');
    bibleVersesList.innerHTML = '';  // Clear any existing verses

    for (const verse of selectedVerses) {
        const listItem = document.createElement('li');
        listItem.innerHTML = `<strong>${verse}</strong><br>`;
        bibleVersesList.appendChild(listItem);
    }
}

// Call the function when the page loads
window.onload = async function() {
    await loadCatalog();  // Load the catalog when the page loads
    displayRandomVerses();  // Display random verses by default
};

// Call the function when the button is clicked
document.getElementById('load-verses').addEventListener('click', displayRandomVerses);
