export interface Iuser {
    id: string;
    name: string;
    email: string;
    createdAt: Date;
    updatedAt: Date | null;
    deletedAt: Date | null;
}