import * as tf from '@tensorflow/tfjs'

const imageTransform = (images, batch) => {
	// the range in images.
	const BOXES = [0, 0, 500, 500]
	// the index in images.
	const BOX_IND = [0, batch]
	// image resizing.
	const CROP_SIZE = [500, 500]
	// transform img to tensor3D
	let tensor3Ds = []
	images.forEach(image => {
		let pic = tf.browser.fromPixels(image)
		pic = tf.image.resizeBilinear(pic, CROP_SIZE)
		tensor3Ds.push(pic)
	});
	return tensor3Ds
	// push back tensor4D
	// return tf.image.cropAndResize(tf.tensor4d(images, BOXES), BOXES, BOX_IND, CROP_SIZE)
}

export default {
	imageTransform
  }