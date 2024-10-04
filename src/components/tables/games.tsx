import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table.tsx";
import {customToast, dateFormatter} from "@/lib/utils.tsx";
import {SingleGameType} from "@/types/game";
import {Switch} from "@/components/ui/switch.tsx";
import {AiOutlineDelete} from "react-icons/ai";
import {FiEdit} from "react-icons/fi";
import {useState} from "react";
import {useDeleteGame, useUpdateGame} from "@/hooks/useGames.ts";
import {useUpdateGameModal} from "@/hooks/useZustand.ts";
import {DialogModal} from "@/components/ui/dialog.tsx";
import GameForm from "@/components/forms/game.tsx";
import StateShower from "@/components/state-shower.tsx";

type ClinicTableProps = {
    data: SingleGameType[],
}

const GamesTable = ({data}: ClinicTableProps) => {
    const [game, setGame] = useState<SingleGameType>();

    const updateGameMutation = useUpdateGame()
    const deleteGameMutation = useDeleteGame()
    const updateGameModal = useUpdateGameModal()

    const onEdit = (id: number) => {
        const findGame = data?.find(task => task.id === id);
        if (!findGame) {
            return customToast("ERROR", "O'yin topilmadi!")
        }
        setGame(findGame);
        updateGameModal.onOpen()
    }

    const onDelete = (id: number) => {
        const isOk = confirm(`O'yin o'chirib tashlanadi, aminmisiz?`);
        if (isOk) {
            deleteGameMutation.mutate(id)
        }
    }

    const onChangeStatus = (id: number, isActive: boolean) => {
        updateGameMutation.mutate({
            id,
            data: {
                isActive
            },
        })
    }

    if (deleteGameMutation.isPending) {
        return <StateShower id={"loading"} name={"Loading..."}/>
    }

    return (
        <>
            <DialogModal
                className={"w-[800px] top-1/2"}
                isOpen={updateGameModal.isOpen}
                onClose={updateGameModal.onClose}
            >
                <GameForm action={"EDIT"} data={game}/>
            </DialogModal>

            <div className={"bg-white shadow rounded-md"}>
                <Table className="max-lg:w-[700px]">
                    <TableHeader>
                        <TableRow>
                            <TableHead className={"min-w-20"}>ID</TableHead>
                            <TableHead className={"min-w-44"}>Nomi</TableHead>
                            <TableHead className={"min-w-32"}>Logo</TableHead>
                            <TableHead className={"min-w-36"}>Hamyon manzili</TableHead>
                            <TableHead className={"min-w-32"}>Status</TableHead>
                            <TableHead className={"min-w-36"}>CreatedAt</TableHead>
                            <TableHead className={"min-w-36"}>UpdatedAt</TableHead>
                            <TableHead className={"min-w-20"}>Actions</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {
                            data?.map(game => (
                                <TableRow key={game.id}>
                                    <TableCell>{game.id}</TableCell>
                                    <TableCell>{game.name}</TableCell>

                                    <TableCell>
                                        <img src={game.image} alt="#" className={"size-10"}/>
                                    </TableCell>

                                    {/*game.descr?.length < 60 ? game.descr : `${game.descr.slice(0, 60)}...`*/}
                                    <TableCell>{game.wallet_address}</TableCell>

                                    <TableCell>
                                        <Switch
                                            onCheckedChange={(isActive) => onChangeStatus(game.id, isActive)}
                                            checked={game.isActive}
                                        />
                                    </TableCell>

                                    <TableCell>{dateFormatter(game.createdAt)}</TableCell>
                                    <TableCell>{dateFormatter(game.updatedAt)}</TableCell>

                                    <TableCell>
                                        <div className={"flex gap-2"}>
                                            <FiEdit
                                                onClick={() => onEdit(game.id)}
                                                className="text-[18px] text-amber-700 opacity-60 font-bold cursor-pointer"
                                            />

                                            <AiOutlineDelete
                                                onClick={() => onDelete(game.id)}
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

export default GamesTable;