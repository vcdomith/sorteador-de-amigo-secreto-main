import { atom } from "recoil";

export const listaParticipantesState = atom<string[]>({
    key: 'listaParticipantesState',
    default: []
})

export const resultadoJogo = atom<Map<string,string>>({
    key: 'resultadoJogo',
    default: new Map(),
})

export const erroState = atom<string>({
    key: 'erroState',
    default: '',
})
