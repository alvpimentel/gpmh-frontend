import { ChangeEvent, useState } from 'react';
import { Container, Card, Button, Form, Spinner, ProgressBar } from 'react-bootstrap';
import * as XLSX from 'xlsx';
import { DataTableResult } from '../../components/DataTableResult';
import { useFileUpload } from '../../hooks/useFileUpload';

export default function Upload() {
    const [file, setFile] = useState<File | null>(null);

    const {
        enviarArquivo,
        carregando: uploadLoading,
        progresso: uploadProgress,
        dados: fileData,
        resetar: resetUpload
    } = useFileUpload();

    const handleFileChange = (event : ChangeEvent<HTMLInputElement>) => {
      const selectedFile = event.target.files?.[0];
      if (selectedFile) {
        setFile(selectedFile);
        resetUpload();
      }
    };

    const handleFileUpload = async () => {
      if (!file) return;
      
      await enviarArquivo(file);
    };

    const handleDownloadExcel = () => {
        if (!fileData) {
          alert('Nenhum dado para gerar a planilha.');
          return;
      }

      const ws = XLSX.utils.json_to_sheet(fileData);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Pesquisas');
      XLSX.writeFile(wb, 'pesquisas.xlsx');
    };

    return (
      <Container className="py-5">
        <Card className="shadow-lg border-0">
          <Card.Header className="bg-primary text-white">
            <h1 className="h4 mb-0 text-center">
              Importação de Pesquisas
            </h1>
          </Card.Header>
          
          <Card.Body className="p-4">
            <Form.Group controlId="formFile" className="mb-4">
              <Form.Label>Selecione o arquivo .xlsx</Form.Label>
              <div className="d-flex gap-2">
                <Form.Control 
                  type="file" 
                  accept=".xlsx,.csv" 
                  onChange={handleFileChange} 
                />
                <Button 
                  variant="success" 
                  onClick={handleFileUpload}
                  disabled={!file || uploadLoading}
                >
                  {uploadLoading ? (
                    <>
                      <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                      />
                      <span className="ms-2">Enviando...</span>
                    </>
                  ) : 'Enviar'}
                </Button>
              </div>
              {uploadProgress > 0 && uploadProgress < 100 && (
                <ProgressBar 
                  now={uploadProgress} 
                  label={`${uploadProgress}%`}
                  animated 
                  className="mt-2"
                />
              )}
            </Form.Group>

            {fileData ? (
              <DataTableResult 
                  data={fileData} 
                  onDownload={handleDownloadExcel}
              />
            ) : (
              <Card className="text-center py-5 bg-light">
                <Card.Body>
                  <i className="bi bi-file-earmark-text display-4 text-muted mb-3"></i>
                  <p className="lead text-muted">Nenhum arquivo carregado</p>
                  <small className="text-muted">
                    Selecione um arquivo Excel ou CSV para visualizar os dados
                  </small>
                </Card.Body>
              </Card>
            )}
          </Card.Body>
        </Card>
      </Container>
    );
}