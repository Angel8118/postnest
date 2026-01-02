import Link from "next/link";

type PaginationProps = {
    page: number;
    totalPages: number;
    baseUrl: string;
}

export default function Pagination({ page, totalPages, baseUrl }: PaginationProps) {

    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
        <nav className="flex justify-center py-10" >
            {page > 1 && (
                <Link
                    href={`${baseUrl}?page=${page > 1 ? page - 1 : 1}`}
                    className="mx-1 px-3 py-2 border rounded-md bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                >&laquo;</Link>
            )}
            {pages.map(currentPage => (
                <Link
                    key={currentPage}
                    href={`${baseUrl}?page=${currentPage}`}
                    className={`mx-1 px-3 py-2 border rounded-md ${currentPage === page ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'}`}
                >
                    {currentPage}
                </Link>
            ))}

            {page < totalPages && (
                <Link
                    href={`${baseUrl}?page=${page < totalPages ? page + 1 : totalPages}`}
                    className="mx-1 px-3 py-2 border rounded-md bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                >&raquo;</Link>
            )}
        </nav>
    )
}
