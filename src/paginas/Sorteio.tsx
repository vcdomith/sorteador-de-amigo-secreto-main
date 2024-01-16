import { useState } from "react"
import { useListaParticipantes } from "../state/hooks/useListaParticipantes"
import { useResultadoSorteio } from "../state/hooks/useResultadoSorteio"
import Card from "../components/Card/Card"
import './Sorteio.css'


const Sorteio = () => {

    const participantes = useListaParticipantes()

    const [participanteVez, setParticipanteVez] = useState('')
    const [amigoOculto, setAmigoOculto] = useState('')

    const resultado = useResultadoSorteio()


    const sortear = (evento: React.FormEvent<HTMLFormElement>) => {
        evento.preventDefault()

        if (resultado.has(participanteVez)) {
            setAmigoOculto(resultado.get(participanteVez)!)
        }

    }

  return (
    <Card>
        <section className="sorteio">
            <form onSubmit={sortear}>
                <select 
                    required
                    value={participanteVez}
                    onChange={evento => setParticipanteVez(evento.target.value)}
                    name="participanteVez" 
                    id="participanteVez"
                    placeholder="Selecione o seu nome"
                >   
                    <option>Selecione o seu nome</option>
                    {participantes.map(participante =>
                        <option
                            key={participante}    
                        >
                            {participante}
                        </option>)}
                </select>
                <button className="botao-sortear">Sortear</button>
            </form>
            {amigoOculto && 
                <p 
                    className="resultado"
                    role="alert"
                >{amigoOculto}</p>}
            <footer>
                <img 
                    className="aviao"
                    src="/imagens/aviao.png" 
                    alt="Imagem de um avião" 
                />
            </footer>
        </section>
    </Card>
  )
}

export default Sorteio