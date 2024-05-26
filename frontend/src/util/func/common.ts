import { useRouter} from "vue-router";

const router = useRouter()

export const vueRouterPath = (path:string) =>{
    return router.resolve(path).href
}

