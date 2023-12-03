import express from "express";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
import cookieParser from "cookie-parser";
import dotenv from 'dotenv';
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadString, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";


dotenv.config({ path: './.env' })
const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.listen(8080, () => {
  console.log("Connected!");
});

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "bird-friends-1f511.firebaseapp.com",
  projectId: "bird-friends-1f511",
  storageBucket: process.env.FIREBASE_BUCKET,
  messagingSenderId: "503411450824",
  appId: "1:503411450824:web:f43d324b2c74d9493196fd",
  measurementId: "G-YVD8ZXW593"
};

const firebaseapp = initializeApp(firebaseConfig);
const firebaseStorage = getStorage(firebaseapp);

const firebaseUrl = async (url, type) => {
  let folder = type == 'post' ? 'bird_images' : 'profile_images';
  let imageName =  `${folder}/${v4()}`;
  const storageRef = ref(firebaseStorage, imageName);
  const snapshot = await uploadString(storageRef, url, 'data_url');
  const imageLocation = await getDownloadURL(snapshot.ref);
  return new Promise((resolve) => {
    resolve(imageLocation);
  });
};

app.post("/api/upload", async function (req, res) {
  const file = req.body.image;
  const type = req.body.type;
  let url = await firebaseUrl(file, type).then((res) => {
    return res;
  });
  res.status(200).json({imageURL: url});
});


// app.post("/api/upload", uploadFiles);
// function uploadFiles(req, res) {
//   console.log(req);
// }

