// This function converts a base64 Data URI to a Blob object
export function DataURItoBlob(dataURI) {
  // Split the base64 string to get the mime type and the actual base64 string
  const byteString = atob(dataURI.split(",")[1]);

  // Extract the MIME type from the data URI
  const mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];

  // Create an ArrayBuffer and a view to manipulate the binary data
  const arrayBuffer = new ArrayBuffer(byteString.length);
  const intArray = new Uint8Array(arrayBuffer);

  // Populate the array with binary data from the base64 string
  for (let i = 0; i < byteString.length; i++) {
    intArray[i] = byteString.charCodeAt(i);
  }

  // Create and return a new Blob object using the binary data and MIME type
  return new Blob([intArray], { type: mimeString });
}
