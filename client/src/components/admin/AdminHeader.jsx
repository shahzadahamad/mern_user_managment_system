

function adminHeader() {
  return (
    <div className="bg-slate-200">
    <div className="flex justify-between items-center mx-auto max-w-6xl p-3">
        <h1 className="font-bold">Auth App</h1>
      <ul className="flex gap-4">
          <li>Dashboard</li>
          <li>SignOut</li>
      </ul>
    </div>
  </div>
  )
}

export default adminHeader
