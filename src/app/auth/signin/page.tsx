"use client";

import { signIn, getSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaGithub } from "react-icons/fa";

export default function SignIn() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      const session = await getSession();
      if (session) {
        router.push("/admin");
      }
    };
    checkSession();
  }, [router]);

  const handleSignIn = async () => {
    setIsLoading(true);
    try {
      await signIn("github", { callbackUrl: "/admin" });
    } catch (error) {
      console.error("Sign in error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8">
        {/* ロゴ・タイトル部分 */}
        <div className="text-center">
          <div className="mx-auto h-20 w-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
            <svg className="h-10 w-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            管理画面へようこそ
          </h2>
          <p className="mt-2 text-gray-600">
            GitHubアカウントでログインして記事を管理しましょう
          </p>
        </div>

        {/* ログインカード */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                ログイン
              </h3>
              <p className="text-gray-500 text-sm">
                GitHubアカウントを使用してログインしてください
              </p>
            </div>

            <button
              onClick={handleSignIn}
              disabled={isLoading}
              className="w-full bg-gray-900 hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium py-3 px-4 rounded-lg flex items-center justify-center space-x-3 transition-colors duration-200 shadow-md hover:shadow-lg"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>ログイン中...</span>
                </>
              ) : (
                <>
                  <FaGithub className="h-5 w-5" />
                  <span>GitHubでログイン</span>
                </>
              )}
            </button>

            <div className="text-center">
              <p className="text-xs text-gray-500">
                ログインすることで、利用規約とプライバシーポリシーに同意したものとみなされます
              </p>
            </div>
          </div>
        </div>

        {/* フッター */}
        <div className="text-center">
          <p className="text-sm text-gray-500">
            © 2024 記事管理システム. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}