import { useState } from 'react';
import axios from 'axios';

export const useFileUpload = () => {
    const [loading, setLoading] = useState(false);
    const [progresso, setProgresso] = useState(0);
    const [dados, setDados] = useState<any>(null);

    const enviarArquivo = async (arquivo: File) => {
        if (!arquivo) {
        alert('Selecione um arquivo antes!');
        return;
        }

        const formData = new FormData();
        formData.append('file', arquivo);

        try {
            setLoading(true);
            setProgresso(0);

            const resposta = await axios.post('http://127.0.0.1:5000/processar', formData, {
                headers: {
                'Content-Type': 'multipart/form-data',
                },
                onUploadProgress: (progresso) => {
                if (progresso.total) {
                    const porcentagem = Math.round((progresso.loaded * 100) / progresso.total);
                    setProgresso(porcentagem);
                }
                }
            });

            setDados(resposta.data);
            return resposta.data;

        } catch (erro) {
            alert('Erro no envio do arquivo.');
            console.error(erro);
        } finally {
            setLoading(false);
        }
    };

    return {
        enviarArquivo,
        carregando: loading,
        progresso,
        dados,
        resetar: () => {
        setDados(null);
        setProgresso(0);
        }
    };
};