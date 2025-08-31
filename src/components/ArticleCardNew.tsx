import Image from 'next/image';

interface ArticleCardNewProps {
  title?: string;
  description?: string;
  imageUrl?: string;
  className?: string;
  onClick?: () => void;
}

export default function ArticleCardNew({ 
  title = "記事のタイトル",
  description = "ここに記事の短い説明が入ります。読者の興味を引くような内容を記述します。",
  imageUrl,
  className = "",
  onClick
}: ArticleCardNewProps) {
  return (
    <div 
      className={`bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer ${className}`}
      onClick={onClick}
    >
      <div className="bg-gray-200 h-48 flex items-center justify-center relative">
        {imageUrl ? (
          <Image 
            src={imageUrl} 
            alt={title} 
            fill
            className="object-cover"
          />
        ) : (
          <div className="w-24 h-24 bg-blue-400 rounded-full flex items-center justify-center">
            <span className="text-white text-sm">アイコン</span>
          </div>
        )}
      </div>
      <div className="p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">{title}</h2>
        <p className="text-gray-600 text-sm">{description}</p>
      </div>
    </div>
  );
}