"use client";
export function Page({ data }: { data: any }) {
  return (
    data && (
      <>
        <section dangerouslySetInnerHTML={{ __html: data.content.html }} />
        <style>{data.content.css}</style>
      </>
    )
  );
}
