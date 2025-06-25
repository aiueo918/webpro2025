// 生成した Prisma Client をインポートする。場所は schema.prisma の output 設定で決まる。
import { PrismaClient } from "./generated/prisma/client";

// PrismaClient のインスタンスを作成する
const prisma = new PrismaClient({
  // 実行されたクエリをコンソールにログとして表示する設定
  log: ["query"],
});

// データベース操作を行うメインの非同期関数
async function main() {
  console.log("Prisma Client を初期化しました。");

  // 既存の全ユーザーを取得して表示する
  let users = await prisma.user.findMany();
  console.log("Before ユーザー一覧:", users);

  // 新しいユーザーを追加する
  const newUser = await prisma.user.create({
    data: {
      name: `新しいユーザー ${new Date().toISOString()}`,
    },
  });
  console.log("新しいユーザーを追加しました:", newUser);

  // もう一度、全ユーザーを取得して表示する
  users = await prisma.user.findMany();
  console.log("After ユーザー一覧:", users);
}

// main 関数を実行する
main()
  .catch((e) => {
    // エラーが発生した場合は、エラーメッセージを表示する
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // 処理が正常に終了しても、エラーで終了しても、必ず最後にデータベース接続を切断する
    await prisma.$disconnect();
    console.log("Prisma Client を切断しました。");
  });
