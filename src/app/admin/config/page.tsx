"use client";
import axios from "axios";
import { useEffect, useState } from "react";

export default function AdminModelsPage() {
    const [inputValue, setInputValue] = useState("");
    const [selectedModel, setselectedModel] = useState("");
    const [models, setModels] = useState<string[]>([]);

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        if (selectedModel == "Choose a Model" || selectedModel == "") {
            alert("please select a model");
            return;
        }

        try {

            const data = {
                model: selectedModel,
            };
            const response = await axios.put("/api/backend/ai", data);
            if (response.status == 200) {
                alert('Model changed! ')
                setInputValue('')
            }
        } catch (error) {
            console.log('=========================================================')
            console.log('error in adding context', error);
            console.log('=========================================================')
        }

    };
    useEffect(() => {
        async function getAllModels() {
            try {
                // const response = await axios.get("/api/ai/model");
                // const data: FilterInterface[] = response.data.data;
                setModels(["gpt-3.5-turbo", "gpt-4-0125-preview"])
            } catch (error) {
                console.log("admin config error 41", error);
                console.log(
                    "========================================================="
                );
            }
        }
        getAllModels();
    }, []);

    async function deleteModel(id: any) {
        console.log("=========================================================");
        console.log("id", id);
        console.log("=========================================================");
        try {
            const response = await axios.delete("/api/filters", {
                params: { id },
            });
            if (response.status == 200) {
                // setFilters((prevData) => prevData.filter((d) => d._id != id));
            }
            console.log(
                "=========================================================",
                response
            );
        } catch (error) {
            console.log("=========================================================");
            console.log("error 85", error);
            console.log("=========================================================");
        } finally {
        }
    }
    return (
        <>
            <div className="flex flex-col justify-center w-full p-4 pt-32 pl-12 space-y-3">
                <h1 className="mb-3 text-lg text-blue-400 ">Model Selection</h1>
                <div className="flex flex-wrap items-center w-full">
                    <div className="w-3/4 px-3 ">
                        <label htmlFor="model">Select Current Models</label>
                        <select
                            id="model"
                            onChange={(e) => setselectedModel(e.target.value)}
                            name="model"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500
                   focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
                    dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        >
                            <option defaultValue={""}>Choose a Model</option>
                            {models?.map((model, i) => (
                                <option key={i} value={model}>
                                    {model}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="w-1/4 px-3 pt-6">
                        <form onSubmit={handleSubmit} >
                            <button
                                type="submit"
                                className="w-full px-4 py-2 font-semibold text-white transition-colors duration-300 bg-purple-500 rounded-lg focus:outline-none hover:bg-purple-600"
                            >
                                Save
                            </button>
                        </form>

                    </div>
                </div>
            </div>
            <div className="p-2 pr-4 overflow-y-auto">
            </div>
        </>
    );
}
