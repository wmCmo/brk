import Greeting from "@/components/Greeting";
import { SearchParamsType } from "@/types/searchParams";
import MenuItem from "./MenuItem";

export default async function MenuPage({ searchParams }: { searchParams: SearchParamsType; }) {

    const { timeout } = await searchParams;
    const { house } = await searchParams;
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/getMenu`);

    const data = await res.json();

    res.json().then(info => console.log(info));

    return (
        <>
            <Greeting timeout={timeout} house={house} />
            {data ? <MenuItem data={data} /> : "...loading"}
        </>
    );
}
