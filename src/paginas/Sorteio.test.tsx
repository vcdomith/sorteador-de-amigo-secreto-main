import { fireEvent, render, screen } from "@testing-library/react"
import { RecoilRoot } from "recoil"
import { useListaParticipantes } from "../state/hooks/useListaParticipantes"
import Sorteio from "./Sorteio"
import { useResultadoSorteio } from "../state/hooks/useResultadoSorteio"

jest.mock('../state/hooks/useListaParticipantes', () => {
    return {
        useListaParticipantes: jest.fn()
    }
})
jest.mock('../state/hooks/useResultadoSorteio', () => {
    return {
        useResultadoSorteio: jest.fn()
    }
})

describe('na pagina de sorteio', () => {

    const participantes = [
        'Ana',
        'Catarina',
        'Nilvo',
    ]
    
    const resultado = new Map([
        ['Ana', 'Nilvo'],
        ['Catarina', 'Ana'],
        ['Nilvo', 'Catarina'],

    ])

    beforeEach(() => {
        (useListaParticipantes as jest.Mock).mockReturnValue(participantes);
        (useResultadoSorteio as jest.Mock).mockReturnValue(resultado)
    })


    test('todos os participantes podem exibir seu amigo secreto', () => {

        render(<RecoilRoot>
            <Sorteio />
        </RecoilRoot>)

        const opcoes = screen.queryAllByRole('option')

        // O +1 é necessário por que já vem uma opção por padrão
        expect(opcoes).toHaveLength(participantes.length + 1)

    })

    test('o amigo secreto é exibido quando solicitado', () => {

        render(<RecoilRoot>
            <Sorteio />
        </RecoilRoot>)

        const select = screen.getByPlaceholderText('Selecione o seu nome')
        fireEvent.change(select, {
            target: {
                value: participantes[0]
            }
        })

        const botao = screen.getByRole('button')
        fireEvent.click(botao)

        const amigoSecreto = screen.getByRole('alert')

        expect(amigoSecreto).toBeInTheDocument()
    })

})