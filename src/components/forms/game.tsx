import {GameSchema} from "@/lib";

import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import * as z from "zod";

import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage,} from "@/components/ui/form";
import {Button} from "../ui/button";
import {Input} from "../ui/input";
import {Switch} from "@/components/ui/switch.tsx";
import {SingleGameType} from "@/types/game";
import {useCreateGame, useUpdateGame} from "@/hooks/useGames.ts";
import {Textarea} from "@/components/ui/textarea.tsx";


type GameFormProps = {
    action: "CREATE" | "EDIT";
    data?: SingleGameType,
}

const GameForm = ({action, data}: GameFormProps) => {
    const form = useForm<z.infer<typeof GameSchema>>({
        resolver: zodResolver(GameSchema),
        defaultValues: {
            name: data?.name,
            image: data?.image,
            descr: data?.descr,
            isActive: data?.isActive,
            wallet_address: data?.wallet_address,
            video_url: data?.video_url,
        }
    });

    const createGameMutation = useCreateGame()
    const updateGameMutation = useUpdateGame()


    function onSubmit(values: z.infer<typeof GameSchema>) {
        if (!values.isActive) {
            values.isActive = true
        }

        if (action === "CREATE") {
            createGameMutation.mutate(values)
        } else {
            updateGameMutation.mutate({
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
                    {action === "CREATE" ? "O'yin qo'shish" : "Tahrirlash"}
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

                    {/* Image URL */}
                    <FormField
                        control={form.control}
                        name="image"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Logo (url):</FormLabel>
                                <FormControl>
                                    <Input placeholder="url kiriting" {...field} />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />

                    {/* Video URL */}
                    <FormField
                        control={form.control}
                        name="video_url"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Video (url):</FormLabel>
                                <FormControl>
                                    <Input placeholder="url kiriting" {...field} />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />

                    {/* Wallet address */}
                    <FormField
                        control={form.control}
                        name="wallet_address"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Hamyon manzili:</FormLabel>
                                <FormControl>
                                    <Input placeholder="hamyon manzilini kiriting" {...field} />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                </div>


                {/* Description */}
                <FormField
                    control={form.control}
                    name="descr"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Tasnif:</FormLabel>
                            <FormControl>
                                <Textarea placeholder={"Tasnif kiriting..."} {...field}/>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />

                {/* Status */}
                <FormField
                    control={form.control}
                    name="isActive"
                    render={({field}) => (
                        <FormItem className={"flex gap-2 items-center"}>
                            <FormLabel className={"mt-2"}>Status:</FormLabel>
                            <FormControl>
                                <Switch
                                    checked={field.value}
                                    defaultChecked
                                    onCheckedChange={field.onChange}
                                />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />

                <div className={"flex justify-center"}>
                    <Button className={"w-1/4"}
                            isLoading={createGameMutation.isPending || updateGameMutation.isPending}>
                        {action === "CREATE" ? "Qo'shish" : "O'zgarishlarni saqlash"}
                    </Button>
                </div>
            </form>
        </Form>
    );
};

export default GameForm;
