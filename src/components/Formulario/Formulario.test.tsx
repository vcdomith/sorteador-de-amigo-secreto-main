import { act, fireEvent, render, screen } from "@testing-library/react"
import Formulario from "./Formulario"
import { RecoilRoot } from "recoil"

describe('comportamento do Formulario', () => {

    test('quando input está vazio, novos participantes não podem ser adicionados', () => {

        render(
            <RecoilRoot>
                <Formulario />
            </RecoilRoot>)
    
        // encontrar no DOM o input
        const input = screen.getByPlaceholderText('Insira os nomes dos participantes')
        // encontrar o botão
        const botao = screen.getByRole("button")
    
        // garantir que o input esteja no documento
        expect(input).toBeInTheDocument()
        // garantir que o botão esteja desabilitado
        expect(botao).toBeDisabled()
    
    })
    
    test('adicionar um participante caso exista um nome preenchido', () => {
    
        render(<RecoilRoot><Formulario /></RecoilRoot>)
    
        // encontrar no DOM o input
        const input = screen.getByPlaceholderText('Insira os nomes dos participantes')
        // encontrar o botão
        const botao = screen.getByRole("button")
    
        // inserir um valor no input
        fireEvent.change(input, {
            target: {
                value: 'Ana Catarina'
            }
        })
    
        // clicar no botao de submeter
        fireEvent.click(botao)
    
        // garantir que o input esteja com o foco ativo
        expect(input).toHaveFocus()
    
        // garantir que o input não tenha um valor
        expect(input).toHaveValue('')
    
    })
    
    test('nomes duplicado não podem ser adicionados na lista', () => {
    
        render(
            <RecoilRoot>
                <Formulario />
            </RecoilRoot>)
    
        // encontrar no DOM o input
        const input = screen.getByPlaceholderText('Insira os nomes dos participantes')
        // encontrar o botão
        const botao = screen.getByRole("button")
    
        // inserir um valor no input
        fireEvent.change(input, {
            target: {
                value: 'Ana Catarina'
            }
        })
    
        fireEvent.click(botao)
        fireEvent.change(input, {
            target: {
                value: 'Ana Catarina'
            }
        })
    
        fireEvent.click(botao)
    
        const mensagemErro = screen.getByRole("alert")
    
        expect(mensagemErro.textContent).toBe('Nomes duplicados não são permitidos!')
    
    
    })
    
    test('mensagem de erro apaga após o timer', () => {
    
        jest.useFakeTimers()
    
        render(
            <RecoilRoot>
                <Formulario />
            </RecoilRoot>)
    
        // encontrar no DOM o input
        const input = screen.getByPlaceholderText('Insira os nomes dos participantes')
        // encontrar o botão
        const botao = screen.getByRole("button")
    
        // inserir um valor no input
        fireEvent.change(input, {
            target: {
                value: 'Ana Catarina'
            }
        })
    
        fireEvent.click(botao)
        fireEvent.change(input, {
            target: {
                value: 'Ana Catarina'
            }
        })
    
        fireEvent.click(botao)
    
        let mensagemErro = screen.queryByRole("alert")
        
        expect(mensagemErro).toBeInTheDocument()
        
        act(() => {
            jest.runAllTimers()
        })
        // esperar n segundos
    
        mensagemErro = screen.queryByRole("alert")
        act(() => {
            expect(mensagemErro).toBeNull()
        })
    
    })

})

