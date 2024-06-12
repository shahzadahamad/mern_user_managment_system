function Error() {
  return (
    <div className="flex justify-center items-center h-[92vh] bg-gray-100">
      <div className="bg-gray-100 p-6 rounded-lg shadow-md text-center w-full max-w-md">
        <h1 className="text-6xl font-bold text-indigo-600 mb-4">404</h1>
        <p className="text-xl text-gray-700 mb-6">Page Not Found</p>
      </div>
    </div>
  );
}

export default Error;
