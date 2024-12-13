import { initializeApp } from "firebase/app";
import { getFirestore, serverTimestamp } from "firebase/firestore";
import {
    collection,
    doc,
    setDoc,
    getDocs,
    serverTimestamp,
    query,
    orderBy,
    updateDoc,
    deleteDoc } from "firebase/firestore";

import { v4 as uuidv4 } from 'uuid';

const firebaseConfig = {
  apiKey: "AIzaSyBGqPxZaE-cC5MDdjOPFCCdjyYgvMUVaLI",
  authDomain: "movies-list-904cb.firebaseapp.com",
  projectId: "movies-list-904cb",
  storageBucket: "movies-list-904cb.appspot.com",
  messagingSenderId: "234819509957",
  appId: "1:234819509957:web:333337c0c2f10f4b42daac",
  measurementId: "G-G2GZYD3GET"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const inputNode = document.getElementById('inputMovie');
const addButtonNode = document.getElementById('addMovieButton');
const moviesList = document.getElementById('moviesList');

let movies = [];

const key = 'movies';

async function pull() {
    const refQ = collection(db, key);
    const q = query(refQ, orderBy("createdAt"));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
        movies.push({
            id: doc.id,
            title: doc.data().title,
            done: doc.data().done
        })
        console.log(`${doc.id} => ${doc.data().done}`);
    });

    return movies;
}

async function push(movie) {
    try {
        await setDoc(doc(db, key, movie.id), {
            title: movie.title,
            done: movie.done,
            createdAt: serverTimestamp()
        });
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}

async function updateFirebase(movie) {
    const refUpdate = doc(db, key, movie.id);

    await updateDoc(refUpdate, {
        done: movie.done
    });
}

async function deleteFromFirebase(movie) {
    await deleteDoc(doc(db, key, movie.id));
}

pull().then(() => {
    render();
});

addButtonNode.addEventListener('click', function () {
    getMovieFromUser();

    render();
});

function getMovieFromUser() {
    if (inputNode.value === '') {
        return
    }

    let movie = {
        title: inputNode.value,
        done: false,
        id: uuidv4()
    };

    movies.push(movie);

    push(movie);

    inputNode.value = '';
}

function render() {
    moviesList.innerHTML = '';

    movies.forEach((movie, index) => {
        const movieIndex = document.createElement('li');
        const viewedMovie = document.createElement('input');
        const movieName = document.createElement('div');
        const deleteButton = document.createElement('div');

        movieIndex.className = 'movie';
        viewedMovie.className = 'movie__viewed';
        movieName.className = 'movie__name';
        deleteButton.className = 'movie__delete';

        movieName.textContent = movie.title;
        viewedMovie.setAttribute('type', 'checkbox');
        
        viewedMovie.onclick = () => {
            crossOutMovie(movieIndex, viewedMovie);
            movie.done = !movie.done;
            updateFirebase(movie);
        }

        if (movie.done) {
            viewedMovie.setAttribute('checked', true);
            movieIndex.classList.toggle('end__movie');
        }

        deleteButton.onclick = () => {
            deleteFromFirebase(movie);
            deleteMovie(index);
        };

        movieIndex.appendChild(viewedMovie);
        movieIndex.appendChild(movieName);
        movieIndex.appendChild(deleteButton);  
        moviesList.appendChild(movieIndex);
    })
}

function crossOutMovie(movieIndex) {
    movieIndex.classList.toggle('end__movie');
}

function deleteMovie(index) {
    movies.splice(index,1);
    render();
}