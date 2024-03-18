import axios from "axios";

export const getAudio = async (text: string) => {
  try {
    console.log("getting audio --------------------------");
    const response = await fetch("/api/audio", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });

    const data = await response.blob();
    if (!response.ok) {
      console.log("---------------------------------------- error 184");
    }
    // if (data) return data.audioFilePath;
    if (data ){
        // const audioBlob = new Blob([data], {type:'audio/wav'})
        const audioUrl = URL.createObjectURL(data)
        return audioUrl;
    } 
  } catch (error) {
    console.error("error", error);
  }
};

export const playAudio = async (audio_path: string) => {
  const audio = new Audio(audio_path);
  return new Promise((resolve, reject) => {
    audio.onended = resolve;
    audio.onerror = reject;
    audio.play();
  });
};
// import axios from "axios";

// export const getAudio = async (text: string) => {
//   try {
//     console.log("getting audio --------------------------");
//     const response = await fetch("/api/audio", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ text }),
//     });

//     const data = await response.json();
//     if (!response.ok) {
//       console.log("---------------------------------------- error 184");
//     }
//     if (data) {
//       let audio_path = data.audioFilePath;
//       await playAudio(audio_path);
//       const fileName = data.audioFilePath.split("/ai-tutor-storage/")[1];

//       const url = `/api/audio`;
//       axios
//         .get(url, { params: { fileName: encodeURIComponent(fileName) } })
//         .catch((err) => {
//           console.log("----------------------------------------");
//           console.log("err deleting file", err);
//           console.log("----------------------------------------");
//         });
//     }
//   } catch (error) {
//     console.error("error", error);
//   }
// };

// export const playAudio = async (audio_path: string) => {
//   return new Promise((resolve, reject) => {
//     const audio = new Audio(audio_path);
//     audio.onended = resolve;
//     audio.onerror = reject;
//     audio.play();
//   });
// };
