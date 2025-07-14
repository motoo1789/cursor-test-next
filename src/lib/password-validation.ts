import { z } from 'zod';

// OWASP推奨の一般的な弱いパスワードのリスト（一部）
const COMMON_PASSWORDS = [
  'password', '123456', '123456789', 'qwerty', 'abc123', 'password123',
  'admin', 'letmein', 'welcome', 'monkey', '1234567890', 'dragon',
  'master', 'shadow', 'jesus', 'michael', 'superman', 'sample'
];

// パスワード強度を数値で返す関数
export function getPasswordStrength(password: string): number {
  let score = 0;
  
  // 長さによるスコア
  if (password.length >= 8) score += 1;
  if (password.length >= 12) score += 1;
  if (password.length >= 16) score += 1;
  
  // 文字種類によるスコア
  if (/[a-z]/.test(password)) score += 1; // 小文字
  if (/[A-Z]/.test(password)) score += 1; // 大文字
  if (/[0-9]/.test(password)) score += 1; // 数字
  if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) score += 1; // 特殊文字
  
  // 複雑さによるボーナス
  if (password.length >= 12 && /[a-z]/.test(password) && /[A-Z]/.test(password) && 
      /[0-9]/.test(password) && /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
    score += 1;
  }
  
  return Math.min(score, 5);
}

// パスワードバリデーションのZodスキーマ
export const passwordSchema = z.string()
  .min(8, 'パスワードは8文字以上である必要があります')
  .max(64, 'パスワードは64文字以下である必要があります')
  .refine((password) => /[a-z]/.test(password), {
    message: 'パスワードには小文字を含める必要があります'
  })
  .refine((password) => /[A-Z]/.test(password), {
    message: 'パスワードには大文字を含める必要があります'
  })
  .refine((password) => /[0-9]/.test(password), {
    message: 'パスワードには数字を含める必要があります'
  })
  .refine((password) => /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password), {
    message: 'パスワードには特殊文字(!@#$%^&*()_+-=[]{}|;:,.<>?)を含める必要があります'
  })
  .refine((password) => !COMMON_PASSWORDS.includes(password.toLowerCase()), {
    message: '一般的すぎるパスワードは使用できません'
  });

// ユーザー情報を含むパスワードバリデーション
export const createPasswordSchemaWithUserInfo = (username?: string, email?: string) => {
  return passwordSchema
    .refine((password) => {
      if (username && password.toLowerCase().includes(username.toLowerCase())) {
        return false;
      }
      if (email) {
        const emailLocal = email.split('@')[0];
        if (password.toLowerCase().includes(emailLocal.toLowerCase())) {
          return false;
        }
      }
      return true;
    }, {
      message: 'パスワードにユーザー名やメールアドレスを含めることはできません'
    });
};

// 登録フォームのバリデーションスキーマ
export const registerSchema = z.object({
  username: z.string()
    .min(3, 'ユーザー名は3文字以上である必要があります')
    .max(30, 'ユーザー名は30文字以下である必要があります')
    .regex(/^[a-zA-Z0-9_-]+$/, 'ユーザー名には英数字、アンダースコア、ハイフンのみ使用できます'),
  
  email: z.string()
    .email('有効なメールアドレスを入力してください')
    .max(100, 'メールアドレスは100文字以下である必要があります'),
  
  name: z.string()
    .min(1, '名前を入力してください')
    .max(50, '名前は50文字以下である必要があります')
    .optional(),
  
  password: passwordSchema,
  
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: 'パスワードが一致しません',
  path: ['confirmPassword']
}).refine((data) => {
  const userPasswordSchema = createPasswordSchemaWithUserInfo(data.username, data.email);
  return userPasswordSchema.safeParse(data.password).success;
}, {
  message: 'パスワードにユーザー名やメールアドレスを含めることはできません',
  path: ['password']
});

// ログインフォームのバリデーションスキーマ
export const loginSchema = z.object({
  usernameOrEmail: z.string()
    .min(1, 'ユーザー名またはメールアドレスを入力してください'),
  
  password: z.string()
    .min(1, 'パスワードを入力してください')
});

export type RegisterFormData = z.infer<typeof registerSchema>;
export type LoginFormData = z.infer<typeof loginSchema>;