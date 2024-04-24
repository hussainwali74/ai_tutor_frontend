"use client"

import 'regenerator-runtime'

import { MicrophoneComponent } from "../audio/microphone";

interface HomeFormComponentProps {
	handleSubmit: () => void;
	inputValue: string;
	disabled: boolean;
	audioLessonEnabled: boolean;
	setInputValue: React.Dispatch<React.SetStateAction<string>>;
}

export function HomeFormComponent({
	handleSubmit,
	inputValue,
	disabled,
	audioLessonEnabled,
	setInputValue,
}: HomeFormComponentProps) {

	const keyDownEvent = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key == 'Enter') {
			handleSubmit()
		}
	}

	return (
		<div className="fixed bottom-1 w-[76%] flex-none p-6">
			<div className="flex rounded border bg-white border-red-100">
				<input
					disabled={disabled}
					type="text"
					className="flex-grow px-4 py-2 bg-white h-[42px] text-gray-600 focus:outline-none"
					placeholder="Type your message..."
					value={inputValue}
					onKeyDown={(e) => keyDownEvent(e)}
					onChange={(e) => setInputValue(e.target.value)}
				/>
				{audioLessonEnabled ? (
					<MicrophoneComponent disabled={disabled} setText={setInputValue} onSubmitt={handleSubmit} className={'rounded-lg px-1 h-8 mt-[0.35rem] mr-2  bg-blue-100 text-black'} />
				) : (
					<button disabled={disabled} className={'rounded-lg px-1 h-8 mt-[0.35rem] mr-2 bg-blue-100 text-black'} type="submit" onClick={handleSubmit}>
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
							<path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
						</svg>
					</button>
				)}
			</div>
		</div>
	);
}
