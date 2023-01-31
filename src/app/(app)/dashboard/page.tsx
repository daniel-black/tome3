const DashboardPage = () => {
  return (
    <div className="flex flex-wrap gap-3 justify-start items-start">
      <div className="w-80 h-80 rounded-xl bg-gray-900 text-gray-400 p-3">
        <span>Shelves</span>
      </div>
      <div className="w-80 h-80 rounded-xl bg-gray-900 text-gray-400 p-3">Books</div>
    </div>
  );
}

export default DashboardPage;