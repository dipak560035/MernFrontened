interface PostPageProps {
  id: string;
}

export default async function PostPage({ params }: { params: Promise<PostPageProps> }) {
  const m = await params;

  console.log(m);

  return (
    <div>

    </div>
  );
}