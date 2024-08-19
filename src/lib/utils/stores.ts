import { writable } from 'svelte/store'

function createOrEdit() {
	const { subscribe, set, update } = writable(true);

	return {
		subscribe,
		toggle: () => update(n => n = !n),
		false: () => update(n => n = false),
		reset: () => set(true)
	};
}

function modifyArticle() {
	const { subscribe, set } = writable('');

	return {
		subscribe,
		set: (fileName:string) => set(fileName),
		reset: () => set('')
	};
}

function modifyTitle() {
	const { subscribe, set } = writable('')

	return {
		subscribe,
		set: (string: string) => set(string),
		placehold: () => set('')
	}
}

function modifySynopsis() {
	const { subscribe, set } = writable('')

	return {
		subscribe,
		set: (string: string) => set(string),
		placehold: () => set('')
	}
}


function modifyMarkdown() {
	const { subscribe, set } = writable('')

	return {
		subscribe,
		set: (string: string) => set(string),
		placehold: () => set('')
	}
}

function modifyCategories() {
	const placeholder: string[] = Array()
	const { subscribe, set } = writable(placeholder)
	
	return {
		subscribe,
		set: (arr: string[]) => set(arr),
		placehold: () => set([])
	}
}

function selectArticle() {
	const placeholder: number = NaN
	const { subscribe, set } = writable(NaN)

	return {
		subscribe,
		set: (number: number) => set(number),
		placehold: () => set(placeholder)
	}
}

function imagePreview() {
	const { subscribe, set } = writable()
	
	return {
		subscribe,
		set: (base64: string | ArrayBuffer | null) => set(base64),
		placehold: () => set(undefined)
	}
}

function imageFile() {
	const { subscribe, set } = writable()
	
	return {
		subscribe,
		set: (file: string) => set(file),
		placehold: () => set('')
	}
}

function modifyAltImage() {
	const { subscribe, set } = writable('')

	return {
		subscribe,
		set: (string: string) => set(string),
		placehold: () => set('')
	}
}

function modifyImageTag() {
	const { subscribe, set } = writable('')

	return {
		subscribe,
		set: (string: string) => set(string),
		placehold: () => set('')
	}
}

function selectSlide() {
	const placeholder: number = NaN
	const { subscribe, set } = writable(0)

	return {
		subscribe,
		set: (number: number) => set(number),
		placehold: () => set(placeholder)
	}
}

function selectSlideRow() {
	const placeholder: number = NaN
	const { subscribe, set } = writable(placeholder)

	return {
		subscribe,
		set: (number: number) => set(number),
		placehold: () => set(placeholder)
	}
}

function adminModal() {
	const { subscribe, set } = writable()

	return {
		subscribe,
		set: (bool: boolean) => set(bool),
	}
}

function adminSubmitReady() {
	const { subscribe, set } = writable(false)

	return {
		subscribe,
		set: (bool: boolean) => set(bool),
	}
}


export const isThisNew = createOrEdit()
export const editArticle = modifyArticle()
export const editTitle = modifyTitle()
export const editSynopsis = modifySynopsis()
export const editMarkdown = modifyMarkdown()
export const editCategories = modifyCategories()
export const selected = selectArticle()
export const selectedImage = imagePreview()
export const imageName = imageFile()
export const imageTag = modifyImageTag()
export const altImage = modifyAltImage()
export const selectedSlide = selectSlide()
export const selectedSlideRow = selectSlideRow()
export const showAdminModal = adminModal()
export const adminDeleteReady = adminSubmitReady()