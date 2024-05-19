export interface IPost{
    PostId: number | null
    PTCD: string | null
    PCCD: string
    title: string | null
    content: string | null
    WriterId : number | null
    WriterName : string | null
    WriterEmail?: string | null
    isPin: number
    isActive: number
    isAnswer: number
    isThumbnail: number
    thumbnail: string | null
    answer: string | null
    viewers: number | null
    isSecret: number
    createdAt: string
    updatedAt : string
}

// WriterId는 만약 비회원일 경우는 -1
// 회원일 경우는 join을 통해서 name 만 추출할 것
// 받고 보낼때 둘 다 해당 interface를 기반으로 

//WirterEmail은 있으면 주셈
