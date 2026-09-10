import { LegalPage } from '@/components/LegalPage'

export default function Privacidade() {
  return (
    <LegalPage
      title="Política de privacidade"
      updatedAt="10 de setembro de 2026"
      intro="Esta política explica quais dados a Apple Pacces coleta, para que usa, com quem compartilha e como você exerce seus direitos, conforme a Lei Geral de Proteção de Dados (Lei 13.709/2018)."
      sections={[
        {
          title: 'Quem somos',
          body: (
            <p>
              A Apple Pacces é uma revenda independente de produtos Apple, sem vínculo com a Apple Inc. Para qualquer assunto
              sobre seus dados, fale com a gente pelo formulário <a href="/#contato" className="text-[#0066cc] hover:underline">Fale com um especialista</a>.
            </p>
          ),
        },
        {
          title: 'Dados que coletamos',
          body: (
            <ul>
              <li><strong>Conta:</strong> nome, e-mail, WhatsApp e senha. A senha é guardada de forma criptografada pelo nosso provedor de contas; nós não temos acesso a ela.</li>
              <li><strong>Pedido:</strong> nome completo, CPF, telefone e endereço de entrega.</li>
              <li><strong>Contato:</strong> nome, WhatsApp e produto de interesse, quando você preenche o formulário de atendimento.</li>
              <li><strong>Sacola:</strong> os produtos que você adicionou, para que continuem salvos entre visitas.</li>
            </ul>
          ),
        },
        {
          title: 'Para que usamos',
          body: (
            <ul>
              <li>Processar, cobrar e entregar seu pedido.</li>
              <li>Preencher seus dados no pagamento. O CPF é exigido pelo processador de pagamento.</li>
              <li>Responder ao seu pedido de atendimento e avisar sobre o status da compra.</li>
              <li>Prevenir fraudes e cumprir obrigações legais e fiscais.</li>
            </ul>
          ),
        },
        {
          title: 'Com quem compartilhamos',
          body: (
            <>
              <p>Não vendemos nem alugamos seus dados. Compartilhamos apenas o necessário com:</p>
              <ul>
                <li><strong>Cakto</strong>, que processa o pagamento. Os dados do cartão são digitados direto na Cakto e nunca passam pelo nosso site.</li>
                <li><strong>Supabase</strong>, onde ficam guardados sua conta, sua sacola e seus pedidos.</li>
                <li><strong>Transportadora ou entregador</strong>, que recebe nome e endereço para a entrega.</li>
                <li><strong>ViaCEP</strong>, consultado apenas com o número do CEP para preencher o endereço.</li>
              </ul>
            </>
          ),
        },
        {
          title: 'Por quanto tempo guardamos',
          body: (
            <p>
              Os dados da conta ficam guardados enquanto ela existir. Os dados de pedidos são mantidos pelo prazo exigido pelas
              leis fiscais e de defesa do consumidor, e depois são excluídos.
            </p>
          ),
        },
        {
          title: 'Seus direitos',
          body: (
            <p>
              Você pode pedir a qualquer momento para confirmar se tratamos seus dados, acessar, corrigir, excluir, levar para outro
              fornecedor ou revogar um consentimento. Faça o pedido pelo nosso atendimento e responderemos em até 15 dias.
            </p>
          ),
        },
        {
          title: 'Segurança',
          body: (
            <p>
              Todo o site usa conexão criptografada (HTTPS). O acesso aos dados é restrito, e cada cliente só consegue ver os
              próprios pedidos.
            </p>
          ),
        },
        {
          title: 'Armazenamento no navegador',
          body: (
            <p>
              Usamos o armazenamento do seu navegador apenas para manter você conectado e lembrar a sua sacola. Não usamos cookies
              de publicidade.
            </p>
          ),
        },
      ]}
    />
  )
}
