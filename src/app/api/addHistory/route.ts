import { NextResponse } from "next/server";
import { Client } from "@notionhq/client";
import { HistoryType } from "@/types/history";
import { houses } from "@/utils/getHouses";

const NOTION_DATABASE_HISTORY_ID = '1c5b2a8f171b80f99520e5a37acc596a';
const notion = new Client({
    auth: process.env.NOTION_SECRET,
});

const HOUSE_DICT: { [K in keyof typeof houses]: string } = {
    'makarm': '1c5b2a8f-171b-80d6-9622-e40797c4c5a8',
    'peep': '1c5b2a8f-171b-80c0-889d-f4948327a7cf',
    'chor-muang': '1c5b2a8f-171b-8071-926b-f4cd4938280a',
    'jun-pha': '1c5b2a8f-171b-80d9-852d-f6558657fad2',
    'jak': '1c5b2a8f-171b-8032-8fd2-e7100fb3f382',
    'manao': '1c5b2a8f-171b-802c-b930-e0fd13230608'
};

export async function POST(req: Request) {
    const { history, phone }: { history: HistoryType, phone: string; } = await req.json();
    try {
        const response = await notion.pages.create({
            parent: { database_id: NOTION_DATABASE_HISTORY_ID },
            properties: {
                title: { title: [{ text: { content: `${history.user.name} ${houses[history.user.house].th}` } }] },
                "Tk%5E%3D": { phone_number: phone },
                "GgBR": { number: history.total },
                '%3FT%60Y': { relation: Object.keys(history.order).map(key => ({ id: key })) },
                'enYQ': { date: { start: new Date(history["serve-time"]).toISOString(), 'time_zone': 'Asia/Bangkok' } },
                'olCh': { 'relation': [{ 'id': HOUSE_DICT[history.user.house] }] },
            },
            children:
                Object.values(history.order).map(item => {
                    return {
                        object: 'block',
                        type: "paragraph",
                        paragraph: {
                            rich_text: [
                                {
                                    type: 'text',
                                    text: {
                                        content: `${item.th} = ${item.count}`
                                    }
                                }]
                        }
                    };
                })
        });
        return NextResponse.json(response);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: "Failed to add history: " + error }, { status: 500 });
    }
}
