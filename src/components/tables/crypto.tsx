import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table.tsx";
import {customToast, dateFormatter} from "@/lib/utils.tsx";
import {CryptoType} from "@/types/crypto";
import {FiEdit} from "react-icons/fi";
import {AiOutlineDelete} from "react-icons/ai";
import {useState} from "react";
import {useUpdateCryptoModal} from "@/hooks/useZustand.ts";
import {useDeleteCrypto} from "@/hooks/useCrypto.ts";
import {DialogModal} from "@/components/ui/dialog.tsx";
import CryptoForm from "@/components/forms/crypto.tsx";
import StateShower from "@/components/state-shower.tsx";

type ClinicTableProps = {
    data: CryptoType[],
}


const CryptoTable = ({data}: ClinicTableProps) => {
    const [crypto, setCrypto] = useState<CryptoType>();

    const deleteCryptoMutation = useDeleteCrypto()
    const updateCryptoModal = useUpdateCryptoModal()

    const onEdit = (id: number) => {
        const findCrypto = data?.find(task => task.id === id);
        if (!findCrypto) {
            return customToast("ERROR", "Crypto topilmadi!")
        }
        setCrypto(findCrypto);
        updateCryptoModal.onOpen()
    }

    const onDelete = (id: number) => {
        const isOk = confirm(`Crypto o'chirib tashlanadi, aminmisiz?`);
        if (isOk) {
            deleteCryptoMutation.mutate(id)
        }
    }

    if (deleteCryptoMutation.isPending) {
        return <StateShower id={"loading"} name={"O'chirilmoqda..."}/>
    }

    return (
        <>
            <DialogModal
                className={"w-[800px]"}
                isOpen={updateCryptoModal.isOpen}
                onClose={updateCryptoModal.onClose}
            >
                <CryptoForm action={"EDIT"} data={crypto}/>
            </DialogModal>

            <div className={"bg-white shadow rounded-md"}>
                <Table className="max-lg:w-[700px]">
                    <TableHeader>
                        <TableRow>
                            <TableHead className={"min-w-20"}>ID</TableHead>
                            <TableHead className={"min-w-24"}>Nomi</TableHead>
                            <TableHead className={"min-w-20"}>Narxi</TableHead>
                            <TableHead className={"min-w-20"}>O'zgarish</TableHead>
                            <TableHead className={"min-w-20"}>Buyurtma (min)</TableHead>
                            <TableHead className={"min-w-16"}>Buyurtma (max)</TableHead>
                            <TableHead className={"min-w-20"}>CreatedAt</TableHead>
                            <TableHead className={"min-w-20"}>UpdatedAt</TableHead>
                            <TableHead className={"min-w-20"}>Actions</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {
                            data?.map((crypto) => (
                                <TableRow key={crypto.id}>
                                    <TableCell>{crypto.id}</TableCell>
                                    <TableCell>{crypto.name}</TableCell>
                                    <TableCell>{crypto.price}</TableCell>

                                    <TableCell
                                        className={`font-medium ${crypto.change < 0 ? "text-red-500" : "text-green-500"}`}
                                    >
                                        {crypto.change < 0 ? crypto.change : `+${crypto.change}`}
                                    </TableCell>

                                    <TableCell>{crypto.minOrderAmount}</TableCell>
                                    <TableCell>{crypto.maxOrderAmount}</TableCell>
                                    <TableCell>{dateFormatter(crypto.createdAt)}</TableCell>
                                    <TableCell>{dateFormatter(crypto.updatedAt)}</TableCell>
                                    <TableCell>
                                        <div className={"flex gap-2"}>
                                            <FiEdit
                                                onClick={() => onEdit(crypto.id)}
                                                className="text-[18px] text-amber-700 opacity-60 font-bold cursor-pointer"
                                            />

                                            <AiOutlineDelete
                                                onClick={() => onDelete(crypto.id)}
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

export default CryptoTable;