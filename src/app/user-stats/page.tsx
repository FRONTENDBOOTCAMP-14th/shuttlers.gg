export default function Page({ params }: { params: { id: string } }) {
  return <div>OK: {params.id}</div>;
}
