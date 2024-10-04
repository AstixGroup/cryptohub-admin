import React, {useEffect, useState} from 'react';
import {Navbar} from "@/components";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import {useGetTasks} from "@/hooks/useTasks.ts";
import StateShower from "@/components/state-shower.tsx";
import {Pagination} from "antd";
import {GetTasksType} from "@/types/task";
import TasksTable from "@/components/tables/tasks.tsx";
import {useCreateTaskModal} from "@/hooks/useZustand.ts";
import {DialogModal} from "@/components/ui/dialog.tsx";
import {TaskForm} from "@/components/forms";
import Select from "react-select";
import {numberSpacer} from "@/lib/utils.tsx";

const Tasks = () => {
    const [page, setPage] = useState<number>(1);
    const [limit, setLimit] = useState<number>(20);
    const [keyword, setKeyword] = useState<string>("");
    const [type, setType] = useState<string>();

    const getTasksQuery = useGetTasks(page, limit, keyword, type!)
    const tasksData: GetTasksType = getTasksQuery?.data?.data

    const createTaskModal = useCreateTaskModal();

    useEffect(() => {
        getTasksQuery.refetch()
    }, [page, limit, keyword, type])

    return (
        <>
            <DialogModal isOpen={createTaskModal.isOpen} onClose={createTaskModal.onClose}>
                <TaskForm action={"CREATE"}/>
            </DialogModal>

            <Navbar name={"Tasks"}/>

            <div className={"flex justify-between"}>
                <div className={"grid grid-cols-4 gap-4 w-full"}>
                    <Input className={"h-full"} placeholder={"Izlash..."} onChange={(e) => setKeyword(e.target.value)}/>

                    <Select
                        options={[
                            {value: "SPONSOR", label: "SPONSOR"},
                            {value: "SELF", label: "SELF"},
                            {value: undefined, label: "Barchasi"}
                        ]}
                        placeholder={"Tanlang"}
                        className={"text-sm"}
                        onChange={(item) => setType(item?.value!)}
                    />
                </div>

                <Button onClick={createTaskModal.onOpen}>+ Qo'shish</Button>
            </div>

            {
                getTasksQuery.isLoading
                    ? <StateShower id={"loading"} name={"Loading..."}/>
                    : tasksData?.tasks?.length === 0
                        ? <StateShower id={"no_data"} name={"No tasks found!"}/> :
                        <>
                            <TasksTable data={tasksData?.tasks}/>

                            <div className={"flex justify-between mt-3"}>
                                <div className={"flex gap-1"}>
                                    <span>Jami:</span>
                                    <h1 className={"font-medium"}>{numberSpacer(tasksData?.meta?.totalTasks || 0)}</h1>
                                </div>

                                <Pagination
                                    showSizeChanger
                                    defaultCurrent={page}
                                    defaultPageSize={limit}
                                    total={tasksData?.meta?.totalTasks}
                                    onChange={(page, pageSize) => {
                                        setPage(page);
                                        setLimit(pageSize);
                                    }}
                                    pageSizeOptions={[5, 10, 20]}
                                    pageSize={limit}
                                />
                            </div>
                        </>
            }
        </>
    );
};

export default Tasks;