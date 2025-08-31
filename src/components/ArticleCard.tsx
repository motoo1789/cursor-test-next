interface ArticleCardProps {
  id: number;
  title: string;
  description: string;
  icon?: string;
}

export default function ArticleCard({ id, title, description, icon }: ArticleCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="bg-gray-200 h-48 flex items-center justify-center">
        <div className="w-24 h-24 bg-blue-400 rounded-full flex items-center justify-center">
          <span className="text-white text-sm">アイコン</span>
        </div>
      </div>
      <div className="p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">{title}</h2>
        <p className="text-gray-600 text-sm">{description}</p>
      </div>
    </div>
  );
}