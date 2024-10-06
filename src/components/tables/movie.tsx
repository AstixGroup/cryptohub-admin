import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table.tsx";
import {customToast, dateFormatter} from "@/lib/utils.tsx";
import {SingleMovieType} from "@/types/movie";
import {useState} from "react";
import {useUpdateMovieModal} from "@/hooks/useZustand.ts";
import {useDeleteMovie} from "@/hooks/useMovie.ts";
import {FiEdit} from "react-icons/fi";
import {AiOutlineDelete} from "react-icons/ai";
import {DialogModal} from "@/components/ui/dialog.tsx";
import MovieForm from "@/components/forms/movie.tsx";

type MovieTableProps = {
    data: SingleMovieType[],
}

const MoviesTable = ({data}: MovieTableProps) => {
    const [movie, setMovie] = useState<SingleMovieType>();

    const deleteMovieMutation = useDeleteMovie()
    const updateMovieModal = useUpdateMovieModal()

    const onEdit = (id: number) => {
        const findTask = data?.find(movie => movie.id === id);
        if (!findTask) {
            return customToast("ERROR", "Vazifa topilmadi!")
        }
        setMovie(findTask);
        updateMovieModal.onOpen()
    }

    const onDelete = (id: number) => {
        const isOk = confirm(`Kino o'chirib tashlanadi, aminmisiz?`);
        if (isOk) {
            deleteMovieMutation.mutate(id)
        }
    }

    return (
        <>
            <DialogModal
                isOpen={updateMovieModal.isOpen}
                onClose={updateMovieModal.onClose}
                className={"w-[800px]"}
            >
                <MovieForm action={"EDIT"} data={movie}/>
            </DialogModal>

            <div
                className={"bg-white shadow rounded-sm border"}
            >
                <Table className="max-lg:w-[700px]">
                    <TableHeader>
                        <TableRow>
                            <TableHead className={"min-w-24"}>ID (kod)</TableHead>
                            <TableHead className={"min-w-40"}>Nomi</TableHead>
                            <TableHead className={"min-w-20"}>Rasm</TableHead>
                            <TableHead className={"min-w-16"}>Yuklanishlar</TableHead>
                            <TableHead className={"min-w-16"}>Sifat (360p)</TableHead>
                            <TableHead className={"min-w-16"}>Sifat (480p)</TableHead>
                            <TableHead className={"min-w-16"}>Sifat (720p)</TableHead>
                            <TableHead className={"min-w-16"}>Sifat (1080p)</TableHead>
                            <TableHead className={"min-w-32"}>CreatedAt</TableHead>
                            <TableHead className={"min-w-32"}>UpdatedAt</TableHead>
                            <TableHead className={"min-w-20"}>Actions</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {
                            data?.map(movie => (
                                <TableRow key={movie.id}>
                                    <TableCell>{movie.id}</TableCell>
                                    <TableCell>{movie.name}</TableCell>

                                    <TableCell>
                                        <img className={"size-16"} src={movie.image} alt="#"/>
                                    </TableCell>

                                    <TableCell className={"pl-8"}>{movie.downloads}</TableCell>
                                    <TableCell className={"pl-8"}>{movie.video_360}</TableCell>
                                    <TableCell className={"pl-8"}>{movie.video_480}</TableCell>
                                    <TableCell className={"pl-8"}>{movie.video_720}</TableCell>
                                    <TableCell className={"pl-8"}>{movie.video_1080}</TableCell>
                                    <TableCell>{dateFormatter(movie.createdAt)}</TableCell>
                                    <TableCell>{dateFormatter(movie.updatedAt)}</TableCell>
                                    <TableCell>
                                        <div className={"flex gap-2"}>
                                            <FiEdit
                                                onClick={() => onEdit(movie.id)}
                                                className="text-[18px] text-amber-700 opacity-60 font-bold cursor-pointer"
                                            />

                                            <AiOutlineDelete
                                                onClick={() => onDelete(movie.id)}
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

export default MoviesTable;