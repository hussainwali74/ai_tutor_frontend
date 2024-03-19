"use client"

import 'regenerator-runtime'

import { MicrophoneComponent } from "../audio/microphone";

interface HomeFormComponentProps {
  handleSubmit: () => void;
  inputValue: string;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
}

export function HomeFormComponent({
  handleSubmit,
  inputValue,
  setInputValue,
}: HomeFormComponentProps) {
  return (
    <div className="fixed bottom-1 w-[76%] flex-none p-6">
      <div className="flex rounded border bg-white border-red-100">
        <input
          type="text"
          className="flex-grow px-4 py-2 bg-white h-[42px] text-gray-600 focus:outline-none"
          placeholder="Type your message..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
          <MicrophoneComponent setText={setInputValue} onSubmitt={handleSubmit}  className={'rounded-lg px-1 h-8 mt-[0.35rem] mr-2  bg-blue-100 text-black'} />
      </div>
    </div>
  );
}
