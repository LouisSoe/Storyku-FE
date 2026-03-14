import { useNavigate } from "react-router-dom";
import { Button } from "@/presentation/components/ui/Button";
import { ArrowLeft } from "lucide-react";

export function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="text-center">
        <p className="text-6xl font-bold text-primary">404</p>
        <h1 className="mt-4 text-2xl font-semibold text-gray-900">
          Halaman Tidak Ditemukan
        </h1>
        <p className="mt-2 text-gray-500">
          Halaman yang kamu cari tidak ada atau sudah dipindahkan.
        </p>
        <Button
          className="mt-6"
          leftIcon={<ArrowLeft size={16} />}
          onClick={() => navigate("/stories")}
        >
          Kembali ke Story List
        </Button>
      </div>
    </div>
  );
}
