export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center bg-white">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          404 - Voucher Tidak Ditemukan
        </h1>
        <p className="text-gray-600 text-base">
          Maaf, voucher yang kamu cari tidak tersedia atau sudah tidak berlaku.
        </p>
      </div>
    </div>
  );
}
