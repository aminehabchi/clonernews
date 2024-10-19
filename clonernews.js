let start = 0;
let end = 10;
let totalItems = 0; // Variable to keep track of total items fetched


// Initial load
main();

async function main() {
  try {
    const topItems = await fetchData(); // Await the async call to fetchData
    const container = document.getElementById("items-container");
    //container.innerHTML = ''; // Clear previous items

    for (let i = start; i < end; i++) {
      if (topItems[i]) { // Check if the item is not null
        let New = document.createElement("div");
        New.className = "new";

        let title = document.createElement("div");
        title.className = "title";
        title.textContent = topItems[i].title;
        New.appendChild(title);

        let author = document.createElement("div");
        author.className = "author";
        author.textContent = topItems[i].by;
        New.appendChild(author);

        let time = document.createElement("div");
        time.className = "time";
        time.textContent = new Date(topItems[i].time * 1000).toLocaleString();
        New.appendChild(time);

        let url = document.createElement("a");
        url.className = "url";
        url.textContent = topItems[i].url; // The text that will be displayed
        url.href = topItems[i].url; // The actual link
        url.target = "_blank";
        New.appendChild(url);

        document.body.appendChild(New);
      }
    }

    // Update totalItems for pagination limits
    totalItems = await getData("https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty");
    
    // Enable or disable buttons based on pagination
    document.getElementById("next-button").disabled = end >= totalItems.length;
    document.getElementById("prev-button").disabled = start === 0;

  } catch (error) {
    console.error("Error in fetching data:", error);
  }
}



async function fetchData() {
  let DATA = [];
  const ids = await getData("https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty");

  for (let i = start; i < end && i < ids.length; i++) {
    let items = await getData("https://hacker-news.firebaseio.com/v0/item/" + ids[i] + ".json?print=pretty");
    DATA.push(items);
  }
  return DATA;
}



async function getData(url) {
  return fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      return null; // Return null if there was an error
    });
}


/*********************************/



// document.getElementById("next-button").addEventListener("click", function () {
//   if (end < totalItems) { // Check if there's more data to fetch
//     start += 10;
//     end += 10;
//     main();
//   }
// });

// document.getElementById("prev-button").addEventListener("click", function () {
//   if (start > 0) { // Prevent going below zero
//     start -= 10;
//     end -= 10;
//     main();
//   }
// });