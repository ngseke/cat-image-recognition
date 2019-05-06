import * as firebase from "firebase/app"
import "firebase/auth"
import "firebase/database"

const firebaseConfig = {
  apiKey: "AIzaSyBYG40X7D9fDrEAdHgONru8MMZlTPi7orA",
  authDomain: "cat-image-recognition.firebaseapp.com",
  databaseURL: "https://cat-image-recognition.firebaseio.com",
  projectId: "cat-image-recognition",
  storageBucket: "cat-image-recognition.appspot.com",
  messagingSenderId: "765647955764",
  appId: "1:765647955764:web:e30c60e4acce3455"
}

firebase.initializeApp(firebaseConfig)
const db = firebase.database()

const modelRef = db.ref('model/')   // 訓練好的模型本身
const listRef = db.ref('list/')   // 列表

const toArray = (_) => {
  return Object.keys(_)
    .sort((a, b) => a < b)
    .map((key) => {
      const data = _[key]
      return {
        ...data,
        id: key
      }
    })
}

// 上傳新的 model
const pushNewModel = async (model) => {
  const key = modelRef.push().key
  modelRef.child(key).update(model)
  listRef.child(key).update({
    timestamp: +new Date(),
    length: JSON.stringify(model).length
  })
}

// 監聽列表
const onList = (cb) => {
  listRef.on('value', (snapshot) => {
    cb(toArray(snapshot.val()))
  })
}

export default {
  pushNewModel,
  onList,
}
