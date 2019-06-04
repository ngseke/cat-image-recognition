import * as tf from '@tensorflow/tfjs'

/**
 * Let images to tensors.
 * @param images the input pictures.
 * @param size the height and width of new tensor.
 */
const imageTransform = (images, size) => {
	// image resizing.
	const NEW_SIZE = [size, size]
	// transform img to tensor3D
	let input = tf.tidy(() => {
		tensor3Ds = []
		images.forEach(image => {
			let pic = tf.browser.fromPixels(image)
			pic = tf.image.resizeBilinear(pic, NEW_SIZE)
			tensor3Ds.push(pic)
		});
		return tensor3Ds
	})
	return input
}

export default {
	imageTransform
  }