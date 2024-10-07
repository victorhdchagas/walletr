export interface RawTemplateItem {
  name: string
  price: string
  target: string
  category: string
  description: string
  createdAt: string
}

interface TableComponentProps {
  data: RawTemplateItem[]
}
export default function TableComponent({ data }: TableComponentProps) {
  if (data.length === 0) return null
  return (
    <div className="flex-col">
      <div className="flex">
        <div className="w-1/5">Nome</div>
        <div className="w-1/5">Preço</div>
        <div className="w-1/5">Descrição</div>
        <div className="w-1/5">Criado em</div>
      </div>

      {data.map((item, index) => (
        <div className="flex" key={item.name + index}>
          <div className="w-1/5">{item.name}</div>
          <div className="w-1/5">{item.price}</div>
          <div className="w-1/5">{item.description}</div>
          <div className="w-1/5">{item.createdAt}</div>
        </div>
      ))}
    </div>
  )
}
