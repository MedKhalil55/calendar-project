// event.ts
export class Event {
    id: number | null;
    title: string;
    description: string;
    startDateTime: string;
    endDateTime: string;
    category: string;

    constructor(
        id: number | null = null,
        title: string = '',
        description: string = '',
        startDateTime: string = new Date().toISOString().substring(0, 16),
        endDateTime: string = new Date().toISOString().substring(0, 16),
        category: string = ''
    ) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.startDateTime = startDateTime;
        this.endDateTime = endDateTime;
        this.category = category;
    }
}
