import { Pesquisa } from "../../type";
import { Card, Alert } from "react-bootstrap";

interface Props {
  pesquisa: Pesquisa | null;
}

export const SearchResult = ({ pesquisa }: Props) => {
    if (!pesquisa) {
        return (
        <Alert variant="warning" className="mt-4">
            Nenhum dado de pesquisa disponível
        </Alert>
        );
    }
    
    try {
        return (
            <Card className="mt-4 border-primary">
                <Card.Header className="bg-primary text-white">
                    <h2 className="h5 mb-0">Resultado da Pesquisa</h2>
                </Card.Header>
                <Card.Body>
                    <div className="row">
                        <div className="col-md-6">
                            <p><strong>Código:</strong> {pesquisa.cd_pesquisa}</p>
                            <p><strong>Nota 1:</strong> {pesquisa.nr_nota1?.toFixed(1)}</p>
                        </div>
                        <div className="col-md-6">
                            <p><strong>Nota 2:</strong> {pesquisa.nr_nota2?.toFixed(1)}</p>
                            <p><strong>Média:</strong> <span className="fw-bold">{pesquisa.nr_media?.toFixed(1)}</span></p>
                        </div>
                    </div>
                </Card.Body>
                <Card.Footer className="text-muted">
                    <small>
                        Última atualização: {new Date(pesquisa.dt_editado).toLocaleString()}
                    </small>
                </Card.Footer>
        </Card>
        );
    } catch (error) {
            console.error("Erro ao renderizar pesquisa:", error);
        return (
            <Alert variant="danger" className="mt-4">
                Erro ao exibir os dados da pesquisa
            </Alert>
        );
    }
};