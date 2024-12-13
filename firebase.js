// import { initializeApp } from "firebase/app";
// import { getFirestore } from "firebase/firestore";
// import {
//     collection,
//     addDoc,
//     getDocs,
//     deleteDoc } from "firebase/firestore";

// const firebaseConfig = {
//   apiKey: "AIzaSyBGqPxZaE-cC5MDdjOPFCCdjyYgvMUVaLI",
//   authDomain: "movies-list-904cb.firebaseapp.com",
//   projectId: "movies-list-904cb",
//   storageBucket: "movies-list-904cb.appspot.com",
//   messagingSenderId: "234819509957",
//   appId: "1:234819509957:web:333337c0c2f10f4b42daac",
//   measurementId: "G-G2GZYD3GET"
// };


// export function createFirebase(key) {
//     const app = initializeApp(firebaseConfig);
//     const db = getFirestore(app);

//     return {
//         key,
//         db,
//         pull: async function() {
//             const querySnapshot = await getDocs(collection(this.db, this.key));
//             let movies = [];

//             querySnapshot.forEach((doc) => {
//                 movies.push({
//                     id: doc.id,
//                     title: doc.data().title,
//                     done: doc.data().done
//                 })
//                 console.log(`${doc.id} => ${doc.data().title}`);
//             });

//             return movies;
//         },
//         push: async function(movie) {
//             try {
//                 const ref = await addDoc(collection(this.db, this.key), {
//                     title: movie.title,
//                     done: movie.done
//                 });
//                 console.log("Document written with ID: ", ref.id);
//             } catch (e) {
//                 console.error("Error adding document: ", e);
//             }
//         }
//     }
// }