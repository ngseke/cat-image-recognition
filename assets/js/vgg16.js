import * as tf from '@tensorflow/tfjs'

const getModel = (imageSize) => {
	let model = tf.sequential()

	model.add(tf.layers.conv2d({
		filters: 16,
		kernelSize: 3,
		padding: 'same',
		strides: 1,
		activation: 'relu',
		inputShape: [imageSize, imageSize, 3]
	}))
	model.add(tf.layers.conv2d({
		filters: 16,
		kernelSize: 3,
		padding: 'same',
		strides: 1,
		activation: 'relu'
	}))
	model.add(tf.layers.maxPooling2d({
		poolSize: 2,
		strides: 2
	}))

	model.add(tf.layers.conv2d({
		filters: 32,
		kernelSize: 3,
		padding: 'same',
		strides: 1,
		activation: 'relu'
	}))
	model.add(tf.layers.conv2d({
		filters: 32,
		kernelSize: 3,
		padding: 'same',
		strides: 1,
		activation: 'relu'
	}))
	model.add(tf.layers.maxPooling2d({
		poolSize: 2,
		strides: 2
	}))

	model.add(tf.layers.conv2d({
		filters: 48,
		kernelSize: 3,
		padding: 'same',
		strides: 1,
		activation: 'relu'
	}))
	model.add(tf.layers.conv2d({
		filters: 48,
		kernelSize: 3,
		padding: 'same',
		strides: 1,
		activation: 'relu'
	}))
	model.add(tf.layers.conv2d({
		filters: 48,
		kernelSize: 3,
		padding: 'same',
		strides: 1,
		activation: 'relu'
	}))
	model.add(tf.layers.maxPooling2d({
		poolSize: 2,
		strides: 2
	}))

	model.add(tf.layers.conv2d({
		filters: 64,
		kernelSize: 3,
		padding: 'same',
		strides: 1,
		activation: 'relu'
	}))
	model.add(tf.layers.conv2d({
		filters: 64,
		kernelSize: 3,
		padding: 'same',
		strides: 1,
		activation: 'relu'
	}))
	model.add(tf.layers.conv2d({
		filters: 64,
		kernelSize: 3,
		padding: 'same',
		strides: 1,
		activation: 'relu'
	}))
	model.add(tf.layers.maxPooling2d({
		poolSize: 2,
		strides: 2
	}))

	model.add(tf.layers.conv2d({
		filters: 128,
		kernelSize: 3,
		padding: 'same',
		strides: 1,
		activation: 'relu'
	}))
	model.add(tf.layers.conv2d({
		filters: 128,
		kernelSize: 3,
		padding: 'same',
		strides: 1,
		activation: 'relu'
	}))
	model.add(tf.layers.conv2d({
		filters: 128,
		kernelSize: 3,
		padding: 'same',
		strides: 1,
		activation: 'relu'
	}))
	model.add(tf.layers.maxPooling2d({
		poolSize: 2,
		strides: 2
	}))

	model.add(tf.layers.flatten())
	model.add(tf.layers.dense({
		units: 1024,
		activation: 'relu'
	}))
	model.add(tf.layers.dense({
		units: 1024,
		activation: 'relu'
	}))
	model.add(tf.layers.dense({
		units: 4,
		activation: 'softmax'
	}))
	return model
}

export default {
	getModel
}