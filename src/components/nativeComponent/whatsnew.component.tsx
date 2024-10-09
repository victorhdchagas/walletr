interface WhatsNewProps {
  version: string
  date: string
  descriptions: string[]
  title: string
}

const WhatsNew: WhatsNewProps[] = [
  {
    date: '2024-10-07',
    version: '1.1.0',
    title: 'Carteiras',
    descriptions: [
      'Foi adicionado um recurso de adicionar CSV no wallet para importar as transações.',
    ],
  },
  {
    date: '2024-10-08',
    version: '1.1.0',
    title: 'WhatsNew',
    descriptions: [
      'Foi adicionado o component Whatsnew visando atualizar o usuário das modificações no software.',
    ],
  },
  {
    date: '2024-10-09',
    version: '1.1.0',
    title: 'Transações',
    descriptions: [
      'Foi adicionado um filtro para alvos',
      'Foi corrigido um bug ao salvar uma transação',
      'Foi adicionado um select no campo de editar/criar transacao para selecionar o alvo ou adicionar manualmente',
      'Foi adicionado um botão para compartilhar as transações filtradas.',
      'Foi corrigido o algoritmo de detecção de números na importação de CSV',
      'Foi adicionado o campo "Alvo" no template de importação de CSV',
      'Foi adicionado um Filtro para período de transações',
      'Foi corrigido um bug ao excluir transações',
    ],
  },
]

export default function WhatsNewComponent({ version }: { version: string }) {
  return (
    <div className="flex w-[400px] gap-2 flex-col my-4 border border-slate-300 rounded-lg">
      <span className="text-xl font-bold text-slate-300 px-2">
        O que teve de novidade?
      </span>
      {WhatsNew.filter((item) => item.version === version)
        .map((item) => ({ ...item, date: new Date(item.date) }))
        .sort((a, b) => b.date.getTime() - a.date.getTime())
        .map((item, index) => (
          <div
            key={index}
            className="flex flex-col gap-2 border-b border-slate-300 pb-2 px-2"
          >
            <div className="text-slate-500 font-semibold text-sm px-2">
              {new Date(item.date).toLocaleDateString('pt-BR', {
                timeZone: 'UTC',
              })}
            </div>
            <div className="text-slate-300 px-2 text-xl">{item.title}</div>
            <div className="text-slate-300 px-2 text-base">
              <ol className="list-decimal pl-3">
                {item.descriptions.map((description, indexDesc) => (
                  <li key={indexDesc}>{description}</li>
                ))}
              </ol>
            </div>
          </div>
        ))}
    </div>
  )
}
