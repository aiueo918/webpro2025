import express from "express";
// 生成した Prisma Client をインポート
import { PrismaClient } from "./generated/prisma/client";
const prisma = new PrismaClient({
  // クエリが実行されたときに実際に実行したクエリをログに表示する設定
  log: ["query"],
});
const app = express();

// 環境変数が設定されていれば、そこからポート番号を取得する。環境変数に設定がなければ 8888 を使用する。
const PORT = process.env.PORT || 8888;

// EJS をテンプレートエンジンとして設定する
app.set("view engine", "ejs");
// EJS のテンプレートファイルが置かれているディレクトリを指定する
app.set("views", "./views");

// フォームから送信されたデータ (urlencoded) を受け取れるように設定する
app.use(express.urlencoded({ extended: true }));

// ルートパス ("/") にGETリクエストが来たときの処理
app.get("/", async (req, res) => {
  // データベースからすべてのユーザーを取得する
  const users = await prisma.user.findMany();
  // 'index.ejs' テンプレートを使い、'users'という名前でデータを渡してHTMLを生成し、応答する
  res.render("index", { users });
});

// "/users" にPOSTリクエストが来たときの処理 (ユーザー追加フォームからの送信)
app.post("/users", async (req, res) => {
  const name = req.body.name; // フォームから送信された'name'の値を取得
  if (name) {
    // 取得した名前で新しいユーザーをデータベースに作成する
    const newUser = await prisma.user.create({
      data: { name },
    });
    console.log("新しいユーザーを追加しました:", newUser);
  }
  // 処理が終わったら、ルートパス ("/") にリダイレクトする (一覧ページを再表示)
  res.redirect("/");
});

// サーバーを指定したポートで起動する
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
