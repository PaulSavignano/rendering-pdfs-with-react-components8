const decodeBase64 = (string) => {
  console.log(atob(string))
  return atob(string)
}

const buildByteArray = (decodedString, decodedStringLength) => {
  const buffer = new ArrayBuffer(decodedStringLength)
  const array = new Uint8Array(buffer)
  for (let i = 0; i < decodedStringLength; i++) {
    array[i] = decodedString.charCodeAt(i)
  }
  return array
}

const createBlob = (byteArray) => {
  return new Blob([byteArray], { type: 'application/pdf' })
}

export const base64ToBlob = (base64String) => {
  const decodedString = decodeBase64(base64String)
  const byteArray = buildByteArray(decodedString, decodedString.length)
  return byteArray ? createBlob(byteArray) : null
}
