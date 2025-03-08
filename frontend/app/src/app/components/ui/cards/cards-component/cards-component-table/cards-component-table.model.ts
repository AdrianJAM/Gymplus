export interface TableHeader {
    key: string;
    label: string;
    sortable?: boolean;
    width?: string;
    align?: 'left' | 'center' | 'right';
}

export interface CardTable<T> {
    headers: TableHeader[];
    data: T[];
    title?: string;
    loading?: boolean;
    pageSize?: number;
    totalItems?: number;
}
