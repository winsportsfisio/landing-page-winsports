/**
 * Dados oficiais da clínica — fonte da verdade.
 * Consultar wireframe-winsports.md §0 antes de editar.
 */

export const site = {
  domain: 'https://winsportsfisio.com.br',
  name: 'WIN SPORTS Fisioterapia Esportiva',
  shortName: 'WIN SPORTS',
  legalName: 'Win Sports Fisioterapia LTDA',
  cnpj: '66.332.988/0001-02',
  address: {
    street: 'Rua São José, 223',
    neighborhood: 'Balneário, Estreito',
    city: 'Florianópolis',
    region: 'SC',
    postalCode: '88075-310',
    country: 'BR',
    full: 'Rua São José, 223 — Balneário, Estreito · Florianópolis/SC · CEP 88075-310',
  },
  geo: {
    lat: -27.5806844,
    lng: -48.5832714,
    placeId: 'ChIJc7qIzpxJJ5UR7ak2sJK2XCE',
  },
  contact: {
    whatsappNumber: '+5548991007155',
    whatsappDisplay: '(48) 9 9100-7155',
    whatsappUrl:
      'https://wa.me/5548991007155?text=Ol%C3%A1!%20Vim%20pelo%20site%20e%20gostaria%20de%20agendar%20uma%20avalia%C3%A7%C3%A3o.',
    whatsappUrlDoubt:
      'https://wa.me/5548991007155?text=Ol%C3%A1%2C%20gostaria%20de%20tirar%20uma%20d%C3%BAvida.',
    telUrl: 'tel:+5548991007155',
    email: 'winsportsfisio@gmail.com',
    emailUrl: 'mailto:winsportsfisio@gmail.com',
    instagram: 'https://www.instagram.com/winsportsfisio/',
    instagramHandle: '@winsportsfisio',
  },
  hours: {
    display: 'Seg a Sex · 08:00–12:00 e 13:00–20:00',
    closed: 'Sábado, domingo e feriados: fechado',
  },
  responsible: {
    name: 'Pedro Leonardo dos Reis',
    council: 'CREFITO-10/SC',
    registration: '362790-F',
    fullRegistration: 'CREFITO-10/SC nº 362790-F',
    specialty: 'Fisioterapia traumato-ortopédica e esportiva',
  },
  meta: {
    title: 'WIN SPORTS — Fisioterapia Esportiva em Florianópolis',
    description:
      'Fisioterapia esportiva em Florianópolis. Reabilitação de lesões, Return to Play e recovery para atletas e pessoas ativas. Agende sua avaliação.',
    ogImage: 'https://winsportsfisio.com.br/og-image.jpg',
    twitterCard: 'summary_large_image',
  },
  gbpMapsUrl:
    'https://www.google.com/maps/place/?q=place_id:ChIJc7qIzpxJJ5UR7ak2sJK2XCE',
  gbpEmbedUrl:
    'https://www.google.com/maps/embed/v1/place?key=GOOGLE_MAPS_EMBED_KEY&q=place_id:ChIJc7qIzpxJJ5UR7ak2sJK2XCE',
  // SUBSTITUIR DEPOIS: trocar por embed URL com API key real quando disponível.
  // O iframe abaixo usa o src clássico (sem key) que ainda funciona para exibição básica.
  gbpEmbedUrlClassic:
    'https://www.google.com/maps?q=Rua+S%C3%A3o+Jos%C3%A9%2C+223+-+Balne%C3%A1rio%2C+Estreito%2C+Florian%C3%B3polis+-+SC%2C+88075-310&output=embed',
} as const;

export const faqs = [
  {
    q: 'Vocês atendem convênio?',
    a: 'Não, atendemos apenas particular. Aceitamos Pix, dinheiro, cartão de crédito e débito.',
  },
  {
    q: 'Vocês fazem liberação miofascial?',
    a: 'Sim, a terapia manual é uma das abordagens possíveis e é indicada após avaliação individual, conforme o perfil de cada paciente.',
  },
  {
    q: 'Vocês fazem recovery (recuperação pós-treino)?',
    a: 'Sim, oferecemos recovery com técnicas como crioterapia, botas de compressão e liberação miofascial. A indicação é feita após avaliação.',
  },
  {
    q: 'Quais são as formas de pagamento?',
    a: 'Aceitamos Pix, dinheiro, cartão de crédito e cartão de débito. Não trabalhamos com convênios.',
  },
  {
    q: 'Preciso de pedido médico para fazer fisioterapia?',
    a: 'Não é obrigatório. O fisioterapeuta tem autonomia para realizar avaliação e definir o plano de tratamento. Se houver pedido médico ou laudo de exames, traga para complementar a avaliação.',
  },
  {
    q: 'Quanto tempo dura uma sessão?',
    a: 'A avaliação inicial leva cerca de 60 minutos. As sessões de atendimento subsequentes duram em média 50 minutos, podendo variar conforme o protocolo individual de cada paciente.',
  },
] as const;

export type Faq = (typeof faqs)[number];
