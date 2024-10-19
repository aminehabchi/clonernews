
let max = 41887039;

async function fetchData() {
    let DATA = [];
    i = max
    const ids = await getData('https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty');
    for (let i = 0; i < ids.length; i++) {
        items = await getData('https://hacker-news.firebaseio.com/v0/item/' + ids[i] + '.json?print=pretty');
        console.log(items.type,i);
        DATA.push(items);
    }
  //  console.log(DATA);
    return DATA
}

function getData(url) {
    return fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            return null;
        });
}

console.log(fetchData())


