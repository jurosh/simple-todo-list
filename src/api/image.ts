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
