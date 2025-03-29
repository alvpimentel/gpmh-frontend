import { useState } from 'react';
import axios from 'axios';
import { Pesquisa } from '../type'; 

interface ApiResponse {
  data: Pesquisa;
  message: string;
  statusCode: number;
}

export const usePesquisa = () => {
  const [pesquisa, setPesquisa] = useState<Pesquisa | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const buscarPesquisa = async (codigo: string): Promise<Pesquisa | null> => {
    if (!codigo.trim()) {
        setError("Por favor, insira o código da pesquisa.");
        return null;
    }

    try {
        setLoading(true);
        setError(null);
        setPesquisa(null);        

        const response = await axios.get<ApiResponse>(
            `http://localhost:3000/pesquisas/${encodeURIComponent(codigo)}`
        );

        if (!response.data.data) {
            throw new Error('Estrutura de dados inválida');
        }

        const dadosPesquisa: Pesquisa = {
            cd_pesquisa: response.data.data.cd_pesquisa,
            nr_nota1: response.data.data.nr_nota1,
            nr_nota2: response.data.data.nr_nota2,
            nr_media: response.data.data.nr_media,
            dt_editado: response.data.data.dt_editado
        };

        setPesquisa(dadosPesquisa);
        return dadosPesquisa;

        } catch (error) {
        let errorMessage = "Erro ao se comunicar com o servidor.";
        
        if (axios.isAxiosError(error)) {
            errorMessage = error.response?.data?.message || error.message;
        } else if (error instanceof Error) {
            errorMessage = error.message;
        }

        setError(errorMessage);
        return null;
    } finally {
      setLoading(false);
    }
  };

  return { pesquisa, error, loading, setPesquisa, buscarPesquisa };
};