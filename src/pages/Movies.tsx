import React, {useEffect, useState} from 'react';
import {Navbar} from "@/components";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import StateShower from "@/components/state-shower.tsx";
import {Pagination} from "antd";
import {DialogModal} from "@/components/ui/dialog.tsx";
import {useCreateMovieModal} from "@/hooks/useZustand.ts";
import {numberSpacer} from "@/lib/utils.tsx";
import {useGetMovies} from "@/hooks/useMovie.ts";
import {GetMoviesType} from "@/types/movie";
import MoviesTable from "@/components/tables/movie.tsx";
import MovieForm from "@/components/forms/movie.tsx";

const Movies = () => {
    const [page, setPage] = useState<number>(1);
    const [limit, setLimit] = useState<number>(20);
    const [keyword, setKeyword] = useState<string>("");

    const getMoviesQuery = useGetMovies(page, limit, keyword)
    const moviesData: GetMoviesType = getMoviesQuery?.data?.data

    const createMovieModal = useCreateMovieModal();

    useEffect(() => {
        getMoviesQuery.refetch()
    }, [page, limit, keyword])

    return (
        <>
            <DialogModal
                isOpen={createMovieModal.isOpen}
                onClose={createMovieModal.onClose}
                className={"w-[800px]"}
            >
                <MovieForm action={"CREATE"}/>
            </DialogModal>

            <Navbar name={"Movies"}/>

            <div className={"flex justify-between"}>
                <div className={"grid grid-cols-4 w-full"}>
                    <Input placeholder={"Izlash..."} onChange={(e) => setKeyword(e.target.value)}/>
                </div>

                <Button onClick={createMovieModal.onOpen}>+ Qo'shish</Button>
            </div>

            {
                getMoviesQuery.isLoading
                    ? <StateShower id={"loading"} name={"Loading..."}/>
                    : moviesData?.movies?.length === 0
                        ? <StateShower id={"no_data"} name={"No movies found!"}/> :
                        <>
                            <MoviesTable data={moviesData?.movies}/>

                            <div className={"flex justify-between mt-3"}>
                                <div className={"flex gap-1"}>
                                    <span>Jami:</span>
                                    <h1 className={"font-medium"}>{numberSpacer(moviesData?.meta?.totalMovies || 0)}</h1>
                                </div>

                                <Pagination
                                    showSizeChanger
                                    defaultCurrent={page}
                                    defaultPageSize={limit}
                                    total={moviesData?.meta?.totalMovies}
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

export default Movies;