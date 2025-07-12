"use client";

import { useState, useEffect } from "react";

interface LikeButtonProps {
  articleId: number;
  initialLikes: number;
  initialIsLiked?: boolean;
  onLikeChange?: (likes: number, isLiked: boolean) => void;
}

export default function LikeButton({
  articleId,
  initialLikes,
  initialIsLiked = false,
  onLikeChange,
}: LikeButtonProps) {
  const [displayLikes, setDisplayLikes] = useState(initialLikes);
  const [isLiked, setIsLiked] = useState(initialIsLiked);
  const [isLoading, setIsLoading] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  // ローカルストレージからいいね状態を復元
  useEffect(() => {
    const savedLikeState = localStorage.getItem(`like_article_${articleId}`);
    if (savedLikeState !== null) {
      const isLikedFromStorage = savedLikeState === "true";
      setIsLiked(isLikedFromStorage);
      // 初期値をそのまま使用（APIから正しい値を取得するため）
      setDisplayLikes(initialLikes);
    } else {
      // 初回アクセス時は、データベースの値をそのまま表示
      setDisplayLikes(initialLikes);
    }
  }, [articleId, initialLikes]);

  // いいね状態をローカルストレージに保存
  const saveLikeState = (likedState: boolean) => {
    localStorage.setItem(`like_article_${articleId}`, likedState.toString());
  };

  // いいね切り替え処理
  const handleLikeToggle = async () => {
    if (isLoading) return;

    setIsLoading(true);
    setIsAnimating(true);

    try {
      const method = isLiked ? "DELETE" : "POST";
      const response = await fetch(`/api/articles/${articleId}/like`, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        const newIsLiked = data.isLiked;

        // APIから返される更新後のデータベースの値を直接使用
        setDisplayLikes(data.totalLikes);
        setIsLiked(newIsLiked);
        saveLikeState(newIsLiked);

        // 親コンポーネントに変更を通知
        if (onLikeChange) {
          onLikeChange(data.totalLikes, newIsLiked);
        }

        // 成功メッセージを表示（オプション）
        console.log(data.message);
      } else {
        console.error("いいね処理に失敗しました");
      }
    } catch (error) {
      console.error("Error toggling like:", error);
    } finally {
      setIsLoading(false);
      // アニメーション終了
      setTimeout(() => setIsAnimating(false), 300);
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={handleLikeToggle}
        disabled={isLoading}
        className={`
          flex items-center justify-center
          w-12 h-12 rounded-full
          transition-all duration-300 ease-in-out
          transform hover:scale-110 active:scale-95
          ${isAnimating ? "animate-pulse scale-110" : ""}
          ${
            isLiked
              ? "bg-blue-500 hover:bg-blue-600 text-white shadow-lg"
              : "bg-gray-200 hover:bg-gray-300 text-gray-600 hover:text-blue-500"
          }
          ${isLoading ? "opacity-70 cursor-not-allowed" : "cursor-pointer"}
          focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2
        `}
        title={isLiked ? "いいねを取り消す" : "いいね"}
        aria-label={isLiked ? "いいねを取り消す" : "いいね"}
      >
        {isLoading ? (
          <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
        ) : (
          <svg
            className={`w-6 h-6 transition-transform duration-200 ${
              isAnimating ? "scale-125" : ""
            }`}
            fill={isLiked ? "currentColor" : "none"}
            stroke="currentColor"
            strokeWidth={isLiked ? 0 : 2}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L9 7v13m-3-4h-2m2-6h-2m2-6h-2"
            />
          </svg>
        )}
      </button>

      <div className="flex flex-col items-start">
        <span
          className={`
            text-sm font-medium transition-colors duration-200
            ${isLiked ? "text-blue-600" : "text-gray-600"}
          `}
        >
          {isLiked ? "いいね済み" : "いいね"}
        </span>
        <span
          className={`
            text-lg font-bold transition-all duration-300
            ${isAnimating ? "scale-110 text-blue-500" : ""}
            ${isLiked ? "text-blue-600" : "text-gray-700"}
          `}
        >
          {displayLikes}
        </span>
      </div>

      {/* パーティクルアニメーション効果 */}
      {isAnimating && isLiked && (
        <div className="absolute pointer-events-none">
          <div className="relative">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className={`
                  absolute w-1 h-1 bg-blue-400 rounded-full
                  animate-ping opacity-75
                `}
                style={{
                  left: `${Math.cos((i * Math.PI) / 3) * 20}px`,
                  top: `${Math.sin((i * Math.PI) / 3) * 20}px`,
                  animationDelay: `${i * 50}ms`,
                  animationDuration: "600ms",
                }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
