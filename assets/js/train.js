const tf = require('@tensorflow/tfjs')

const model = tf.sequential()

model.add(tf.layers.conv2d({
  inputShape: [300, 300, 3],
  kernelSize: 5,
  filters: 8,
  strides: 1,
  activation: 'relu',
  kernelInitializer: 'VarianceScaling'
}))

model.add(tf.layers.maxPooling2d({
  poolSize: [2, 2],
  strides: [2, 2]
}))

model.add(tf.layers.conv2d({
  kernelSize: 5,
  filters: 16,
  strides: 1,
  activation: 'relu',
  kernelInitializer: 'VarianceScaling'
}));

model.add(tf.layers.maxPooling2d({
  poolSize: [2, 2],
  strides: [2, 2]
}))

model.add(tf.layers.flatten())

model.add(tf.layers.dense({
  units: 10,
  kernelInitializer: 'VarianceScaling',
  activation: 'softmax'
}))

const LEARNING_RATE = 0.15
const optimizer = tf.train.sgd(LEARNING_RATE)

model.compile({
  optimizer: optimizer,
  loss: 'categoricalCrossentropy',
  metrics: ['accuracy'],
})

const BATCH_SIZE = 64
const TRAIN_BATCHES = 100
const TEST_BATCH_SIZE = 1000
const TEST_ITERATION_FREQUENCY = 5



const 訓練 = (images) => {
  const image = images[0].image
  tf.browser.fromPixels(image).print()

}

export default {
  訓練
}
