import { useRouter } from "next/router";

const CategoryPage = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <h1 className="text-3xl font-bold mb-4">دسته‌بندی: {id}</h1>
      <p>آیتم‌های مربوط به این دسته به زودی اینجا نمایش داده می‌شوند.</p>
    </div>
  );
};

export default CategoryPage;
