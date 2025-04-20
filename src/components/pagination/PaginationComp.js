import { useEffect, useState, useMemo } from "react";
import "./PaginationStyle.css";

const ProductItemCard = ({ item }) => {
    return (
        <div className="pag-product-item-card">
            <img
                className="pag-card-img"
                src={item.thumbnail}
                alt={item.title}
            />
            <p className="pag-card-title">{item.title}</p>
        </div>
    );
};

const PageButtons = ({ index, pageNavigationHandler, isActive, ariaLabel }) => {
    return (
        <button
            onClick={() => pageNavigationHandler(index)}
            className={`pag-page-button ${isActive ? "pag-active-page" : ""}`}
            aria-label={ariaLabel}
            aria-current={isActive ? "page" : undefined}
        >
            {index}
        </button>
    );
};

const PaginationComp = () => {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const itemsPerPage = 10;

    const totalPages = useMemo(
        () => Math.ceil(products.length / itemsPerPage),
        [products]
    );

    const fetchProducts = async () => {
        setIsLoading(true);
        try {
            const res = await fetch("https://dummyjson.com/products?limit=100");
            const data = await res.json();
            setProducts(data.products || []);
        } catch (error) {
            console.error("Failed to fetch products:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const pageNavigationHandler = (index) => {
        if (index >= 1 && index <= totalPages) {
            setCurrentPage(index);
        }
    };

    const paginatedProducts = useMemo(() => {
        const start = (currentPage - 1) * itemsPerPage;
        return products.slice(start, start + itemsPerPage);
    }, [products, currentPage]);

    // Generate pagination buttons
    const pageButtons = useMemo(() => {
        const buttons = [];
        const siblingCount = 1; // Pages to show on each side of currentPage

        if (totalPages <= 5) {
            // Show all pages if totalPages <= 5
            return Array.from({ length: totalPages }, (_, i) => i + 1);
        }

        // Calculate range around currentPage
        const startPage = Math.max(2, currentPage - siblingCount);
        const endPage = Math.min(totalPages - 1, currentPage + siblingCount);

        // Always include first page
        buttons.push(1);

        // Add ellipsis if currentPage is far from start
        if (startPage > 2) {
            buttons.push("...");
        }

        // Add pages around currentPage
        for (let i = startPage; i <= endPage; i++) {
            buttons.push(i);
        }

        // Add ellipsis if currentPage is far from end
        if (endPage < totalPages - 1) {
            buttons.push("...");
        }

        // Always include last page
        if (totalPages > 1) {
            buttons.push(totalPages);
        }

        return buttons;
    }, [totalPages, currentPage]);
    console.log(pageButtons);
    return (
        <div className="pag-container">
            <h1 className="pag-title">Product Pagination</h1>
            {isLoading ? (
                <p className="pag-message">Loading products...</p>
            ) : products.length === 0 ? (
                <p className="pag-message">No products available.</p>
            ) : (
                <>
                    <div className="pag-product-grid">
                        {paginatedProducts.map((item) => (
                            <ProductItemCard key={item.id} item={item} />
                        ))}
                    </div>
                    <div className="pag-button-container">
                        {currentPage > 1 && (
                            <button
                                onClick={() => setCurrentPage((p) => p - 1)}
                                className="pag-page-button pag-nav-button"
                                aria-label="Previous page"
                            >
                                Prev
                            </button>
                        )}
                        {pageButtons.map((page, index) =>
                                page === "..." ? (
                                    <span
                                        key={`ellipsis-${index}`}
                                        className="pag-ellipsis"
                                        aria-hidden="true"
                                    >
                  …
                </span>
                                ) : (
                                    <PageButtons
                                        key={page}
                                        index={page}
                                        pageNavigationHandler={pageNavigationHandler}
                                        isActive={page === currentPage}
                                        ariaLabel={`Go to page ${page}`}
                                    />
                                )
                        )}
                        {currentPage < totalPages && (
                            <button
                                onClick={() => setCurrentPage((p) => p + 1)}
                                className="pag-page-button pag-nav-button"
                                aria-label="Next page"
                            >
                                Next
                            </button>
                        )}
                    </div>
                </>
            )}
        </div>
    );
};

export default PaginationComp;