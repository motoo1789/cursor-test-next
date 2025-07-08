export default function ArticleHeader() {
  return (
    <header className="bg-white shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        <a className="text-xl font-semibold text-gray-700" href="/articles">
          TechBlog
        </a>
        <div className="flex items-center">
          <button className="text-gray-600 hover:text-purple-600 focus:outline-none mx-2">
            <span className="material-icons">search</span>
          </button>
          <button className="text-gray-600 hover:text-purple-600 focus:outline-none mx-2">
            <span className="material-icons">notifications</span>
          </button>
          <div className="relative">
            <button className="focus:outline-none">
              <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center text-white text-xl">
                <span className="material-icons">person</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}