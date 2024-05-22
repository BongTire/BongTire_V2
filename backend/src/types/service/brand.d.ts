export interface IBrand{
    BrandId: number
    name: string | null
    codeName?: string | null
    PCCD: string[]
    brandLogo: string | null
    origin: number
    nation: string | null
    createdAt?: string 
    updatedAt?: string | null
    deletedAt?: string | null
}