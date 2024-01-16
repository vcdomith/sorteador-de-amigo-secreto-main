import { useRecoilValue } from "recoil"
import { resultadoJogo } from "../atom"

export const useResultadoSorteio = () => {

    return useRecoilValue(resultadoJogo)

}