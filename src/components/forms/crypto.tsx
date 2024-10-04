import {CryptoSchema} from "@/lib";

import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import * as z from "zod";

import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage,} from "@/components/ui/form";
import {Button} from "../ui/button";
import {Input} from "../ui/input";
import {useCreateCrypto, useUpdateCrypto} from "@/hooks/useCrypto.ts";
import {CryptoType} from "@/types/crypto";


type CryptoFormProps = {
    action: "CREATE" | "EDIT";
    data?: CryptoType,
}

const CryptoForm = ({action, data}: CryptoFormProps) => {
    const form = useForm<z.infer<typeof CryptoSchema>>({
        resolver: zodResolver(CryptoSchema),
        defaultValues: {
            name: data?.name,
            price: data?.price,
            change: data?.change,
            minOrderAmount: data?.minOrderAmount,
            maxOrderAmount: data?.maxOrderAmount,
            card_name: data?.card_name,
            card_number: data?.card_number,
        }
    });

    const createCryptoMutation = useCreateCrypto()
    const updateCryptoMutation = useUpdateCrypto()

    function onSubmit(values: z.infer<typeof CryptoSchema>) {
        if (action === "CREATE") {
            createCryptoMutation.mutate(values)
        } else {
            updateCryptoMutation.mutate({
                id: data?.id!,
                data: values
            })
        }
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col gap-5"
            >
                <h1 className="text-[22px] font-semibold text-center">
                    {action === "CREATE" ? "Crypto qo'shish" : "Tahrirlash"}
                </h1>

                <div className={"grid grid-cols-2 gap-5"}>
                    {/* Name */}
                    <FormField
                        control={form.control}
                        name="name"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Nomi:</FormLabel>
                                <FormControl>
                                    <Input placeholder="nomini kiriting" {...field} />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />

                    {/*  Price */}
                    <FormField
                        control={form.control}
                        name="price"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Narxi:</FormLabel>
                                <FormControl>
                                    <Input placeholder="narxini kiriting" {...field} />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />

                    {/* Change */}
                    <FormField
                        control={form.control}
                        name="change"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>O'zgarish:</FormLabel>
                                <FormControl>
                                    <Input placeholder="narxdagi o'zgarishni kiriting" {...field} />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />

                    {/* Min Order Amount */}
                    <FormField
                        control={form.control}
                        name="minOrderAmount"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Buyurtma (Min):</FormLabel>
                                <FormControl>
                                    <Input placeholder="minimal buyurtma miqdori" {...field} />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />

                    {/* Max Order Amount */}
                    <FormField
                        control={form.control}
                        name="maxOrderAmount"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Buyurtma (Max):</FormLabel>
                                <FormControl>
                                    <Input placeholder="maximal buyurtma miqdori" {...field} />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />

                    {/* Card Name */}
                    <FormField
                        control={form.control}
                        name="card_number"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Karta raqam:</FormLabel>
                                <FormControl>
                                    <Input type={"number"} placeholder="karta raqamini kiriting" {...field} />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />

                    {/* Card number */}
                    <FormField
                        control={form.control}
                        name="card_name"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Karta egasi:</FormLabel>
                                <FormControl>
                                    <Input placeholder="karta nomini kiriting" {...field} />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                </div>

                <div className={"flex justify-center"}>
                    <Button
                        className={"w-1/4"}
                        isLoading={createCryptoMutation.isPending || updateCryptoMutation.isPending}
                    >
                        {action === "CREATE" ? "Qo'shish" : "O'zgarishlarni saqlash"}
                    </Button>
                </div>
            </form>
        </Form>
    );
};

export default CryptoForm;
