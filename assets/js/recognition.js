import * as cocoSsd from '@tensorflow-models/coco-ssd'

let model

const load = async () => {
  model = await cocoSsd.load()
  console.log(`loaded`)
}


load()
const predict = async (img) => {
  const result = await model.detect(img)
  return result
}

export default {
  predict
}
