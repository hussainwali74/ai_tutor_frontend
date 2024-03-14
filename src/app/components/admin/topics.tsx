import { TopicInterface } from "@/app/model/topic";

interface AdminTopicsListProps {
  topics: TopicInterface[];
  deleteTopic: (id?: string) => void;
}

export function AdminTopicsList({ topics, deleteTopic }: AdminTopicsListProps) {
  return (
    <div className="p-2 pr-4  bg-slate-50 ml-5 w-[97%]  h-96">
      <h3 className="py-3 pl-2 font-extrabold text-lg w-full ">Topics</h3>
      <div className="overflow-y-auto h-40 w-full">
        <table className="table-auto w-full border-collapse over h-20   items-start border">
          <thead>
            <tr className="border ">
              <th className="border text-start px-2 w-full">Subject</th>
              <th className="border text-start px-2 w-full">Topic</th>
              <th className="border text-start px-2 w-full">delete</th>
            </tr>
          </thead>
          <tbody>
            {topics.length
              ? topics?.map((topic: TopicInterface) => (
                  <tr className=" px-2 text-start" key={topic._id}>
                    <td className="border px-2">{topic.subject_id}</td>
                    <td className="border px-2">{topic.title}</td>
                    <td className="border p-2">
                      <button
                        onClick={() => deleteTopic(topic._id)}
                        className="hover:bg-orange-500  w-full hover:cursor-pointer  rounded-md  bg-orange-700 p-2"
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
