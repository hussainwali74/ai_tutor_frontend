import { TopicInterface } from "@/app/models/interfaces";

interface AdminTopicsListProps {
  topics: TopicInterface[];
  deleteTopic: (id?: number) => void;
}

export function AdminTopicsList({ topics, deleteTopic }: AdminTopicsListProps) {
  console.log('-----------------------------------------------------');
  console.log('topics in components',topics);
  console.log('-----------------------------------------------------');
  
  return (
    <div className="p-2 pr-4  bg-slate-50 ml-5 w-[97%]  h-96">
      <h3 className="w-full py-3 pl-2 text-lg font-extrabold ">Topics</h3>
      <div className="w-full h-40 overflow-y-auto">
        <table className="items-start w-full h-20 border border-collapse table-auto over">
          <thead>
            <tr className="border ">
              <th className="w-full px-2 border text-start">Subject</th>
              <th className="w-full px-2 border text-start">Topic</th>
              <th className="w-full px-2 border text-start">delete</th>
            </tr>
          </thead>
          <tbody>
            {topics.length
              ? topics?.map((topic: TopicInterface) => (
                  <tr className="px-2 text-start" key={topic.id}>
                    <td className="px-2 border">{topic.subject_id}</td>
                    <td className="px-2 border">{topic.title}</td>
                    <td className="p-2 border">
                      <button
                        onClick={() => deleteTopic(topic?.id)}
                        className="w-full p-2 bg-orange-700 rounded-md hover:bg-orange-500 hover:cursor-pointer"
                      >
                        delete
                      </button>
                    </td>
                  </tr>
                ))
              : null}
          </tbody>
        </table>
      </div>
    </div>
  );
}
