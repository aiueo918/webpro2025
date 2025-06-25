// Node.js の標準ライブラリである http と url を "node:" をつけてインポートする
import http from "node:http";
import { URL } from "node:url";

// 環境変数 PORT が設定されていればその値を、なければ 8888 をポート番号として使用する
const PORT = process.env.PORT || 8888;

// HTTPサーバーを作成する
const server = http.createServer((req, res) => {
  // リクエストのURLを解析して、パス名やクエリパラメータを取得しやすくする
  const url = new URL(req.url, `http://${req.headers.host}`);

  // ルートパス ("/") へのアクセス時の処理
  if (url.pathname === "/") {
    console.log("ルートパスへのアクセスがありました。");
    // HTTPステータスコード 200 (成功) と、コンテントタイプ (文字コード含む) をヘッダーに設定
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    // レスポンスボディに "こんにちは！" と書き込んで、通信を終了する
    res.end("こんにちは！");
    return; // 処理をここで終了
  }

  // "/ask" パスへのアクセス時の処理
  if (url.pathname === "/ask") {
    // URLのクエリパラメータから 'q' の値を取得する
    const question = url.searchParams.get("q");
    console.log(`質問を受け付けました: ${question}`);
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.end(`Your question is '${question}'`);
    return; // 処理をここで終了
  }

  // 上記のどのパスにも当てはまらない場合 (404 Not Found)
  console.log("未定義のパスへのアクセスがありました。");
  res.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
  res.end("ページが見つかりません");
});

// 指定したポートでサーバーを起動し、リクエストの待ち受けを開始する
server.listen(PORT, () => {
  console.log(
    `サーバーがポート ${PORT} で起動しました。 http://localhost:${PORT}`
  );
});
