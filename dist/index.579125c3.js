const inputNode = document.getElementById("inputMovie");
const addButtonNode = document.getElementById("addMovieButton");
const moviesList = document.getElementById("moviesList");
const MOVIES_STORAGE_KEY = "movies";
const moviesFromStorageString = localStorage.getItem(MOVIES_STORAGE_KEY);
const moviesFromStorage = JSON.parse(moviesFromStorageString);
let movies = [];
updateStorage();
render();
async function saveToStorage(movie) {
    try {
        const ref = await addDoc(collection(db, MOVIES_STORAGE_KEY), {
            title: movie.title,
            status: movie.status
        });
        console.log("Document written with ID: ", ref.id);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
// const moviesString = JSON.stringify(movies);
// localStorage.setItem(MOVIES_STORAGE_KEY, moviesString);
}
async function updateStorage() {
    const querySnapshot = await getDocs(collection(db, MOVIES_STORAGE_KEY));
    querySnapshot.forEach((doc1)=>{
        movies.push({
            id: doc1.id,
            title: doc1.data().title
        });
        return movies;
    });
// if (Array.isArray(moviesFromStorage)) {
//     movies = moviesFromStorage;
// }
}
addButtonNode.addEventListener("click", function() {
    getMovieFromUser();
    render();
});
function getMovieFromUser() {
    if (inputNode.value === "") return;
    let movie = {
        title: inputNode.value,
        status: "active"
    };
    movies.push(movie);
    saveToStorage();
    inputNode.value = "";
}
function render() {
    moviesList.innerHTML = "";
    movies.forEach((movie, index)=>{
        const movieIndex = document.createElement("li");
        movieIndex.className = "movie";
        const viewedMovie = document.createElement("div");
        viewedMovie.className = "movie__viewed";
        viewedMovie.onclick = ()=>{
            crossOutMovie(movieIndex, viewedMovie);
        };
        const movieName = document.createElement("div");
        movieName.textContent = movie.title;
        movieName.className = "movie__name";
        const deleteButton = document.createElement("div");
        deleteButton.className = "movie__delete";
        deleteButton.addEventListener("click", ()=>{
            deleteMovie(index);
        });
        movieIndex.appendChild(viewedMovie);
        movieIndex.appendChild(movieName);
        movieIndex.appendChild(deleteButton);
        moviesList.appendChild(movieIndex);
    });
}
function crossOutMovie(movieIndex, viewedMovie) {
    movieIndex.classList.toggle("end__movie");
    viewedMovie.classList.toggle("end__viewed");
}
async function deleteMovie(index) {
    await deleteDoc(doc(db, "cities", "DC"));
    movies.splice(index, 1);
    saveToStorage();
    render();
}

//# sourceMappingURL=index.579125c3.js.map
