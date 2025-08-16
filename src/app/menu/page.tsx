import Greeting from "@/components/Greeting";
import { SearchParamsType } from "@/types/searchParams";
import MenuItem from "./MenuItem";
import { Suspense } from "react";

interface PageProps {
    searchParams: Promise<SearchParamsType>;
}

export default async function MenuPage({ searchParams }: PageProps) {

    const params = await searchParams;
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/getMenu`, {
        cache: 'force-cache'
    });
    const data = await res.json();

    return (
        <main className="bg-zinc-100 text-zinc-800 px-4">
            <Greeting timeout={params.timeout} house={params.house} />
            <Suspense fallback={<p>Loading Menu</p>}>
                <MenuItem data={data} />
            </Suspense>
        </main>
    );
}
