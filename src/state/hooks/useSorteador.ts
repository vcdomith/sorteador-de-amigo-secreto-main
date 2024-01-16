import { useSetRecoilState } from "recoil"
import { resultadoJogo } from "../atom"
import { useListaParticipantes } from "./useListaParticipantes"
import shuffle from "just-shuffle"
import { realizarSorteio } from "../helpers/realizarSoretio"

export const useSorteador = () => {

    const participantes = useListaParticipantes()

    const setResultado = useSetRecoilState(resultadoJogo)

    return () => {

        const resultado = realizarSorteio(participantes)
        setResultado(resultado)


    }

}