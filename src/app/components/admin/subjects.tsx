import { SubjectInterface } from "@/app/model/subject";

interface AdminSubjectsListProps {
  subjects: SubjectInterface[];
  onSubmit: (data: FormData) => void;
  deleteSubject: (id?: string) => void;
}

export function AdminSubjectsList({
  subjects,
  onSubmit,
  deleteSubject,
}: AdminSubjectsListProps) {
  return (
    <>
      <div className="flex flex-col  p-4 pl-2 space-y-3  ">
        <h1 className=" text-lg text-blue-400 mb-3 ">Create Subject </h1>
        <form className="flex flex-wrap  " action={onSubmit}>
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
              className=" p-2 rounded-md bg-slate-500 hover:bg-slate-600"
            >
              Add Subject
            </button>
          </div>
        </form>
      </div>
      <div className="p-2 pr-4  bg-slate-50 ml-5 h-[450rem] w-[97%] ">
        <h3 className="py-3 pl-2 font-extrabold text-lg w-full ">Subjects</h3>
        <div className="w-full h-40">
          <table className="table-auto w-full border-collapse   items-start border">
            <thead>
              <tr className="border ">
                <th className="border text-start px-2 w-1/3">Subject</th>
                <th className="border text-start px-2 w-1/3">delete</th>
              </tr>
            </thead>
            <tbody>
              {subjects.length
                ? subjects?.map((subject: SubjectInterface) => (
                    <tr className=" px-2 text-start" key={subject._id}>
                      <td className="border px-2">{subject.title}</td>
                      <td className="border p-2">
                        <button
                          onClick={() => deleteSubject(subject._id)}
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
      </div>{" "}
    </>
  );
}
