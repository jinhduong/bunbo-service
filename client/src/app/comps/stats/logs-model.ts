export interface LogModel {
    site: string;
    logs: Array<{ created: number, live: boolean, time: string, createdStr: string }>
}