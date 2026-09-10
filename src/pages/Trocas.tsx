import { LegalPage } from '@/components/LegalPage'

export default function Trocas() {
  return (
    <LegalPage
      title="Trocas e devoluções"
      updatedAt="10 de setembro de 2026"
      intro="Todos os produtos são lacrados e têm garantia Apple de 1 ano. Veja como desistir de uma compra, trocar um produto com defeito ou resolver um problema na entrega."
      sections={[
        {
          title: 'Desistência em até 7 dias',
          body: (
            <>
              <p>
                Pelo Código de Defesa do Consumidor (art. 49), você pode desistir da compra em até <strong>7 dias corridos</strong> depois
                de receber o produto, sem precisar explicar o motivo.
              </p>
              <p>
                Devolvemos o valor integral, incluindo o frete. Para agilizar, envie o produto na embalagem original, com todos os
                acessórios e a nota.
              </p>
            </>
          ),
        },
        {
          title: 'Produto com defeito',
          body: (
            <ul>
              <li><strong>Até 90 dias do recebimento:</strong> garantia legal. Fale com a gente e resolvemos com troca, conserto ou devolução do valor.</li>
              <li><strong>Até 1 ano:</strong> garantia oficial Apple, atendida em qualquer assistência técnica autorizada Apple no Brasil. Ajudamos você a agendar.</li>
            </ul>
          ),
        },
        {
          title: 'Problema na entrega',
          body: (
            <p>
              Se o produto chegar diferente do pedido, com a embalagem violada ou com avaria, avise em até 7 dias com fotos da
              caixa e do produto. Enviamos o produto correto sem custo para você.
            </p>
          ),
        },
        {
          title: 'Como pedir',
          body: (
            <p>
              Fale com a gente pelo <a href="/#contato" className="text-[#0066cc] hover:underline">atendimento</a> informando o
              número do pedido, que aparece em Meus pedidos. Enviamos as instruções de devolução e a coleta ou postagem sem custo.
            </p>
          ),
        },
        {
          title: 'Reembolso',
          body: (
            <p>
              O valor é devolvido pelo mesmo meio de pagamento assim que recebermos e conferirmos o produto. No cartão de crédito, o
              estorno aparece na fatura seguinte ou na subsequente, conforme o banco.
            </p>
          ),
        },
      ]}
    />
  )
}
