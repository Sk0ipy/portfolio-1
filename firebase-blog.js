// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { 
    getFirestore, 
    collection, 
    addDoc, 
    getDocs, 
    doc, 
    deleteDoc, 
    query, 
    orderBy
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB4-O5qlFRYODxdriZX9ykmwvF_DSRXv8c",
  authDomain: "portfolio-blog-c1c3d.firebaseapp.com",
  projectId: "portfolio-blog-c1c3d",
  storageBucket: "portfolio-blog-c1c3d.firebasestorage.app",
  messagingSenderId: "306779073334",
  appId: "1:306779073334:web:0fdc5e08479fd391972197"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Collection reference
const blogsCollection = collection(db, "blogs");

// Save a blog day to Firebase
async function saveDayToFirebase(number, label, date, category, title, content) {
    try {
        const docRef = await addDoc(blogsCollection, {
            number: parseInt(number),
            label: label,
            date: date,
            category: category,
            title: title,
            content: content,
            createdAt: new Date()
        });
        console.log("Blog day saved with ID: ", docRef.id);
        return true;
    } catch (error) {
        console.error("Error saving blog day: ", error);
        return false;
    }
}

// Load all blog days from Firebase
async function loadBlogsFromFirebase() {
    try {
        const q = query(blogsCollection, orderBy("number", "asc"));
        const querySnapshot = await getDocs(q);
        
        const days = {};
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            days[data.number] = {
                id: doc.id,
                label: data.label,
                date: data.date,
                category: data.category,
                title: data.title,
                content: data.content
            };
        });
        
        return days;
    } catch (error) {
        console.error("Error loading blog days: ", error);
        return {};
    }
}

// Delete a specific blog day from Firebase
async function deleteBlogFromFirebase(dayId) {
    try {
        await deleteDoc(doc(db, "blogs", dayId));
        console.log("Blog day deleted successfully");
        return true;
    } catch (error) {
        console.error("Error deleting blog day: ", error);
        return false;
    }
}

// Delete all blog days from Firebase
async function clearAllBlogsFromFirebase() {
    try {
        const querySnapshot = await getDocs(blogsCollection);
        const deletePromises = [];
        
        querySnapshot.forEach((document) => {
            deletePromises.push(deleteDoc(doc(db, "blogs", document.id)));
        });
        
        await Promise.all(deletePromises);
        console.log("All blog days deleted successfully");
        return true;
    } catch (error) {
        console.error("Error deleting all blog days: ", error);
        return false;
    }
}

export {
    saveDayToFirebase,
    loadBlogsFromFirebase,
    deleteBlogFromFirebase,
    clearAllBlogsFromFirebase
};
