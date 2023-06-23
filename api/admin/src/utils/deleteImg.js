import { storage, ref, deleteObject } from "../firebase"

export default async function deleteImage(imgLocation) {
    const imageRef = ref(storage, imgLocation)
    await deleteObject(imageRef)
}