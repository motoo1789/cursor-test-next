export default function Header() {
  return (
    <header className="flex justify-between items-center mb-10">
      <h1 className="text-3xl font-bold text-purple-700">技術記事</h1>
      <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center">
        <span className="material-icons text-white text-3xl">person</span>
      </div>
    </header>
  );
}