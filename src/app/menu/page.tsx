import Greeting from "@/components/Greeting";
import { SearchParamsType } from "@/types/searchParams";
import MenuItem from "./MenuItem";

export default async function MenuPage({ searchParams }: { searchParams: SearchParamsType; }) {

    const { timeout } = await searchParams;
    const { house } = await searchParams;
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/getMenu`);

    const data = await res.json();

    return (
        <main className="bg-zinc-100 text-zinc-800 p-4">
            <Greeting timeout={timeout} house={house} />
            {data ? <MenuItem data={data} /> : "...loading"}
        </main>
    );
}
