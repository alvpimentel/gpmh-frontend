import { Table, Card, Button, Badge, Alert, ProgressBar } from 'react-bootstrap';
import { useStorageFile } from '../../hooks/useStorageFile';

interface DataTableProps {
    data: any[];
    onDownload?: () => void;
    loading?: boolean;
    showSaveButton?: boolean;
}

export const DataTableResult = ({
      data,
      onDownload,
      loading,
      showSaveButton = true
  }: DataTableProps) => {
    if (!data || data.length === 0) return null;


    const { 
      storeFileData, 
      result: storageResult, 
      loading: storageLoading 
    } = useStorageFile();

    const columns = Object.keys(data[0]);

    const handleSave = async () => {
      await storeFileData(data); 
    };

    return (
      <>
        <div className="d-flex justify-content-between mb-4">
          {showSaveButton && (
            <Button 
              variant="primary" 
              onClick={handleSave}
              disabled={loading || storageLoading}
            >
              {loading || storageLoading ? (
                'Salvando...'
              ) : (
                'Salvar Resultado'
              )}
            </Button>
          )}

          <Button variant="outline-info" onClick={onDownload}>
            Baixar Planilha
          </Button>
        </div>

        {storageResult && (
          <Alert variant={storageResult.success ? 'success' : 'danger'} className="mb-4">
            <Alert.Heading>{storageResult.message}</Alert.Heading>
            {storageResult.stats && (
              <div className="mt-3">
                {storageResult.stats.novosRegistros > 0 && (
                  <p>
                    <Badge bg="success" className="me-2">
                      Novos
                    </Badge>
                    {storageResult.stats.novosRegistros} registros
                  </p>
                )}
                {storageResult.stats.registrosAtualizados > 0 && (
                  <p>
                    <Badge bg="warning" text="dark" className="me-2">
                      Atualizados
                    </Badge>
                    {storageResult.stats.registrosAtualizados} registros
                  </p>
                )}
                <ProgressBar 
                  now={storageResult.totalProcessado || 0} 
                  max={data.length || 100}
                  label={`${storageResult.totalProcessado} processados`}
                  className="mt-2"
                />
              </div>
            )}
          </Alert>
        )}

        {/* Tabela de dados */}
        <Card className="shadow-sm">
          <div className="table-responsive">
            <Table striped bordered hover className="mb-0">
              <thead className="table-dark">
                <tr>
                  {columns.map((col) => (
                    <th key={col}>{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.map((row, index) => (
                  <tr key={index}>
                    {columns.map((col) => (
                      <td key={`${index}-${col}`}>{row[col]}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </Card>
      </>
    );
};