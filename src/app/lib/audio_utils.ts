import axios from "axios";

export const getAudio = async (text: string) => {
    try {
      console.log("getting audio --------------------------");
      const response = await fetch("/api/audio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });

      const data = await response.json();
      if (!response.ok) {
        console.log("---------------------------------------- error 184");
      }
      if (data) {
        let audio_path = data.audioFilePath;
        setTimeout(() => {
            playAudio(audio_path);
        });
        const fileName = data.audioFilePath.split("/ai-tutor-storage/")[1];

       const url =`/api/audio`  
        axios
        .get(url, { params: { fileName: encodeURIComponent(fileName) } }).then(response=>{
        }).catch(err=>{
            console.log('----------------------------------------');
            console.log('err deleting file',err);
            console.log('----------------------------------------');
        })
  
      }
    } catch (error) {
      console.error("error", error);
    }
  };

  export const playAudio = (audio_path: string) => {
    const audio = new Audio(audio_path);
    audio.play();
  };