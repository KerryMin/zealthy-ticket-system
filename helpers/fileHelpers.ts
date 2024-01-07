interface FormDataBody {
  [key: string]: string | number;
}

export const createImageFile = async (uri: string, body: FormDataBody = {}) => {
  let response = await fetch(uri);
  let data = await response.blob();
  let metadata = {
    type: "image/jpeg",
    ...body,
  };
  let file = new File([data], "test.jpg", metadata);
  return file;
};
