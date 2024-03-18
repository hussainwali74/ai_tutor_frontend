// import { Storage } from "@google-cloud/storage";

// export const get_cloud_storage_object = (
//   keyFilename: any,
//   bucketName: string
// ) => {
//   const projectName = "aitutor-408313";

//   const storage = new Storage({
//     projectId: projectName,
//     credentials: keyFilename,
//   });

//   const bucket = storage.bucket(bucketName);
//   return bucket;
// };

// export function get_service_account_key() {
//   if (process.env.GCLOUD_STORAGE_SERVICE_ACCOUNT_KEY) {
//     return JSON.parse(process.env.GCLOUD_STORAGE_SERVICE_ACCOUNT_KEY);
//   }
//   console.error(
//     "GCLOUD_STORAGE_SERVICE_ACCOUNT_KEY environment variable is not set."
//   );
//   return null;
// }
