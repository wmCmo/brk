import { NextResponse } from 'next/server';
import { Client } from '@notionhq/client';

const NOTION_DATABASE_ID = '1c1b2a8f171b80a2bfbfc3b884ecb09e';
const notion = new Client({
    auth: process.env.NOTION_SECRET,
});

export async function GET() {
    try {
        const response = await notion.databases.query({
            database_id: NOTION_DATABASE_ID,
            sorts: [
                {
                    "property": "356fb4b7-ace6-4a91-915a-c8097e3a861d",
                    "direction": "ascending"
                }
            ]
        });
        return NextResponse.json(response.results);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch menu: ' + error }, { status: 500 });
    }
}
