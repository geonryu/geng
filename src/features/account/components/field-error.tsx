/**
 * 필드 단위 에러 문구.
 * 시안에 에러 상태가 없어 토큰만으로 최소 표기를 만들었다 — 할인 포인트에 쓰는
 * sale 색을 경고색으로 재사용한다(팔레트에 전용 danger 토큰이 없다).
 */
export function FieldError({ messages }: { messages?: string[] }) {
  if (!messages?.length) return null;

  return (
    <ul className="flex flex-col gap-1">
      {messages.map((message) => (
        <li key={message} className="text-[13px] text-sale">
          {message}
        </li>
      ))}
    </ul>
  );
}
