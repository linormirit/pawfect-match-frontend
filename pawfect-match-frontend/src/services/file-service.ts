import { isNil } from "lodash";
import { serverBaseUrl } from "../consts";

const fileApi = {
  uploadFile: `${serverBaseUrl}/files`,
};

const uploadFile = async ({
  token,
  file,
}: {
  token: string;
  file: File | null;
}): Promise<{ url: string }> => {
  if (isNil(file)) {
    throw new Error("Missing file. Please select a file to upload.");
  }

  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(fileApi.uploadFile, {
    method: "POST",
    headers: {
      authorization: token,
    },
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Failed to upload file");
  }

  return response.json();
};

export { uploadFile };
