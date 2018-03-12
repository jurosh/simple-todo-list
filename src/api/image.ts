export const uploadImageAsync = async (base64: string): Promise<string | undefined> => {
  try {
    const response = await fetch('https://api.cloudinary.com/v1_1/jurosh/image/upload', {
      body: JSON.stringify({
        file: `data:image/jpg;base64,${base64}`,
        upload_preset: 'ovugk9yv'
      }),
      headers: {
        'content-type': 'application/json'
      },
      method: 'POST'
    });
    const responseData = (response as any)._bodyText;
    return JSON.parse(responseData).secure_url;
  } catch (error) {
    console.warn(error);
    return;
  }
};

// async function uploadImageAsync(uri: string) {
//   let apiUrl = 'https://file-upload-example-backend-dkhqoilqqn.now.sh/upload';
//   // Note:
//   // Uncomment this if you want to experiment with local server
//   //
//   // if (Constants.isDevice) {
//   //   apiUrl = `https://your-ngrok-subdomain.ngrok.io/upload`;
//   // } else {
//   //   apiUrl = `http://localhost:3000/upload`
//   // }
//   let uriParts = uri.split('.');
//   let fileType = uriParts[uriParts.length - 1];
//   let formData = new FormData();
//   formData.append('photo', {
//     uri,
//     name: `photo.${fileType}`,
//     type: `image/${fileType}`
//   } as any);
//   let options = {
//     method: 'POST',
//     body: formData,
//     headers: {
//       Accept: 'application/json',
//       'Content-Type': 'multipart/form-data'
//     }
//   };
//   return fetch(apiUrl, options);
// }
