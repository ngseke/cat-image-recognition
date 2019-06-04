import vgg16 from "./vgg16"
import * as tf from '@tensorflow/tfjs'

const LEARNING_RATE = 0.15
const optimizer = tf.train.sgd(LEARNING_RATE)

const 訓練 = (images) => {
  images.forEach((item) => {
    const image = item.image
    const target = item.target || null

    console.log(target)
    tf.browser.fromPixels(image).print()
  })
}

const trainModel = async (images, position, size) => {
  let vggModel = vgg16.getModel(size)
  console.log('preprocess memory:')
  console.log(tf.memory())
  vggModel.compile({
    optimizer: optimizer,
    loss: 'categoricalCrossentropy',
    metrics: ['accuracy']
  })
  vggModel.summary()
  console.log('compile memory:')
  console.log(tf.memory())
  await vggModel.fit(images, position, { batchSize: 2, epochs: 10 })
  console.log('fit memory:')
  console.log(tf.memory())
  console.log('complete model trainning.')
  return vggModel
}

export default {
  訓練,
  trainModel
}
