let start = 0;
let end = 10;
var totalItems = 500; // Variable to keep track of total items fetched
let Url = "https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty"


fetchData("https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty")


async function fetchData(url) {
  const ids = await getData(url);
  totalItems = ids.length
  let container = document.getElementById("items-container")
  container.innerHTML = ''
  for (let i = start; i < end && i < ids.length; i++) {
    let item = await getData("https://hacker-news.firebaseio.com/v0/item/" + ids[i] + ".json?print=pretty");
    if (item) { // Check if the item is not null
      let New = createItem(item, ids[i], false)
      container.appendChild(New)
    }
  }
}

async function handleComment(postIds) {
  let obj = await getData("https://hacker-news.firebaseio.com/v0/item/" + postIds + ".json?print=pretty");
  let item = createItem(obj, postIds, false)
  let kidsId = obj.kids
  let container = document.getElementById("items-container")
  container.innerHTML = ''
  container.appendChild(item)
  if (kidsId) {
    for (let i = 0; i < kidsId.length; i++) {
      let CommentObj = await getData("https://hacker-news.firebaseio.com/v0/item/" + kidsId[i] + ".json?print=pretty");
      let Comment = createItem(CommentObj, kidsId[i], true)
      container.appendChild(Comment)
    }
  }

}

function createItem(items, id) {

  let New = document.createElement("div");
  New.className = "new";

  let title = document.createElement("div");
  title.className = "title";
  title.textContent = items.title;
  New.appendChild(title);

  let author = document.createElement("div");
  author.className = "author";
  author.textContent = items.by;
  New.appendChild(author);

  let time = document.createElement("div");
  time.className = "time";
  time.textContent = new Date(items.time * 1000).toLocaleString();
  New.appendChild(time);

  if (items.url) {
    let url = document.createElement("a");
    url.className = "url";
    url.textContent = items.url; // The text that will be displayed
    url.href = items.url; // The actual link
    url.target = "_blank";
    New.appendChild(url);
  } else {
    let text = document.createElement("div");
    text.className = "text"
    text.innerHTML = items.text
    New.appendChild(text)
  }

  let score = document.createElement("div");
  score.className = "score";
  score.textContent = items.score;
  New.appendChild(score)


  let comment = document.createElement("a");
  comment.ids = 'comment'
  comment.onclick = () => handleComment(id);
  if (items.kids) {
    comment.innerHTML = "Comment " + "(" + items.kids.length + ")"
  } else {
    comment.innerHTML = "Comment (0)"
  }
  comment.style.cursor = "pointer"
  comment.style.color = "blue"
  New.appendChild(comment)

  return New
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



/****************  handle button  *****************/




const debouncedAskJob = debounce(function () {
  start = 0;
  end = 10;
  Url = "https://hacker-news.firebaseio.com/v0/askstories.json?print=pretty"
  fetchData(Url)
}, 1000);



const debouncedTopStories = debounce(function () {
  start = 0;
  end = 10;
  Url = "https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty"
  fetchData(Url)
}, 1000);

const debouncedNext = debounce(function () {
  if (end < totalItems) {
    start += 10;
    end += 10;
    fetchData(Url);
  }
}, 1000);

const debouncedPrev = debounce(function () {
  if (start > 0) {
    start -= 10;
    end -= 10;
    fetchData(Url);
  }
}, 1000);

document.getElementById("TopStories").addEventListener("click", debouncedAskJob);
document.getElementById("TopStories").addEventListener("click", debouncedTopStories);
document.getElementById("next-button").addEventListener("click", debouncedNext);
document.getElementById("prev-button").addEventListener("click", debouncedPrev);



// Debounce function implementation
function debounce(func, delay) {
  let timeout; // Store the timeout ID
  return function (...args) {
    const context = this; // Capture the context in case it's needed
    clearTimeout(timeout); // Clear the previous timeout
    timeout = setTimeout(() => func.apply(context, args), delay); // Set a new timeout
  };
}
