export type NotionResponse = {
    id: string;
    properties: {
        Name: {
            title: Array<{
                plain_text: string;
            }>;
        };
        Category: {
            select: {
                name: string;
            };
        };
        Index: {
            number: number;
        };
        Price: {
            number: number;
        };
        Description: {
            rich_text: Array<{
                plain_text: string;
            }>;
        };
        "Dietary Restrictions": {
            multi_select: Array<{
                name?: string;
            }>;
        };
        Image: {
            files: Array<{
                file: {
                    expery_time: string;
                    url: string;
                };
            }>;
        };
    };
};

export type CartType = {
    [id: string]: {
        en: string;
        th: string;
        price: number;
        count: number;
    };
};
