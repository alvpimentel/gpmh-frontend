import { useState } from 'react';
import { Container, Card, Form, Button, Spinner, Alert } from 'react-bootstrap';
import { usePesquisa } from '../../hooks/usePesquisa';
import { SearchResult } from '../../components/SearchResult';

export const Consulta = () => {
  const [codigoPesquisa, setCodigoPesquisa] = useState('');
  const { pesquisa, error, loading, buscarPesquisa, setPesquisa } = usePesquisa();

  const handleSearch = async () => {
    const resultado = await buscarPesquisa(codigoPesquisa);
    if (resultado) {
      setPesquisa(resultado);
    }
  };

  return (
    <Container className="my-5">
      <Card className="shadow-sm">
        <Card.Body>
          <Card.Title className="text-center mb-4">
            <h1 className="h3">Consulta de Pesquisas</h1>
          </Card.Title>
          
          <Form.Group className="mb-3">
            <Form.Label htmlFor="codigoPesquisa">Código da Pesquisa</Form.Label>
            <div className="d-flex gap-2">
              <Form.Control
                id="codigoPesquisa"
                type="text"
                placeholder="Ex: GPTW#1234"
                value={codigoPesquisa}
                onChange={(e) => setCodigoPesquisa(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
              <Button 
                variant="primary" 
                onClick={handleSearch}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Spinner as="span" size="sm" aria-hidden="true" />
                    <span className="ms-2">Buscando...</span>
                  </>
                ) : 'Buscar'}
              </Button>
            </div>
          </Form.Group>

          {error && <Alert variant="danger">{error}</Alert>}
          {pesquisa && <SearchResult pesquisa={pesquisa} />}
        </Card.Body>
      </Card>
    </Container>
  );
};
