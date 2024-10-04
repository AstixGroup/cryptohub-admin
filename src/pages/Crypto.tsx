import React, {useEffect, useState} from 'react';
import {Navbar} from "@/components";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import {useGetCryptos} from "@/hooks/useCrypto.ts";
import {GetCryptosType} from "@/types/crypto";
import StateShower from "@/components/state-shower.tsx";
import CryptoTable from "@/components/tables/crypto.tsx";
import {Pagination} from "antd";
import {DialogModal} from "@/components/ui/dialog.tsx";
import {useCreateCryptoModal} from "@/hooks/useZustand.ts";
import CryptoForm from "@/components/forms/crypto.tsx";
import {numberSpacer} from "@/lib/utils.tsx";

const Crypto = () => {
    const [page, setPage] = useState<number>(1);
    const [limit, setLimit] = useState<number>(20);
    const [keyword, setKeyword] = useState<string>("");

    const getCryptosQuery = useGetCryptos(page, limit, keyword)
    const cryptosData: GetCryptosType = getCryptosQuery?.data?.data

    const createCryptoModal = useCreateCryptoModal();

    useEffect(() => {
        getCryptosQuery.refetch()
    }, [page, limit, keyword])

    return (
        <>
            <DialogModal
                isOpen={createCryptoModal.isOpen}
                onClose={createCryptoModal.onClose}
                className={"w-[800px]"}
            >
                <CryptoForm action={"CREATE"}/>
            </DialogModal>

            <Navbar name={"Crypto"}/>

            <div className={"flex justify-between"}>
                <div className={"grid grid-cols-4 w-full"}>
                    <Input placeholder={"Izlash..."} onChange={(e) => setKeyword(e.target.value)}/>
                </div>

                <Button onClick={createCryptoModal.onOpen}>+ Qo'shish</Button>
            </div>

            {
                getCryptosQuery.isLoading
                    ? <StateShower id={"loading"} name={"Loading..."}/>
                    : cryptosData?.cryptos?.length === 0
                        ? <StateShower id={"no_data"} name={"No cryptos found!"}/> :
                        <>
                            <CryptoTable data={cryptosData?.cryptos}/>

                            <div className={"flex justify-between mt-3"}>
                                <div className={"flex gap-1"}>
                                    <span>Jami:</span>
                                    <h1 className={"font-medium"}>{numberSpacer(cryptosData?.meta?.totalCryptos || 0)}</h1>
                                </div>

                                <Pagination
                                    showSizeChanger
                                    defaultCurrent={page}
                                    defaultPageSize={limit}
                                    total={cryptosData?.meta?.totalCryptos}
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

export default Crypto;