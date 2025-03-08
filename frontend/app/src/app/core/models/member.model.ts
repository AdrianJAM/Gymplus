export interface Member{
    id?: string;
    name: string;
    ci: string;
    phone: string;
    email: string;
    membershipType: string;
    status: 'active' | 'inactive';
}
