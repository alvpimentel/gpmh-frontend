import { useState } from 'react';
import axios from 'axios';

interface StorageFileResult {
  success: boolean;
  message: string;
  stats?: {
    novosRegistros: number;
    registrosAtualizados: number;
  };
  totalProcessado?: number;
}

export const useStorageFile = () => {
    const [result, setResult] = useState<StorageFileResult | null>(null);
    const [loading, setLoading] = useState(false);

    const storeFileData = async (fileData: any) => {
        if (!fileData) {
            alert('Nenhum dado para enviar.');
            return null;
        }

    try {
        setLoading(true);
        setResult(null);
        
        const response = await axios.post("http://localhost:3000/pesquisas/create-multiple", fileData);
        
        const resultData: StorageFileResult = {
            success: true,
            message: response.data.message,
            stats: response.data.stats,
            totalProcessado: response.data.totalProcessado
        };
        
        setResult(resultData);
        return resultData;
    } catch (error) {
        let errorResult: StorageFileResult;

        errorResult = {
          success: false,
          message: 'Erro ao enviar os dados.'
        };

      setResult(errorResult);
      return errorResult;
    } finally {
      setLoading(false);
    }
  };

  return { storeFileData, result, loading };
};