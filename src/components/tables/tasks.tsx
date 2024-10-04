import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table.tsx";
import {customizedSocialMediaBadge, customToast, dateFormatter} from "@/lib/utils.tsx";
import {SingleTaskType} from "@/types/task";
import {FiEdit} from "react-icons/fi";
import {AiOutlineDelete} from "react-icons/ai";
import {useState} from "react";
import {useDeleteTask} from "@/hooks/useTasks.ts";
import {DialogModal} from "@/components/ui/dialog.tsx";
import {TaskForm} from "@/components/forms";
import {useUpdateTaskModal} from "@/hooks/useZustand.ts";
import StateShower from "@/components/state-shower.tsx";
import {CopyToClipboard} from "react-copy-to-clipboard";
import {IoCopyOutline} from "react-icons/io5";

type ClinicTableProps = {
    data: SingleTaskType[],
}

const TasksTable = ({data}: ClinicTableProps) => {
    const [task, setTask] = useState<SingleTaskType>();

    const deleteTaskMutation = useDeleteTask()

    const updateTaskModal = useUpdateTaskModal()

    const onEdit = (id: number) => {
        const findTask = data?.find(task => task.id === id);
        if (!findTask) {
            return customToast("ERROR", "Vazifa topilmadi!")
        }
        setTask(findTask);
        updateTaskModal.onOpen()
    }

    const onDelete = (id: number) => {
        const isOk = confirm(`Vazifa o'chirib tashlanadi, aminmisiz?`);
        if (isOk) {
            deleteTaskMutation.mutate(id)
        }
    }

    const onCopyText = () => {
        customToast("SUCCESS", "Nusxalandi!");
    };

    if (deleteTaskMutation.isPending) {
        return <StateShower id={"loading"} name={"Loading..."}/>
    }

    return (
        <>
            <DialogModal isOpen={updateTaskModal.isOpen} onClose={updateTaskModal.onClose}>
                <TaskForm action={"EDIT"} data={task}/>
            </DialogModal>

            <div
                className={"bg-white shadow rounded-sm border"}
            >
                <Table className="max-lg:w-[700px]">
                    <TableHeader>
                        <TableRow>
                            <TableHead className={"min-w-16"}>ID</TableHead>
                            <TableHead className={"min-w-32"}>Nomi</TableHead>
                            <TableHead className={"min-w-32"}>Sponsor</TableHead>
                            <TableHead className={"min-w-20"}>URL</TableHead>
                            <TableHead className={"min-w-20"}>Bonus</TableHead>
                            <TableHead className={"min-w-20"}>Turi</TableHead>
                            <TableHead className={"min-w-20"}>Ijtimoiy-tarmoq</TableHead>
                            <TableHead className={"min-w-32"}>CreatedAt</TableHead>
                            <TableHead className={"min-w-32"}>UpdatedAt</TableHead>
                            <TableHead className={"min-w-20"}>Actions</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {
                            data?.map(task => (
                                <TableRow key={task.id}>
                                    <TableCell>{task.id}</TableCell>
                                    <TableCell>{task.name}</TableCell>
                                    <TableCell>{task.channelId}</TableCell>

                                    <TableCell>
                                        <CopyToClipboard
                                            text={task.url}
                                            onCopy={onCopyText}
                                        >
                                            <IoCopyOutline className="text-base ml-1  text-slate-700 cursor-pointer"/>
                                        </CopyToClipboard>
                                    </TableCell>

                                    <TableCell>{task.bonus}</TableCell>
                                    <TableCell>{task.type}</TableCell>

                                    <TableCell className={"pl-10"}>
                                        {task.socialBadge ? customizedSocialMediaBadge(task.socialBadge as any) : "--"}
                                    </TableCell>

                                    <TableCell>{dateFormatter(task.createdAt)}</TableCell>
                                    <TableCell>{dateFormatter(task.updatedAt)}</TableCell>
                                    <TableCell>
                                        <div className={"flex gap-2"}>
                                            <FiEdit
                                                onClick={() => onEdit(task.id)}
                                                className="text-[18px] text-amber-700 opacity-60 font-bold cursor-pointer"
                                            />

                                            <AiOutlineDelete
                                                onClick={() => onDelete(task.id)}
                                                className="text-[18px] text-destructive  font-bold cursor-pointer"
                                            />
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </div>
        </>
    )
};

export default TasksTable;