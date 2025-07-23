# 開発用の一時的修正案

## 問題

- データベースリセット後にセッションの古いユーザー ID が残る
- 毎回ログアウト → ログインが必要

## 一時的解決策

記事作成フォームに既存ユーザー選択機能を追加:

```tsx
// ArticleCreateForm.tsx に追加
const [availableUsers, setAvailableUsers] = useState([]);
const [selectedAuthor, setSelectedAuthor] = useState(null);

// ユーザー一覧を取得
useEffect(() => {
  fetch("/api/users")
    .then((res) => res.json())
    .then((users) => setAvailableUsers(users));
}, []);

// フォームに追加
<select
  value={selectedAuthor || ""}
  onChange={(e) => setSelectedAuthor(e.target.value)}
>
  <option value="">著者を選択</option>
  {availableUsers.map((user) => (
    <option key={user.id} value={user.id}>
      {user.name} ({user.username})
    </option>
  ))}
</select>;
```

## 本格的解決策

- セッション管理の改善
- NextAuth.js のセッション永続化設定
- データベースマイグレーション戦略の見直し
