const logo = new URL("../../../hanezu_tts_logo.svg", import.meta.url).href;

export function ModelCard() {
  return (
    <article className="model-card">
      <img
        className="model-card-logo"
        src={logo}
        alt="Hanezu TTS"
        width="685"
        height="304"
      />
      <p>
        Demo:{" "}
        <a href="https://kaeru-shigure.github.io/hanezu-tts/">
          https://kaeru-shigure.github.io/hanezu-tts/
        </a>
        <br />
        Code:{" "}
        <a href="https://github.com/kaeru-shigure/hanezu-tts">
          https://github.com/kaeru-shigure/hanezu-tts
        </a>
      </p>

      <h3>Model details</h3>
      <table>
        <thead>
          <tr>
            <th scope="col">Property</th>
            <th scope="col">Specification</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Parameters</td>
            <td>
              1.7M
              <br />
              (+ 読み推定モデル tsqyomi 70M)
            </td>
          </tr>
          <tr>
            <td>Corpus</td>
            <td>
              独自に生成したpyopenjtalk-plus音素特化
              <br />
              日本語バランス文データセット30,000文前後
            </td>
          </tr>
          <tr>
            <td>Dataset</td>
            <td>
              Qwen3-TTS + 日本語LoRA + 4パラメータ話者特徴LoRA
              <br />
              合成音声データセット コーパス文で35時間程度
              <br />
              (権利問題避けたかったので参照音声無し)
            </td>
          </tr>
        </tbody>
      </table>

      <h3>Concept</h3>
      <p>
        ただ軽いだけでなく、実用性とのバランスを目指して制作した、ほぼ独自アーキテクチャの音声合成モデルです。
      </p>
      <ul>
        <li>CPUでも高速に推論できること。</li>
        <li>英文混じりの文章もそれなりに正しく読めること。</li>
        <li>ある程度聞ける品質であること。</li>
      </ul>

      <h3>Notes</h3>
      <p>
        音声合成モデル本体は約1.7Mパラメータ。
        <br />
        tsqyomiモデルへは抑揚改善のためのおまけです。(伸び幅小さいので無くても良いのですが、どうせFrontendで使ってるなら使おうの精神。)
      </p>
      <p>
        基本的なアイデアは、機械学習モデルで扱う情報をなるべく扱いやすい形に変換し、モデルが担うタスクの難易度を下げることです。
      </p>
      <p>
        抑揚とモデルのサイズに関してはまだ改良の余地が残っています。
        <br />
        ただし、いまのところこれ以上最適化する予定はありません。
        <br />
        私の開発環境のGPU性能が貧弱過ぎて学習のサイクルが長く、結構辛いので趣味でやるのはこれぐらいにすることにしました。
      </p>
      <p>
        ちょっとした実験の副産物。
        <br />
        もし気に入ったら使ってください。
      </p>
      <p>
        学習コードの公開予定はありません。MacbookPro32GB貰えるなら考えます(冗談です)
      </p>

      <h3>Contacts</h3>
      <p>
        Discord: kaeru_dev
        <br />
        GitHub: <a href="https://github.com/kaeru-shigure">kaeru-shigure</a>
      </p>
    </article>
  );
}
