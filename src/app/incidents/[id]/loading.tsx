export default function ArticleDetailLoading() {
  return (
    <div
      role="status"
      aria-busy="true"
      className="mx-auto max-w-3xl bg-surface p-4 text-text"
    >
      기사를 불러오는 중
    </div>
  );
}
