import Link from "next/link";

export default function Pagination({page, totalPages}: {page: number, totalPages: number}) {
  
  const pages = Array.from({length: totalPages}, (_, i) => i + 1);

    return (
    <nav className="flex justify-center py-10" >
        {pages.map(currentPage => (
            <Link
                key={currentPage}
                href={`/admin/products?page=${currentPage}`}
                className={`mx-1 px-3 py-2 border rounded-md ${currentPage === page ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'}`}
            >
                {currentPage}
            </Link>
        ))}
    </nav>
  )
}
