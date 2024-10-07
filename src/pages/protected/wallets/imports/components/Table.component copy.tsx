export default function TableComponent({
  headers,
  data,
}: {
  headers: { label: string }[]
  data: { [key: string]: string | number }[]
}) {
  return (
    <div className="flex-col">
      <div className="flex">
        {headers.map((item) => (
          <div key={item.label} className="w-1/5">
            {item.label}
          </div>
        ))}
        {/* <div className="w-1/6">Data</div>
          <div className="w-1/6">Lançamento</div>
          <div className="w-1/6">Categoria</div>
          <div className="w-1/6">Tipo</div>
          <div className="w-1/6">Valor</div> */}
      </div>

      {data.map((row, index) => {
        return (
          <div key={index} className="flex">
            {headers.map((item) => (
              <div key={item.label} className="w-1/5">
                {row[item.label]}
              </div>
            ))}
          </div>
        )
      })}
    </div>
  )
}
