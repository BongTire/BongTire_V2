export interface IPTCD{
    PTCDId: number
    menuTypeName: string
    menuTypeCode: string
    pageTypeName: string
    PTCD: string
    createdAt: string
    updatedAt: string
    deletedAt?: null
}

export interface IPCCD{
    PCCDId : number
    firstName: string
    firstCodeName: string
    secondName: string
    secondCodeName: string
    PCCD: string
    icon: string | null
    createdAt: string
    updatedAt: string
    deletedAt?: null
}

export interface IMenu{
    MenuId: number
    name: string
    isActive: number
    PTCD: string
    PCCD: string
    url: string
    isTopMenu: number
    isFavMenu: number
    isVisible: number
}