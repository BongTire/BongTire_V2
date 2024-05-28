import { useRouter} from "vue-router";
import type { IUser } from '@type/user'

const router = useRouter()

export const vueRouterPath = (path:string) =>{
    return router.resolve(path).href
}

export const generatePages = (totalPages) => {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
};

export const generateDisplayedPages = (currentPage, totalPages, visibleRange = 5) => {
    const pages = [];
    let start = Math.max(1, currentPage - Math.floor(visibleRange / 2));
    let end = Math.min(totalPages, currentPage + Math.floor(visibleRange / 2));

    if (end - start + 1 < visibleRange) {
        if (currentPage < Math.ceil(totalPages / 2)) {
            end = Math.min(totalPages, start + visibleRange - 1);
        } else {
            start = Math.max(1, end - visibleRange + 1);
        }
    }

    if (start > 1) {
        pages.push(1);
        if (start > 2) {
            pages.push('...');
        }
    }

    for (let i = start; i <= end; i++) {
        pages.push(i);
    }

    if (end < totalPages) {
        if (end < totalPages - 1) {
            pages.push('...');
        }
        pages.push(totalPages);
    }

    return pages;
};

export const initSesstionStorage = (responseCode: number | null):boolean =>{
    if(responseCode === 4001){
        sessionStorage.setItem('loginInfo',JSON.stringify({}))
        return true
    }else{
        return false;
    }
}

export const exportUserInfo = ():IUser =>{
    return sessionStorage.getItem('loginInfo')
}

export const isAuthenticatedAdmin = (responseCode: number | null) =>{
    if(responseCode === 4001){
        sessionStorage.setItem('loginInfo',JSON.stringify({}))
        alert('로그인이 필요한 서비스 입니다.')
        window.location.href='/login'
    }
}