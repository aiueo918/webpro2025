// node.jsの標準ライブラリであるhttpとurlをインポートします
import http from "node:http";
import { URL } from "node:url";

// 環境変数が設定されていれば、そこからポート番号を取得します。
// 環境変数に設定がなければ 8888 を使用します。
const PORT = process.env.PORT || 8888;

// httpサーバーを作成します
const server = http.createServer((req, res) => {
  // リクエストURLをパースして、パス名やクエリパラメータを取得しやすくします
  const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
  const pathname = parsedUrl.pathname;

  // レスポンスのヘッダーに文字コードをutf-8に設定します
  res.setHeader("Content-Type", "text/plain; charset=utf-8");

  // ルーティング処理
  if (pathname === "/") {
    console.log("/ にアクセスがありました");
    res.writeHead(200); // ステータスコード200（成功）を返す
    res.end("こんにちは！"); // レスポンスボディに「こんにちは！」と表示
  } else if (pathname === "/ask") {
    // クエリパラメータから 'q' の値を取得します
    const question = parsedUrl.searchParams.get("q");
    console.log(`/ask にアクセスがありました (q=${question})`);
    res.writeHead(200);
    res.end(`Your question is '${question}'`);
  } else {
    console.log("不明なパスにアクセスがありました");
    res.writeHead(404); // ステータスコード404（見つからない）を返す
    res.end("Not Found");
  }
});

// 指定したポートでサーバーを起動します
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
