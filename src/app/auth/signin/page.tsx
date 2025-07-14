"use client";

import { signIn, getSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaUser, FaLock, FaEye, FaEyeSlash, FaUserPlus } from "react-icons/fa";
import { loginSchema, registerSchema, type LoginFormData, type RegisterFormData } from "@/lib/password-validation";
import PasswordStrengthIndicator from "@/components/PasswordStrengthIndicator";

export default function SignIn() {
  const [isLoading, setIsLoading] = useState(false);
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [message, setMessage] = useState("");
  const router = useRouter();

  // フォームデータ
  const [loginData, setLoginData] = useState<LoginFormData>({
    usernameOrEmail: "",
    password: "",
  });

  const [registerData, setRegisterData] = useState<RegisterFormData>({
    username: "",
    email: "",
    name: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    const checkSession = async () => {
      const session = await getSession();
      if (session) {
        router.push("/admin");
      }
    };
    checkSession();
  }, [router]);

  const clearMessages = () => {
    setErrors({});
    setMessage("");
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    clearMessages();
    setIsLoading(true);

    try {
      // バリデーション
      const validatedData = loginSchema.safeParse(loginData);
      if (!validatedData.success) {
        const fieldErrors: Record<string, string> = {};
        validatedData.error.issues.forEach((issue) => {
          if (issue.path[0]) {
            fieldErrors[issue.path[0] as string] = issue.message;
          }
        });
        setErrors(fieldErrors);
        return;
      }

      const result = await signIn("credentials", {
        usernameOrEmail: loginData.usernameOrEmail,
        password: loginData.password,
        redirect: false,
      });

      if (result?.error) {
        setErrors({ general: "ユーザー名またはパスワードが正しくありません" });
      } else if (result?.ok) {
        router.push("/admin");
      }
    } catch (error) {
      console.error("Login error:", error);
      setErrors({ general: "ログインに失敗しました" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    clearMessages();
    setIsLoading(true);

    try {
      // バリデーション
      const validatedData = registerSchema.safeParse(registerData);
      if (!validatedData.success) {
        const fieldErrors: Record<string, string> = {};
        validatedData.error.issues.forEach((issue) => {
          if (issue.path[0]) {
            fieldErrors[issue.path[0] as string] = issue.message;
          }
        });
        setErrors(fieldErrors);
        return;
      }

      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(validatedData.data),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("アカウントが正常に作成されました。ログインしてください。");
        setIsRegisterMode(false);
        setRegisterData({
          username: "",
          email: "",
          name: "",
          password: "",
          confirmPassword: "",
        });
      } else {
        if (data.details) {
          setErrors(data.details);
        } else {
          setErrors({ general: data.error || "登録に失敗しました" });
        }
      }
    } catch (error) {
      console.error("Registration error:", error);
      setErrors({ general: "登録に失敗しました" });
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
            {isRegisterMode ? "アカウント作成" : "管理画面へログイン"}
          </h2>
          <p className="mt-2 text-gray-600">
            {isRegisterMode 
              ? "新しいアカウントを作成して記事を管理しましょう"
              : "アカウントでログインして記事を管理しましょう"
            }
          </p>
        </div>

        {/* メッセージ表示 */}
        {message && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <p className="text-green-800 text-sm">{message}</p>
          </div>
        )}

        {errors.general && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-800 text-sm">{errors.general}</p>
          </div>
        )}

        {/* フォームカード */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {isRegisterMode ? "新規登録" : "ログイン"}
              </h3>
              <p className="text-gray-500 text-sm">
                {isRegisterMode 
                  ? "以下の情報を入力してアカウントを作成してください"
                  : "ユーザー名（またはメール）とパスワードを入力してください"
                }
              </p>
            </div>

            <form onSubmit={isRegisterMode ? handleRegister : handleLogin} className="space-y-4">
              {isRegisterMode ? (
                <>
                  {/* 登録フォーム */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      ユーザー名 *
                    </label>
                    <div className="relative">
                      <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        value={registerData.username}
                        onChange={(e) => setRegisterData({ ...registerData, username: e.target.value })}
                        className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          errors.username ? "border-red-500" : "border-gray-300"
                        }`}
                        placeholder="ユーザー名を入力"
                      />
                    </div>
                    {errors.username && (
                      <p className="text-red-600 text-xs mt-1">{errors.username}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      メールアドレス *
                    </label>
                    <input
                      type="email"
                      value={registerData.email}
                      onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.email ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="メールアドレスを入力"
                    />
                    {errors.email && (
                      <p className="text-red-600 text-xs mt-1">{errors.email}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      名前
                    </label>
                    <input
                      type="text"
                      value={registerData.name}
                      onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })}
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.name ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="名前を入力（任意）"
                    />
                    {errors.name && (
                      <p className="text-red-600 text-xs mt-1">{errors.name}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      パスワード *
                    </label>
                    <div className="relative">
                      <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type={showPassword ? "text" : "password"}
                        value={registerData.password}
                        onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                        className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          errors.password ? "border-red-500" : "border-gray-300"
                        }`}
                        placeholder="パスワードを入力"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>
                    {errors.password && (
                      <p className="text-red-600 text-xs mt-1">{errors.password}</p>
                    )}
                    <PasswordStrengthIndicator password={registerData.password} />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      パスワード確認 *
                    </label>
                    <div className="relative">
                      <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        value={registerData.confirmPassword}
                        onChange={(e) => setRegisterData({ ...registerData, confirmPassword: e.target.value })}
                        className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          errors.confirmPassword ? "border-red-500" : "border-gray-300"
                        }`}
                        placeholder="パスワードを再入力"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>
                    {errors.confirmPassword && (
                      <p className="text-red-600 text-xs mt-1">{errors.confirmPassword}</p>
                    )}
                  </div>
                </>
              ) : (
                <>
                  {/* ログインフォーム */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      ユーザー名またはメールアドレス
                    </label>
                    <div className="relative">
                      <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        value={loginData.usernameOrEmail}
                        onChange={(e) => setLoginData({ ...loginData, usernameOrEmail: e.target.value })}
                        className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          errors.usernameOrEmail ? "border-red-500" : "border-gray-300"
                        }`}
                        placeholder="ユーザー名またはメールアドレス"
                      />
                    </div>
                    {errors.usernameOrEmail && (
                      <p className="text-red-600 text-xs mt-1">{errors.usernameOrEmail}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      パスワード
                    </label>
                    <div className="relative">
                      <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type={showPassword ? "text" : "password"}
                        value={loginData.password}
                        onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                        className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          errors.password ? "border-red-500" : "border-gray-300"
                        }`}
                        placeholder="パスワード"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>
                    {errors.password && (
                      <p className="text-red-600 text-xs mt-1">{errors.password}</p>
                    )}
                  </div>
                </>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium py-3 px-4 rounded-lg flex items-center justify-center space-x-3 transition-colors duration-200 shadow-md hover:shadow-lg"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>{isRegisterMode ? "作成中..." : "ログイン中..."}</span>
                  </>
                ) : (
                  <>
                    {isRegisterMode ? <FaUserPlus className="h-5 w-5" /> : <FaUser className="h-5 w-5" />}
                    <span>{isRegisterMode ? "アカウント作成" : "ログイン"}</span>
                  </>
                )}
              </button>
            </form>

            <div className="text-center">
              <button
                onClick={() => {
                  setIsRegisterMode(!isRegisterMode);
                  clearMessages();
                }}
                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                {isRegisterMode 
                  ? "既にアカウントをお持ちですか？ログインはこちら"
                  : "アカウントをお持ちでない方はこちら"
                }
              </button>
            </div>

            <div className="text-center">
              <p className="text-xs text-gray-500">
                {isRegisterMode 
                  ? "アカウントを作成することで、利用規約とプライバシーポリシーに同意したものとみなされます"
                  : "ログインすることで、利用規約とプライバシーポリシーに同意したものとみなされます"
                }
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