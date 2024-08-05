import { SubjectInterface } from "@/app/models/interfaces";

interface AdminSubjectsListProps {
  subjects: SubjectInterface[];
  onSubmit: (data: FormData) => void;
  deleteSubject: (id?: number) => void;
}

export function AdminSubjectsList({
  subjects,
  onSubmit,
  deleteSubject,
}: AdminSubjectsListProps) {
  return (
    <>
      <div className="flex flex-col p-4 pl-2 space-y-3 ">
        <h1 className="mb-3 text-lg text-blue-400 ">Create Subject </h1>
        <form className="flex flex-wrap " action={onSubmit}>
          <div className="w-3/4 px-3 ">
            <label htmlFor="subject">Add New Subject</label>
            <input
              type="text"
              className="w-[100%] text-black bg-white h-10 p-3"
              name="subject"
              placeholder="enter subject e.g., Maths, English "
              id="subject"
            />
          </div>

          <div className="w-1/4 px-3 pt-6">
            <button
              type="submit"
              className="p-2 rounded-md bg-slate-500 hover:bg-slate-600"
            >
              Add Subject
            </button>
          </div>
        </form>
      </div>
      <div className="p-2 pr-4  bg-slate-50 ml-5 h-[450rem] w-[97%] ">
        <h3 className="w-full py-3 pl-2 text-lg font-extrabold ">Subjects</h3>
        <div className="w-full h-40">
          <table className="items-start w-full border border-collapse table-auto">
            <thead>
              <tr className="border ">
                <th className="w-1/3 px-2 border text-start">Subject</th>
                <th className="w-1/3 px-2 border text-start">delete</th>
              </tr>
            </thead>
            <tbody>
              {subjects.length
                ? subjects?.map((subject: SubjectInterface) => (
                    <tr className="px-2 text-start" key={subject.id}>
                      <td className="px-2 border">{subject.title}</td>
                      <td className="p-2 border">
                        <button
                          onClick={() => deleteSubject(subject.id)}
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
      </div>{" "}
    </>
  );
}
