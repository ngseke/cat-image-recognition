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

// 將快照轉換為陣列
const toArray = (_) => {
  if (!_) return []
  return Object.keys(_)
    .sort().reverse()
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

// 根據 id 載入該模型存檔
const loadModel = (id) => {
  return new Promise((resolve, reject) => {
    modelRef.child(id).once('value').then((snapshot) => {
      resolve(snapshot.val())
    })
  })
}

// 根據 id 移除模型存檔
const removeModel = async (id) => {
  await modelRef.child(id).remove()
  await listRef.child(id).remove()
}

export default {
  pushNewModel,
  onList,
  loadModel,
  removeModel,
}
