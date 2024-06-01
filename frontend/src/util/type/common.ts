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
    PCCDId : number | null
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
export interface IFetchType{
    status:{
        code: number
        message: string
    }
    data: any
    total?: number | null
}

export interface IMessage{
    title: string | null
    message: string | null
}

export interface IEvent {
    PostId: number
    PCCD: "N0402",
    thumbnail: string | null
    isMainPost: boolean | number | null,
    viewers: number | null,
    url: string | null
}