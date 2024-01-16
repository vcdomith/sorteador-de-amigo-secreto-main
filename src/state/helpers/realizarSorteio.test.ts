import { realizarSorteio } from "./realizarSoretio"

describe('dado um sorteio de amigo oculto', () => {

    test('cada participante não sorteie o proprio nome', () => {

        const participantes = [
            'Ana',
            'Catarina',
            'Nilvo', 
            'Nilve',
        ]
        const sorteio = realizarSorteio(participantes)
        participantes.forEach(participante => {
            const amigoOculto = sorteio.get(participante)
            expect(amigoOculto).not.toEqual(participante)
        })

    })

})