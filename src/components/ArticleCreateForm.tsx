import React, { useState, useEffect } from "react";

interface Tag {
  id: number;
  name: string;
}

interface Icon {
  id: number;
  name: string;
  url: string;
}

interface ArticleCreateFormProps {
  title: string;
  setTitle: (title: string) => void;
  selectedTags: number[];
  setSelectedTags: (tags: number[]) => void;
  selectedIcon: number | null;
  setSelectedIcon: (icon: number | null) => void;
}

export default function ArticleCreateForm({
  title,
  setTitle,
  selectedTags,
  setSelectedTags,
  selectedIcon,
  setSelectedIcon,
}: ArticleCreateFormProps) {
  const [tags, setTags] = useState<Tag[]>([]);
  const [icons, setIcons] = useState<Icon[]>([]);
  const [loading, setLoading] = useState(true);

  // DBからタグとアイコンを取得
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [tagsResponse, iconsResponse] = await Promise.all([
          fetch("/api/tags"),
          fetch("/api/icons"),
        ]);

        if (tagsResponse.ok) {
          const tagsData = await tagsResponse.json();
          setTags(tagsData);
        }

        if (iconsResponse.ok) {
          const iconsData = await iconsResponse.json();
          setIcons(iconsData);
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // タグの選択/解除を処理
  const handleTagToggle = (tagId: number) => {
    if (selectedTags.includes(tagId)) {
      setSelectedTags(selectedTags.filter((id) => id !== tagId));
    } else {
      setSelectedTags([...selectedTags, tagId]);
    }
  };

  if (loading) {
    return (
      <div className="mb-8">
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          <p className="text-gray-600 mt-2">データを読み込み中...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-8">
      <div className="mb-6">
        <input
          type="text"
          value={title}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setTitle(e.target.value)
          }
          className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg text-[#0f1111]"
          placeholder="タイトル"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* タグ選択（複数選択可能） */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            タグを選択（複数選択可能）
          </label>
          <div className="max-h-40 overflow-y-auto border border-gray-300 rounded-lg p-2 bg-white">
            {tags.map((tag) => (
              <label
                key={tag.id}
                className="flex items-center p-2 hover:bg-gray-50 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={selectedTags.includes(tag.id)}
                  onChange={() => handleTagToggle(tag.id)}
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700">{tag.name}</span>
              </label>
            ))}
          </div>
          {selectedTags.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1">
              {selectedTags.map((tagId) => {
                const tag = tags.find((t) => t.id === tagId);
                return tag ? (
                  <span
                    key={tagId}
                    className="inline-flex items-center px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full"
                  >
                    {tag.name}
                    <button
                      type="button"
                      onClick={() => handleTagToggle(tagId)}
                      className="ml-1 h-3 w-3 text-blue-600 hover:text-blue-800"
                    >
                      ×
                    </button>
                  </span>
                ) : null;
              })}
            </div>
          )}
        </div>

        {/* アイコン選択 */}
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            アイコンを選択
          </label>
          <select
            value={selectedIcon || ""}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              setSelectedIcon(e.target.value ? parseInt(e.target.value) : null)
            }
            className="w-full p-4 border border-gray-300 rounded-lg shadow-sm appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-[#0f1111]"
          >
            <option value="">アイコンを選択</option>
            {icons.map((icon) => (
              <option key={icon.id} value={icon.id}>
                {icon.name}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-700">
            <span className="text-2xl">⌄</span>
          </div>
          {selectedIcon && (
            <div className="mt-2 flex items-center">
              <img
                src={icons.find((i) => i.id === selectedIcon)?.url}
                alt="Selected icon"
                className="w-8 h-8 mr-2"
              />
              <span className="text-sm text-gray-600">
                {icons.find((i) => i.id === selectedIcon)?.name}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
