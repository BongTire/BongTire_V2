import { IBrand } from "./brand";

export interface IProduct {
    id?: number | null
    WheelId?: number | null
    TireId?: number | null
    // 상품 공통
    BrandId: number | null;
    brandName: string | null
    brandOrigin?: number | null
    brandNation?: string | null
    brandLogo?: string | null
    PCCD: string | null
    drivingMethodPCCD?: Array<string> | null
    productName: string | null;
    price: number | null
    amount: number | null
    discountRate: number | null
    discountPrice: number | null
    image: string | null
    viewers: number | null
    isSecond: number | null
    content: string | null
    feature: null;
    isActive: number | null
    isRecommanded: number | null
    // 타이어 옵션
    tireSize?: string | null
    mCode?: string | null
    patternCode?: string | null
    maxSpeed?: string | null
    origin?: string | null
    xl?: string | null
    ply?: string | null
    // 휠 option
    productCode?: string | null
    wheelSize?: string | null
    frontOffset?: string | null
    rearOffset?: string | null
    PCD?: string | null
    hole?: number | null

    numberOfDataUpdate: number | null
    sales?: number | null

    createdAt: string
    updatedAt: string
    deletedAt?: null,
}

// ?: 옵션은 undefined를 가려내는 옵션임
// 해당 옵션이 붙는다는 뜻은 있으면, 보내고 없으면 말아라 라는 뜻

export interface IProductType{
    PCCDId : number
    PCCD: string
    title: string | null
    icon: string | null
    brand?: IBrand[] | null

}