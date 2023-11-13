(() => {
    document.getElementById('searchMovie').addEventListener('click', handleFetch)
})();

function handleFetch() {
    console.log('fetching')
    const apiKey = '679f6362eb5ed713e61291e91ae499cc';
    let keyword = document.getElementById('search').value;
    let baseUrl = 'https://api.themoviedb.org/3/search/movie?query=';
    fetch(`${baseUrl}${keyword}&api_key=${apiKey}`).then(res => {
        console.log(res)
        if (!res.ok) {
            throw new Error(res.statusText)
        }
        return res.json()
    }).then(data => {
        console.log(data)
        let movieList = new DocumentFragment();
        data.results.forEach((item, index) => {
            let itemDom = document.createElement('div');
            itemDom.setAttribute('class', 'movieItem');
            itemDom.innerHTML += `
            ${item.poster_path ? `<img src='https://image.tmdb.org/t/p/w500${item.poster_path}'/>` : `<img src='https://via.placeholder.com/500x750.png?text=No+Image'/>`}
            <div>
            <h2>${item.original_title}</h2>
            <p class='release_date'>${item.release_date}</p>
            <p>${item.overview}</p>
            </div>
            `;
            movieList.appendChild(itemDom);
        });

        document.getElementById('movieList').appendChild(movieList);

    }).catch(err => {
        console.log(err)
    })
}