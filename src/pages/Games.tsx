import React, {useEffect, useState} from 'react';
import {Navbar} from "@/components";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import {useGetGames} from "@/hooks/useGames.ts";
import {GetGamesType} from "@/types/game";
import StateShower from "@/components/state-shower.tsx";
import {Pagination} from "antd";
import GamesTable from "@/components/tables/games.tsx";
import {useCreateGameModal} from "@/hooks/useZustand.ts";
import {DialogModal} from "@/components/ui/dialog.tsx";
import GameForm from "@/components/forms/game.tsx";
import {numberSpacer} from "@/lib/utils.tsx";

const Games = () => {
    const [page, setPage] = useState<number>(1);
    const [limit, setLimit] = useState<number>(20);
    const [keyword, setKeyword] = useState<string>("");

    const getGamesQuery = useGetGames(page, limit, keyword)
    const gamesData: GetGamesType = getGamesQuery?.data?.data

    const createGameModal = useCreateGameModal()

    useEffect(() => {
        getGamesQuery.refetch()
    }, [page, limit, keyword])

    return (
        <>
            <DialogModal
                className={"w-[800px] top-1/2"}
                isOpen={createGameModal.isOpen}
                onClose={createGameModal.onClose}
            >
                <GameForm action={"CREATE"}/>
            </DialogModal>

            <Navbar name={"Games"}/>

            <div className={"flex justify-between"}>
                <div className={"grid grid-cols-4 w-full"}>
                    <Input placeholder={"Izlash..."} onChange={(e) => setKeyword(e.target.value)}/>
                </div>

                <Button onClick={createGameModal.onOpen}>+ Qo'shish</Button>
            </div>

            {
                getGamesQuery.isLoading
                    ? <StateShower id={"loading"} name={"Loading..."}/>
                    : gamesData?.games?.length === 0
                        ? <StateShower id={"no_data"} name={"No games found!"}/> :
                        <>
                            <GamesTable data={gamesData?.games}/>

                            <div className={"flex justify-between mt-3"}>
                                <div className={"flex gap-1"}>
                                    <span>Jami:</span>
                                    <h1 className={"font-medium"}>{numberSpacer(gamesData?.meta?.totalGames || 0)}</h1>
                                </div>

                                <Pagination
                                    showSizeChanger
                                    defaultCurrent={page}
                                    defaultPageSize={limit}
                                    total={gamesData?.meta?.totalGames}
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

export default Games;