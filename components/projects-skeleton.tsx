export default function ProjectsSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {[1, 2, 3].map((item) => (
        <div
          key={item}
          className="bg-white border border-neutral-100 rounded-2xl overflow-hidden shadow-xs flex flex-col animate-pulse"
        >
          {/* Skeleton Thumbnail Gambar */}
          <div className="aspect-video w-full bg-neutral-200/70" />

          {/* Skeleton Isi Kartu */}
          <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
            <div className="space-y-3">
              {/* Skeleton Kategori Badge */}
              <div className="h-4 w-24 bg-neutral-200/80 rounded-md" />
              
              {/* Skeleton Judul */}
              <div className="h-6 w-3/4 bg-neutral-200/90 rounded-lg" />
              
              {/* Skeleton Deskripsi (3 baris) */}
              <div className="space-y-2 pt-1">
                <div className="h-3 w-full bg-neutral-100 rounded-md" />
                <div className="h-3 w-5/6 bg-neutral-100 rounded-md" />
                <div className="h-3 w-4/6 bg-neutral-100 rounded-md" />
              </div>
            </div>

            {/* Skeleton Tech Pills & Tombol */}
            <div className="space-y-4 pt-3">
              <div className="flex gap-2">
                <div className="h-4 w-12 bg-neutral-100 rounded-md" />
                <div className="h-4 w-16 bg-neutral-100 rounded-md" />
                <div className="h-4 w-14 bg-neutral-100 rounded-md" />
              </div>

              {/* Skeleton Tombol View Details */}
              <div className="h-10 w-full bg-neutral-200/70 rounded-xl" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}