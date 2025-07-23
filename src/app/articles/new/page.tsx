"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import ArticleCreateHeader from "@/components/ArticleCreateHeader";
import ArticleCreateForm from "@/components/ArticleCreateForm";
import MarkdownEditor from "@/components/MarkdownEditor";

export default function ArticleCreatePage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [title, setTitle] = useState("");
  const [selectedTags, setSelectedTags] = useState<number[]>([]);
  const [selectedIcon, setSelectedIcon] = useState<number | null>(null);
  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false);
  const [publishDate, setPublishDate] = useState("2025/04/12");
  const [publishTime, setPublishTime] = useState("19:00");
  const [isPublic, setIsPublic] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [dateError, setDateError] = useState("");
  const [timeError, setTimeError] = useState("");
  const [markdown, setMarkdown] = useState(`# サンプル記事のタイトル

## はじめに
ここに記事の導入部分を記述します。

## 本文
### サブタイトル
ここに詳細な内容を記述します。

**太字のテキスト**や*斜体のテキスト*、\`コードブロック\`などが使用できます。

### まとめ
記事の結論をここに記述します。`);

  // 認証チェック
  useEffect(() => {
    if (status === "loading") return; // セッション読み込み中
    if (status === "unauthenticated") {
      router.push("/auth/signin");
      return;
    }
  }, [status, router]);

  // 日付の形式をバリデーションする関数
  const validateDate = (dateStr: string): boolean => {
    const dateRegex = /^\d{4}\/\d{2}\/\d{2}$/;
    if (!dateRegex.test(dateStr)) {
      setDateError(
        "日付は YYYY/MM/DD 形式で入力してください（例：2025/04/12）"
      );
      return false;
    }

    const [year, month, day] = dateStr.split("/").map(Number);
    const date = new Date(year, month - 1, day);

    if (
      date.getFullYear() !== year ||
      date.getMonth() !== month - 1 ||
      date.getDate() !== day
    ) {
      setDateError("正しい日付を入力してください");
      return false;
    }

    setDateError("");
    return true;
  };

  // 時刻の形式をバリデーションする関数
  const validateTime = (timeStr: string): boolean => {
    const timeRegex = /^\d{2}:\d{2}$/;
    if (!timeRegex.test(timeStr)) {
      setTimeError("時刻は HH:MM 形式で入力してください（例：19:00）");
      return false;
    }

    const [hour, minute] = timeStr.split(":").map(Number);

    if (hour < 0 || hour > 23 || minute < 0 || minute > 59) {
      setTimeError("正しい時刻を入力してください（00:00〜23:59）");
      return false;
    }

    setTimeError("");
    return true;
  };

  // 日付と時刻を結合してISOStringに変換する関数
  const createPublishDateTime = (dateStr: string, timeStr: string): string => {
    const [year, month, day] = dateStr.split("/").map(Number);
    const [hour, minute] = timeStr.split(":").map(Number);
    const date = new Date(year, month - 1, day, hour, minute);
    return date.toISOString();
  };

  const saveArticle = async (published: boolean) => {
    if (!session?.user?.id) {
      alert("ログインが必要です");
      router.push("/auth/signin");
      return;
    }

    if (!title.trim()) {
      alert("タイトルを入力してください");
      return;
    }

    if (!markdown.trim()) {
      alert("本文を入力してください");
      return;
    }

    if (!selectedIcon) {
      alert("アイコンを選択してください");
      return;
    }

    if (selectedTags.length === 0) {
      alert("タグを少なくとも1つ選択してください");
      return;
    }

    // 公開時のみ日付時刻のバリデーションを実行
    if (published) {
      const isDateValid = validateDate(publishDate);
      const isTimeValid = validateTime(publishTime);

      if (!isDateValid || !isTimeValid) {
        return; // エラーがある場合は処理を中断
      }
    }

    setIsSaving(true);
    try {
      const publishedAt = published
        ? createPublishDateTime(publishDate, publishTime)
        : new Date().toISOString();

      const requestData = {
        title: title.trim(),
        body: markdown,
        authorId: session?.user?.id, // ログインユーザーのID
        iconId: selectedIcon,
        tagIds: selectedTags,
        published: published && isPublic,
        publishedAt: publishedAt,
      };

      console.log("Sending article data:", requestData);

      const response = await fetch("/api/articles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      if (response.ok) {
        const createdArticle = await response.json();
        alert(published ? "記事が公開されました！" : "下書きが保存されました");
        router.push("/articles");
      } else {
        const error = await response.json();
        alert(`エラーが発生しました: ${error.error}`);
      }
    } catch (error) {
      console.error("記事保存エラー:", error);
      alert("記事の保存に失敗しました");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDraftSave = () => {
    saveArticle(false);
  };

  const handlePublishSettings = () => {
    if (!title.trim()) {
      alert("タイトルを入力してから公開設定を行ってください");
      return;
    }

    if (!markdown.trim()) {
      alert("本文を入力してから公開設定を行ってください");
      return;
    }

    if (!selectedIcon) {
      alert("アイコンを選択してから公開設定を行ってください");
      return;
    }

    if (selectedTags.length === 0) {
      alert("タグを少なくとも1つ選択してから公開設定を行ってください");
      return;
    }

    setIsPublishModalOpen(true);
  };

  const handlePublish = () => {
    const isDateValid = validateDate(publishDate);
    const isTimeValid = validateTime(publishTime);

    if (!isDateValid || !isTimeValid) {
      return; // エラーがある場合はポップアップを閉じない
    }

    setIsPublishModalOpen(false);
    saveArticle(true);
  };

  const handleClosePublishModal = () => {
    setIsPublishModalOpen(false);
    setDateError("");
    setTimeError("");
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPublishDate(value);
    if (dateError) {
      validateDate(value);
    }
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPublishTime(value);
    if (timeError) {
      validateTime(value);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto p-4 md:p-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">記事作成</h1>
          <p className="text-gray-600">新しい記事を作成します</p>
        </div>

        <ArticleCreateHeader
          onDraftSave={handleDraftSave}
          onPublishSettings={handlePublishSettings}
          isSaving={isSaving}
        />

        <main>
          <ArticleCreateForm
            title={title}
            setTitle={setTitle}
            selectedTags={selectedTags}
            setSelectedTags={setSelectedTags}
            selectedIcon={selectedIcon}
            setSelectedIcon={setSelectedIcon}
          />

          <MarkdownEditor markdown={markdown} setMarkdown={setMarkdown} />
        </main>

        {/* 公開設定ポップアップ */}
        {isPublishModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md mx-4">
              <div className="flex items-center justify-between mb-8">
                <button
                  onClick={handleClosePublishModal}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <span className="material-icons text-3xl">close</span>
                </button>
                <h1 className="text-2xl font-bold text-[#0f1111]">
                  公開情報の設定
                </h1>
                <div className="w-8"></div>
              </div>

              <div className="mb-8">
                <h2 className="text-lg font-semibold text-[#0f1111] mb-4">
                  公開日を入力してください
                </h2>
                <div className="mb-6">
                  <label
                    className="block text-sm font-medium text-gray-500 mb-1"
                    htmlFor="publish-date"
                  >
                    日付
                  </label>
                  <input
                    className={`w-full px-4 py-3 bg-gray-100 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-[#0f1111] ${
                      dateError ? "border-red-500" : "border-gray-300"
                    }`}
                    id="publish-date"
                    type="text"
                    value={publishDate}
                    onChange={handleDateChange}
                    placeholder="例：2025/04/12"
                  />
                  {dateError ? (
                    <p className="text-red-500 text-sm mt-1">{dateError}</p>
                  ) : (
                    <p className="text-xs text-gray-500 mt-1">
                      YYYY/MM/DD 形式で入力してください
                    </p>
                  )}
                </div>
                <div>
                  <label
                    className="block text-sm font-medium text-gray-500 mb-1"
                    htmlFor="publish-time"
                  >
                    時間
                  </label>
                  <input
                    className={`w-full px-4 py-3 bg-gray-100 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-[#0f1111] ${
                      timeError ? "border-red-500" : "border-gray-300"
                    }`}
                    id="publish-time"
                    type="text"
                    value={publishTime}
                    onChange={handleTimeChange}
                    placeholder="例：19:00"
                  />
                  {timeError ? (
                    <p className="text-red-500 text-sm mt-1">{timeError}</p>
                  ) : (
                    <p className="text-xs text-gray-500 mt-1">
                      HH:MM 形式で入力してください
                    </p>
                  )}
                </div>
              </div>

              <div className="mb-8">
                <h2 className="text-lg font-semibold text-[#0f1111] mb-4">
                  公開 / 非公開の設定
                </h2>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <input
                      checked={isPublic}
                      onChange={() => setIsPublic(true)}
                      className="h-5 w-5 text-blue-600 border-gray-300 focus:ring-blue-500"
                      id="publish-public"
                      name="publish-status"
                      type="radio"
                    />
                    <div className="ml-3 text-sm">
                      <label
                        className="font-medium text-[#0f1111]"
                        htmlFor="publish-public"
                      >
                        公開
                      </label>
                      <p className="text-gray-500">記事が閲覧可能な状態です</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <input
                      checked={!isPublic}
                      onChange={() => setIsPublic(false)}
                      className="h-5 w-5 text-blue-600 border-gray-300 focus:ring-blue-500"
                      id="publish-private"
                      name="publish-status"
                      type="radio"
                    />
                    <div className="ml-3 text-sm">
                      <label
                        className="font-medium text-[#0f1111]"
                        htmlFor="publish-private"
                      >
                        非公開
                      </label>
                      <p className="text-gray-500">記事は閲覧されません</p>
                    </div>
                  </div>
                </div>
              </div>

              <button
                onClick={handlePublish}
                disabled={isSaving}
                className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white font-bold py-3 px-4 rounded-lg transition duration-150 ease-in-out"
              >
                {isSaving ? "公開中..." : "記事を公開"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
