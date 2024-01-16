import { render, screen } from "@testing-library/react"
import { RecoilRoot } from "recoil"
import ListaParticipantes from "./ListaParticipantes"
import { useListaParticipantes } from "../../state/hooks/useListaParticipantes"

jest.mock('../../state/hooks/useListaParticipantes', () => {
    return {
        useListaParticipantes: jest.fn()
    }
})

describe('Uma lista vazia de participantes', () => {

    beforeEach(() => {
        (useListaParticipantes as jest.Mock).mockReturnValue([])
    })

    test('uma lista de participantes vazia deve ser renderizada sem elementos', () => {

        render(<RecoilRoot>
            <ListaParticipantes />
        </RecoilRoot>)
    
        const itens = screen.queryAllByRole('listitem')
        expect(itens).toHaveLength(0)
        
    })

})

describe('Uma lista preenchida de participantes', () => {

    beforeEach(() => [
        (useListaParticipantes as jest.Mock).mockReturnValue(participantes)
    ])

    const participantes = ['Ana', 'Catarina']

    test('uma lista de participantes vazia deve ser renderizada sem elementos', () => {

        render(<RecoilRoot>
            <ListaParticipantes />
        </RecoilRoot>)
    
        const itens = screen.queryAllByRole('listitem')
        expect(itens).toHaveLength(participantes.length)

    })

})