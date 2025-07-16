// index.ts

import express from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const app = express();
const PORT = process.env.PORT || 8888;

app.set("view engine", "ejs");
app.set("views", "./views");
app.use(express.urlencoded({ extended: true }));

// 【変更点】ルートパス: すべての株用語を取得して一覧表示する
app.get("/", async (req, res) => {
  const terms = await prisma.stockTerm.findMany({
    orderBy: { createdAt: "desc" }, // 新しい順に並び替え
  });
  res.render("index", { terms });
});

// 【新機能】詳細ページ: 特定の1つの株用語を表示する
app.get("/term/:id", async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const term = await prisma.stockTerm.findUnique({
    where: { id },
  });
  if (term) {
    res.render("detail", { term });
  } else {
    res.status(404).send("指定された用語は見つかりませんでした。");
  }
});

// 【変更点】用語追加: フォームから送信された新しい用語をDBに保存する
app.post("/terms", async (req, res) => {
  const { name, description } = req.body;
  if (name && description) {
    await prisma.stockTerm.create({
      data: { name, description },
    });
  }
  res.redirect("/");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
