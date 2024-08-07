import Image from "next/image";
interface HomeRightSectionComponentProps {
  onDisableSpeech: () => void;
  speaking: boolean;
  audioLessonEnabled: boolean;
}
export function HomeRightSectionComponent({
  onDisableSpeech,
  audioLessonEnabled,
  speaking,
}: HomeRightSectionComponentProps) {
  return (
    <div className="lg:w-full w-full lg:h-full lg:block h-[40%] p-2 mt-[4px] lg:mt-0 lg:border-[1px] lg:border-l-gray-300">
      <div className="lg:p-3 flex-col flex lg:space-y-4 text-[#7160A8]">
        <Image className="hidden lg:block" src={"/bot_avatar_lg.png"} height={282} width={379} alt="new" />
        <div className="w-full lg:p-4 bg-yellow-50 rounded-xl">
          <div className="flex flex-wrap text-[12px] lg:py-2 flex-row ">
            <button
              disabled={speaking}
              onClick={onDisableSpeech}
              className="bg-transparent border hover:cursor-pointer hover:border-[#7e22ce] rounded lg:p-2 lg:m-1 border-[#b2acc6]"
            >
              {!audioLessonEnabled ? `Enable` : `Disable`} Audio Lesson
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
